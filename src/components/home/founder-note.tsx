import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/section-heading";
import { LogoMark } from "@/components/layout/logo";

/** Short, human note from the founders (copy from the current merithyre.ai About page). */
export function FounderNote() {
  return (
    <section className="px-5 py-16 sm:px-6 sm:py-24">
      <figure className="reveal mx-auto grid max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] lg:gap-16">
        <figcaption className="order-2 lg:order-1">
          <Label>From the founders</Label>
          <div className="mt-6 flex items-center gap-4">
            <LogoMark className="size-12 rounded-[12px] text-2xl" />
            <div>
              <p className="font-semibold text-fg">The MeritHyre founding team</p>
              <p className="text-sm text-muted">Former staffing agency directors</p>
            </div>
          </div>
          <ButtonLink href="/about-us/" variant="secondary" arrow className="mt-8">
            Read our story
          </ButtonLink>
        </figcaption>
        <div className="relative order-1 lg:order-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-4 -top-20 select-none font-display text-[260px] leading-none text-white/[0.05] sm:-left-10"
          >
            “
          </span>
          <blockquote className="relative font-display text-[clamp(1.9rem,3.7vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg">
            “Most recruitment tools are built by engineers who have never placed a candidate. We built MeritHyre after{" "}
            <span className="whitespace-nowrap text-sun-300">20 years</span> of doing exactly that.”
          </blockquote>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            We know what hiring means at 2am on a Tuesday, when a client is waiting on a submission and the application pile
            hasn&apos;t been touched. That&apos;s the morning MeritHyre was built to fix.
          </p>
        </div>
      </figure>
    </section>
  );
}
