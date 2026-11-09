import type { Quote } from "@/content/testimonials";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

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

function Attribution({ q, className, onColor }: { q: Quote; className?: string; onColor: "dark" | "light" | "gradient" }) {
  return (
    <figcaption className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
          onColor === "light" ? "border-black/10 bg-paper text-ink-muted" : "border-white/15 bg-white/10 text-white/80",
        )}
      >
        {initials(q.company && !/company$/i.test(q.company) ? q.company : q.author)}
      </span>
      <span className="text-sm">
        <span className={cn("block font-medium", onColor === "light" ? "text-ink" : "text-white")}>{q.author}</span>
        {q.company && (
          <span className={cn("block", onColor === "light" ? "text-ink-subtle" : onColor === "gradient" ? "text-white/70" : "text-subtle")}>
            {q.company}
          </span>
        )}
      </span>
    </figcaption>
  );
}

function SmallQuote({ q, tone }: { q: Quote; tone: Tone }) {
  const light = tone === "light";
  return (
    <figure
      className={cn(
        "reveal group flex flex-col rounded-[24px] border p-7 transition-[translate,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1",
        light
          ? "border-black/[0.07] bg-white shadow-[0_18px_40px_-28px_rgb(0_0_0/0.35)] hover:border-black/15 hover:shadow-[0_26px_50px_-28px_rgb(0_0_0/0.4)]"
          : "border-white/[0.08] bg-panel hover:border-white/[0.18] hover:bg-[#121315]",
      )}
    >
      <QuoteMark
        className={cn(
          "size-6 transition-[color,rotate] duration-300 group-hover:-rotate-6",
          light ? "text-mh-600 group-hover:text-sun-700" : "text-mh-400/70 group-hover:text-sun-300",
        )}
      />
      <blockquote className={cn("mt-5 flex-1 text-[16.5px] leading-relaxed", light ? "text-ink" : "text-fg")}>“{q.quote}”</blockquote>
      <Attribution
        q={q}
        onColor={light ? "light" : "dark"}
        className={cn("mt-7 border-t pt-5", light ? "border-black/[0.07]" : "border-white/[0.07]")}
      />
    </figure>
  );
}

/**
 * One large featured quote beside two smaller ones (falls back to a plain grid for other counts).
 * On light sections the featured quote sits on the brand gradient.
 */
export function Quotes({ items, tone = "dark" }: { items: Quote[]; tone?: Tone }) {
  if (items.length !== 3) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((q) => (
          <SmallQuote key={q.quote} q={q} tone={tone} />
        ))}
      </div>
    );
  }
  const [lead, ...rest] = items;
  const light = tone === "light";
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <figure
        className={cn(
          "reveal group relative flex flex-col overflow-hidden rounded-[28px] p-8 sm:p-11",
          light ? "bg-backdrop shadow-[0_40px_80px_-45px_rgb(19_58_44/0.9)]" : "border border-white/[0.08] bg-[#0f1011] transition-[border-color] duration-500 hover:border-white/[0.16]",
        )}
      >
        {light ? (
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,rgb(6_16_11/0.62),rgb(6_16_11/0.28)_60%,rgb(6_16_11/0.1))] transition-opacity duration-500 group-hover:opacity-80" />
        ) : (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgb(231_165_82/0.17),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -left-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(47_154_104/0.14),transparent)]"
            />
          </>
        )}
        <QuoteMark className={cn("relative size-10 transition-[rotate] duration-500 group-hover:-rotate-6", light ? "text-sun-200" : "text-sun-300")} />
        <blockquote className="relative mt-8 flex-1 font-display text-[clamp(1.55rem,2.6vw,2.2rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-white">
          “{lead.quote}”
        </blockquote>
        <Attribution q={lead} onColor={light ? "gradient" : "dark"} className="relative mt-10" />
      </figure>
      <div className="grid grid-cols-1 gap-4">
        {rest.map((q) => (
          <SmallQuote key={q.quote} q={q} tone={tone} />
        ))}
      </div>
    </div>
  );
}
