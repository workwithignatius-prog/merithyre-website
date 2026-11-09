import { Check, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Label, SectionHeading } from "@/components/ui/section-heading";
import { Swash } from "@/components/ui/swash";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { Testimonials } from "@/components/sections/testimonials";
import { SegmentCards } from "@/components/sections/segment-cards";
import { Stats } from "@/components/sections/stats";
import { CtaBand } from "@/components/sections/cta-band";
import { Glow } from "@/components/ui/decor";
import { site } from "@/content/site";
import type { Segment } from "@/content/segments";
import { SegmentVisual } from "./segment-visual";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph, organizationId, webPageSchema } from "@/lib/schema";

export function SolutionPage({ segment }: { segment: Segment }) {
  const lead = segment.hero.highlight.split(" ");
  const lastWord = lead.pop();
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: segment.href, name: segment.meta.title, description: segment.meta.description }),
          {
            "@type": "Service",
            name: segment.meta.title,
            serviceType: "AI recruitment automation",
            description: segment.meta.description,
            provider: { "@id": organizationId },
            areaServed: "US",
            audience: { "@type": "BusinessAudience", name: segment.name },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: segment.name, path: segment.href },
          ]),
        )}
      />
      <section className="relative px-5 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
        <div aria-hidden className="bg-hero pointer-events-none absolute inset-x-0 -top-40 bottom-0" />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Label className="text-mh-200">{segment.hero.eyebrow}</Label>
            <h1 className="mt-4 font-display text-[clamp(2.7rem,5.6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">
              {segment.hero.title}
              <br />
              {lead.join(" ")} <Swash>{lastWord}</Swash>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80 sm:text-lg">{segment.hero.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={site.demoHref} size="lg" arrow>
                Book a demo
              </ButtonLink>
              <ButtonLink href="/pricing/" size="lg" variant="glass">
                See pricing
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
              {[segment.price, "No long-term contract", "Setup in under a day"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-mh-300" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <SegmentVisual visual={segment.visual} />
        </div>
        <div className="relative mx-auto mt-16 max-w-[1180px] lg:mt-20">
          <Stats items={segment.stats} />
        </div>
      </section>


      <section className="relative px-5 py-14 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-[1180px]">
          <Glow color="amber" className="-left-40 top-1/4 h-[460px] w-[600px]" />
          <SectionHeading eyebrow="The problem" title="Sound familiar? Here's the fix." />
          <ul className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
            {segment.problems.map((p) => (
              <li key={p.before} className="reveal card flex flex-col overflow-hidden transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-white/20 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-0">
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


      <PipelineSection />


      <Testimonials eyebrow="Customers" title="In their own words." items={segment.quotes} compactChips />


      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
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
