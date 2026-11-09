import {
  CalendarCheck,
  FileCheck2,
  ListOrdered,
  Mic,
  ScanSearch,
  SlidersHorizontal,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export type Stage = {
  n: string;
  title: string;
  short: string;
  icon: LucideIcon;
  human?: boolean;
};

export const stages: Stage[] = [
  { n: "01", title: "Source", short: "AI scans LinkedIn, Indeed and more", icon: ScanSearch },
  { n: "02", title: "Screen", short: "Every applicant scored on your criteria", icon: SlidersHorizontal },
  { n: "03", title: "Rank", short: "Best fit first, with the reasoning", icon: ListOrdered },
  { n: "04", title: "Shortlist", short: "You approve who advances", icon: UserCheck, human: true },
  { n: "05", title: "Schedule", short: "Self-booking. Zero emails", icon: CalendarCheck },
  { n: "06", title: "Interview", short: "Voice, video or text, 24/7", icon: Mic },
  { n: "07", title: "Report", short: "Transcript, scores, strengths, gaps", icon: FileCheck2 },
];
