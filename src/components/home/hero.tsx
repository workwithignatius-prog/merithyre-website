import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { HeroProduct } from "./hero-product";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-14 pb-8 sm:px-6 sm:pt-24">
      {/* backdrop */}
      <div aria-hidden className="bg-grid fade-radial absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-280px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(18_196_125/0.22),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] text-center">
        <Eyebrow>AI-native recruitment automation</Eyebrow>
        <h1 className="mx-auto mt-6 max-w-5xl text-[clamp(2.75rem,7.2vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
          <span className="text-gradient block">Hire at machine speed.</span>
          <span className="text-gradient-brand block pb-1">Decide like a human.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
          MeritHyre sources, screens, ranks and interviews every applicant overnight, then hands your team a decision-ready shortlist.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={site.demoHref} size="lg" arrow>
            Book a demo
          </ButtonLink>
          <ButtonLink href="/#how-it-works" size="lg" variant="secondary">
            See how it works
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-subtle">From $99/month · No contract · Live in under a day</p>

        <HeroProduct />
      </div>
    </section>
  );
}
