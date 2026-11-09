import { Check, Lock, MessageSquareText, Mic, Video } from "lucide-react";
import { cn } from "@/lib/cn";

const funnel = [
  { label: "Sourced", value: "312", pct: 100 },
  { label: "Screened", value: "312", pct: 100 },
  { label: "AI interviewed", value: "41", pct: 13 },
  { label: "Shortlist", value: "8", pct: 3, hl: true },
];

const rows = [
  { n: "01", name: "Maria Delgado", init: "MD", fit: 94, mode: "Voice", dur: "18m", tone: "bg-emerald-400/15 text-emerald-300" },
  { n: "02", name: "Kwame Asante", init: "KA", fit: 91, mode: "Video", dur: "22m", tone: "bg-sky-400/15 text-sky-300" },
  { n: "03", name: "Priya Nair", init: "PN", fit: 88, mode: "Text", dur: "15m", tone: "bg-violet-400/15 text-violet-300" },
  { n: "04", name: "Tom Becker", init: "TB", fit: 86, mode: "Voice", dur: "16m", tone: "bg-amber-400/15 text-amber-300" },
  { n: "05", name: "Ana Lima", init: "AL", fit: 84, mode: "Voice", dur: "", tone: "bg-teal-400/15 text-teal-300", live: true },
];

const modeIcon = { Voice: Mic, Video: Video, Text: MessageSquareText } as const;

function Wave({ bars = 28, className }: { bars?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-9 items-center gap-[3px]", className)}>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="animate-wave w-[3px] rounded-full bg-gradient-to-t from-mh-500 to-mh-300"
          style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${-((i * 0.13) % 1.1).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}

/** Illustrative product window for the hero. Static markup with CSS-only motion. */
export function HeroProduct() {
  return (
    <figure className="relative mx-auto mt-16 max-w-[1120px] text-left sm:mt-20">
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-24 h-[520px] bg-[radial-gradient(48%_55%_at_50%_35%,rgb(52_227_156/0.26),transparent)] blur-2xl"
      />
      <div className="relative rounded-[22px] border border-white/10 bg-white/[0.025] p-1.5 shadow-[0_50px_140px_-40px_rgb(0_0_0/0.95)] sm:p-2">
        <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#090b0e]">
          {/* window bar */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
            <div aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
            </div>
            <p className="hidden truncate text-xs text-subtle sm:block">
              Pipelines <span className="px-1 text-white/20">/</span> <span className="text-muted">Warehouse Shift Lead</span>
            </p>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-mh-400/25 bg-mh-400/10 px-2.5 py-1 text-[11px] font-medium text-mh-300">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-mh-400" />
              Overnight run complete · 6:12 AM
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* left: funnel + ranked list */}
            <div className="p-4 sm:p-5 lg:border-r lg:border-white/[0.07]">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {funnel.map((f) => (
                  <div
                    key={f.label}
                    className={cn(
                      "rounded-xl border px-3.5 py-3",
                      f.hl
                        ? "border-mh-400/40 bg-mh-400/10 shadow-[0_0_30px_-10px_rgb(52_227_156/0.6)]"
                        : "border-white/[0.07] bg-white/[0.02]",
                    )}
                  >
                    <p className={cn("text-[11px]", f.hl ? "text-mh-300" : "text-subtle")}>{f.label}</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-fg">{f.value}</p>
                    <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className={cn("h-full rounded-full", f.hl ? "bg-mh-400" : "bg-white/25")} style={{ width: `${Math.max(f.pct, 4)}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="grid grid-cols-[24px_minmax(0,1fr)_92px] items-center gap-3 border-b border-white/[0.07] px-2 pb-2.5 text-[11px] text-subtle sm:grid-cols-[24px_minmax(0,1fr)_120px_96px_110px]">
                  <span>#</span>
                  <span>Candidate</span>
                  <span>Fit</span>
                  <span className="hidden sm:block">Interview</span>
                  <span className="hidden sm:block">Status</span>
                </div>
                <ul>
                  {rows.map((r) => {
                    const ModeIcon = modeIcon[r.mode as keyof typeof modeIcon];
                    return (
                      <li
                        key={r.n}
                        className={cn(
                          "grid grid-cols-[24px_minmax(0,1fr)_92px] items-center gap-3 border-b border-white/[0.05] px-2 py-2.5 text-sm sm:grid-cols-[24px_minmax(0,1fr)_120px_96px_110px]",
                          r.n === "01" && "rounded-lg bg-gradient-to-r from-mh-400/[0.08] to-transparent",
                        )}
                      >
                        <span className="text-xs tabular-nums text-subtle">{r.n}</span>
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold", r.tone)}>{r.init}</span>
                          <span className="truncate text-fg">{r.name}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                            <span className="block h-full rounded-full bg-gradient-to-r from-mh-500 to-mh-300" style={{ width: `${r.fit}%` }} />
                          </span>
                          <span className="w-6 text-right text-xs font-medium tabular-nums text-mh-300">{r.fit}</span>
                        </span>
                        <span className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
                          <ModeIcon aria-hidden className="size-3.5 text-subtle" />
                          {r.mode}
                          {r.dur && <span className="text-subtle">· {r.dur}</span>}
                        </span>
                        <span className="hidden sm:block">
                          {r.live ? (
                            <span className="animate-shimmer inline-flex rounded-full bg-[linear-gradient(90deg,rgb(255_255_255/0.04),rgb(52_227_156/0.18),rgb(255_255_255/0.04))] bg-[length:200%_100%] px-2 py-0.5 text-[11px] text-mh-200">
                              Interviewing…
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-muted">
                              <Check aria-hidden className="size-3 text-mh-400" />
                              Report ready
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* right: live interview + human gate */}
            <div className="space-y-3 border-t border-white/[0.07] p-4 sm:p-5 lg:border-t-0">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-fg">
                    <Mic aria-hidden className="size-3.5 text-mh-400" />
                    AI interview
                  </span>
                  <span className="text-subtle">Voice · 02:14 AM</span>
                </div>
                <Wave className="mt-3" />
                <p className="mt-3 text-[13px] leading-snug text-fg">“Walk me through a safety incident you handled on shift.”</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  “I stopped the line, cleared the aisle and filed the report before handover…”
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3 text-xs">
                  <span className="text-muted">Safety &amp; compliance</span>
                  <span className="flex items-center gap-1" aria-label="4 out of 5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className={cn("size-1.5 rounded-full", i < 4 ? "bg-mh-400" : "bg-white/15")} />
                    ))}
                    <span className="ml-1.5 font-medium text-mh-300">4/5</span>
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-300/25 bg-amber-300/[0.06] p-4 shadow-[0_0_40px_-16px_rgb(252_211_77/0.5)]">
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-200">
                  <Lock aria-hidden className="size-3.5" />
                  Human approval required
                </div>
                <p className="mt-2 text-sm text-fg">8 candidates are ready for your decision.</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-amber-300 px-3.5 text-xs font-semibold text-[#1f1300]">
                    Review shortlist
                  </span>
                  <span className="text-[11px] text-subtle">Nothing advances without you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-subtle">Illustrative product view</figcaption>
    </figure>
  );
}
