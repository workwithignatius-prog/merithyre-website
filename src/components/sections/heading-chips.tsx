import { CalendarCheck, Check, Clock3, FileCheck2, Megaphone, Mic, RefreshCw, ShieldCheck, UserCheck } from "lucide-react";
import { ChipText, FloatChip } from "@/components/ui/decor";

/*
 * Floating product fragments that sit in the empty space beside centred headings
 * (desktop only). Each pair tells a small piece of the product story.
 */

const L = "left-0 top-2";
const R = "right-0 bottom-0";
const iconBox = "grid size-9 shrink-0 place-items-center rounded-xl";

export function OvernightChips() {
  return (
    <>
      <FloatChip className={L} tilt="left">
        <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
          <Clock3 className="size-[18px]" />
        </span>
        <ChipText top="11:04 PM" bottom="Job posted to 4 boards" />
      </FloatChip>
      <FloatChip className={R} tilt="right" delay={2.5}>
        <span className="size-2.5 shrink-0 rounded-full bg-sun-400" />
        <ChipText top="6:12 AM" bottom="Shortlist ready for you" />
      </FloatChip>
    </>
  );
}

/*
 * "Everything between the job post and the hire": the pipeline in six fragments,
 * early steps on the left (post, gate questions, fit score), later steps on the
 * right (audit trail, interview, your approval). Staggered so neither side is a column.
 */
const shortlist = [
  { initials: "MD", bg: "bg-[#0f4a27]" },
  { initials: "KA", bg: "bg-[#1b6f73]" },
  { initials: "PN", bg: "bg-[#6b3f0c]" },
];

export function PlatformChips() {
  return (
    <>
      <FloatChip className="left-0 -top-12" angle={-5}>
        <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
          <Megaphone className="size-[18px]" />
        </span>
        <ChipText top="Job post live" bottom="LinkedIn · Indeed · 2 more" />
      </FloatChip>
      <FloatChip className="left-20 top-[36%]" angle={3} delay={1}>
        <span className="text-xs text-muted">Fit</span>
        <span className="font-display text-2xl font-bold leading-none text-fg">94</span>
        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-[94%] rounded-full bg-mh-400" />
        </span>
      </FloatChip>
      <FloatChip className="left-6 -bottom-8" shape="pill" angle={-3} delay={2.2}>
        <span className="grid size-6 place-items-center rounded-full bg-mh-400/15 text-mh-300">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <span className="font-medium">Gate questions</span>
        <span className="text-muted">3/3 passed</span>
      </FloatChip>

      <FloatChip className="right-16 -top-9" shape="pill" angle={4} delay={3}>
        <span className="grid size-6 place-items-center rounded-full bg-white/[0.06] text-mh-300">
          <ShieldCheck className="size-3.5" />
        </span>
        <span className="font-medium">Audit trail</span>
        <span className="text-muted">every score logged</span>
      </FloatChip>
      <FloatChip className="right-0 top-[30%]" angle={-3} delay={3.5}>
        <span className={`${iconBox} bg-mh-400/15 text-mh-300`}>
          <Mic className="size-[18px]" />
        </span>
        <ChipText top="Voice interview" bottom="18 min · scored 4/5" />
      </FloatChip>
      <FloatChip className="right-10 -bottom-8" tone="amber" angle={4} delay={4.5}>
        <span className="flex -space-x-1">
          {shortlist.map((p) => (
            <span
              key={p.initials}
              className={`grid size-7 place-items-center rounded-full text-[9px] font-semibold tracking-tight text-white ring-2 ring-sun-400 ${p.bg}`}
            >
              {p.initials}
            </span>
          ))}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">Your call</span>
          <span className="block text-xs text-[#2b1c04]/75">3 ready to approve</span>
        </span>
      </FloatChip>
    </>
  );
}

export function SolutionsChips() {
  return (
    <>
      <FloatChip className={L} tilt="left" delay={2}>
        <span className={`${iconBox} bg-white/[0.06] text-mh-300`}>
          <RefreshCw className="size-[18px]" />
        </span>
        <ChipText top="Bullhorn" bottom="Synced · 2 min ago" />
      </FloatChip>
      <FloatChip className={R} tone="green" tilt="right" delay={4}>
        <span className="font-display text-base font-bold">From $99/mo</span>
      </FloatChip>
    </>
  );
}

export function ResultsChips() {
  return (
    <>
      <FloatChip className={L} tilt="left" delay={0.5}>
        <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
          <FileCheck2 className="size-[18px]" />
        </span>
        <ChipText top="Insights report" bottom="4.3 / 5 · sent to client" />
      </FloatChip>
      <FloatChip className={R} tilt="right" delay={3}>
        <span className={`${iconBox} bg-sun-400/15 text-sun-300`}>
          <UserCheck className="size-[18px]" />
        </span>
        <ChipText top="Approved" bottom="by J. Ortiz, Recruiter" />
      </FloatChip>
    </>
  );
}

/* Inner-page heroes */
const HL = "left-0 top-14";
const HR = "right-0 top-44";

export function PricingHeroChips() {
  return (
    <>
      <FloatChip className={HL} tilt="left">
        <ChipText top="$99" bottom="per recruiter / month" topClass="font-display text-xl" />
      </FloatChip>
      <FloatChip className={HR} tilt="right" delay={3}>
        <span className="size-2.5 shrink-0 rounded-full bg-mh-400" />
        <ChipText top="No contract" bottom="Cancel any time" />
      </FloatChip>
    </>
  );
}

export function AboutHeroChips() {
  return (
    <>
      <FloatChip className={HL} tilt="left" delay={1}>
        <ChipText top="20 years" bottom="running a staffing agency" topClass="font-display text-xl" />
      </FloatChip>
      <FloatChip className={HR} tilt="right" delay={3.5}>
        <span className="size-2.5 shrink-0 rounded-full bg-sun-400" />
        <ChipText top="Humans decide" bottom="AI runs the pipeline" />
      </FloatChip>
    </>
  );
}

export function ContactHeroChips() {
  return (
    <>
      <FloatChip className={HL} tilt="left" delay={0.5}>
        <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
          <Clock3 className="size-[18px]" />
        </span>
        <ChipText top="We reply fast" bottom="Within one business day" />
      </FloatChip>
      <FloatChip className={HR} tilt="right" delay={3}>
        <span className={`${iconBox} bg-mh-400/15 text-mh-300`}>
          <CalendarCheck className="size-[18px]" />
        </span>
        <ChipText top="30-min live demo" bottom="On one of your real roles" />
      </FloatChip>
    </>
  );
}
