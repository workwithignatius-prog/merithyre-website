import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { segments } from "@/content/segments";

export function SegmentCards({ exclude }: { exclude?: string }) {
  const list = segments.filter((s) => s.slug !== exclude);
  return (
    <div className={list.length === 4 ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" : "grid grid-cols-1 gap-4 sm:grid-cols-3"}>
      {list.map((s) => (
        <Card key={s.slug} className="reveal">
          {/* brand backdrop washes in from the top on hover */}
          <div
            aria-hidden
            className="bg-backdrop pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,#000,transparent)] group-hover:opacity-40"
          />
          <Link href={s.href} className="relative flex h-full flex-col p-6">
            <s.icon aria-hidden className="size-6 text-mh-300 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-fg">{s.name}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/80">{s.short}</p>
            <span className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[13px]">
              <span className="text-subtle">{s.price}</span>
              <span className="grid size-8 place-items-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#0b0b0c]">
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
              </span>
            </span>
          </Link>
        </Card>
      ))}
    </div>
  );
}
