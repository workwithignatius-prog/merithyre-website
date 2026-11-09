# MeritHyre website

Marketing site for [merithyre.ai](https://merithyre.ai): AI-native recruitment automation.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript · Bricolage Grotesque + Geist fonts · Lucide icons.
Every page is statically prerendered.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes static)
npm run start      # serve the production build
npm run lint
```

Requires Node 20.9+.

## Pages

| URL | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/pricing/` | `src/app/pricing/page.tsx` |
| `/staffing/` · `/smbs-midmarket/` · `/enterprise/` · `/startups/` | `src/app/<slug>/page.tsx` → shared `src/components/solutions/solution-page.tsx` |
| `/about-us/` | `src/app/about-us/page.tsx` |
| `/contact-us/` | `src/app/contact-us/page.tsx` |
| `/blog/` | `src/app/blog/page.tsx` |
| `/blog/<slug>/` | `src/app/blog/[slug]/page.tsx` (one page per post in `src/content/blog/posts.json`) |

URLs (with trailing slashes) match the current WordPress site, so existing links and search rankings carry over.
Redirects (in `next.config.ts`, normal builds only):
- `/merithyre-lp-staffing/` (a 404 on the old site) → `/staffing/`
- WordPress served posts at the root (`/<slug>/`); each one now 301s to `/blog/<slug>/`
- `/category/…`, `/tag/…`, `/author/…` → `/blog/`, and `/feed/` → `/rss.xml`

## Editing copy

All copy lives in `src/content/`, separate from layout:

- `site.ts`: contact details, socials, blog/legal URLs, regulations, integrations
- `segments.ts`: everything on the four use-case pages (hero, stats, before/after, quotes)
- `pricing.ts`: plans, features, pricing FAQ
- `pipeline.ts`: the 7 stages
- `usps.ts`: the six "Why MeritHyre" differentiators on the homepage
- `testimonials.ts`, `about.ts`, `navigation.ts`

## Blog

The 12 posts from the WordPress site were migrated into `src/content/blog/posts.json` (sanitised HTML,
table of contents, reading time) with their images converted to WebP in `public/blog/images/`.

- **Re-import from WordPress:** `scripts/import-wordpress-posts.py` (requirements are listed at the top of the script).
  Hand-made corrections live in the script's `EDITORIAL` and `RETOUCH` tables, so a re-import keeps them: a fixed title,
  two swapped charts, in-body calls to action pointed at the demo/pricing pages, and the "Read the Full Blog" button
  removed from the time-to-hire cover artwork.
- **Add or edit a post:** edit `posts.json` (keep the same fields). The page, sitemap entry, RSS item and
  structured data are generated from it.
- Body HTML is restricted to headings, paragraphs, lists, links, quotes, tables and images, and is styled by `.article`
  in `globals.css` (the light reading sheet).

## Design system

Defined in `src/app/globals.css` (Tailwind v4 `@theme`).

- **Canvas** `#09090a`: a warm near-black with plain panels and hairline borders. No grid meshes, frame lines, glowing pills or gradient-filled text.
- **Light:** heroes sit on `bg-hero` (split layouts) or `bg-hero-center` (centred): a deep-green sky that brightens toward the product, with teal and a sunrise-amber glow, fading into the canvas. Stats sit on the hero as frosted glass (`<Stats>`).
- **Paper sections:** a warm off-white sheet (`bg-paper`, ink text) gives the page bright moments: the "Why MeritHyre" USPs, customer quotes and the blog reading sheet. Use `tone="light"` on `SectionHeading`/`Quotes` there, and the `ink` button variant.
- **Section rhythm:** sections are told apart by their surfaces, not by divider lines. Homepage order: lit hero (with logos and stats), USP paper sheet, the "How it works" stage, product cards, solutions, quotes on paper, the founders' letter card, compliance, latest blog posts, CTA band.
- **Brand green** `mh-*` is the logo green `#166534`, pushed luminous (`#34e39c`) for dark UI.
- **Amber** `sun-*` is reserved for moments where a **person** decides (shortlist gate, approvals, "held for review"). Green means the AI runs that stage.
- **Gradient** appears in deliberate places:
  - `bg-hero` / `bg-hero-center`: the hero light described above.
  - `bg-backdrop`: the green → teal → sunrise-amber card (featured quote, CTA band, small product moments).
  - `<Swash>`: the hand-drawn underline that runs from green (AI) to amber (human).
- **Type:** Bricolage Grotesque for headlines (`font-display`, in `src/fonts/`, OFL) and Geist for UI and body. Both are local files, so builds work offline.
- **Motion:** CSS-first. Covers the announcement marquee, the demo preview, the underline draw-in and scroll reveals (`animation-timeline: view()`, progressive enhancement). Everything respects `prefers-reduced-motion`.

## Homepage demo video

The hero's right side is a product-demo video slot (`src/components/home/demo-stage.tsx`).
- **Until there's a video:** it plays a silent 4-step product preview with chapter chips and a pause button. "Watch the product demo" opens a "coming soon, book a live demo" dialog.
- **To use a real video:** set **one** value in `src/content/site.ts` → `demoVideo`. Use `src` for an MP4/WebM file (e.g. `/demo.mp4` in `public/`) or `embedUrl` for a YouTube, Vimeo or Loom embed link.

The scrolling announcement bar is in `src/components/layout/announcement.tsx`.

## Contact form

`src/components/contact/contact-form.tsx` validates on the client.
- To deliver submissions, set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a URL that accepts a JSON POST (HubSpot, Formspree, your own API). See `.env.example`.
- Without it, the form shows the success state only.
- `?topic=demo&plan=smb` in the URL pre-selects the topic and pre-fills the message. Every "Book a demo" button uses this.

## SEO

- Per-page title, description, canonical, Open Graph and Twitter cards (`src/lib/metadata.ts`). Blog posts add
  `og:type=article` with published/modified dates and their own share image.
- `public/og.png` share image, `public/logo.png` (512 px, used as the Organization logo) and `src/app/apple-icon.png`.
- `public/sitemap.xml` and `public/rss.xml` are generated from the routes and `posts.json` by
  `scripts/generate-seo-files.mjs`, which runs automatically before every build (`prebuild`). New top-level pages go in
  that script's `pages` list. `public/robots.txt` points crawlers at the sitemap.
- Structured data (JSON-LD, helpers in `src/lib/schema.ts`): Organization, WebSite, WebPage and SoftwareApplication (offers,
  feature list) on `/`; FAQPage on `/pricing/`; AboutPage and ContactPage; a Service per use-case page; Blog on `/blog/`;
  BlogPosting on every post; BreadcrumbList on every inner page.
- Old WordPress post URLs 301 to their new `/blog/` addresses (see Pages above).

## Temporary preview on GitHub Pages

```bash
npm run deploy:pages
```

This builds a static export and force-pushes it to the `gh-pages` branch. That branch holds build output only.

- The build sets `GITHUB_PAGES=true`, which serves the site under `/merithyre-website/`, adds noindex tags and turns off redirects.
- **One-time setup:** go to Settings → Pages → Build and deployment. Set Source to **Deploy from a branch** and Branch to **gh-pages** with folder **/ (root)**.
- **URL:** https://workwithignatius-prog.github.io/merithyre-website/
- Pages on a **private** repo needs a paid GitHub plan (Pro or Team). On the Free plan the repo must be public.
- The Pages site itself is visible to anyone with the link. The noindex tags keep it out of search engines.

## Deploy

Vercel is the zero-config option: import the repo and deploy. Any Node host works with `npm run build && npm run start`.

## Before launch

1. **Testimonials:** all quotes are carried over word-for-word from the current site. Confirm each named customer, then add logos and names where allowed.
2. **Legal pages:** Privacy and Terms still link to the WordPress URLs (`privacyUrl`, `termsUrl`). Move them over (or keep WordPress on a subdomain) before this site replaces merithyre.ai. The blog has been migrated.
3. **Search Console:** after launch, submit `https://merithyre.ai/sitemap.xml` and check that the old post URLs report as redirects.
4. **Compliance wording:** "Built for NYC LL144 · EEOC · FEHA · EU AI Act". Have counsel approve it.
5. **Product visuals** are illustrative HTML mockups (sample names, labelled as sample data). Add the real demo video via `demoVideo` (above) when it's ready.
6. **Form:** set `NEXT_PUBLIC_CONTACT_ENDPOINT`.
