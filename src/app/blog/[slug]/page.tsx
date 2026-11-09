import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock3 } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Toc } from "@/components/blog/toc";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { LogoMark } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { blogAuthor, formatDate, getPost, posts, relatedPosts, toSummary } from "@/content/blog";
import { site } from "@/content/site";
import { withBase, withBaseHtml } from "@/lib/base-path";
import { pageMetadata } from "@/lib/metadata";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/schema";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}/`;
  const base = pageMetadata({ title: post.title, description: post.description, path });
  const image = { url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt };
  return {
    ...base,
    authors: [{ name: blogAuthor.name, url: "/about-us/" }],
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      section: post.category,
      authors: [blogAuthor.name],
      images: [image],
    },
    twitter: { card: "summary_large_image", site: "@merithyre", title: post.title, description: post.description, images: [post.image.src] },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(post);

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        )}
      />

      <article>
        <header className="relative px-5 pb-4 pt-12 sm:px-6 sm:pt-16">
          <div aria-hidden className="bg-hero-center pointer-events-none absolute inset-x-0 -top-40 bottom-24" />
          <div className="relative mx-auto max-w-[900px] text-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-1.5 text-sm text-white/65">
                <li className="flex shrink-0 items-center gap-1.5">
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5 text-white/40" />
                </li>
                <li className="flex shrink-0 items-center gap-1.5">
                  <Link href="/blog/" className="hover:text-white">
                    Blog
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5 text-white/40" />
                </li>
                <li aria-current="page" className="min-w-0 max-w-[16rem] truncate text-white/90 sm:max-w-md">
                  {post.title}
                </li>
              </ol>
            </nav>
            <p className="mt-8 text-[15px] font-medium text-mh-200">{post.category}</p>
            <h1 className="mt-3 font-display text-[clamp(2.1rem,4.8vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white">
              {post.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/75">
              <span className="flex items-center gap-2.5">
                <LogoMark className="size-7 rounded-[8px] text-sm" />
                <span className="font-medium text-white">{blogAuthor.name}</span>
              </span>
              <span aria-hidden className="size-1 rounded-full bg-white/35" />
              <span>
                Published <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.modified !== post.date && (
                  <>
                    {" "}
                    · Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time>
                  </>
                )}
              </span>
              <span aria-hidden className="size-1 rounded-full bg-white/35" />
              <span className="inline-flex items-center gap-1.5">
                <Clock3 aria-hidden className="size-3.5" />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
          <div className="relative mx-auto mt-12 max-w-[1080px] overflow-hidden rounded-[28px] border border-white/15 bg-panel-2 shadow-[0_50px_100px_-50px_rgb(0_0_0/0.9)]">
            <Image
              src={withBase(post.image.src)}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(min-width: 1120px) 1080px, 100vw"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        </header>

        <div className="px-5 pb-6 pt-10 sm:px-6 sm:pt-14">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
            <div className="min-w-0">
              {post.toc.length > 2 && (
                <details className="group mb-6 rounded-2xl border border-white/10 bg-panel px-5 py-4 lg:hidden">
                  <summary className="cursor-pointer list-none text-sm font-medium text-fg [&::-webkit-details-marker]:hidden">
                    On this page <span className="text-subtle">({post.toc.length} sections)</span>
                  </summary>
                  <div className="mt-4">
                    <Toc items={post.toc} />
                  </div>
                </details>
              )}
              <div className="rounded-[28px] bg-paper px-6 py-10 sm:px-12 sm:py-14">
                <div className="article mx-auto max-w-[720px]" dangerouslySetInnerHTML={{ __html: withBaseHtml(post.html) }} />

                <footer className="mx-auto mt-14 flex max-w-[720px] flex-col gap-5 rounded-2xl border border-black/[0.08] bg-white p-6 sm:flex-row sm:items-center">
                  <LogoMark className="size-12 shrink-0 rounded-[12px] text-2xl" />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">Written by the {blogAuthor.name}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">
                      We spent 20 years running a staffing and recruiting agency before building MeritHyre.
                    </p>
                  </div>
                  <ButtonLink href="/about-us/" variant="ink" size="sm" arrow>
                    Our story
                  </ButtonLink>
                </footer>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {post.toc.length > 0 && (
                  <nav aria-label="On this page">
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-subtle">On this page</p>
                    <Toc items={post.toc} />
                  </nav>
                )}
                <div className="bg-backdrop relative overflow-hidden rounded-[22px] p-5">
                  <div aria-hidden className="absolute inset-0 bg-black/40" />
                  <p className="relative font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-white">
                    See the full pipeline on one of your roles.
                  </p>
                  <ButtonLink href={site.demoHref} size="sm" arrow className="relative mt-4">
                    Book a demo
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section aria-labelledby="keep-reading" className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="keep-reading" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold tracking-[-0.035em] text-fg">
              Keep reading
            </h2>
            <ButtonLink href="/blog/" variant="secondary" arrow>
              All articles
            </ButtonLink>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} className="flex">
                <PostCard post={toSummary(p)} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
