import type { Metadata } from "next";
import { PricingTabs } from "@/components/pricing/pricing-tabs";
import { PageHero } from "@/components/sections/page-hero";
import { Swash } from "@/components/ui/swash";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { includedEverywhere, pricingFaqs } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Simple pricing for AI recruitment automation. $99 per recruiter for staffing agencies, or $99, $199 and $299 a month for in-house teams. Full pipeline on every plan. No contract.",
  path: "/pricing/",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pricingFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple pricing.
            <br />
            <Swash>Serious hiring.</Swash>
          </>
        }
        body={
          <>
            Every plan includes the full AI pipeline. <span className="whitespace-nowrap">No long-term contracts,</span>{" "}
            <span className="whitespace-nowrap">no per-role fees.</span>
          </>
        }
      />

      <section className="px-5 pb-20 sm:px-6 sm:pb-28">
        <PricingTabs />
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-[1180px]">
          <SectionHeading eyebrow="Every plan" title="The whole pipeline. On every plan." />
          <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {includedEverywhere.map((f) => (
              <li key={f.title} className="reveal flex items-start gap-4 bg-canvas p-6 sm:p-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-mh-300">
                  <f.icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-fg">{f.title}</span>
                  <span className="mt-1 block text-sm text-muted">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Pricing questions, answered."
            body="Anything else? We're a small team and we reply within one business day."
          />
          <div className="reveal">
            <Faq items={pricingFaqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
