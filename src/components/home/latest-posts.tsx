import { PostCard } from "@/components/blog/post-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { posts, toSummary } from "@/content/blog";

/** Three newest articles, linking the homepage into the blog. */
export function LatestPosts() {
  return (
    <section aria-label="From the blog" className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow="From the blog" title="Guides from the hiring desk." className="max-w-2xl" />
          <ButtonLink href="/blog/" variant="secondary" arrow>
            All articles
          </ButtonLink>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug} className="flex">
              <PostCard post={toSummary(p)} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
