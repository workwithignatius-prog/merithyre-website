import { stages } from "@/content/pipeline";
import { cn } from "@/lib/cn";

/** The 7-stage pipeline. Green = AI-run, amber = the human decision. */
export function PipelineTrack() {
  return (
    <div className="reveal">
      <div className="mb-10 flex flex-wrap justify-center gap-6 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-[3px] bg-mh-400" />
          Run by AI
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-[3px] bg-sun-400" />
          Your decision
        </span>
      </div>

      <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-3">
        {/* connector (desktop) */}
        <div aria-hidden className="absolute left-[7%] right-[7%] top-7 hidden h-px overflow-hidden bg-white/[0.12] lg:block">
          <span className="animate-beam absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
        {/* connector (mobile) */}
        <div aria-hidden className="absolute bottom-7 left-7 top-7 w-px bg-white/[0.12] lg:hidden" />

        {stages.map((s) => (
          <li key={s.n} className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <div
              className={cn(
                "relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border bg-panel",
                s.human ? "border-sun-400/60 bg-sun-400/10 text-sun-300" : "border-white/[0.12] text-mh-300",
              )}
            >
              <s.icon aria-hidden className="size-6" />
            </div>
            <div className="pt-1 lg:pt-4">
              <p className={cn("text-xs font-medium", s.human ? "text-sun-300" : "text-subtle")}>{s.human ? `${s.n} · You` : s.n}</p>
              <h3 className="mt-1 font-sans text-[15px] font-semibold tracking-[-0.01em] text-fg">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-snug text-muted lg:mx-auto lg:max-w-[150px]">{s.short}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
