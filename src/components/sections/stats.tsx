import { cn } from "@/lib/cn";

/**
 * Headline numbers on the brand gradient. A colour band that breaks up the dark
 * page right after a hero. Works with 3 or 4 items.
 */
export function Stats({ items, className }: { items: readonly { value: string; label: string }[]; className?: string }) {
  const three = items.length === 3;
  return (
    <div className={cn("reveal bg-backdrop relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgb(47_154_104/0.55)]", className)}>
      <div aria-hidden className="absolute inset-0 bg-[#06100b]/55" />
      <dl className={cn("relative grid", three ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
        {items.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "group px-6 py-8 transition-colors duration-300 hover:bg-white/[0.04] sm:px-8 sm:py-10",
              three && i > 0 && "border-t border-white/[0.12] sm:border-l sm:border-t-0",
              !three && i % 2 === 1 && "border-l border-white/[0.12]",
              !three && i >= 2 && "border-t border-white/[0.12] lg:border-t-0",
              !three && i === 2 && "lg:border-l",
            )}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-[clamp(2.3rem,4.4vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-white transition-[translate] duration-300 group-hover:-translate-y-1">
              {s.value}
            </dd>
            <dd className="mt-3 max-w-[15rem] text-sm leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
