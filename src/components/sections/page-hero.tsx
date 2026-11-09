import type { ReactNode } from "react";
import { Label } from "@/components/ui/section-heading";

/** Centered hero for inner pages. Soft atmosphere, optional floating chips either side. */
export function PageHero({
  eyebrow,
  title,
  body,
  decor,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  decor?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative px-5 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
      <div aria-hidden className="bg-atmosphere pointer-events-none absolute inset-x-0 -top-28 bottom-0" />
      <div className="relative mx-auto max-w-[1180px]">
        {decor}
        <div className="mx-auto max-w-4xl text-center">
          <Label>{eyebrow}</Label>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,6.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-fg">{title}</h1>
          {body && <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-xl sm:leading-relaxed">{body}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
