import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { formatDate, type PostSummary } from "@/content/blog";
import { withBase } from "@/lib/base-path";
import { cn } from "@/lib/cn";

/** Blog card. `feature` = the large horizontal card used for the latest post. */
export function PostCard({ post, feature, className }: { post: PostSummary; feature?: boolean; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#0e100f]/90 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_30px_60px_-36px_rgb(0_0_0/0.9)]",
        feature ? "flex-col backdrop-blur-md lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "flex-col",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-panel-2", feature ? "aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" : "aspect-[16/9]")}>
        <Image
          src={withBase(post.image.src)}
          alt={post.image.alt}
          width={post.image.width}
          height={post.image.height}
          sizes={feature ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          className="size-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
          {...(feature ? { fetchPriority: "high" as const } : {})}
        />
      </div>
      <div className={cn("flex flex-1 flex-col", feature ? "p-7 sm:p-10" : "p-6")}>
        <p className="text-[13px] font-medium text-mh-300">{post.category}</p>
        <h3
          className={cn(
            "mt-3 font-display font-semibold tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-white",
            feature ? "text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.12]" : "text-[19px] leading-snug",
          )}
        >
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 leading-relaxed text-muted", feature ? "text-[16.5px]" : "line-clamp-3 text-[15px]")}>{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-[13px] text-subtle">
          <span className="flex items-center gap-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden className="size-1 rounded-full bg-white/25" />
            <span className="inline-flex items-center gap-1.5">
              <Clock3 aria-hidden className="size-3.5" />
              {post.readingMinutes} min read
            </span>
          </span>
          <span className="grid size-9 place-items-center rounded-full border border-white/15 text-fg transition-[background-color,color,border-color] duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#0b0b0c]">
            <ArrowUpRight aria-hidden className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
