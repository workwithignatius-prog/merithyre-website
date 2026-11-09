import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/section-heading";

/** Centered hero used on inner pages. */
export function PageHero({ eyebrow, title, body, children }: { eyebrow: string; title: ReactNode; body?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden px-5 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
      <div aria-hidden className="bg-grid fade-radial absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-260px] h-[540px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(18_196_125/0.2),transparent)] blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,4.9rem)] font-semibold leading-[0.97] tracking-[-0.05em]">{title}</h1>
        {body && <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-xl sm:leading-relaxed">{body}</p>}
        {children}
      </div>
    </section>
  );
}
