import { Check, Lock, LockOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/ui/decor";
import { PlatformChips } from "@/components/sections/heading-chips";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/cn";

function CardText({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-mh-300">{kicker}</p>
      <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.025em] text-fg">{title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function InterviewVisual() {
  const qs = [
    { tag: "Gate", text: "Do you hold a current forklift certification?", meta: "Pass / fail" },
    { tag: "Competency", text: "Walk me through a safety incident on shift.", meta: "Scored 1–5" },
    { tag: "Competency", text: "Two people call out an hour before shift…", meta: "Scored 1–5" },
  ];
  return (
    <div aria-hidden className="bg-backdrop rounded-[20px] p-4 sm:p-6">
      <div className="rounded-2xl border border-white/10 bg-[#0e0f11]/95 p-4 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-fg">Interview plan</span>
          <span className="flex rounded-full border border-white/10 p-0.5 text-[11px]">
            <span className="rounded-full bg-white px-2.5 py-0.5 font-medium text-[#0b0b0c]">Voice</span>
            <span className="px-2.5 py-0.5 text-subtle">Video</span>
            <span className="px-2.5 py-0.5 text-subtle">Text</span>
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {qs.map((q, i) => (
            <li
              key={q.text}
              className="flex items-center gap-3 rounded-xl bg-white/[0.045] px-3 py-2.5 text-[13px] transition-[translate,background-color] duration-300 group-hover:translate-x-1.5 group-hover:bg-white/[0.07]"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span
                className={cn(
                  "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                  q.tag === "Gate" ? "bg-white/10 text-white/70" : "bg-mh-400/15 text-mh-300",
                )}
              >
                {q.tag}
              </span>
              <span className="min-w-0 flex-1 truncate text-fg">{q.text}</span>
              <span className="hidden shrink-0 text-[11px] text-subtle sm:block">{q.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RankVisual() {
  const items = [94, 91, 88, 86];
  return (
    <div aria-hidden className="space-y-3">
      {items.map((v, i) => (
        <div key={v} className="flex items-center gap-3">
          <span className="w-4 text-xs tabular-nums text-subtle">{i + 1}</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
            <span
              className="block h-full w-[calc(var(--w)*0.72)] rounded-full bg-mh-400 transition-[width] duration-700 ease-out group-hover:w-[var(--w)]"
              style={{ ["--w" as string]: `${v}%`, opacity: 1 - i * 0.18, transitionDelay: `${i * 60}ms` }}
            />
          </span>
          <span className="w-6 text-right text-xs font-semibold tabular-nums text-fg">{v}</span>
        </div>
      ))}
    </div>
  );
}

function ReportVisual() {
  const rows = [
    { k: "Safety & compliance", v: 4 },
    { k: "Team leadership", v: 5 },
    { k: "Shift planning", v: 4 },
  ];
  return (
    <div aria-hidden className="rounded-2xl bg-white/[0.04] p-4">
      <div className="flex items-end justify-between">
        <span className="text-xs text-muted">Maria Delgado</span>
        <span className="font-display text-2xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-mh-300">
          4.3<span className="text-xs font-normal text-subtle">/5</span>
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between text-[12px] text-muted">
            {r.k}
            <span className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={cn("size-1.5 rounded-full", i < r.v ? "bg-mh-300" : "bg-white/15")} />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GateVisual() {
  return (
    <div aria-hidden className="flex flex-col items-center gap-3 rounded-2xl bg-sun-400/[0.08] p-5">
      <span className="relative grid size-11 place-items-center rounded-full bg-sun-400/15 text-sun-300 transition-colors duration-300 group-hover:bg-sun-400/25">
        <Lock className="size-5 transition-opacity duration-300 group-hover:opacity-0" />
        <LockOpen className="absolute size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-sun-400 px-4 text-xs font-semibold text-[#2a1a02] transition-transform duration-300 group-hover:scale-105">
        <Check className="size-3.5" strokeWidth={3} />
        Approve 3 candidates
      </span>
      <span className="text-[11px] text-subtle">Recruiter only · can&apos;t be switched off</span>
    </div>
  );
}

function SyncVisual() {
  return (
    <div aria-hidden className="relative flex items-center justify-between gap-4 rounded-2xl bg-white/[0.04] px-5 py-6">
      <LogoMark className="size-11 text-xl" />
      <div className="relative h-px flex-1 overflow-hidden bg-white/15">
        <span className="animate-beam absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
      <ul className="space-y-1.5 font-display text-[15px] font-semibold tracking-[-0.02em] text-white/60 transition-colors duration-300 group-hover:text-white">
        <li>Bullhorn</li>
        <li>Greenhouse</li>
        <li>Tellent</li>
      </ul>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative px-5 py-14 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-[1180px]">
        <Glow color="teal" className="-right-48 top-40 h-[520px] w-[680px]" />
        <SectionHeading
          decor={<PlatformChips />}
          eyebrow="The platform"
          title="Everything between the job post and the hire."
          body="One system instead of a stack of bolt-ons. Your team stays in charge of every decision."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="reveal p-6 sm:p-8 lg:col-span-2">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              <CardText
                kicker="AI interviews"
                title="Interviews that run while you sleep"
                body="Structured voice, video or text interviews built from your job description. Gate questions pass or fail; competencies are scored on five-level anchors."
              />
              <InterviewVisual />
            </div>
          </Card>
          <Card className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText kicker="Screening" title="A ranked list, not a pile" body="Every applicant scored the moment they apply, weighted the way you decide." />
            <RankVisual />
          </Card>
          <Card className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText kicker="Insights report" title="Read the evidence" body="Full transcript, competency scores, strengths and gaps in one brief." />
            <ReportVisual />
          </Card>
          <Card className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText kicker="Human gate" title="You approve every move" body="No candidate advances without your approval. It's hardcoded." />
            <GateVisual />
          </Card>
          <Card className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText kicker="Integrations" title="Keep your ATS" body="Two-way sync with Bullhorn, Greenhouse and Tellent, or run standalone." />
            <SyncVisual />
          </Card>
        </div>
      </div>
    </section>
  );
}
