import { Briefcase, Building2, Layers, Rocket, type LucideIcon } from "lucide-react";
import type { Quote } from "./testimonials";

export type SegmentSlug = "staffing" | "smbs-midmarket" | "enterprise" | "startups";

export type Segment = {
  slug: SegmentSlug;
  href: string;
  name: string;
  short: string;
  icon: LucideIcon;
  price: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; highlight: string; body: string };
  /** Illustrative product card shown in the hero */
  visual: { role: string; rows: { label: string; value: string; tone?: "ai" | "human" }[] };
  stats: { value: string; label: string }[];
  problems: { before: string; beforeBody: string; after: string; afterBody: string }[];
  quotes: Quote[];
};

export const segments: Segment[] = [
  {
    slug: "staffing",
    href: "/staffing/",
    name: "Staffing agencies",
    short: "Submit faster. Win more mandates.",
    icon: Briefcase,
    price: "$99 per recruiter / month",
    meta: {
      title: "AI Recruiting for Staffing Agencies",
      description:
        "Submit faster and win more mandates. MeritHyre sources, screens and interviews candidates overnight so recruiters spend the day submitting. $99/recruiter/month.",
    },
    hero: {
      eyebrow: "For staffing agencies",
      title: "Submit faster.",
      highlight: "Win more mandates.",
      body: "MeritHyre runs your first-round pipeline the moment a job order lands. Sourcing, screening and AI interviews happen overnight, so recruiters spend the day submitting, not screening.",
    },
    visual: {
      role: "Forklift Operator · 2nd shift",
      rows: [
        { label: "Applicants screened", value: "186" },
        { label: "AI interviews completed", value: "37" },
        { label: "Shortlist ready", value: "6:12 AM" },
        { label: "Your call", value: "Review & submit", tone: "human" },
      ],
    },
    stats: [
      { value: "24/7", label: "AI interviews, nothing to schedule" },
      { value: "<1 day", label: "to set up" },
      { value: "0", label: "CVs read by hand before the shortlist" },
      { value: "$99", label: "per recruiter per month" },
    ],
    problems: [
      {
        before: "Slow to submit, losing mandates",
        beforeBody: "Competitors submit before your recruiters finish reading the brief.",
        after: "Submit before the competition calls",
        afterBody: "AI scans boards and screens applicants the moment a job order arrives. You review a ranked, interviewed shortlist.",
      },
      {
        before: "Recruiters buried in CVs",
        beforeBody: "Half the day goes on CVs that don't meet the brief.",
        after: "AI reads every CV. Recruiters review results",
        afterBody: "Every applicant is scored against the job criteria. Your team sees a ranked list, not a pile.",
      },
      {
        before: "Scheduling delays lose candidates",
        beforeBody: "Back-and-forth on first-round calls lets candidates take other placements.",
        after: "Interviews happen on demand",
        afterBody: "AI voice and video interviews run 24/7. Candidates finish the same day they apply.",
      },
    ],
    quotes: [
      {
        quote:
          "Our fill rate went up, client satisfaction went up, and we didn't add a single recruiter. We changed what our recruiters actually spend their time on.",
        author: "MD",
        company: "Mitchell Recruitment Group",
      },
      {
        quote:
          "The Candidate Insights Report is something we now send to clients as standard. No other agency in our market does this.",
        author: "Director",
        company: "Reynolds Staffing",
      },
      {
        quote:
          "I was skeptical AI interviews would work for light industrial roles. Within the first week, candidates were completing them at 10pm and 6am. The pipeline doesn't stop.",
        author: "Operations",
        company: "FastTrack Staffing",
      },
    ],
  },
  {
    slug: "smbs-midmarket",
    href: "/smbs-midmarket/",
    name: "SMBs & mid-market",
    short: "Enterprise-grade hiring without the budget.",
    icon: Building2,
    price: "$199 / month · unlimited roles",
    meta: {
      title: "AI Hiring for SMB & Mid-Market HR Teams",
      description:
        "Give a lean HR team the automated pipeline big TA departments pay millions to build. Unlimited roles for $199/month. No contract.",
    },
    hero: {
      eyebrow: "For SMBs & mid-market",
      title: "Enterprise-grade hiring.",
      highlight: "Without the enterprise budget.",
      body: "A two-person HR team can't run 40 open roles by hand. MeritHyre gives lean HR teams the automated pipeline big TA departments spend millions to build.",
    },
    visual: {
      role: "Customer Success Manager",
      rows: [
        { label: "Applicants screened", value: "248" },
        { label: "AI interviews completed", value: "29" },
        { label: "Shortlist ready", value: "8:40 AM" },
        { label: "Your call", value: "Approve shortlist", tone: "human" },
      ],
    },
    stats: [
      { value: "Days", label: "from job post to interviewed shortlist" },
      { value: "0", label: "CVs read by hand" },
      { value: "Unlimited", label: "open roles on one plan" },
      { value: "Always", label: "human approval before anyone advances" },
    ],
    problems: [
      {
        before: "Small HR team, too many open roles",
        beforeBody: "Two people can't give 30+ roles the attention they need. The best candidates move on first.",
        after: "Scale without new headcount",
        afterBody: "Sourcing, screening and first interviews run in parallel across every open role.",
      },
      {
        before: "No time to build a structured process",
        beforeBody: "Structured criteria and consistent questions take time you don't have.",
        after: "Structure is built in",
        afterBody: "MeritHyre drafts JDs, criteria and competency questions from your brief. You review and approve.",
      },
      {
        before: "Candidates wait days to hear back",
        beforeBody: "Slow replies and patchy updates hurt your employer brand.",
        after: "A professional experience for everyone",
        afterBody: "Instant acknowledgment, automated updates and an interview on the candidate's schedule.",
      },
    ],
    quotes: [
      {
        quote:
          "We were managing 40 roles with 2 people. MeritHyre didn't just help — it changed what those 2 people could actually accomplish in a week.",
        author: "HR Director",
        company: "Kellerton Logistics",
      },
      {
        quote:
          "The AI interviews were better than our manual first-round calls. More consistent questions, better scoring, full transcript. Our hiring manager stopped asking for phone screens.",
        author: "Head of People",
        company: "Meridian Tech",
      },
      {
        quote:
          "Setup was genuinely under a day. Connected our ATS, configured two roles, and had a ranked shortlist by the next morning. I didn't expect it to be that fast.",
        author: "HR Manager",
        company: "Crestview Solutions",
      },
    ],
  },
  {
    slug: "enterprise",
    href: "/enterprise/",
    name: "Enterprise",
    short: "Scale hiring volume, not headcount.",
    icon: Layers,
    price: "$299 / month · volume pricing & SLA",
    meta: {
      title: "Enterprise AI Recruitment Automation",
      description:
        "An AI-native hiring pipeline for enterprise TA: full audit trail, human approval at every gate, Hybrid Evaluation Mode and two-way ATS sync.",
    },
    hero: {
      eyebrow: "For enterprise TA",
      title: "Scale hiring volume.",
      highlight: "Not hiring headcount.",
      body: "An AI-native pipeline that absorbs volume without sacrificing consistency, compliance or candidate experience.",
    },
    visual: {
      role: "Retail Associate · 14 locations",
      rows: [
        { label: "Applicants screened", value: "1,284" },
        { label: "AI interviews completed", value: "212" },
        { label: "Audit trail", value: "100% logged" },
        { label: "Hybrid mode", value: "Scores held for review", tone: "human" },
      ],
    },
    stats: [
      { value: "100%", label: "of evaluations in the audit trail" },
      { value: "0", label: "auto-advancements without approval" },
      { value: "Hours", label: "from job post to ranked shortlist" },
      { value: "Always", label: "a human at every gate" },
    ],
    problems: [
      {
        before: "TA capacity can't match hiring volume",
        beforeBody: "New headcount needs budget cycles while the business wants 3× the roles.",
        after: "AI absorbs the volume",
        afterBody: "Sourcing, screening and first-round interviews run in parallel on every role, with no recruiter needed until the shortlist.",
      },
      {
        before: "Compliance is an afterthought",
        beforeBody: "“It depends who screened them” isn't defensible under NYC LL144 or EEOC review.",
        after: "Compliance is the architecture",
        afterBody: "Every score documented, every threshold set by your team, every evaluation reviewable in Hybrid Mode.",
      },
      {
        before: "Inconsistent experience at scale",
        beforeBody: "Different teams, different processes, different standards.",
        after: "One standard, every hire",
        afterBody: "The same structured process and communication for every candidate, on every team.",
      },
    ],
    quotes: [
      {
        quote:
          "Our legal team asked us to demonstrate how AI is used in our hiring process. The MeritHyre audit trail answered every question. Nothing was opaque.",
        author: "VP Talent Acquisition",
        company: "Northway Financial",
      },
      {
        quote:
          "We went from 6 rounds of manual screening per role to: AI handles 4, recruiter reviews 1. Time-to-offer dropped by more than half.",
        author: "Director TA",
        company: "Verano Group",
      },
      {
        quote:
          "The thing I didn't expect was how much our hiring managers liked it. They get a structured report with transcript and scores instead of 'I think they seemed good'.",
        author: "CHRO",
        company: "Meridian Health",
      },
    ],
  },
  {
    slug: "startups",
    href: "/startups/",
    name: "Startups",
    short: "Hire well before your first recruiter.",
    icon: Rocket,
    price: "$99 / month · cancel any time",
    meta: {
      title: "AI Hiring for Startups Without a Recruiter",
      description:
        "Hire well before you have a recruiter. MeritHyre writes the JD, screens applicants, runs first interviews and ranks a shortlist. $99/month, cancel any time.",
    },
    hero: {
      eyebrow: "For startups",
      title: "Hire well.",
      highlight: "Before you have a recruiter.",
      body: "Need 15 hires in 90 days and no recruiter? MeritHyre runs the whole pipeline, so founders can focus on the company, not the process.",
    },
    visual: {
      role: "Founding Account Executive",
      rows: [
        { label: "Applicants screened", value: "143" },
        { label: "AI interviews completed", value: "18" },
        { label: "Shortlist ready", value: "Mon 7:30 AM" },
        { label: "Your call", value: "Pick finalists", tone: "human" },
      ],
    },
    stats: [
      { value: "Days", label: "from job post to interviewed shortlist" },
      { value: "$99", label: "per month, no per-role fees" },
      { value: "0", label: "CVs read by hand" },
      { value: "<1 day", label: "to set up" },
    ],
    problems: [
      {
        before: "No recruiter, no process, no time",
        beforeBody: "Founders interview everyone and every hire is a one-off.",
        after: "A full pipeline from day one",
        afterBody: "MeritHyre writes the JD, screens applicants, runs first interviews and delivers a ranked shortlist.",
      },
      {
        before: "Slow hiring stalls growth",
        beforeBody: "Every day a key role sits open, the product and pipeline slow down.",
        after: "Candidates before you hit publish",
        afterBody: "AI starts sourcing the moment you open a role. You review a shortlist, not an inbox.",
      },
      {
        before: "You can't afford a bad hire",
        beforeBody: "At 20 people, one bad hire is 5% of the company.",
        after: "Structured evaluation, every time",
        afterBody: "Competency-based questions, the same criteria for everyone, and a full report on every candidate.",
      },
    ],
    quotes: [
      {
        quote:
          "We needed to go from 40 to 55 people in three months. I was doing every first-round interview myself. MeritHyre took that off my plate completely.",
        author: "CEO",
        company: "Vertal AI",
      },
      {
        quote:
          "The first week, I got a ranked shortlist of 8 candidates with full transcripts and competency scores. I spent 20 minutes reviewing it and scheduled final interviews. That was the whole process.",
        author: "COO",
        company: "Stackwise",
      },
      {
        quote:
          "Setup on a Sunday afternoon. First AI interviews completed by Monday morning. I wasn't expecting it to work that fast.",
        author: "Founder",
        company: "Helix Labs",
      },
    ],
  },
];

export function getSegment(slug: SegmentSlug): Segment {
  const s = segments.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown segment: ${slug}`);
  return s;
}
