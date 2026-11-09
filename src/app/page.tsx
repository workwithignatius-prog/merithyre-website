import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { StackStrip } from "@/components/sections/stack-strip";
import { PipelineTrack } from "@/components/sections/pipeline-track";
import { SegmentCards } from "@/components/sections/segment-cards";
import { Stats } from "@/components/sections/stats";
import { Quotes } from "@/components/sections/quotes";
import { Compliance } from "@/components/sections/compliance";
import { FounderNote } from "@/components/home/founder-note";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/ui/section-heading";
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
      <StackStrip />

      <section id="how-it-works" className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Seven stages. AI runs six.
                <br className="hidden sm:inline" /> You make the call.
              </>
            }
            body="From job post to decision-ready report, without a single CV read by hand."
          />
          <div className="mt-16">
            <PipelineTrack />
          </div>
        </div>
      </section>

      <Features />

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <SectionHeading
            eyebrow="Solutions"
            title="Built for teams that hire seriously."
            body="Same pipeline, tuned to how your team hires."
          />
          <div className="mt-14">
            <SegmentCards />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <SectionHeading eyebrow="Results" title="Recruiting teams that made the switch." />
          <div className="mt-14 space-y-4">
            <Stats items={homeStats} />
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
