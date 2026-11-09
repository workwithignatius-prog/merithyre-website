import postsData from "./posts.json";

/**
 * Blog posts migrated from the WordPress site (see scripts/import-wordpress-posts.py).
 * `html` is sanitised at import time to a small tag allow-list.
 */
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  modified: string; // YYYY-MM-DD
  category: string;
  categorySlug: string;
  image: { src: string; width: number; height: number; alt: string };
  readingMinutes: number;
  toc: { id: string; text: string }[];
  html: string;
};

/** Card-sized view of a post (no body), safe to pass to client components. */
export type PostSummary = Omit<BlogPost, "html" | "toc">;

export const posts: BlogPost[] = (postsData as BlogPost[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export const blogAuthor = { name: "MeritHyre Team", description: "Former staffing agency directors who build MeritHyre" };

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function toSummary(post: BlogPost): PostSummary {
  const { slug, title, description, excerpt, date, modified, category, categorySlug, image, readingMinutes } = post;
  return { slug, title, description, excerpt, date, modified, category, categorySlug, image, readingMinutes };
}

export const blogCategories = Array.from(new Set(posts.map((p) => p.category)));

/** Same-category posts first, then the most recent others. */
export function relatedPosts(post: BlogPost, count = 3) {
  const others = posts.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.categorySlug === post.categorySlug);
  const rest = others.filter((p) => p.categorySlug !== post.categorySlug);
  return [...same, ...rest].slice(0, count);
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-02" → "Nov 2, 2026" (string maths only; no clock reads during prerender). */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}
