import {
  Briefcase,
  CalendarCheck,
  Check,
  Clock3,
  FileCheck2,
  FileText,
  ListOrdered,
  Megaphone,
  Mic,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Sunrise,
  UserCheck,
  Zap,
} from "lucide-react";
import { ChipText, FloatChip } from "@/components/ui/decor";

/*
 * Floating product fragments that sit in the empty space beside centred headings
 * (desktop only). Each set tells a small piece of the product story; on the
 * homepage sets of six, early steps on the left and later ones on the right,
 * staggered so neither side reads as a column.
 */

const iconBox = "grid size-9 shrink-0 place-items-center rounded-xl";
const pillIcon = "grid size-6 shrink-0 place-items-center rounded-full";

/* "Seven stages. AI runs six. You make the call." The night, hour by hour. */
export function OvernightChips() {
  return (
    <>
      <FloatChip className="left-0 -top-10" angle={-5}>
        <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
          <Clock3 className="size-[18px]" />
        </span>
        <ChipText top="11:04 PM" bottom="Job posted to 4 boards" />
      </FloatChip>
      <FloatChip className="left-6 top-[38%]" shape="pill" angle={3} delay={1.2}>
        <span className={`${pillIcon} bg-white/[0.06] text-mh-300`}>
          <ScanSearch className="size-3.5" />
        </span>
        <span className="font-medium">12:30 AM</span>
        <span className="text-muted">186 screened</span>
      </FloatChip>
      <FloatChip className="left-2 -bottom-9" angle={-3} delay={2.4}>
        <span className={`${iconBox} bg-mh-400/15 text-mh-300`}>
          <Mic className="size-[18px]" />
        </span>
        <ChipText top="3:15 AM" bottom="37 AI interviews done" />
      </FloatChip>

      <FloatChip className="right-12 -top-8" shape="pill" angle={4} delay={3}>
        <span className={`${pillIcon} bg-white/[0.06] text-white/80`}>
          <FileText className="size-3.5" />
        </span>
        <span className="font-medium">5:40 AM</span>
        <span className="text-muted">reports written</span>
      </FloatChip>
      <FloatChip className="right-0 top-[34%]" angle={-3} delay={2.5}>
        <span className="size-2.5 shrink-0 rounded-full bg-sun-400" />
        <ChipText top="6:12 AM" bottom="Shortlist ready for you" />
      </FloatChip>
      <FloatChip className="right-8 -bottom-10" tone="amber" angle={4} delay={4.2}>
        <span className={`${iconBox} bg-[#2b1c04]/10`}>
          <UserCheck className="size-[18px]" />
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">9:02 AM</span>
          <span className="block text-xs text-[#2b1c04]/75">You approved 3</span>
        </span>
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

/* "Built for teams that hire seriously." One pipeline, set up your way. */
export function SolutionsChips() {
  return (
    <>
      <FloatChip className="left-0 -top-10" angle={-5}>
        <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
          <Briefcase className="size-[18px]" />
        </span>
        <ChipText top="Forklift Operator" bottom="2nd shift · 186 screened" />
      </FloatChip>
      <FloatChip className="left-24 top-[40%]" angle={3} delay={2}>
        <span className={`${iconBox} bg-white/[0.06] text-mh-300`}>
          <RefreshCw className="size-[18px]" />
        </span>
        <ChipText top="Bullhorn" bottom="Synced · 2 min ago" />
      </FloatChip>
      <FloatChip className="left-4 -bottom-9" shape="pill" angle={-3} delay={3.4}>
        <span className={`${pillIcon} bg-mh-400/15 text-mh-300`}>
          <Zap className="size-3.5" />
        </span>
        <span className="font-medium">Live in under a day</span>
      </FloatChip>

      <FloatChip className="right-16 -top-8" shape="pill" angle={4} delay={1}>
        <span className={`${pillIcon} bg-white/[0.06] text-mh-300`}>
          <SlidersHorizontal className="size-3.5" />
        </span>
        <span className="font-medium">Your criteria</span>
        <span className="text-muted">weighted your way</span>
      </FloatChip>
      <FloatChip className="right-0 top-[36%]" tone="green" angle={-4} delay={4}>
        <span className="font-display text-base font-bold">From $99/mo</span>
      </FloatChip>
      <FloatChip className="right-12 -bottom-9" shape="pill" angle={3} delay={2.8}>
        <span className={`${pillIcon} bg-white/[0.06] text-white/80`}>
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <span className="font-medium">No contract</span>
        <span className="text-muted">cancel any time</span>
      </FloatChip>
    </>
  );
}

/*
 * "Recruiting teams that made the switch." What changes once it runs. Six chips
 * on the homepage; `compact` keeps four for the one-line "In their own words."
 * heading on the solution pages, where six would crowd it.
 */
export function ResultsChips({ compact = false }: { compact?: boolean }) {
  const insights = (cls: string) => (
    <FloatChip className={cls} angle={-5} delay={0.5}>
      <span className={`${iconBox} bg-white/[0.06] text-white/80`}>
        <FileCheck2 className="size-[18px]" />
      </span>
      <ChipText top="Insights report" bottom="4.3 / 5 · sent to client" />
    </FloatChip>
  );
  const noCvs = (cls: string) => (
    <FloatChip className={cls} shape="pill" angle={3} delay={2}>
      <span className={`${pillIcon} bg-mh-400/15 text-mh-300`}>
        <Check className="size-3.5" strokeWidth={3} />
      </span>
      <span className="font-medium">0 CVs</span>
      <span className="text-muted">read by hand</span>
    </FloatChip>
  );
  const morning = (cls: string) => (
    <FloatChip className={cls} shape="pill" angle={4} delay={1.4}>
      <span className={`${pillIcon} bg-sun-400/15 text-sun-300`}>
        <Sunrise className="size-3.5" />
      </span>
      <span className="font-medium">Ranked shortlist</span>
      <span className="text-muted">every morning</span>
    </FloatChip>
  );
  const approved = (cls: string) => (
    <FloatChip className={cls} angle={-3} delay={3}>
      <span className={`${iconBox} bg-sun-400/15 text-sun-300`}>
        <UserCheck className="size-[18px]" />
      </span>
      <ChipText top="Approved" bottom="by J. Ortiz, Recruiter" />
    </FloatChip>
  );

  if (compact) {
    return (
      <>
        {insights("left-0 -top-6")}
        {noCvs("left-12 -bottom-8")}
        {morning("right-8 -top-8")}
        {approved("right-0 -bottom-10")}
      </>
    );
  }
  return (
    <>
      {insights("left-0 -top-8")}
      {noCvs("left-20 top-[42%]")}
      <FloatChip className="left-4 -bottom-9" shape="pill" angle={-3} delay={3.6}>
        <span className={`${pillIcon} bg-white/[0.06] text-mh-300`}>
          <ListOrdered className="size-3.5" />
        </span>
        <span className="font-medium">Same criteria</span>
        <span className="text-muted">every applicant</span>
      </FloatChip>

      {morning("right-10 -top-10")}
      {approved("right-0 top-[24%]")}
      <FloatChip className="right-10 -bottom-9" shape="pill" angle={3} delay={4.4}>
        <span className={`${pillIcon} bg-mh-400/15 text-mh-300`}>
          <Mic className="size-3.5" />
        </span>
        <span className="font-medium">24/7 interviews</span>
        <span className="text-muted">nothing to schedule</span>
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
