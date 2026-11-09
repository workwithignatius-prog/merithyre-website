import type { Metadata } from "next";
import { site } from "@/content/site";

/** Static share image (public/og.png, 1200×630). Static file = no trailing-slash redirect for crawlers. */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "MeritHyre: Hire at machine speed. Decide like a human.",
};

/**
 * Per-page metadata with canonical + Open Graph.
 * (Next merges metadata shallowly, so each page sets its full openGraph object.)
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: ogTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImage.url] },
  };
}
