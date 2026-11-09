import type { ReactNode } from "react";
import { Quotes } from "@/components/sections/quotes";
import { ResultsChips } from "@/components/sections/heading-chips";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Quote } from "@/content/testimonials";

/** Customer quotes on a light paper sheet: a bright break in the dark page. */
export function Testimonials({
  eyebrow,
  title,
  items,
  compactChips = false,
}: {
  eyebrow: string;
  title: ReactNode;
  items: Quote[];
  /** Four heading chips instead of six, for short one-line titles. */
  compactChips?: boolean;
}) {
  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-paper px-6 py-12 sm:px-12 sm:py-16 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-48 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(246_183_78/0.26),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-56 -left-48 size-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(52_227_156/0.24),transparent)]"
        />
        <div className="relative">
          <SectionHeading tone="light" decor={<ResultsChips compact={compactChips} />} eyebrow={eyebrow} title={title} />
          <div className="mt-14">
            <Quotes items={items} tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
