"use client";

import { useState } from "react";
import type { PostSummary } from "@/content/blog";
import { cn } from "@/lib/cn";
import { PostCard } from "./post-card";

/** All posts with a category filter. Every card is in the HTML; filtering only hides cards. */
export function BlogGrid({ posts, categories }: { posts: PostSummary[]; categories: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <div>
      <div role="group" aria-label="Filter posts by topic" className="flex flex-wrap gap-2">
        {[null, ...categories].map((c) => {
          const on = active === c;
          return (
            <button
              key={c ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                on ? "border-white bg-white text-[#0b0b0c]" : "border-white/15 text-fg hover:border-white/35 hover:bg-white/[0.05]",
              )}
            >
              {c ?? "All topics"}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "post" : "posts"}
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} className="flex">
            <PostCard post={p} className="w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}
