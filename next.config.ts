import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true builds a static export for the temporary GitHub Pages preview
 * (served under /merithyre-website/). Normal builds (Vercel / `next start`) are unaffected.
 */
const isPagesPreview = process.env.GITHUB_PAGES === "true";
const basePath = isPagesPreview ? "/merithyre-website" : "";

/** Blog slugs, for redirecting the old WordPress post URLs (they lived at the site root). */
function blogSlugs(): string[] {
  try {
    const posts = JSON.parse(readFileSync(join(process.cwd(), "src/content/blog/posts.json"), "utf8")) as { slug: string }[];
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  // Partial prerendering can't run in a static export, so the Pages preview opts out.
  // (Every page here is fully static either way.)
  cacheComponents: !isPagesPreview,
  partialPrefetching: !isPagesPreview,
  // Match the existing WordPress URLs (/pricing/, /staffing/ …) so links and SEO carry over.
  trailingSlash: true,
  // Read by src/lib/base-path.ts: next/link adds basePath itself, plain src/href attributes don't.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPagesPreview
    ? { output: "export" as const, basePath, images: { unoptimized: true } }
    : {
        // Redirects need a server, so they're omitted from the static preview.
        async redirects() {
          return [
            // The old site's footer linked here and it 404s.
            { source: "/merithyre-lp-staffing", destination: "/staffing/", permanent: true },
            // WordPress served posts at the root; they now live under /blog/.
            ...blogSlugs().map((slug) => ({ source: `/${slug}`, destination: `/blog/${slug}/`, permanent: true })),
            // WordPress archive and feed URLs.
            { source: "/category/:path*", destination: "/blog/", permanent: true },
            { source: "/tag/:path*", destination: "/blog/", permanent: true },
            { source: "/author/:path*", destination: "/blog/", permanent: true },
            { source: "/blog/page/:n", destination: "/blog/", permanent: true },
            { source: "/feed", destination: "/rss.xml", permanent: true },
            { source: "/blog/feed", destination: "/rss.xml", permanent: true },
          ];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
