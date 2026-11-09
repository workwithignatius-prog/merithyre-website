import type { Metadata } from "next";
import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Swash } from "@/components/ui/swash";
import { Glow } from "@/components/ui/decor";
import { ContactHeroChips } from "@/components/sections/heading-chips";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo or Contact MeritHyre",
  absoluteTitle: true,
  description:
    "Book a 30-minute live demo of MeritHyre on a real role, or ask us anything. Call 650-374-4160 or email support@merithyre.ai. We reply within one business day.",
  path: "/contact-us/",
});

const options = [
  {
    icon: CalendarCheck,
    title: "Book a live demo",
    body: "30 minutes. A real role. The full pipeline, from job post to Insights Report.",
    href: "#form",
    cta: "Use the form",
  },
  { icon: Mail, title: "Email", body: "Product questions, pricing, partnerships, anything else.", href: `mailto:${site.contact.email}`, cta: site.contact.email },
  { icon: Phone, title: "Phone", body: "Call us with any question.", href: site.contact.phoneHref, cta: site.contact.phone },
  { icon: MapPin, title: "Office", body: `${site.contact.address[0]}, ${site.contact.address[1]}`, href: undefined, cta: undefined },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            type: "ContactPage",
            path: "/contact-us/",
            name: "Contact MeritHyre",
            description: "Book a 30-minute live demo of MeritHyre on a real role, or ask us anything.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact-us/" },
          ]),
        )}
      />
      <PageHero
        decor={<ContactHeroChips />}
        eyebrow="Contact"
        title={<Swash>Let&apos;s talk.</Swash>}
        body="Book a demo, ask a product question or talk partnerships. We're a small team and we respond to everything."
      />
      <section className="relative px-5 pb-24 sm:px-6 sm:pb-32">
        <Glow color="teal" className="right-0 top-10 h-[520px] w-[720px]" />
        <div className="relative mx-auto grid max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <ul className="grid content-start gap-3">
            {options.map((o) => (
              <li key={o.title} className="card group flex gap-4 p-5 transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/20">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-mh-300 transition-[scale,background-color] duration-300 group-hover:scale-110 group-hover:bg-mh-400/15">
                  <o.icon aria-hidden className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold text-fg">{o.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{o.body}</p>
                  {o.href && o.cta && (
                    <a href={o.href} className="mt-2 inline-block break-all text-sm font-medium text-mh-300 hover:text-mh-200">
                      {o.cta}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
