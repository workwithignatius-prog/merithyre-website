import { stages } from "@/content/pipeline";
import { cn } from "@/lib/cn";

/** The 7-stage pipeline. Green = AI-run, amber = the human decision. */
export function PipelineTrack() {
  return (
    <div className="reveal">
      <div className="mb-10 flex flex-wrap justify-center gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
          <span className="size-2 rounded-full bg-mh-400 shadow-[0_0_10px_rgb(52_227_156/0.8)]" />
          Run by AI
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
          <span className="size-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgb(252_211_77/0.8)]" />
          Your decision
        </span>
      </div>

      <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-3">
        {/* connector (desktop) */}
        <div aria-hidden className="absolute left-[7%] right-[7%] top-7 hidden h-px overflow-hidden bg-white/10 lg:block">
          <span className="animate-beam absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-mh-300 to-transparent" />
        </div>
        {/* connector (mobile) */}
        <div aria-hidden className="absolute bottom-7 left-7 top-7 w-px bg-white/10 lg:hidden" />

        {stages.map((s) => (
          <li key={s.n} className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <div
              className={cn(
                "relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border bg-panel",
                s.human
                  ? "border-amber-300/40 text-amber-200 shadow-[0_0_40px_-8px_rgb(252_211_77/0.55)]"
                  : "border-mh-400/25 text-mh-300 shadow-[0_0_40px_-12px_rgb(52_227_156/0.6)]",
              )}
            >
              <s.icon aria-hidden className="size-6" />
            </div>
            <div className="pt-1 lg:pt-4">
              <p className={cn("text-xs font-medium", s.human ? "text-amber-200" : "text-subtle")}>
                {s.human ? `${s.n} · You` : s.n}
              </p>
              <h3 className="mt-1 text-[15px] font-semibold tracking-[-0.01em] text-fg">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-snug text-muted lg:mx-auto lg:max-w-[150px]">{s.short}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
