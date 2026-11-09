import { CalendarX2, Inbox, MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";

/*
 * The "2am on a Tuesday" moment from the origin story, drawn as a stack of
 * notifications. Decorative only; the same story is told in the copy beside it.
 */
const notes = [
  {
    icon: MessageSquare,
    title: "Client",
    body: "Any submissions for the shift lead role yet?",
    time: "1:52 AM",
    tone: "bg-sun-400/15 text-sun-300",
    place: "-rotate-[2.5deg]",
  },
  {
    icon: Inbox,
    title: "Applications",
    body: "212 unread · 0 screened",
    time: "2:00 AM",
    tone: "bg-white/[0.06] text-white/80",
    place: "ml-10 rotate-[1.5deg]",
  },
  {
    icon: CalendarX2,
    title: "First-round calls",
    body: "0 of 18 scheduled",
    time: "2:04 AM",
    tone: "bg-white/[0.06] text-white/80",
    place: "ml-4 -rotate-[1deg]",
  },
];

export function LateNightStack({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("reveal max-w-[400px]", className)}>
      <p className="text-xs font-medium text-subtle">Tuesday, 2:04 AM. Before MeritHyre.</p>
      <ul className="mt-4 space-y-2.5">
        {notes.map((n) => (
          <li
            key={n.title}
            className={cn(
              "flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141517] px-4 py-3 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.9)] transition-[rotate,border-color,translate] duration-500 ease-out hover:-translate-y-0.5 hover:rotate-0 hover:border-white/25",
              n.place,
            )}
          >
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", n.tone)}>
              <n.icon className="size-[18px]" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-semibold text-fg">{n.title}</span>
                <span className="text-[11px] tabular-nums text-subtle">{n.time}</span>
              </span>
              <span className="mt-0.5 block truncate text-[13px] text-muted">{n.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
