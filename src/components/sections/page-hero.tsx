import type { ReactNode } from "react";
import { Label } from "@/components/ui/section-heading";

/**
 * Centred hero for inner pages, lit by the hero gradient. Optional floating chips
 * either side (`decor`) and an optional block below the headline (`after`) that
 * still sits on the gradient, e.g. stats or the pricing cards.
 */
export function PageHero({
  eyebrow,
  title,
  body,
  decor,
  children,
  after,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  decor?: ReactNode;
  children?: ReactNode;
  after?: ReactNode;
}) {
  return (
    <section className="relative px-5 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div aria-hidden className="bg-hero-center pointer-events-none absolute inset-x-0 -top-40 bottom-0" />
      <div className="relative mx-auto max-w-[1180px]">
        {decor}
        <div className="mx-auto max-w-4xl text-center">
          <Label className="text-mh-200">{eyebrow}</Label>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,6.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">{title}</h1>
          {body && <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/80 sm:text-xl sm:leading-relaxed">{body}</p>}
          {children}
        </div>
      </div>
      {after && <div className="relative mx-auto mt-14 max-w-[1180px] sm:mt-16">{after}</div>}
    </section>
  );
}
