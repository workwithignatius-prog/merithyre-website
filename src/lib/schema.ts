import { site } from "@/content/site";
import type { BlogPost } from "@/content/blog";
import { blogAuthor } from "@/content/blog";

/* schema.org builders for JSON-LD. URLs are absolute (site.url + path). */

export const abs = (path: string) => new URL(path, site.url).toString();

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: abs("/"),
    logo: { "@type": "ImageObject", url: abs("/logo.png"), width: 512, height: 512 },
    image: abs("/og.png"),
    description: site.description,
    email: site.contact.email,
    telephone: "+1-650-374-4160",
    address: {
      "@type": "PostalAddress",
      streetAddress: "22693 Hesperian Blvd Suite #205",
      addressLocality: "Hayward",
      addressRegion: "CA",
      postalCode: "94541",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+1-650-374-4160",
        email: site.contact.email,
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
    sameAs: Object.values(site.socials),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: abs("/"),
    publisher: { "@id": organizationId },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** A page in the site graph: ties the page to the website and organisation. */
export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    inLanguage: "en-US",
  };
}

export function blogPostingSchema(post: BlogPost) {
  const url = abs(`/blog/${post.slug}/`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    image: { "@type": "ImageObject", url: abs(post.image.src), width: post.image.width, height: post.image.height },
    datePublished: post.date,
    dateModified: post.modified,
    articleSection: post.category,
    timeRequired: `PT${post.readingMinutes}M`,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: blogAuthor.name, url: abs("/about-us/") },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": `${abs("/blog/")}#blog` },
  };
}

/** Wrap several nodes in one @graph document. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
