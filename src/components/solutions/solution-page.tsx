import { Check, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { PipelineTrack } from "@/components/sections/pipeline-track";
import { Quotes } from "@/components/sections/quotes";
import { SegmentCards } from "@/components/sections/segment-cards";
import { Stats } from "@/components/sections/stats";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/content/site";
import type { Segment } from "@/content/segments";
import { SegmentVisual } from "./segment-visual";

export function SolutionPage({ segment }: { segment: Segment }) {
  return (
    <>
      <section className="relative overflow-hidden px-5 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
        <div aria-hidden className="bg-grid fade-radial absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute left-[30%] top-[-260px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(18_196_125/0.2),transparent)] blur-3xl"
        />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Eyebrow>{segment.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.97] tracking-[-0.05em]">
              <span className="text-gradient">{segment.hero.title}</span>
              <br />
              <span className="text-gradient-brand">{segment.hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">{segment.hero.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={site.demoHref} size="lg" arrow>
                Book a demo
              </ButtonLink>
              <ButtonLink href="/pricing/" size="lg" variant="secondary">
                See pricing
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {[segment.price, "No long-term contract", "Setup in under a day"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-mh-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <SegmentVisual visual={segment.visual} />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <Stats items={segment.stats} />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading eyebrow="The problem" title="Sound familiar? Here's the fix." />
          <ul className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
            {segment.problems.map((p) => (
              <li key={p.before} className="reveal card flex flex-col overflow-hidden lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-0">
                <div className="p-6 sm:p-7">
                  <p className="flex items-center gap-2 text-xs font-medium text-subtle">
                    <X aria-hidden className="size-3.5" />
                    Before
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-muted line-through decoration-white/25">{p.before}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-subtle">{p.beforeBody}</p>
                </div>
                <div className="mt-auto border-t border-mh-400/20 lg:mt-0 bg-mh-400/[0.05] p-6 sm:p-7">
                  <p className="flex items-center gap-2 text-xs font-medium text-mh-300">
                    <Check aria-hidden className="size-3.5" />
                    With MeritHyre
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-fg">{p.after}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.afterBody}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Seven stages. AI runs six.
                <br className="hidden sm:inline" /> You make the call.
              </>
            }
          />
          <div className="mt-16">
            <PipelineTrack />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading eyebrow="Customers" title="In their own words." />
          <div className="mt-14">
            <Quotes items={segment.quotes} />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading eyebrow="Also built for" title={
              <>
                One pipeline.
                <br className="hidden sm:inline" /> Every kind of hiring team.
              </>
            } />
          <div className="mt-14">
            <SegmentCards exclude={segment.slug} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
