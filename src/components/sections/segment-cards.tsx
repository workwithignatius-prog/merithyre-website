import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { segments } from "@/content/segments";

export function SegmentCards({ exclude }: { exclude?: string }) {
  const list = segments.filter((s) => s.slug !== exclude);
  return (
    <div className={list.length === 4 ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" : "grid grid-cols-1 gap-4 sm:grid-cols-3"}>
      {list.map((s) => (
        <SpotlightCard key={s.slug} className="reveal group">
          <Link href={s.href} className="flex h-full flex-col p-6">
            <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-mh-300">
              <s.icon aria-hidden className="size-5" />
            </span>
            <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-fg">{s.name}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{s.short}</p>
            <span className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[13px]">
              <span className="text-subtle">{s.price}</span>
              <ArrowUpRight aria-hidden className="size-4 text-mh-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </SpotlightCard>
      ))}
    </div>
  );
}
