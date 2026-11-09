import { Download, History, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/section-heading";
import { Glow } from "@/components/ui/decor";
import { regulations } from "@/content/site";
import { cn } from "@/lib/cn";

const log = [
  { t: "02:14:07", ev: "AI interview completed", meta: "Voice · 18m 22s" },
  { t: "02:14:31", ev: "Competency scores proposed", meta: "5 questions" },
  { t: "02:14:31", ev: "Held for human review", meta: "Hybrid mode", kind: "hold" },
  { t: "08:41:12", ev: "Scores approved", meta: "J. Ortiz, Recruiter", kind: "human" },
  { t: "08:42:55", ev: "Advanced to final interview", meta: "J. Ortiz, Recruiter", kind: "human" },
  { t: "08:43:02", ev: "Criteria snapshot attached", meta: "Weights locked" },
] as const;

export function AuditLog() {
  return (
    <div className="group/log relative pb-6">
      {/* earlier records peeking out underneath: reads as a stack of permanent entries */}
      <div aria-hidden className="absolute inset-x-12 bottom-0 top-6 rounded-[24px] border border-white/[0.05] bg-[#0c0d0e] transition-[translate] duration-500 ease-out group-hover/log:translate-y-1.5" />
      <div aria-hidden className="absolute inset-x-6 bottom-3 top-3 rounded-[24px] border border-white/[0.07] bg-[#0e0f11] transition-[translate] duration-500 ease-out group-hover/log:translate-y-0.5" />
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-panel shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5 text-xs">
          <span className="inline-flex items-center gap-2 text-muted">
            <History aria-hidden className="size-4 text-mh-400" />
            Audit trail · Maria Delgado
          </span>
          <span className="inline-flex items-center gap-1.5 text-mh-300">
            <Download aria-hidden className="size-3.5" />
            Export
          </span>
        </div>
        <ol className="py-2">
          {log.map((l) => {
            const kind = "kind" in l ? l.kind : undefined;
            return (
              <li
                key={l.t + l.ev}
                className={cn(
                  "grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-x-4 border-l-2 px-5 py-3 transition-colors duration-200 hover:bg-white/[0.045] sm:grid-cols-[72px_minmax(0,1fr)_auto]",
                  kind === "hold" && "border-sun-400/80 bg-sun-400/[0.06]",
                  kind === "human" && "border-mh-400/70 bg-mh-400/[0.04]",
                  !kind && "border-transparent",
                )}
              >
                <time className="font-mono text-xs tabular-nums text-subtle">{l.t}</time>
                <span className={cn("text-sm", kind === "hold" ? "text-sun-300" : kind === "human" ? "text-mh-200" : "text-fg")}>
                  {l.ev}
                </span>
                <span className="col-start-2 text-xs text-subtle sm:col-start-auto sm:text-right">{l.meta}</span>
              </li>
            );
          })}
        </ol>
        <p className="border-t border-white/[0.07] px-5 py-3 text-[11px] text-subtle">Illustrative · every entry is permanent and exportable</p>
      </div>
    </div>
  );
}

export function Compliance() {
  return (
    <section id="compliance" className="relative px-5 py-16 sm:px-6 sm:py-24">
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center lg:gap-14">
        <Glow color="teal" className="-left-48 top-24 h-[520px] w-[640px]" />
        <div className="reveal">
          <Label>Trust &amp; compliance</Label>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-fg">
            Compliance isn&apos;t a feature.
            <br className="hidden sm:inline" /> It&apos;s the architecture.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
            Every score is auditable, every threshold is set by your team, and every advancement is approved by a person.
          </p>
          <ul className="mt-10 grid gap-2.5 sm:grid-cols-2">
            {regulations.map((r) => (
              <li
                key={r.name}
                className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-[border-color,background-color,translate] duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-mh-400 transition-transform duration-300 group-hover:scale-125" />
                <span>
                  <span className="block text-sm font-medium text-fg">{r.name}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-subtle">{r.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-subtle">
            We don&apos;t claim to eliminate bias. We make every evaluation consistent, documented and reviewable.
          </p>
        </div>
        <div className="reveal">
          <AuditLog />
        </div>
      </div>
    </section>
  );
}
