import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true builds a static export for the temporary GitHub Pages preview
 * (served under /merithyre-website/). Normal builds (Vercel / `next start`) are unaffected.
 */
const isPagesPreview = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Partial prerendering can't run in a static export, so the Pages preview opts out.
  // (Every page here is fully static either way.)
  cacheComponents: !isPagesPreview,
  partialPrefetching: !isPagesPreview,
  // Match the existing WordPress URLs (/pricing/, /staffing/ …) so links and SEO carry over.
  trailingSlash: true,
  ...(isPagesPreview
    ? { output: "export" as const, basePath: "/merithyre-website", images: { unoptimized: true } }
    : {
        // Redirects need a server, so they're omitted from the static preview.
        async redirects() {
          return [
            // The old site's footer linked here and it 404s.
            { source: "/merithyre-lp-staffing", destination: "/staffing/", permanent: true },
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
