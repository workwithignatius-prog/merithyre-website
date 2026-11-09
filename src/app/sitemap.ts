import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { segments } from "@/content/segments";

// Fixed date on purpose: reading the clock during prerender breaks static rendering.
const lastModified = "2026-11-09";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/pricing/", ...segments.map((s) => s.href), "/about-us/", "/contact-us/"];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
