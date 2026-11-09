import { cn } from "@/lib/cn";

/**
 * Headline numbers as a frosted-glass strip. Sits at the foot of a hero, on the
 * hero gradient. Works with 3 or 4 items.
 */
export function Stats({ items, className }: { items: readonly { value: string; label: string }[]; className?: string }) {
  const three = items.length === 3;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/[0.16] bg-white/[0.07] shadow-[0_30px_70px_-40px_rgb(0_0_0/0.8)] backdrop-blur-md",
        className,
      )}
    >
      <dl className={cn("grid", three ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
        {items.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "group px-6 py-7 transition-colors duration-300 hover:bg-white/[0.06] sm:px-8 sm:py-9",
              three && i > 0 && "border-t border-white/[0.12] sm:border-l sm:border-t-0",
              !three && i % 2 === 1 && "border-l border-white/[0.12]",
              !three && i >= 2 && "border-t border-white/[0.12] lg:border-t-0",
              !three && i === 2 && "lg:border-l",
            )}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-[clamp(2.2rem,4.2vw,3.3rem)] font-bold leading-none tracking-[-0.04em] text-white transition-[translate,color] duration-300 group-hover:-translate-y-1 group-hover:text-mh-200">
              {s.value}
            </dd>
            <dd className="mt-3 max-w-[15rem] text-sm leading-snug text-white/75 transition-colors duration-300 group-hover:text-white">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
