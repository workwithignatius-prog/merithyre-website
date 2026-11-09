import { Check, Lock } from "lucide-react";
import type { Segment } from "@/content/segments";
import { stages } from "@/content/pipeline";
import { cn } from "@/lib/cn";

/** Illustrative overnight-run card for a segment hero, shown on the brand backdrop. */
export function SegmentVisual({ visual }: { visual: Segment["visual"] }) {
  return (
    <figure>
      <div className="bg-backdrop relative overflow-hidden rounded-[28px] border border-white/10 p-6 sm:p-10">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgb(0_0_0/0.5),transparent_60%)]" />
        <div className="relative mx-auto max-w-[420px] rounded-[20px] border border-white/10 bg-[#0e0f11]/95 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.75)]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="text-xs text-white/55">Overnight run, finished before 9 AM</p>
            <p className="mt-1 truncate font-display text-lg font-semibold tracking-[-0.02em] text-fg">{visual.role}</p>
          </div>
          <dl className="divide-y divide-white/[0.06]">
            {visual.rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className={cn("flex items-center gap-2 text-sm", r.tone === "human" ? "text-sun-300" : "text-white/65")}>
                  {r.tone === "human" ? <Lock aria-hidden className="size-3.5" /> : <Check aria-hidden className="size-3.5 text-mh-300" />}
                  {r.label}
                </dt>
                <dd
                  className={cn(
                    "text-right text-[15px] font-semibold tabular-nums",
                    r.tone === "human" ? "rounded-full bg-sun-400 px-3 py-1 text-xs text-[#2a1a02]" : "text-fg",
                  )}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-white/[0.08] px-5 py-4">
            <ol className="flex items-center gap-1.5" aria-label="Pipeline: six stages run by AI, one decided by you">
              {stages.map((s) => (
                <li key={s.n} title={s.title} className={cn("h-1.5 flex-1 rounded-full", s.human ? "bg-sun-400" : "bg-mh-400/85")} />
              ))}
            </ol>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-subtle">Product preview with sample data</figcaption>
    </figure>
  );
}
