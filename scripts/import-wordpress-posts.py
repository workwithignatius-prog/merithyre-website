#!/usr/bin/env python3
"""Import the merithyre.ai WordPress (Elementor) blog posts into the Next.js blog.

Requirements
------------
- Python 3.10+
- beautifulsoup4   (pip install beautifulsoup4)
- Pillow           (pip install Pillow). WebP support is used when available;
                   without it images are written as JPEG (quality 82) instead.
- Network access to https://merithyre.ai/wp-content/uploads/ for the images.
  Downloads are cached (see --cache-dir), so re-runs work offline.

Input directory (WordPress REST API dumps, downloaded beforehand)
----------------------------------------------------------------
- posts.json   /wp-json/wp/v2/posts?per_page=100
- cats.json    /wp-json/wp/v2/categories
- media.json   /wp-json/wp/v2/media (at least the posts' featured_media items)

Usage
-----
    python3 -I scripts/import-wordpress-posts.py <input-dir> [--cache-dir DIR] [--prune] [--verbose]

Run it with `python3 -I` and keep this script outside the input directory: the
dumps and images are untrusted data. Re-running overwrites the outputs and is
deterministic for the same input.

Outputs (paths relative to the repository root)
-----------------------------------------------
- src/content/blog/posts.json   one object per post, newest first
- public/blog/images/*.webp     featured ("-cover") and inline ("-1", "-2" ...) images

What the conversion does
------------------------
- Drops Elementor template chrome: the category and title headings repeated at
  the top of the body, dividers, the sidebar (table of contents + "See it live"
  demo CTA) and share widgets.
- The lead image at the top of the article becomes the featured image when the
  post uses the shared placeholder featured image (media 1796), and is removed
  from the body when it duplicates the featured image.
- Converts ElementsKit accordions to <h3>question</h3> + answer, Elementor icon
  lists to <ul>, unwraps everything outside an allowlist of tags and attributes,
  rewrites merithyre.ai links to site paths, normalises tables (header row into
  <thead>, wrapped in <div class="table-scroll">) and heading levels (h2, h3,
  h4 without skipped levels), collapses whitespace and removes empty elements.
- Fixes Google Docs paste artefacts: a single <ol><li> wrapped around a whole
  section is unwrapped, and one-cell "CTA box" tables become plain paragraphs.
"""

from __future__ import annotations

import argparse
import html
import io
import json
import math
import os
import re
import sys
import tempfile
import time
import unicodedata
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

try:
    from bs4 import BeautifulSoup, Comment, NavigableString, Tag
except ImportError:  # pragma: no cover
    sys.exit("beautifulsoup4 is required: pip install beautifulsoup4")
try:
    from PIL import Image, ImageOps, features
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required: pip install Pillow")

REPO_ROOT = Path(__file__).resolve().parent.parent
OUT_JSON = REPO_ROOT / "src" / "content" / "blog" / "posts.json"
OUT_IMAGES = REPO_ROOT / "public" / "blog" / "images"
PUBLIC_IMAGE_PREFIX = "/blog/images/"

SITE_HOSTS = {"merithyre.ai", "www.merithyre.ai"}
UPLOADS_PATH = "/wp-content/uploads/"
SHARED_FEATURED_MEDIA = 1796  # placeholder featured image reused by several posts
MAX_IMAGE_WIDTH = 1600
WEBP_QUALITY = 78
JPEG_QUALITY = 82
MAX_DOWNLOAD_BYTES = 25 * 1024 * 1024
WORDS_PER_MINUTE = 230
USER_AGENT = "merithyre-blog-import/1.0 (+https://merithyre.ai)"

# --------------------------------------------------------------------------
# Editorial data for the current posts. Posts that are not listed here still
# convert, with generated fallbacks and a warning, so the script keeps working
# when new posts are added. Review the warnings and add entries here.
# --------------------------------------------------------------------------

# Short, kebab-case base names for image files, derived from the post slug.
SHORT_NAMES = {
    "time-to-hire-vs-quality-of-hire-which-metric-should-you-actually-track": "time-to-hire-vs-quality",
    "candidate-fraud-in-hiring-spot-fake-profiles-and-proxies": "candidate-fraud",
    "ai-resume-screening-vs-keyword-matching-which-wins": "ai-resume-screening",
    "how-to-write-job-descriptions-that-ai-can-screen-against": "job-descriptions",
    "who-owns-candidate-data-in-ai-recruiting-contract-clauses-to-check": "candidate-data",
    "structured-interview-scorecards_-templates-and-best-practices-guide": "interview-scorecards",
    "ai-recruitment-automation-the-complete-guide-to-fixing-hiring-bottlenecks": "ai-recruitment-automation",
    "nyc-local-law-144-compliance-checklist-for-ai-hiring-tools-2026": "nyc-local-law-144",
    "ai-native-vs-bolt-on-ai-recruiting-whats-actually-different": "ai-native-vs-bolt-on",
    "from-job-order-to-ranked-shortlist-the-ai-native-staffing-workflow-us-agencies-are-adopting": "job-order-to-shortlist",
    "every-recruiter-has-felt-it-you-fill-the-role-and-three-months-later-youre-starting-the-exact-same-search-from-zero": "search-from-zero",
    "why-ai-native-beats-ai-powered-the-architecture-difference-that-changes-everything-2": "ai-native-beats-ai-powered",
}

# Meta description (120-160 chars, written from the post's opening paragraph)
# and card excerpt (1-2 sentences, <= ~220 chars). The post page also shows the
# excerpt as the standfirst right above the body, which opens with the
# WordPress dek, so excerpts summarise the post instead of repeating its opening.
COPY = {
    "time-to-hire-vs-quality-of-hire-which-metric-should-you-actually-track": (
        "Quality-of-hire is the goal and time-to-hire is the guardrail. See what each metric tells you, where each misleads, and how to track both without a data team.",
        "A side-by-side look at the two hiring metrics, the warning signs that speed is winning over quality, and a five-step way to start measuring how good your hires really are.",
    ),
    "candidate-fraud-in-hiring-spot-fake-profiles-and-proxies": (
        "Fake profiles and stand-in interviewees can reach your shortlist. Learn the red flags to watch for and how transcripts and structured scoring build evidence.",
        "Deepfakes, proxy interviewees and invented profiles are reaching interview stages. Learn the warning signs and build a layered verification process that holds up.",
    ),
    "ai-resume-screening-vs-keyword-matching-which-wins": (
        "Keyword filters miss strong candidates, while AI screening reads context. See where each method wins and how adjustable weights improve your shortlist.",
        "Exact-word filters and context-aware AI each have a place in screening. Compare how they handle synonyms, adjacent skills and fairness, and when a hybrid works best.",
    ),
    "how-to-write-job-descriptions-that-ai-can-screen-against": (
        "Screening tools read your job description first and rank every resume against it. Learn how to write job descriptions that AI can parse and match accurately.",
        "A practical framework for AI-ready job descriptions: a shared taxonomy, a three-tier qualification hierarchy and outcome-based duties, plus a before-and-after rewrite.",
    ),
    "who-owns-candidate-data-in-ai-recruiting-contract-clauses-to-check": (
        "Whoever negotiates the data clauses controls candidate data. See who owns resumes, recordings and scores in AI hiring, and which contract terms to check.",
        "Resumes, recordings, transcripts and match scores all flow to your AI recruiting vendor. These eight contract clauses decide who controls that data once you sign.",
    ),
    "structured-interview-scorecards_-templates-and-best-practices-guide": (
        "Most hiring teams run interviews, but few can explain why one candidate scored higher. Build structured scorecards with anchored ratings and a free template.",
        "What goes into a strong interview scorecard, from role outcomes and weighted competencies to anchored rating scales, with a free software engineer template to adapt.",
    ),
    "ai-recruitment-automation-the-complete-guide-to-fixing-hiring-bottlenecks": (
        "Application volume keeps climbing while recruiter hours stay fixed. See where hiring actually slows down and how AI-native automation removes each bottleneck.",
        "The capabilities that matter, use cases by team, how to evaluate platforms, a phased rollout plan and the KPIs that prove AI-native recruitment automation is working.",
    ),
    "nyc-local-law-144-compliance-checklist-for-ai-hiring-tools-2026": (
        "Your software vendor doesn’t handle Local Law 144 for you. Cover AEDT scope, bias audits, the public summary, candidate notice and penalties, step by step.",
        "Five steps to meet New York City’s AI hiring law: map your tools, commission an independent bias audit, publish the summary, notify candidates and handle data requests.",
    ),
    "ai-native-vs-bolt-on-ai-recruiting-whats-actually-different": (
        "AI-powered and AI-native pitches sound alike, but only one is built to run hiring end to end. Compare architecture, hidden costs and handoffs to recruiters.",
        "Bolt-on AI adds features to a legacy ATS; AI-native software is built around AI from the start. Here’s how the two differ in architecture, workflow, hidden costs and handoffs.",
    ),
    "from-job-order-to-ranked-shortlist-the-ai-native-staffing-workflow-us-agencies-are-adopting": (
        "A job order lands and a recruiter opens fifteen tabs and a spreadsheet. See how AI-native staffing workflows deliver a ranked shortlist in hours, not weeks.",
        "How AI-native staffing workflows take a job order through sourcing, screening and ranking before a recruiter steps in, and why US agencies are making the switch now.",
    ),
    "every-recruiter-has-felt-it-you-fill-the-role-and-three-months-later-youre-starting-the-exact-same-search-from-zero": (
        "When a filled role reopens, most teams restart the search with nothing. Learn why linear hiring funnels forget everything and how a loop-based model remembers.",
        "Linear hiring funnels forget everything once a role closes, so every repeat search starts cold. Here’s what a loop-based model keeps, from runner-up candidates to post-hire data.",
    ),
    "why-ai-native-beats-ai-powered-the-architecture-difference-that-changes-everything-2": (
        "Most recruiting tools claim to be AI-powered, but bolting AI onto old software isn’t the same as making AI the operating model. Here’s why that matters.",
        "AI-powered tools speed up the old recruiting workflow; AI-native platforms replace it. See what that architecture difference means for recruiters, compliance and your ATS.",
    ),
}

# Descriptive alt text, keyed by the image's original upload path (size and
# edit suffixes removed). The WordPress alt texts mostly repeat the post title,
# and two inline charts have none.
ALT_TEXT = {
    # Featured images
    "2026/11/WhatsApp-Image-2026-10-31-at-1.30.33-AM.jpeg": "A time-to-hire card with a clock and rising bar chart set against a quality-of-hire card with a star and team icon",
    "2026/11/Candidate-Fraud-in-Hiring.png": "Recruiter watching a video interview where the candidate’s face is split with a shadowy stand-in, beside profile photos under a magnifying glass",
    "2026/10/WhatsApp-Image-2026-10-26-at-9.39.44-PM.jpeg": "AI resume screening panel ranking candidates with scores of 92, 88 and 85, beside a keyword matching panel that only highlights matched terms",
    "2026/10/AI-Matches-Job-Requirements-to-Candidates.png": "Job description listing skills, experience and requirements, passed through AI to a candidate profile with every requirement checked",
    "2026/10/Candidate-data-rights-in-AI-recruiting.png": "Candidate profile card linked to a contract page with a highlighted data rights clause",
    "2026/10/Structured-Interview-Scorecards-Guide.png": "Interview scorecard rating a candidate out of five stars on communication, problem solving, technical skills, teamwork and cultural fit",
    "2026/10/AI-recruitment-automation.jpeg": "Hiring bottlenecks such as too many applications and manual screening flowing into automated sourcing, screening, shortlisting and scheduling, ending in a hire",
    "2026/09/NYC-Local-Law-Compliance.png": "Compliance checklist on a clipboard with an AI chip, a shield and a magnifying glass over candidate profiles, in front of the New York City skyline",
    "2026/09/AI-Native-Vs-Bolt-AI.png": "AI-native recruiting platform with candidate rankings built in, set against a legacy system with separate AI screening, chatbot and scheduling add-ons plugged in",
    "2026/08/From-Job-Order-to-Ranked-Shortlist.png": "Four-step staffing workflow from job order intake to a ranked shortlist, beside a dashboard of top candidates with match scores",
    "2026/08/Every-recruiter-has-felt-it.png": "Frustrated recruiter at a laptop as a filled role loops back, three months later, to the same candidate search starting from zero",
    "2026/08/Why-AI-Native-Beats-AI-Powered.png": "AI-powered tools shown as an AI add-on stacked on legacy recruiting systems, next to an AI-native platform built around sourcing, screening, matching and shortlisting",
    # Inline images
    "2026/08/Image-2.jpeg": "Bar chart: AI runs 4 of the 5 job-order-to-shortlist stages, so 80% of the pipeline runs before a recruiter touches it",
    "2026/08/Image-1.jpeg": "Bar chart from Bullhorn’s 2026 GRID report: AI-adopting staffing firms are 69% more likely than manual-process firms to report revenue gains",
    "2026/08/Img-1.jpeg": "Bar chart: AI runs 6 of 7 hiring pipeline stages and a human makes the final call; 81% of employers have shifted to skills-based evaluation",
    "2026/08/img-3.jpeg": "Bar chart of the real cost of a bad hire: 30% of first-year salary by the US Department of Labor estimate, 100 to 200% in 2026 analyses",
    "2026/08/img-2.jpeg": "Donut chart: 75% of employers report having made a bad hire, according to CareerBuilder’s State of Recruiting survey",
    "2026/08/img-4.jpeg": "Bar chart: average US cost per hire rose from $4,129 in 2019 to $4,750 in 2026, according to SHRM",
}

# Pages of the new site that keep their WordPress path (see src/app).
SAME_PATH_PAGES = {
    "/",
    "/pricing/",
    "/about-us/",
    "/contact-us/",
    "/staffing/",
    "/smbs-midmarket/",
    "/enterprise/",
    "/startups/",
}
# Pages that intentionally stay on WordPress for now (src/content/site.ts).
WORDPRESS_ONLY_PAGES = {"/privacy-policy/", "/terms-of-service/"}

# --------------------------------------------------------------------------
# HTML allowlist
# --------------------------------------------------------------------------
ALLOWED_TAGS = {
    "h2", "h3", "h4", "p", "ul", "ol", "li", "a", "strong", "em", "code", "br",
    "blockquote", "table", "thead", "tbody", "tr", "th", "td", "figure",
    "figcaption", "img", "div",
}
VOID_TAGS = {"br", "img"}
DROP_TAGS = {
    "script", "style", "noscript", "template", "svg", "button", "iframe", "object",
    "embed", "form", "input", "select", "textarea", "video", "audio", "canvas",
    "source", "picture", "link", "meta", "head", "title",
}
# Blocks: whitespace around them is insignificant.
BLOCK_TAGS = {
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "blockquote",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "figure", "figcaption",
    "div", "section", "article", "aside", "header", "footer", "nav", "main",
}
TOP_LEVEL_BLOCKS = {"h2", "h3", "h4", "p", "ul", "ol", "blockquote", "figure", "div", "table"}
# Elements removed when they end up without text or images.
REMOVE_IF_EMPTY = {
    "p", "h2", "h3", "h4", "li", "ul", "ol", "strong", "em", "code", "a",
    "blockquote", "figure", "figcaption",
}
# Elementor / add-on widgets that are page chrome, never article content.
CHROME_WIDGETS = re.compile(
    r"^(divider|spacer|share-buttons|social-icons|table-of-contents|post-navigation|"
    r"author-box|post-comments|post-info|breadcrumbs|nav-menu|search-form|form|"
    r"elementskit-social-share)\."
)
TOC_HEADING = re.compile(r"^(in this article|table of contents|contents|on this page)$", re.I)
HEADING_RE = re.compile(r"^h[1-6]$")

WS_RE = re.compile(r"\s+")
ZERO_WIDTH_RE = re.compile("[\u200b\u200c\u200d\u2060\ufeff]")
UPLOAD_SUFFIX_RE = re.compile(
    r"^(?P<base>.+?)(?P<edit>-e\d{10,})?(?P<scaled>-scaled)?(?P<size>-\d+x\d+)?(?P<ext>\.[A-Za-z0-9]+)$"
)


class ConversionError(Exception):
    """Input that the importer cannot convert safely."""


@dataclass
class Context:
    input_dir: Path
    cache_dir: Path
    categories: dict
    media: dict
    slugs: set
    post_ids: dict  # id -> slug
    verbose: bool = False
    use_webp: bool = True
    warnings: list = field(default_factory=list)
    written_images: dict = field(default_factory=dict)  # file name -> source url

    def warn(self, slug: str, message: str) -> None:
        self.warnings.append(f"{slug}: {message}")
        print(f"  WARNING: {message}", file=sys.stderr)

    def log(self, message: str) -> None:
        if self.verbose:
            print(f"  {message}")


# --------------------------------------------------------------------------
# Small helpers
# --------------------------------------------------------------------------

def plain(text: str) -> str:
    """Collapse whitespace (including NBSP) and strip."""
    return WS_RE.sub(" ", ZERO_WIDTH_RE.sub("", text)).strip()


def text_of(el) -> str:
    return plain(el.get_text(" ")) if isinstance(el, Tag) else plain(str(el))


def word_count(text: str) -> int:
    return len(plain(text).split())


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"['\"]", "", text.lower())
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-") or "section"


def tokens(text: str) -> set:
    return set(re.findall(r"[a-z0-9]+", unicodedata.normalize("NFKD", text.lower())))


def strip_html(fragment: str) -> str:
    return plain(BeautifulSoup(fragment or "", "html.parser").get_text(" "))


def widget_type(el: Tag) -> str:
    return el.get("data-widget_type", "") if isinstance(el, Tag) else ""


def outer_widget(el: Tag) -> Tag:
    """The Elementor widget wrapper around `el`, or `el` itself."""
    node = el
    while isinstance(node, Tag):
        if node.get("data-widget_type"):
            return node
        node = node.parent
    return el


def is_container(el: Tag) -> bool:
    return isinstance(el, Tag) and el.get("data-element_type") == "container"


def upload_key(url: str) -> str | None:
    """'https://merithyre.ai/wp-content/uploads/2026/08/Image-2-768x320.jpeg' -> '2026/08/Image-2.jpeg'."""
    parts = urlsplit(url)
    if parts.hostname not in SITE_HOSTS or not parts.path.startswith(UPLOADS_PATH):
        return None
    rel = parts.path[len(UPLOADS_PATH):]
    directory, _, name = rel.rpartition("/")
    m = UPLOAD_SUFFIX_RE.match(name)
    if m:
        name = m.group("base") + m.group("ext")
    return f"{directory}/{name}" if directory else name


def original_upload_url(url: str) -> str:
    key = upload_key(url)
    return f"https://merithyre.ai{UPLOADS_PATH}{key}" if key else url


def parse_srcset(srcset: str) -> list:
    out = []
    for part in (srcset or "").split(","):
        bits = part.strip().split()
        if len(bits) == 2 and bits[1].endswith("w") and bits[1][:-1].isdigit():
            out.append((int(bits[1][:-1]), bits[0]))
    return [u for _, u in sorted(out, reverse=True)]


# --------------------------------------------------------------------------
# Images
# --------------------------------------------------------------------------

def fetch_upload(ctx: Context, url: str) -> bytes | None:
    """Download a wp-content/uploads file (cached). Returns None on 404."""
    parts = urlsplit(url)
    if parts.scheme not in ("http", "https") or parts.hostname not in SITE_HOSTS or not parts.path.startswith(UPLOADS_PATH):
        raise ConversionError(f"refusing to download a non-upload URL: {url}")
    rel = parts.path[len(UPLOADS_PATH):]
    if ".." in rel or not re.fullmatch(r"[A-Za-z0-9._/-]+", rel):
        raise ConversionError(f"unexpected upload path: {url}")
    cache_file = ctx.cache_dir / rel.replace("/", "__")
    missing_marker = cache_file.with_name(cache_file.name + ".404")
    if cache_file.exists():
        return cache_file.read_bytes()
    if missing_marker.exists():
        return None
    request = urllib.request.Request(f"https://merithyre.ai{UPLOADS_PATH}{rel}", headers={"User-Agent": USER_AGENT})
    data = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                data = response.read(MAX_DOWNLOAD_BYTES + 1)
            break
        except urllib.error.HTTPError as err:
            if err.code in (404, 410):
                ctx.cache_dir.mkdir(parents=True, exist_ok=True)
                missing_marker.write_text("missing\n")
                return None
            if attempt == 2:
                raise
        except urllib.error.URLError:
            if attempt == 2:
                raise
        time.sleep(2 * (attempt + 1))
    if data is None or len(data) > MAX_DOWNLOAD_BYTES:
        raise ConversionError(f"download failed or too large: {url}")
    try:
        with Image.open(io.BytesIO(data)) as probe:
            probe.verify()
    except Exception as err:  # noqa: BLE001 - any decoder error means "not an image"
        raise ConversionError(f"not a valid image: {url} ({err})") from err
    ctx.cache_dir.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=ctx.cache_dir)
    with os.fdopen(fd, "wb") as fh:
        fh.write(data)
    os.replace(tmp, cache_file)
    return data


def image_size(data: bytes) -> tuple:
    with Image.open(io.BytesIO(data)) as im:
        return im.size


def pick_source(ctx: Context, slug: str, candidates: list, expected_ratio: float | None) -> tuple:
    """First candidate URL that exists and matches the displayed aspect ratio (1%)."""
    seen = []
    for url in candidates:
        if not url or url in seen:
            continue
        seen.append(url)
        data = fetch_upload(ctx, url)
        if data is None:
            continue
        w, h = image_size(data)
        if expected_ratio is None or abs((w / h) - expected_ratio) / expected_ratio <= 0.01:
            return url, data
        ctx.log(f"skipping {url}: aspect ratio {w}x{h} differs from the displayed image")
    raise ConversionError(f"{slug}: no usable source among {seen}")


def write_web_image(ctx: Context, data: bytes, base_name: str, source_url: str) -> tuple:
    """Convert to WebP (or JPEG), max 1600px wide. Returns (public src, width, height)."""
    with Image.open(io.BytesIO(data)) as opened:
        opened.load()
        im = ImageOps.exif_transpose(opened)
        has_alpha = im.mode in ("RGBA", "LA", "PA") or (im.mode == "P" and "transparency" in im.info)
        if has_alpha:
            im = im.convert("RGBA")
            if im.getchannel("A").getextrema() == (255, 255):
                im = im.convert("RGB")
        else:
            im = im.convert("RGB")
        if im.width > MAX_IMAGE_WIDTH:
            im = im.resize((MAX_IMAGE_WIDTH, round(im.height * MAX_IMAGE_WIDTH / im.width)), Image.LANCZOS)
        buffer = io.BytesIO()
        if ctx.use_webp:
            ext = ".webp"
            im.save(buffer, "WEBP", quality=WEBP_QUALITY, method=6)
        else:
            ext = ".jpg"
            if im.mode == "RGBA":
                background = Image.new("RGB", im.size, (255, 255, 255))
                background.paste(im, mask=im.getchannel("A"))
                im = background
            im.save(buffer, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        width, height = im.size
    file_name = base_name + ext
    previous = ctx.written_images.get(file_name)
    if previous and previous != source_url:
        raise ConversionError(f"image name clash: {file_name} for {previous} and {source_url}")
    ctx.written_images[file_name] = source_url
    OUT_IMAGES.mkdir(parents=True, exist_ok=True)
    target = OUT_IMAGES / file_name
    payload = buffer.getvalue()
    if not target.exists() or target.read_bytes() != payload:
        target.write_bytes(payload)
    return PUBLIC_IMAGE_PREFIX + file_name, width, height


def alt_for(ctx: Context, slug: str, source_url: str, fallback: str) -> str:
    key = upload_key(source_url)
    if key in ALT_TEXT:
        return ALT_TEXT[key]
    if plain(fallback):
        ctx.warn(slug, f"no curated alt text for {key}; using the WordPress alt {plain(fallback)!r}")
        return plain(fallback)
    ctx.warn(slug, f"no alt text for {key}")
    return ""


# --------------------------------------------------------------------------
# Links
# --------------------------------------------------------------------------

def rewrite_href(ctx: Context, slug: str, href: str) -> str | None:
    """Return the new href, or None to drop the link (keeping its text)."""
    href = (href or "").strip()
    if not href or href.startswith("#"):
        return None
    lower = href.lower()
    if lower.startswith(("mailto:", "tel:")):
        return href
    parts = urlsplit(href)
    if parts.scheme and parts.scheme not in ("http", "https"):
        ctx.warn(slug, f"dropped link with unsupported scheme: {href}")
        return None
    host = (parts.hostname or "").lower()
    if host and host not in SITE_HOSTS:
        return href  # external (including protocol-relative //host/...): unchanged
    if not host and not href.startswith("/"):
        ctx.warn(slug, f"dropped relative link: {href}")
        return None

    path = parts.path or "/"
    segments = [s for s in path.split("/") if s]
    fragment = f"#{parts.fragment}" if parts.fragment else ""
    query = f"?{parts.query}" if parts.query else ""
    if not path.endswith("/") and not (segments and "." in segments[-1]):
        path += "/"

    if not segments:
        post_id = parse_qs(parts.query).get("p", [""])[0]
        if post_id.isdigit() and int(post_id) in ctx.post_ids:
            return f"/blog/{ctx.post_ids[int(post_id)]}/"
        return "/" + fragment
    if segments[0].lower().startswith("merithyre-lp-staffing"):
        return "/staffing/"
    if segments[-1] in ctx.slugs:
        return f"/blog/{segments[-1]}/" + fragment
    if segments[0] in ("blog", "category", "tag", "author"):
        return "/blog/"
    if path in SAME_PATH_PAGES:
        return path + query + fragment
    if path in WORDPRESS_ONLY_PAGES:
        return f"https://merithyre.ai{path}"
    ctx.warn(slug, f"no matching page for {href}; linking to /")
    return "/"


# --------------------------------------------------------------------------
# Conversion steps
# --------------------------------------------------------------------------

def remove_template_headings(ctx: Context, soup, post: dict, slug: str):
    """Drop the category and title headings that the template repeats at the top.

    Returns the header container (holding the dek paragraph) or None.
    """
    headings = soup.find_all(HEADING_RE)
    category_names = {plain(html.unescape(c["name"])).lower() for c in ctx.categories.values()}
    title = plain(html.unescape(post["title"]["rendered"]))
    if len(headings) < 2:
        ctx.warn(slug, "fewer than two headings; template headings not found")
        return None
    category_h, title_h = headings[0], headings[1]
    title_tokens, h_tokens = tokens(title), tokens(text_of(title_h))
    overlap = len(title_tokens & h_tokens) / max(1, min(len(title_tokens), len(h_tokens)))
    if text_of(category_h).lower() not in category_names or overlap < 0.6:
        ctx.warn(slug, f"template headings not recognised: {text_of(category_h)!r} / {text_of(title_h)!r}")
        return None
    header = category_h.find_parent(is_container)
    ctx.log(f"dropped template headings {text_of(category_h)!r} and {text_of(title_h)!r}")
    if text_of(title_h) != title:
        ctx.log(f"on-page title differs from WordPress title: {text_of(title_h)!r}")
    for h in (category_h, title_h):
        outer_widget(h).decompose()
    return header


def remove_chrome(ctx: Context, soup, slug: str, total_words: int) -> list:
    """Remove dividers, share widgets, the TOC and the sidebar around it."""
    dropped = []
    for el in soup.find_all(attrs={"data-widget_type": CHROME_WIDGETS}):
        if el.decomposed:
            continue
        if widget_type(el).startswith("table-of-contents."):
            dropped.append(("toc", text_of(el)))
        el.decompose()

    def is_toc_list(el: Tag) -> bool:
        if not widget_type(el).startswith("icon-list."):
            return False
        links = el.find_all("a")
        return bool(links) and all(not (a.get("href") or "").strip() or a["href"].strip().startswith("#") for a in links)

    for toc in soup.find_all(is_toc_list):
        if toc.decomposed:
            continue
        # Climb to the sidebar column: the largest ancestor that is still a
        # small fraction of the article.
        node = toc
        while (
            isinstance(node.parent, Tag)
            and node.parent.name != "[document]"
            and word_count(node.parent.get_text(" ")) < 0.15 * total_words
        ):
            node = node.parent
        dropped.append(("sidebar", text_of(node)))
        node.decompose()

    for h in soup.find_all(HEADING_RE):
        if not h.decomposed and TOC_HEADING.match(text_of(h)):
            dropped.append(("toc heading", text_of(h)))
            outer_widget(h).decompose()

    # Elementor button widgets: keep real links, drop dead ones.
    for el in soup.find_all(attrs={"data-widget_type": re.compile(r"^button\.")}):
        if el.decomposed:
            continue
        a = el.find("a", href=True)
        label = text_of(el.find(class_="elementor-button-text") or el)
        if a and rewrite_href(ctx, slug, a["href"]) and label:
            p = soup.new_tag("p")
            link = soup.new_tag("a", href=a["href"])
            link.string = label
            p.append(link)
            el.replace_with(p)
        else:
            dropped.append(("button", label))
            el.decompose()
    for kind, text in dropped:
        ctx.log(f"dropped {kind}: {text[:160]}")
    return dropped


def find_main_column(soup, total_words: int):
    best, best_depth = None, -1
    for el in soup.find_all(is_container):
        if word_count(el.get_text(" ")) >= 0.6 * total_words:
            depth = len(list(el.parents))
            if depth > best_depth:
                best, best_depth = el, depth
    return best


def find_lead_image(main) -> Tag | None:
    if main is None:
        return None
    for node in main.descendants:
        if isinstance(node, Comment):
            continue
        if isinstance(node, NavigableString):
            if plain(str(node)):
                return None
        elif isinstance(node, Tag) and node.name == "img":
            return node
    return None


def image_candidates(img: Tag) -> list:
    src = img.get("src", "")
    return [original_upload_url(src), *parse_srcset(img.get("srcset", "")), src]


def displayed_ratio(img: Tag) -> float | None:
    try:
        w, h = int(img.get("width", 0)), int(img.get("height", 0))
    except ValueError:
        return None
    return (w / h) if w > 0 and h > 0 else None


def convert_accordions(soup) -> int:
    count = 0
    for acc in soup.find_all(class_="elementskit-accordion"):
        if acc.decomposed:
            continue
        nodes = []
        for card in acc.find_all(class_="elementskit-card"):
            title_el = card.find(class_="ekit-accordion-title") or card.find(class_="elementskit-card-header")
            body = card.find(class_="elementskit-card-body")
            question = text_of(title_el) if title_el else ""
            if question:
                h3 = soup.new_tag("h3")
                h3["data-mh-role"] = "h3"
                h3.string = question
                nodes.append(h3)
                count += 1
            if body:
                nodes.extend(child.extract() for child in list(body.contents))
        target = outer_widget(acc)
        for node in nodes:
            target.insert_before(node)
        target.decompose()
    return count


def convert_icon_lists(ctx: Context, soup, slug: str) -> int:
    count = 0
    for ul in soup.find_all("ul", class_="elementor-icon-list-items"):
        new_ul = soup.new_tag("ul")
        for item in ul.find_all("li", class_="elementor-icon-list-item"):
            text_el = item.find(class_="elementor-icon-list-text") or item
            label = text_of(text_el)
            if not label:
                continue
            li = soup.new_tag("li")
            a = item.find("a", href=True)
            if a and rewrite_href(ctx, slug, a["href"]):
                link = soup.new_tag("a", href=a["href"])
                link.string = label
                li.append(link)
            else:
                li.string = label
            new_ul.append(li)
        ul.replace_with(new_ul)
        count += 1
    return count


def clean_blockquotes(soup) -> None:
    for el in soup.find_all(class_="elementor-blockquote__tweet-button"):
        el.decompose()
    for cite in soup.find_all(class_="elementor-blockquote__author"):
        p = soup.new_tag("p")
        p.string = f"— {text_of(cite)}"
        cite.replace_with(p)


def classify_headings(soup, header) -> None:
    """Tag each heading with the role it gets in the output (data-mh-role)."""
    for h in soup.find_all(HEADING_RE):
        if h.get("data-mh-role"):
            continue
        level = int(h.name[1])
        classes = h.get("class") or []
        if header is not None and any(parent is header for parent in h.parents):
            role = "dek"  # subtitle in the post header -> plain paragraph
        elif h.find_parent(["td", "th"]) or "callout-label" in classes or cta_heading(h):
            role = "label"  # decorative label -> <p><strong>
        elif level <= 2:
            role = "h2"
        elif level <= 4:
            role = "h3"
        else:
            role = "sub"  # h5/h6 sub-label -> h4 (h3 when not under an h3)
        h["data-mh-role"] = role


def cta_heading(h: Tag) -> bool:
    """A heading directly followed (within 2 siblings) by a <button> CTA."""
    sib = h
    for _ in range(2):
        sib = sib.find_next_sibling()
        if sib is None or HEADING_RE.match(sib.name or ""):
            return False
        if sib.name == "button" or sib.find("button"):
            return True
    return False


def flatten_cta_tables(soup) -> list:
    """One-cell tables are CTA boxes, not data: keep their content as paragraphs."""
    flattened = []
    for table in soup.find_all("table"):
        if table.decomposed:
            continue
        cells = table.find_all(["td", "th"])
        if len(cells) == 1:
            flattened.append(text_of(cells[0])[:80])
            for child in list(cells[0].contents):
                table.insert_before(child.extract())
            table.decompose()
    return flattened


def unwrap_wrapper_lists(soup) -> int:
    """<ol><li> wrapped around a whole section (Google Docs paste) -> unwrap."""
    count = 0
    changed = True
    while changed:
        changed = False
        for lst in soup.find_all(["ol", "ul"]):
            items = lst.find_all("li", recursive=False)
            if len(items) != 1:
                continue
            blocks = [c for c in items[0].children if isinstance(c, Tag) and c.name in BLOCK_TAGS]
            has_heading = any(HEADING_RE.match(c.name) or c.name == "table" for c in blocks)
            if has_heading or len([c for c in blocks if c.name == "p"]) >= 2:
                items[0].unwrap()
                lst.unwrap()
                count += 1
                changed = True
                break
    return count


def sanitize(soup, root: Tag) -> set:
    """Allowlist tags/attributes; returns names of unwrapped unknown tags."""
    unknown = set()
    for comment in root.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()
    # Reverse document order: every element is handled after its descendants.
    for el in reversed(root.find_all(True)):
        if el.decomposed:
            continue
        name = el.name
        classes = " ".join(el.get("class") or [])
        if name in DROP_TAGS and not (name == "button" and el.find_parent("a")):
            el.decompose()
            continue
        if name == "button":  # <a href><button>Label</button></a>: keep the label
            el.unwrap()
            continue
        if name == "i" and re.search(r"\b(icon|fa|fas|far|fab|eicon)\b|icon-", classes):
            el.decompose()
            continue
        if name == "b":
            el.name = name = "strong"
        elif name == "i":
            el.name = name = "em"
        if HEADING_RE.match(name):
            name = apply_heading_role(soup, el)
            continue
        if name not in ALLOWED_TAGS or name == "div":
            if name not in {"div", "span", "section", "article", "header", "footer", "aside", "main", "font", "u", "sup", "sub"}:
                unknown.add(name)
            el.unwrap()
            continue
        keep = {}
        if name == "a" and el.get("href") is not None:
            keep["href"] = el["href"]
        elif name in ("td", "th"):
            for attr in ("colspan", "rowspan"):
                value = str(el.get(attr, "")).strip()
                if value.isdigit() and int(value) > 1:
                    keep[attr] = value
        elif name == "img":
            keep = {k: el[k] for k in ("src", "alt", "width", "height", "srcset") if el.get(k) is not None}
        el.attrs = keep
    return unknown


def apply_heading_role(soup, h: Tag) -> str:
    role = h.get("data-mh-role") or ("h2" if h.name in ("h1", "h2") else "h3" if h.name in ("h3", "h4") else "sub")
    h.attrs = {}
    if role in ("dek", "label"):
        h.name = "p"
        meaningful = [c for c in h.contents if not (isinstance(c, NavigableString) and not plain(str(c)))]
        already_bold = len(meaningful) == 1 and isinstance(meaningful[0], Tag) and meaningful[0].name in ("strong", "b")
        if role == "label" and not already_bold and plain(h.get_text()):
            strong = soup.new_tag("strong")
            for child in list(h.contents):
                strong.append(child.extract())
            h.append(strong)
        return "p"
    h.name = {"h2": "h2", "h3": "h3", "sub": "h4"}[role]
    if role == "sub":
        h["data-mh-sub"] = "1"  # resolved (and removed) in normalize_heading_levels
    # <h3><strong>Text</strong></h3> -> <h3>Text</h3>
    meaningful = [c for c in h.contents if not (isinstance(c, NavigableString) and not plain(str(c)))]
    if len(meaningful) == 1 and isinstance(meaningful[0], Tag) and meaningful[0].name in ("strong", "b"):
        meaningful[0].unwrap()
    return h.name


def is_bold_cell(cell: Tag) -> bool:
    if cell.name == "th":
        return True
    text = plain(cell.get_text())
    if not text:
        return True
    bold = "".join(s.get_text() for s in cell.find_all(["strong", "b"]) if not s.find_parent(["strong", "b"]))
    return plain(bold) == text


def unwrap_single_paragraph(cell: Tag) -> None:
    children = [c for c in cell.contents if not (isinstance(c, NavigableString) and not plain(str(c)))]
    if len(children) == 1 and isinstance(children[0], Tag) and children[0].name == "p":
        children[0].unwrap()


def normalize_tables(soup) -> list:
    report = []
    for table in soup.find_all("table"):
        rows = table.find_all("tr")
        head_rows = [r for r in rows if r.find_parent("thead") is not None]
        source = "thead"
        if not head_rows and len(rows) >= 2:
            first = rows[0].find_all(["td", "th"], recursive=False)
            second = rows[1].find_all(["td", "th"], recursive=False)
            if any(plain(c.get_text()) for c in first) and all(is_bold_cell(c) for c in first) and not all(is_bold_cell(c) for c in second):
                head_rows = [rows[0]]
                source = "first row"
        new_table = soup.new_tag("table")
        if head_rows:
            thead = soup.new_tag("thead")
            for row in head_rows:
                for cell in row.find_all(["td", "th"], recursive=False):
                    cell.name = "th"
                    unwrap_single_paragraph(cell)
                    meaningful = [c for c in cell.contents if not (isinstance(c, NavigableString) and not plain(str(c)))]
                    if len(meaningful) == 1 and isinstance(meaningful[0], Tag) and meaningful[0].name == "strong":
                        meaningful[0].unwrap()
                thead.append(row.extract())
            new_table.append(thead)
        tbody = soup.new_tag("tbody")
        for row in rows:
            if any(row is head for head in head_rows):
                continue
            for cell in row.find_all(["td", "th"], recursive=False):
                unwrap_single_paragraph(cell)
            tbody.append(row.extract())
        new_table.append(tbody)
        wrapper = soup.new_tag("div")
        wrapper["class"] = "table-scroll"
        wrapper.append(new_table)
        table.replace_with(wrapper)
        report.append(f"{len(rows)} rows, header from {source if head_rows else 'none'}")
    return report


def normalize_whitespace(root: Tag) -> None:
    for s in list(root.find_all(string=True)):
        collapsed = WS_RE.sub(" ", ZERO_WIDTH_RE.sub("", str(s)))
        if collapsed != str(s):
            s.replace_with(NavigableString(collapsed))

    # "<a> text </a>" -> " <a>text</a> ": keep the space, outside the element.
    for el in reversed(root.find_all(["a", "strong", "em", "code"])):
        texts = el.find_all(string=True)
        if texts and str(texts[0]).startswith(" "):
            texts[0].replace_with(NavigableString(str(texts[0]).lstrip(" ")))
            el.insert_before(NavigableString(" "))
        texts = el.find_all(string=True)
        if texts and str(texts[-1]).endswith(" "):
            texts[-1].replace_with(NavigableString(str(texts[-1]).rstrip(" ")))
            el.insert_after(NavigableString(" "))

    def walk(el: Tag, state: dict) -> None:
        for child in list(el.children):
            if isinstance(child, NavigableString):
                text = str(child)
                if state["start"] or state["space"]:
                    text = text.lstrip(" ")
                if not text:
                    child.extract()
                    continue
                if text != str(child):
                    new = NavigableString(text)
                    child.replace_with(new)
                    child = new
                state.update(start=False, space=text.endswith(" "), last=child)
            elif child.name in BLOCK_TAGS:
                end_run(state)
                walk(child, fresh())
                state.update(fresh())
            elif child.name == "br":
                end_run(state)
                state.update(start=True, space=False, last=None)
            elif child.name == "img":
                state.update(start=False, space=False, last=None)
            else:
                walk(child, state)
        if el.name in BLOCK_TAGS or el is root:
            end_run(state)

    def fresh() -> dict:
        return {"start": True, "space": False, "last": None}

    def end_run(state: dict) -> None:
        last = state.get("last")
        if last is not None and str(last).endswith(" "):
            trimmed = str(last).rstrip(" ")
            if trimmed:
                new = NavigableString(trimmed)
                last.replace_with(new)
            else:
                last.extract()
        state["last"] = None

    walk(root, fresh())


def remove_empty(root: Tag) -> int:
    removed = 0
    changed = True
    while changed:
        changed = False
        for el in reversed(root.find_all(True)):
            if el.decomposed:
                continue
            if el.name == "br":
                # Leading/trailing <br> in a block is spacing, not content.
                parent = el.parent
                siblings = [c for c in parent.contents if not (isinstance(c, NavigableString) and not str(c).strip())]
                if siblings and (siblings[0] is el or siblings[-1] is el):
                    el.decompose()
                    removed += 1
                    changed = True
                continue
            if el.name in REMOVE_IF_EMPTY and not plain(el.get_text()) and el.find("img") is None:
                el.decompose()
                removed += 1
                changed = True
    return removed


def wrap_top_level_inline(soup, root: Tag) -> None:
    run = []

    def flush():
        if any(plain(n.get_text() if isinstance(n, Tag) else str(n)) for n in run):
            p = soup.new_tag("p")
            run[0].insert_before(p)
            for n in run:
                p.append(n.extract())
        else:
            for n in run:
                n.extract()
        run.clear()

    for child in list(root.children):
        if isinstance(child, Tag) and child.name in TOP_LEVEL_BLOCKS:
            if run:
                flush()
        else:
            run.append(child)
    if run:
        flush()


def normalize_heading_levels(root: Tag) -> tuple:
    """Resolve sub-label levels, never skip a level, give every h2 a unique id.

    h5/h6 sub-labels become h4 when they follow an h3 in the same h2 section,
    otherwise h3 (they are then the first level under the h2). Any heading that
    would still skip a level (e.g. an h3 before the first h2) is raised.
    """
    changes = []
    previous = 1  # the page's own <h1> is the post title
    section_has_h3 = False
    used = set()
    toc = []
    for h in root.find_all(["h2", "h3", "h4"]):
        level = int(h.name[1])
        is_sub = h.attrs.pop("data-mh-sub", None) is not None
        if level == 2:
            section_has_h3 = False
        if is_sub:
            target = 4 if section_has_h3 else 3
        else:
            target = level
            if level == 3:
                section_has_h3 = True
        target = min(target, previous + 1)
        if target != level:
            if not (is_sub and target == 3):
                changes.append(f"h{level}->h{target} {text_of(h)!r}")
            h.name = f"h{target}"
        previous = target
        if h.name == "h2":
            base = slugify(text_of(h))
            ident, n = base, 2
            while ident in used:
                ident, n = f"{base}-{n}", n + 1
            used.add(ident)
            h.attrs = {"id": ident}
            toc.append({"id": ident, "text": text_of(h)})
    return toc, changes


def escape_text(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def escape_attr(text: str) -> str:
    return escape_text(text).replace('"', "&quot;")


def serialize(node) -> str:
    if isinstance(node, NavigableString):
        return escape_text(str(node))
    attrs = "".join(f' {k}="{escape_attr(str(v if not isinstance(v, list) else " ".join(v)))}"' for k, v in node.attrs.items())
    if node.name in VOID_TAGS:
        return f"<{node.name}{attrs}>"
    return f"<{node.name}{attrs}>" + "".join(serialize(c) for c in node.children) + f"</{node.name}>"


# --------------------------------------------------------------------------
# Post conversion
# --------------------------------------------------------------------------

def short_name_for(slug: str) -> str:
    if slug in SHORT_NAMES:
        return SHORT_NAMES[slug]
    words = [w for w in re.split(r"[^a-z0-9]+", slug.lower()) if w]
    stop = {"how", "to", "why", "what", "the", "a", "an", "from", "is", "your", "you"}
    while words and words[0] in stop:
        words.pop(0)
    return "-".join(words[:4]) or "post"


def auto_copy(text: str, low: int, high: int) -> str:
    sentences = re.split(r"(?<=[.!?])\s+", plain(text))
    out = ""
    for sentence in sentences:
        candidate = f"{out} {sentence}".strip()
        if len(candidate) > high:
            break
        out = candidate
        if len(out) >= low:
            return out
    clipped = plain(text)[: high - 1].rsplit(" ", 1)[0].rstrip(",;:")
    return clipped + "…"


def convert_post(ctx: Context, post: dict) -> dict:
    slug = post["slug"]
    if not re.fullmatch(r"[a-z0-9_-]+", slug):
        raise ConversionError(f"unexpected slug: {slug!r}")
    print(f"- {slug}")
    notes = []
    soup = BeautifulSoup(post["content"]["rendered"], "html.parser")
    total_words = word_count(soup.get_text(" "))

    # 1. Template chrome.
    header = remove_template_headings(ctx, soup, post, slug)
    dropped = remove_chrome(ctx, soup, slug, total_words)
    if any(kind == "sidebar" for kind, _ in dropped):
        notes.append("dropped sidebar (in-body TOC + 'See it live' demo CTA)")

    # 2. Featured image and lead image.
    short = short_name_for(slug)
    main = find_main_column(soup, total_words)
    lead = find_lead_image(main)
    media = ctx.media.get(post.get("featured_media"))
    featured_url = media["source_url"] if media else None
    featured_ratio = None
    if media and media.get("media_details", {}).get("width"):
        featured_ratio = media["media_details"]["width"] / media["media_details"]["height"]
    if lead is not None:
        same = featured_url and upload_key(lead.get("src", "")) == upload_key(featured_url)
        if post.get("featured_media") == SHARED_FEATURED_MEDIA and not same:
            notes.append(f"shared featured image {SHARED_FEATURED_MEDIA} replaced by the post's own lead image")
            candidates, ratio, wp_alt = image_candidates(lead), displayed_ratio(lead), lead.get("alt", "")
            lead.decompose()
        elif same:
            notes.append("lead image duplicates the featured image: removed from the body")
            candidates, ratio, wp_alt = [featured_url, *image_candidates(lead)], featured_ratio, (media or {}).get("alt_text", "")
            lead.decompose()
        else:
            ctx.warn(slug, "lead image differs from the featured image; kept in the body")
            candidates, ratio, wp_alt = [featured_url], featured_ratio, (media or {}).get("alt_text", "")
    elif media:
        candidates, ratio, wp_alt = [featured_url], featured_ratio, media.get("alt_text", "")
    else:
        raise ConversionError(f"{slug}: no featured image and no lead image")
    if post.get("featured_media") == SHARED_FEATURED_MEDIA and lead is None:
        notes.append(f"no lead image in the body: reusing shared featured image {SHARED_FEATURED_MEDIA}")
    cover_url, cover_data = pick_source(ctx, slug, candidates, ratio)
    cover_src, cover_w, cover_h = write_web_image(ctx, cover_data, f"{short}-cover", cover_url)
    image = {"src": cover_src, "width": cover_w, "height": cover_h, "alt": alt_for(ctx, slug, cover_url, wp_alt)}

    # 3. Widgets and paste artefacts (needs the Elementor markup).
    faq = convert_accordions(soup)
    if faq:
        notes.append(f"{faq} accordion items -> h3 + answer")
    if convert_icon_lists(ctx, soup, slug):
        notes.append("icon list(s) -> ul")
    clean_blockquotes(soup)
    classify_headings(soup, header)
    labels = [text_of(h) for h in soup.find_all(HEADING_RE) if h.get("data-mh-role") == "label"]
    if labels:
        notes.append("decorative headings -> <p><strong>: " + "; ".join(labels))
    deks = [text_of(h) for h in soup.find_all(HEADING_RE) if h.get("data-mh-role") == "dek"]
    if deks:
        notes.append("subtitle heading in the post header -> paragraph: " + "; ".join(deks))
    subs = [h for h in soup.find_all(HEADING_RE) if h.get("data-mh-role") == "sub"]
    if subs:
        notes.append(f"{len(subs)} h5/h6 sub-labels -> h4 (h3 where no h3 precedes them)")
    ctas = flatten_cta_tables(soup)
    if ctas:
        notes.append("one-cell CTA tables flattened to paragraphs: " + "; ".join(ctas))
    wrappers = unwrap_wrapper_lists(soup)
    if wrappers:
        notes.append(f"{wrappers} section-wrapping <ol><li> unwrapped")
    if soup.find("button"):
        notes.append("<button> labels inside links kept as link text")

    # 4. Allowlist.
    root = soup.new_tag("article")
    for child in list(soup.contents):
        root.append(child.extract())
    soup.append(root)
    unknown = sanitize(soup, root)
    if unknown:
        ctx.warn(slug, f"unwrapped unexpected tags: {sorted(unknown)}")

    # 5. Links.
    rewritten = {}
    for a in root.find_all("a"):
        old = a.get("href", "")
        new = rewrite_href(ctx, slug, old)
        if new is None:
            a.unwrap()
            continue
        a.attrs = {"href": new}
        if new != old:
            rewritten[old] = new

    # 6. Inline images.
    inline_index = 0
    by_source = {}
    for img in root.find_all("img"):
        src = img.get("src", "")
        source_url, data = pick_source(ctx, slug, image_candidates(img), displayed_ratio(img))
        if source_url not in by_source:
            inline_index += 1
            by_source[source_url] = write_web_image(ctx, data, f"{short}-{inline_index}", source_url)
        public_src, w, h = by_source[source_url]
        img.attrs = {
            "src": public_src,
            "alt": alt_for(ctx, slug, source_url, img.get("alt", "")),
            "width": str(w),
            "height": str(h),
            "loading": "lazy",
            "decoding": "async",
        }
        parent = img.parent
        if parent.name == "a":
            parent.unwrap()
            parent = img.parent
        siblings = [c for c in parent.contents if not (isinstance(c, NavigableString) and not plain(str(c)))]
        if parent.name == "p" and siblings == [img]:
            parent.name = "figure"
        elif parent is root:
            figure = soup.new_tag("figure")
            img.wrap(figure)
        ctx.log(f"inline image {src} -> {public_src}")

    # 7. Tables, whitespace, empty elements, headings.
    tables = normalize_tables(soup)
    normalize_whitespace(root)
    remove_empty(root)
    normalize_whitespace(root)
    wrap_top_level_inline(soup, root)
    toc, level_changes = normalize_heading_levels(root)
    if level_changes:
        notes.append("heading levels adjusted to avoid skips: " + "; ".join(level_changes))

    body = "\n".join(serialize(c) for c in root.children if not (isinstance(c, NavigableString) and not str(c).strip()))
    text = root.get_text(" ")
    words = word_count(text)

    # 8. Metadata.
    title = plain(strip_html(post["title"]["rendered"]))
    category_ids = [c for c in post.get("categories", []) if c in ctx.categories and ctx.categories[c]["slug"] != "uncategorized"]
    category = ctx.categories[category_ids[0]] if category_ids else {"name": "Blog", "slug": "blog"}
    if slug in COPY:
        description, excerpt = COPY[slug]
    else:
        first_paragraphs = " ".join(text_of(p) for p in root.find_all("p")[:3])
        description, excerpt = auto_copy(first_paragraphs, 120, 160), auto_copy(first_paragraphs, 100, 220)
        ctx.warn(slug, "description/excerpt generated automatically; add hand-written copy to COPY")
    if not 120 <= len(description) <= 160:
        ctx.warn(slug, f"description is {len(description)} chars (want 120-160)")
    if len(excerpt) > 230:
        ctx.warn(slug, f"excerpt is {len(excerpt)} chars (want <= ~220)")

    return {
        "slug": slug,
        "title": title,
        "description": description,
        "excerpt": excerpt,
        "date": post["date"][:10],
        "modified": post["modified"][:10],
        "category": plain(html.unescape(category["name"])),
        "categorySlug": category["slug"],
        "image": image,
        "readingMinutes": max(1, math.ceil(words / WORDS_PER_MINUTE)),
        "toc": toc,
        "html": body,
        "_report": {
            "words": words,
            "notes": notes,
            "tables": tables,
            "links": rewritten,
            "inline_images": {v[0]: k for k, v in by_source.items()},
            "cover_source": cover_url,
        },
    }


def load_json(path: Path):
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("input_dir", type=Path, help="directory with posts.json, cats.json and media.json")
    parser.add_argument("--cache-dir", type=Path, help="where downloaded originals are cached (default: <input-dir>/image-cache)")
    parser.add_argument("--prune", action="store_true", help="delete files in public/blog/images that this run did not produce")
    parser.add_argument("--verbose", action="store_true", help="log dropped chrome and image decisions")
    args = parser.parse_args()

    input_dir = args.input_dir.resolve()
    posts = load_json(input_dir / "posts.json")
    categories = {c["id"]: c for c in load_json(input_dir / "cats.json")}
    media = {m["id"]: m for m in load_json(input_dir / "media.json")}
    ctx = Context(
        input_dir=input_dir,
        cache_dir=(args.cache_dir or input_dir / "image-cache").resolve(),
        categories=categories,
        media=media,
        slugs={p["slug"] for p in posts},
        post_ids={p["id"]: p["slug"] for p in posts},
        verbose=args.verbose,
        use_webp=features.check("webp"),
    )
    if not ctx.use_webp:
        print("Pillow has no WebP support: writing JPEG (quality 82) instead.", file=sys.stderr)

    posts = sorted(posts, key=lambda p: (p["date"], p["id"]), reverse=True)
    converted = [convert_post(ctx, p) for p in posts if p.get("status", "publish") == "publish"]

    reports = {c["slug"]: c.pop("_report") for c in converted}
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(converted, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    stale = sorted(f.name for f in OUT_IMAGES.iterdir() if f.is_file() and f.name not in ctx.written_images) if OUT_IMAGES.exists() else []
    if stale and args.prune:
        for name in stale:
            (OUT_IMAGES / name).unlink()
        print(f"Pruned {len(stale)} stale image(s): {', '.join(stale)}")
    elif stale:
        print(f"Not produced by this run (use --prune to delete): {', '.join(stale)}")

    print(f"\nWrote {len(converted)} posts to {OUT_JSON.relative_to(REPO_ROOT)} and {len(ctx.written_images)} images to {OUT_IMAGES.relative_to(REPO_ROOT)}/")
    for post in converted:
        r = reports[post["slug"]]
        print(f"\n{post['slug']}\n  {r['words']} words, {post['readingMinutes']} min, {len(post['toc'])} toc entries, cover {post['image']['src']} <- {r['cover_source']}")
        for note in r["notes"]:
            print(f"  * {note}")
        for table in r["tables"]:
            print(f"  table: {table}")
        for old, new in r["links"].items():
            print(f"  link: {old} -> {new}")
        for new, old in r["inline_images"].items():
            print(f"  image: {old} -> {new}")
    if ctx.warnings:
        print(f"\n{len(ctx.warnings)} warning(s):")
        for w in ctx.warnings:
            print(f"  - {w}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except ConversionError as err:
        sys.exit(f"error: {err}")
