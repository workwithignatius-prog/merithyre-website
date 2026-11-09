import Link from "next/link";
import { ArrowRight } from "lucide-react";

const items: { text: string; href?: string }[] = [
  {
    text: "New guide: how to spot fake profiles and proxy interviewees",
    href: "/blog/candidate-fraud-in-hiring-spot-fake-profiles-and-proxies/",
  },
  { text: "Plans from $99/month. No contract." },
  { text: "Live in under a day." },
  { text: "Two-way sync with Bullhorn, Greenhouse and Tellent." },
  { text: "Built by recruiters with 20 years in staffing." },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((it) => (
        <li key={it.text} className="flex items-center">
          {it.href ? (
            <Link
              href={it.href}
              tabIndex={hidden ? -1 : undefined}
              className="inline-flex items-center gap-1 font-medium text-fg underline decoration-white/25 underline-offset-4 hover:decoration-mh-300"
            >
              {it.text}
              <ArrowRight aria-hidden className="size-3.5 text-mh-300" />
            </Link>
          ) : (
            <span>{it.text}</span>
          )}
          <span aria-hidden className="mx-7 inline-block size-1 rotate-45 bg-mh-400" />
        </li>
      ))}
    </ul>
  );
}

/** Scrolling announcement bar. Pauses on hover; static for reduced motion. */
export function Announcement() {
  return (
    <div className="relative z-10 overflow-hidden border-b border-white/[0.06] bg-[#050505] text-[13px] text-white/70">
      <div className="animate-marquee flex w-max py-2.5 hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050505] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent" />
    </div>
  );
}
