import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { PostCard } from "@/components/blog/post-card";
import { BlogGrid } from "@/components/blog/blog-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { Swash } from "@/components/ui/swash";
import { blogCategories, posts, toSummary } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";
import { abs, breadcrumbSchema, graph, organizationId, webPageSchema } from "@/lib/schema";

const description =
  "Practical guides on AI recruiting, structured interviews, NYC Local Law 144 compliance and staffing workflows, from a team that ran a staffing agency for 20 years.";

export const metadata: Metadata = pageMetadata({
  title: "Blog: AI Recruiting Guides and Hiring Insights",
  description,
  path: "/blog/",
});

export default function BlogPage() {
  const [latest, ...rest] = posts;
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ type: "CollectionPage", path: "/blog/", name: "MeritHyre Blog", description }),
          {
            "@type": "Blog",
            "@id": `${abs("/blog/")}#blog`,
            name: "MeritHyre Blog",
            url: abs("/blog/"),
            description,
            publisher: { "@id": organizationId },
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: abs(`/blog/${p.slug}/`),
              datePublished: p.date,
              dateModified: p.modified,
              image: abs(p.image.src),
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
          ]),
        )}
      />
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes from the
            <br />
            <Swash>hiring desk.</Swash>
          </>
        }
        body="Practical guides on AI recruiting, structured interviews, compliance and staffing workflows, from a team that ran a staffing agency for 20 years."
        after={<PostCard post={toSummary(latest)} feature />}
      />

      <section aria-labelledby="all-posts" className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="all-posts" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold tracking-[-0.035em] text-fg">
            All articles
          </h2>
          <div className="mt-8">
            <BlogGrid posts={rest.map(toSummary)} categories={blogCategories.filter((c) => rest.some((p) => p.category === c))} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
