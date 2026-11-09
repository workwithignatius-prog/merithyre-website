import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { SegmentCards } from "@/components/sections/segment-cards";
import { Stats } from "@/components/sections/stats";
import { Quotes } from "@/components/sections/quotes";
import { Compliance } from "@/components/sections/compliance";
import { FounderNote } from "@/components/home/founder-note";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/ui/decor";
import { ResultsChips, SolutionsChips } from "@/components/sections/heading-chips";
import { JsonLd } from "@/components/seo/json-ld";
import { homeQuotes } from "@/content/testimonials";
import { agencyPlan, inHousePlans } from "@/content/pricing";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "MeritHyre | AI Recruitment Automation Platform",
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

const homeStats = [
  { value: "Hours", label: "from job post to ranked shortlist" },
  { value: "0", label: "CVs read by hand" },
  { value: "24/7", label: "AI interviews, nothing to schedule" },
  { value: "100%", label: "of advancements approved by a person" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${site.url}/#organization`,
              name: site.name,
              url: site.url,
              email: site.contact.email,
              telephone: "+1-650-374-4160",
              address: {
                "@type": "PostalAddress",
                streetAddress: "22693 Hesperian Blvd Suite #205",
                addressLocality: "Hayward",
                addressRegion: "CA",
                postalCode: "94541",
                addressCountry: "US",
              },
              sameAs: Object.values(site.socials),
            },
            {
              "@type": "SoftwareApplication",
              name: site.name,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: site.description,
              offers: [agencyPlan, ...inHousePlans].map((p) => ({
                "@type": "Offer",
                name: p.name,
                price: String(p.price),
                priceCurrency: "USD",
                description: p.unit,
              })),
            },
          ],
        }}
      />
      <Hero />

      <section aria-label="MeritHyre at a glance" className="px-5 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <Stats items={homeStats} />
        </div>
      </section>

      <PipelineSection id="how-it-works" body="From job post to decision-ready report, without a single CV read by hand." />

      <Features />

      <section className="relative px-5 py-14 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-[1180px]">
          <Glow color="amber" className="-right-40 top-10 h-[420px] w-[560px]" />
          <SectionHeading
            decor={<SolutionsChips />}
            eyebrow="Solutions"
            title="Built for teams that hire seriously."
            body="Same pipeline, tuned to how your team hires."
          />
          <div className="mt-14">
            <SegmentCards />
          </div>
        </div>
      </section>

      <section className="relative px-5 py-14 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-[1180px]">
          <Glow color="green" className="-left-40 top-1/3 h-[460px] w-[620px]" />
          <SectionHeading decor={<ResultsChips />} eyebrow="Results" title="Recruiting teams that made the switch." />
          <div className="mt-14">
            <Quotes items={homeQuotes} />
          </div>
        </div>
      </section>

      <FounderNote />
      <Compliance />
      <CtaBand />
    </>
  );
}
