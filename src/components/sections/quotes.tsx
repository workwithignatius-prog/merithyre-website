import type { Quote } from "@/content/testimonials";
import { cn } from "@/lib/cn";

function initials(text: string) {
  return text
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6.5v-6.5H7c0-1.38 1.12-2.5 2.5-2.5V6Zm10 0c-3.04 0-5.5 2.46-5.5 5.5V18h6.5v-6.5H17c0-1.38 1.12-2.5 2.5-2.5V6Z" />
    </svg>
  );
}

function Attribution({ q, className }: { q: Quote; className?: string }) {
  return (
    <figcaption className={cn("flex items-center gap-3", className)}>
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-[11px] font-semibold text-muted">
        {initials(q.company && !/company$/i.test(q.company) ? q.company : q.author)}
      </span>
      <span className="text-sm">
        <span className="block font-medium text-fg">{q.author}</span>
        {q.company && <span className="block text-subtle">{q.company}</span>}
      </span>
    </figcaption>
  );
}

function SmallQuote({ q }: { q: Quote }) {
  return (
    <figure className="reveal card group flex flex-col p-7 transition-[translate,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-[#121315]">
      <QuoteMark className="size-6 text-mh-400/70 transition-[color,rotate] duration-300 group-hover:-rotate-6 group-hover:text-sun-300" />
      <blockquote className="mt-5 flex-1 text-[16.5px] leading-relaxed text-fg">“{q.quote}”</blockquote>
      <Attribution q={q} className="mt-7 border-t border-white/[0.07] pt-5" />
    </figure>
  );
}

/** One large featured quote beside two smaller ones (falls back to a plain grid for other counts). */
export function Quotes({ items }: { items: Quote[] }) {
  if (items.length !== 3) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((q) => (
          <SmallQuote key={q.quote} q={q} />
        ))}
      </div>
    );
  }
  const [lead, ...rest] = items;
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <figure className="reveal group relative flex flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0f1011] p-8 transition-[border-color] duration-500 hover:border-white/[0.16] sm:p-11">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(231_165_82/0.17),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(47_154_104/0.14),transparent)]"
        />
        <QuoteMark className="relative size-10 text-sun-300 transition-[rotate] duration-500 group-hover:-rotate-6" />
        <blockquote className="relative mt-8 flex-1 font-display text-[clamp(1.55rem,2.6vw,2.2rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-fg">
          “{lead.quote}”
        </blockquote>
        <Attribution q={lead} className="relative mt-10" />
      </figure>
      <div className="grid grid-cols-1 gap-4">
        {rest.map((q) => (
          <SmallQuote key={q.quote} q={q} />
        ))}
      </div>
    </div>
  );
}
