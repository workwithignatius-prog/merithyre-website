import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/section-heading";
import { LogoMark } from "@/components/layout/logo";

/** Short, human note from the founders, set like a signed letter (copy from the current merithyre.ai About page). */
export function FounderNote() {
  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20">
      <figure className="reveal relative mx-auto grid max-w-[1180px] grid-cols-1 gap-10 overflow-hidden rounded-[32px] border border-white/[0.07] bg-[#0e0e0f] px-7 py-12 sm:px-12 sm:py-16 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-14 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-56 -left-40 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(231_165_82/0.13),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-56 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(47_154_104/0.1),transparent)]"
        />

        <figcaption className="relative order-2 flex flex-col justify-between gap-8 lg:order-1">
          <Label className="hidden lg:block">From the founders</Label>
          <div>
            <div className="flex items-center gap-4">
              <LogoMark size={48} />
              <div>
                <p className="font-semibold text-fg">The MeritHyre founding team</p>
                <p className="text-sm text-muted">Former staffing agency directors</p>
              </div>
            </div>
            <ButtonLink href="/about-us/" variant="secondary" arrow className="mt-8">
              Read our story
            </ButtonLink>
          </div>
        </figcaption>

        <div className="relative order-1 lg:order-2">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-16 hidden select-none font-display text-[240px] leading-none text-white/[0.06] sm:block"
          >
            “
          </span>
          <Label className="mb-6 lg:hidden">From the founders</Label>
          <blockquote className="relative font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-fg">
            “Most recruitment tools are built by engineers who have never placed a candidate. We built MeritHyre after{" "}
            <span className="whitespace-nowrap text-sun-300">20 years</span> of doing exactly that.”
          </blockquote>
          <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            We know what hiring means at 2am on a Tuesday, when a client is waiting on a submission and the application pile
            hasn&apos;t been touched. That&apos;s the morning MeritHyre was built to fix.
          </p>
        </div>
      </figure>
    </section>
  );
}
