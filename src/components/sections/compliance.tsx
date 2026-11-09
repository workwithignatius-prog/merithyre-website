import { Download, History, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui/section-heading";
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
    <div className="relative">
      <div aria-hidden className="absolute inset-0 rounded-[40px] bg-[radial-gradient(closest-side,rgb(52_227_156/0.14),transparent)] blur-2xl sm:-inset-8" />
      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#08090c] shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)]">
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
                  "grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-x-4 border-l-2 px-5 py-3 sm:grid-cols-[72px_minmax(0,1fr)_auto]",
                  kind === "hold" && "border-amber-300/70 bg-amber-300/[0.05]",
                  kind === "human" && "border-mh-400/70 bg-mh-400/[0.04]",
                  !kind && "border-transparent",
                )}
              >
                <time className="font-mono text-xs tabular-nums text-subtle">{l.t}</time>
                <span className={cn("text-sm", kind === "hold" ? "text-amber-200" : kind === "human" ? "text-mh-200" : "text-fg")}>
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
    <section id="compliance" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="reveal max-w-4xl">
          <Eyebrow>Trust &amp; compliance</Eyebrow>
          <h2 className="text-gradient mt-5 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Compliance isn&apos;t a feature.
            <br className="hidden sm:inline" /> It&apos;s the architecture.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-lg">
            Every score is auditable, every threshold is set by your team, and every advancement is approved by a person.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="reveal">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {regulations.map((r) => (
                <li key={r.name} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-mh-400" />
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
      </div>
    </section>
  );
}
