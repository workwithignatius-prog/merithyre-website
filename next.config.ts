import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Match the existing WordPress URLs (/pricing/, /staffing/ …) so links and SEO carry over.
  trailingSlash: true,
  async redirects() {
    return [
      // The old site's footer linked here and it 404s.
      { source: "/merithyre-lp-staffing", destination: "/staffing/", permanent: true },
    ];
  },
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
