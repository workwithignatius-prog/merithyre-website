import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { PipelineSection } from "@/components/sections/pipeline-section";
import { SegmentCards } from "@/components/sections/segment-cards";
import { Testimonials } from "@/components/sections/testimonials";
import { Usp } from "@/components/home/usp";
import { LatestPosts } from "@/components/home/latest-posts";
import { Compliance } from "@/components/sections/compliance";
import { FounderNote } from "@/components/home/founder-note";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/ui/section-heading";
import { Glow } from "@/components/ui/decor";
import { SolutionsChips } from "@/components/sections/heading-chips";
import { JsonLd } from "@/components/seo/json-ld";
import { homeQuotes } from "@/content/testimonials";
import { agencyPlan, inHousePlans } from "@/content/pricing";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { graph, organizationId, organizationSchema, webPageSchema, websiteSchema } from "@/lib/schema";
import { usps } from "@/content/usps";

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
        data={graph(
          organizationSchema(),
          websiteSchema(),
          webPageSchema({ path: "/", name: "MeritHyre | AI Recruitment Automation Platform", description: site.description }),
          {
            "@type": "SoftwareApplication",
            "@id": `${site.url}/#software`,
            name: site.name,
            url: site.url,
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Recruitment automation",
            operatingSystem: "Web",
            description: site.description,
            publisher: { "@id": organizationId },
            featureList: usps.map((u) => u.title),
            offers: [agencyPlan, ...inHousePlans].map((p) => ({
              "@type": "Offer",
              name: p.name,
              price: String(p.price),
              priceCurrency: "USD",
              description: p.unit,
              url: `${site.url}/pricing/`,
            })),
          },
        )}
      />
      <Hero stats={homeStats} />
      <Usp />
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

      <Testimonials eyebrow="Results" title="Recruiting teams that made the switch." items={homeQuotes} />

      <FounderNote />
      <Compliance />
      <LatestPosts />
      <CtaBand />
    </>
  );
}
