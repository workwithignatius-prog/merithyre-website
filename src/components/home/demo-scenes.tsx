import { Check, Lock, Mic } from "lucide-react";
import { cn } from "@/lib/cn";

/* Four illustrative scenes for the hero demo preview (sample data). */

const card = "w-full max-w-[400px] rounded-[20px] border border-white/10 bg-[#0e0f11]/95 p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.75)]";

export function SceneSource() {
  const boards = [
    { name: "LinkedIn", n: 128 },
    { name: "Indeed", n: 141 },
    { name: "2 more boards", n: 43 },
  ];
  return (
    <div className={card}>
      <p className="text-xs text-white/55">Posted to 4 boards · 11:02 PM</p>
      <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-fg">Warehouse Shift Lead</p>
      <ul className="mt-4 space-y-2">
        {boards.map((b) => (
          <li key={b.name} className="flex items-center justify-between rounded-xl bg-white/[0.045] px-3.5 py-2.5 text-[13px]">
            <span className="flex items-center gap-2 text-fg">
              <Check aria-hidden className="size-3.5 text-mh-300" />
              {b.name}
            </span>
            <span className="tabular-nums text-white/60">{b.n} matches</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-end justify-between border-t border-white/[0.08] pt-4">
        <span className="text-xs text-white/55">Candidates found overnight</span>
        <span className="font-display text-3xl font-semibold leading-none tabular-nums text-fg">312</span>
      </div>
    </div>
  );
}

export function SceneRank() {
  const rows = [
    { init: "MD", name: "Maria Delgado", fit: 94, tone: "bg-emerald-300/20 text-emerald-200" },
    { init: "KA", name: "Kwame Asante", fit: 91, tone: "bg-sky-300/20 text-sky-200" },
    { init: "PN", name: "Priya Nair", fit: 88, tone: "bg-violet-300/20 text-violet-200" },
    { init: "TB", name: "Tom Becker", fit: 86, tone: "bg-amber-300/20 text-amber-200" },
  ];
  return (
    <div className={card}>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-xl font-semibold tracking-[-0.02em] text-fg">Ranked by fit</p>
        <p className="text-xs text-white/55">312 screened</p>
      </div>
      <p className="mt-1 text-xs text-white/55">Weighted on experience, certifications and availability</p>
      <ul className="mt-4 space-y-1.5">
        {rows.map((r, i) => (
          <li key={r.name} className={cn("flex items-center gap-3 rounded-xl px-2.5 py-2", i === 0 && "bg-white/[0.05]")}>
            <span className="w-4 text-xs tabular-nums text-white/45">{i + 1}</span>
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold", r.tone)}>{r.init}</span>
            <span className="min-w-0 flex-1 truncate text-[13px] text-fg">{r.name}</span>
            <span className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:block">
              <span className="block h-full rounded-full bg-mh-400" style={{ width: `${r.fit}%` }} />
            </span>
            <span className="w-7 text-right text-[13px] font-semibold tabular-nums text-mh-300">{r.fit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SceneInterview() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between text-xs text-white/55">
        <span className="inline-flex items-center gap-1.5 text-fg">
          <Mic aria-hidden className="size-3.5 text-mh-300" />
          AI interview · Voice
        </span>
        <span>2:14 AM</span>
      </div>
      <div aria-hidden className="mt-4 flex h-10 items-center gap-[3px]">
        {Array.from({ length: 34 }, (_, i) => (
          <span
            key={i}
            className="animate-wave w-[3px] rounded-full bg-mh-300/90"
            style={{ height: `${28 + ((i * 41) % 72)}%`, animationDelay: `${-((i * 0.17) % 1.1).toFixed(2)}s` }}
          />
        ))}
      </div>
      <p className="mt-4 text-[15px] leading-snug text-fg">“Walk me through a safety incident you handled on shift.”</p>
      <p className="mt-2 text-[13px] leading-relaxed text-white/60">“I stopped the line, cleared the aisle and filed the report before handover…”</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3.5 text-[13px]">
        <span className="text-white/60">Safety &amp; compliance</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={cn("size-1.5 rounded-full", i < 4 ? "bg-mh-300" : "bg-white/20")} />
          ))}
          <span className="ml-1.5 font-semibold text-fg">4/5</span>
        </span>
      </div>
    </div>
  );
}

export function SceneDecide() {
  const picks = [
    { name: "Maria Delgado", score: "4.3" },
    { name: "Kwame Asante", score: "4.1" },
    { name: "Priya Nair", score: "3.9" },
  ];
  return (
    <div className={card}>
      <p className="text-xs text-white/55">Shortlist ready at 6:12 AM</p>
      <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-fg">Your call</p>
      <ul className="mt-4 space-y-2">
        {picks.map((p) => (
          <li key={p.name} className="flex items-center gap-3 rounded-xl bg-white/[0.045] px-3 py-2.5 text-[13px]">
            <span className="grid size-4 place-items-center rounded-[5px] bg-sun-400 text-[#2a1a02]">
              <Check aria-hidden className="size-3" strokeWidth={3} />
            </span>
            <span className="flex-1 text-fg">{p.name}</span>
            <span className="tabular-nums text-white/60">{p.score} / 5</span>
          </li>
        ))}
      </ul>
      <span className="mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-sun-400 text-[13px] font-semibold text-[#2a1a02]">
        <Lock aria-hidden className="size-3.5" />
        Approve 3 for final interview
      </span>
      <p className="mt-2.5 text-center text-xs text-white/50">Nothing advances without a person</p>
    </div>
  );
}
