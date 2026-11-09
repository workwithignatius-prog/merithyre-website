import { Check, FileCheck2, ListOrdered, Lock, Mic, RefreshCw, type LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoMark } from "@/components/layout/logo";
import { cn } from "@/lib/cn";

function CardText({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div>
      <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-mh-300">
        <Icon aria-hidden className="size-[18px]" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-fg">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
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
    <div aria-hidden className="rounded-xl border border-white/[0.08] bg-[#090b0e] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-fg">Interview plan</span>
        <span className="flex rounded-full border border-white/10 p-0.5 text-[11px]">
          <span className="rounded-full bg-mh-400/15 px-2.5 py-0.5 text-mh-300">Voice</span>
          <span className="px-2.5 py-0.5 text-subtle">Video</span>
          <span className="px-2.5 py-0.5 text-subtle">Text</span>
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {qs.map((q) => (
          <li key={q.text} className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-[13px]">
            <span
              className={cn(
                "shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                q.tag === "Gate" ? "bg-white/[0.07] text-muted" : "bg-mh-400/10 text-mh-300",
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
  );
}

function RankVisual() {
  const items = [94, 91, 88, 86];
  return (
    <div aria-hidden className="space-y-2.5">
      {items.map((v, i) => (
        <div key={v} className="flex items-center gap-3">
          <span className="w-4 text-[11px] tabular-nums text-subtle">{i + 1}</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <span className="block h-full rounded-full bg-gradient-to-r from-mh-600 to-mh-300" style={{ width: `${v}%` }} />
          </span>
          <span className="w-6 text-right text-xs font-medium tabular-nums text-mh-300">{v}</span>
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
    <div aria-hidden className="rounded-xl border border-white/[0.08] bg-[#090b0e] p-4">
      <div className="flex items-end justify-between">
        <span className="text-xs text-muted">Maria Delgado</span>
        <span className="text-2xl font-semibold tracking-tight text-mh-300">
          4.3<span className="text-xs text-subtle">/5</span>
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r.k} className="flex items-center justify-between text-[12px] text-muted">
            {r.k}
            <span className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={cn("size-1.5 rounded-full", i < r.v ? "bg-mh-400" : "bg-white/15")} />
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
    <div aria-hidden className="flex flex-col items-center gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] p-5">
      <span className="grid size-11 place-items-center rounded-full border border-amber-300/30 bg-amber-300/10 text-amber-200 shadow-[0_0_30px_-6px_rgb(252_211_77/0.6)]">
        <Lock className="size-5" />
      </span>
      <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-amber-300 px-4 text-xs font-semibold text-[#1f1300]">
        <Check className="size-3.5" />
        Approve 3 candidates
      </span>
      <span className="text-[11px] text-subtle">Recruiter only · can&apos;t be switched off</span>
    </div>
  );
}

function SyncVisual() {
  return (
    <div aria-hidden className="relative flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#090b0e] px-5 py-6">
      <LogoMark className="size-11 text-xl" />
      <div className="relative h-px flex-1 overflow-hidden bg-white/10">
        <span className="animate-beam absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-mh-300 to-transparent" />
      </div>
      <ul className="space-y-1.5 text-[13px] font-semibold tracking-[-0.02em] text-white/70">
        <li>Bullhorn</li>
        <li>Greenhouse</li>
        <li>Tellent</li>
      </ul>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Platform"
          title="Everything between the job post and the hire."
          body="One AI-native system, not a stack of bolt-ons. Your team stays in control of every decision."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SpotlightCard className="reveal p-6 sm:p-8 lg:col-span-2">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              <CardText
                icon={Mic}
                title="AI interviews, any hour"
                body="Structured voice, video or text interviews with questions drawn from your JD. Gate questions pass or fail; competencies are scored on five-level anchors."
              />
              <InterviewVisual />
            </div>
          </SpotlightCard>
          <SpotlightCard className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText icon={ListOrdered} title="Ranked, not piled up" body="Every applicant scored the moment they apply, weighted the way you decide." />
            <RankVisual />
          </SpotlightCard>
          <SpotlightCard className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText icon={FileCheck2} title="Decision-ready reports" body="Full transcript, competency scores, strengths and gaps in one brief." />
            <ReportVisual />
          </SpotlightCard>
          <SpotlightCard className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText icon={Lock} title="A human gate you can't skip" body="No candidate advances without your approval. It's hardcoded." />
            <GateVisual />
          </SpotlightCard>
          <SpotlightCard className="reveal flex flex-col justify-between gap-8 p-6 sm:p-8">
            <CardText icon={RefreshCw} title="Keeps your ATS" body="Two-way sync with Bullhorn, Greenhouse and Tellent. Or run standalone." />
            <SyncVisual />
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
