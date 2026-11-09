import { CheckCircle2, Lock } from "lucide-react";
import type { Segment } from "@/content/segments";
import { stages } from "@/content/pipeline";
import { cn } from "@/lib/cn";

/** Illustrative "overnight run" card for a segment hero. */
export function SegmentVisual({ visual }: { visual: Segment["visual"] }) {
  return (
    <figure className="relative">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgb(52_227_156/0.2),transparent)] blur-2xl" />
      <div className="relative rounded-[22px] border border-white/10 bg-white/[0.025] p-1.5 shadow-[0_50px_120px_-40px_rgb(0_0_0/0.95)]">
        <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#090b0e]">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-3.5">
            <span className="min-w-0">
              <span className="block text-[11px] text-subtle">Overnight run</span>
              <span className="block truncate text-sm font-medium text-fg">{visual.role}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mh-400/25 bg-mh-400/10 px-2.5 py-1 text-[11px] font-medium text-mh-300">
              <CheckCircle2 aria-hidden className="size-3.5" />
              Complete
            </span>
          </div>
          <dl className="divide-y divide-white/[0.06]">
            {visual.rows.map((r) => (
              <div
                key={r.label}
                className={cn("flex items-center justify-between gap-4 px-5 py-4", r.tone === "human" && "bg-amber-300/[0.06]")}
              >
                <dt className={cn("flex items-center gap-2 text-sm", r.tone === "human" ? "text-amber-200" : "text-muted")}>
                  {r.tone === "human" && <Lock aria-hidden className="size-3.5" />}
                  {r.label}
                </dt>
                <dd
                  className={cn(
                    "text-right text-[15px] font-semibold tabular-nums",
                    r.tone === "human" ? "rounded-full bg-amber-300 px-3 py-1 text-xs text-[#1f1300]" : "text-fg",
                  )}
                >
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-white/[0.07] px-5 py-4">
            <p className="text-[11px] text-subtle">Pipeline</p>
            <ol className="mt-2.5 flex items-center gap-1.5" aria-label="Pipeline stages: six run by AI, one decided by you">
              {stages.map((s) => (
                <li
                  key={s.n}
                  title={s.title}
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    s.human ? "bg-amber-300 shadow-[0_0_10px_rgb(252_211_77/0.6)]" : "bg-mh-400/80",
                  )}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-subtle">Illustrative product view</figcaption>
    </figure>
  );
}
