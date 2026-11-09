import { ArrowUpRight, CalendarCheck, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const rows = [
  { icon: Phone, label: site.contact.phone, href: site.contact.phoneHref },
  { icon: Mail, label: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: CalendarCheck, label: "Book a 30-min demo", href: site.demoHref },
];

/** "Talk to a person" card that sits under a left-aligned heading (fills the space beside long lists). */
export function HelpCard({ className }: { className?: string }) {
  return (
    <div className={cn("reveal card max-w-sm p-5", className)}>
      <p className="flex items-center gap-2.5 text-sm text-muted">
        <span className="size-2 rounded-full bg-mh-400" />
        Talk to the team directly
      </p>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.label}>
            <a
              href={r.href}
              className="group/row flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] px-4 py-3 text-[15px] text-fg transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.04]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <r.icon aria-hidden className="size-4 shrink-0 text-mh-300" />
                <span className="truncate">{r.label}</span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-subtle transition-[translate,color] duration-300 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-fg"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
