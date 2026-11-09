// Writes public/sitemap.xml and public/rss.xml from the site's routes and blog posts.
// Runs automatically before `npm run build` (see "prebuild" in package.json) and in
// scripts/deploy-pages.sh. Plain files keep both builds static (no route handlers).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://merithyre.ai";

const posts = JSON.parse(readFileSync(join(root, "src/content/blog/posts.json"), "utf8")).sort((a, b) =>
  b.date.localeCompare(a.date),
);
const today = new Date().toISOString().slice(0, 10);
const latestPost = posts[0]?.modified ?? today;

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/pricing/", priority: "0.9", changefreq: "monthly" },
  { path: "/staffing/", priority: "0.8", changefreq: "monthly" },
  { path: "/smbs-midmarket/", priority: "0.8", changefreq: "monthly" },
  { path: "/enterprise/", priority: "0.8", changefreq: "monthly" },
  { path: "/startups/", priority: "0.8", changefreq: "monthly" },
  { path: "/about-us/", priority: "0.6", changefreq: "yearly" },
  { path: "/contact-us/", priority: "0.6", changefreq: "yearly" },
  { path: "/blog/", priority: "0.7", changefreq: "weekly", lastmod: latestPost },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = (path) => `${SITE}${path}`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
  ...pages.map((p) => ({ loc: url(p.path), lastmod: p.lastmod ?? today, changefreq: p.changefreq, priority: p.priority })),
  ...posts.map((p) => ({ loc: url(`/blog/${p.slug}/`), lastmod: p.modified, changefreq: "monthly", priority: "0.6" })),
]
  .map(
    (u) => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MeritHyre Blog</title>
    <link>${url("/blog/")}</link>
    <description>Practical guides on AI recruiting, structured interviews, compliance and staffing workflows from the MeritHyre team.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(latestPost)}</lastBuildDate>
    <atom:link href="${url("/rss.xml")}" rel="self" type="application/rss+xml" />
${posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${url(`/blog/${p.slug}/`)}</link>
      <guid isPermaLink="true">${url(`/blog/${p.slug}/`)}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(join(root, "public/sitemap.xml"), sitemap);
writeFileSync(join(root, "public/rss.xml"), rss);
console.log(`SEO files: sitemap.xml (${pages.length + posts.length} URLs), rss.xml (${posts.length} posts)`);
