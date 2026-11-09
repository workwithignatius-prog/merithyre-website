import {
  FileCheck2,
  History,
  Lock,
  Mic,
  ScanSearch,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

export type Plan = {
  name: string;
  price: number;
  unit: string;
  blurb: string;
  features: string[];
  cta: string;
  segment: "agency" | "startup" | "smb" | "enterprise";
  tag?: string;
  featured?: boolean;
};

export const agencyPlan: Plan = {
  name: "Staffing Agencies",
  price: 99,
  unit: "per recruiter / month",
  blurb: "Every pipeline feature included. Priced per seat, so it grows with your desk.",
  segment: "agency",
  cta: "Book an agency demo",
  features: [
    "Unlimited job campaigns",
    "AI sourcing across all connected boards",
    "Automated screening & ranking",
    "AI voice, video & text interviews",
    "Candidate Insights Reports",
    "Bullhorn & Greenhouse integration",
    "Full compliance audit trail",
  ],
};

export const inHousePlans: Plan[] = [
  {
    name: "Startups",
    price: 99,
    unit: "/ month",
    blurb: "All features. Cancel any time.",
    segment: "startup",
    cta: "Get started",
    features: [
      "Unlimited job campaigns",
      "AI sourcing, screening, ranking & interviews",
      "Candidate Insights Reports for every interview",
      "ATS integration or standalone use",
      "Setup in under a day",
      "No annual commitment",
    ],
  },
  {
    name: "SMBs & Mid-Market",
    price: 199,
    unit: "/ month",
    blurb: "The full pipeline for lean HR teams.",
    segment: "smb",
    cta: "Book a demo",
    tag: "Unlimited roles",
    featured: true,
    features: [
      "Unlimited concurrent open roles",
      "AI sourcing, screening & ranking",
      "AI voice, video & text interviews",
      "Candidate Insights Reports for every interview",
      "Greenhouse, Bullhorn & Tellent integration",
      "Candidate self-booking for human stages",
      "NYC LL144 & EEOC compliance tools",
    ],
  },
  {
    name: "Enterprise",
    price: 299,
    unit: "/ month",
    blurb: "Volume pricing and an enterprise SLA.",
    segment: "enterprise",
    cta: "Talk to sales",
    features: [
      "Unlimited roles and campaigns",
      "Hybrid Evaluation Mode: a person approves every AI score",
      "Audit trail for NYC LL144, EEOC, FEHA & EU AI Act",
      "Bidirectional Greenhouse, Bullhorn & Tellent sync",
      "Dedicated onboarding & account management",
      "Custom integrations",
    ],
  },
];

export const includedEverywhere: { title: string; body: string; icon: LucideIcon }[] = [
  { title: "AI sourcing", body: "Boards scanned and JD drafted for you", icon: ScanSearch },
  { title: "Screening & ranking", body: "Your criteria, applied to everyone", icon: SlidersHorizontal },
  { title: "AI interviews", body: "Voice, video or text, any hour", icon: Mic },
  { title: "Insights Reports", body: "Transcript, scores, strengths, gaps", icon: FileCheck2 },
  { title: "Human approval gate", body: "Nothing advances without you", icon: Lock },
  { title: "Audit trail", body: "Every score and decision logged", icon: History },
];

export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "Is there a contract?",
    a: "No. There's no long-term contract on any plan and no annual commitment.",
  },
  {
    q: "How does per-recruiter pricing work for agencies?",
    a: "Agencies pay $99 per recruiter per month with every pipeline feature included. A five-recruiter desk is $495 a month.",
  },
  {
    q: "Are there per-role or per-hire fees?",
    a: "No. You pay the plan price, with no per-role or per-hire fees.",
  },
  {
    q: "Do we need an ATS?",
    a: "No. MeritHyre runs standalone, or syncs with Bullhorn, Greenhouse and Tellent. Custom integrations are available on Enterprise.",
  },
  {
    q: "How long does setup take?",
    a: "Under a day. Connect your ATS (or don't), configure a role, and the pipeline starts working right away.",
  },
  {
    q: "Is volume pricing available?",
    a: "Yes, on the Enterprise plan. Tell us about your hiring volume and SLA needs and we'll put a quote together.",
  },
];
