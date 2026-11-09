import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoMark } from "@/components/layout/logo";
import { Swash } from "@/components/ui/swash";
import { Divider, Glow } from "@/components/ui/decor";
import { AboutHeroChips } from "@/components/sections/heading-chips";
import { LateNightStack } from "@/components/about/late-night-stack";
import { ButtonLink } from "@/components/ui/button";
import { aboutStats, principles } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "MeritHyre was founded by a team that spent 20 years running a staffing and recruiting agency. We lived the problem before we built the solution.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        decor={<AboutHeroChips />}
        eyebrow="About MeritHyre"
        title={
          <>
            Built by recruiters.
            <br />
            <Swash>Not by engineers.</Swash>
          </>
        }
        body="MeritHyre was founded by a team that spent 20 years running a staffing and recruiting agency. We lived the problem before we built the solution."
      />

      <section className="px-5 pb-20 sm:px-6 sm:pb-28">
        <dl className="reveal mx-auto grid max-w-[1000px] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.02] sm:grid-cols-3">
          {aboutStats.map((s, i) => (
            <div
              key={s.label}
              className={`group p-7 transition-colors duration-300 hover:bg-white/[0.035] ${i > 0 ? "border-t border-white/[0.07] sm:border-l sm:border-t-0" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[clamp(2.1rem,4vw,2.9rem)] font-bold leading-none tracking-[-0.04em] text-fg transition-[color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:text-mh-300">
                {s.value}
              </dd>
              <dd className="mt-3 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Divider />

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Our origin" title="We didn't read about the problem. We lived it." />
            <LateNightStack className="mt-12 hidden lg:block" />
          </div>
          <div className="reveal space-y-5 text-[17px] leading-relaxed text-muted">
            <p>
              Drowning in applications. Inconsistent screening. Endless scheduling. First-round interviews that should have been
              automated years ago. We spent two decades inside that problem before writing a line of code.
            </p>
            <p>
              We know how staffing firms think and how HR teams work. We know what hiring means at 2am on a Tuesday, when a client is
              waiting on a submission and the application pile hasn&apos;t been touched.
            </p>
            <blockquote className="border-l-2 border-mh-400 pl-5 text-lg leading-relaxed text-fg">
              “Our product decisions come from recruiters who have felt the pain, not product managers who have read about it.”
            </blockquote>
          </div>
        </div>
      </section>

      <Divider />

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="reveal relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] border border-white/10 bg-panel px-6 py-16 sm:px-14 sm:py-20">
          <div aria-hidden className="absolute -right-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(52_227_156/0.18),transparent)] blur-2xl" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium text-mh-300">Our mission</p>
              <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-fg">
                Make the decision.
                <br />
                Not the process.
              </h2>
            </div>
            <p className="text-[17px] leading-relaxed text-muted">
              Recruiters spend most of their day on work that needs no judgment: reading CVs, writing screening questions, scheduling
              calls, running first rounds, comparing notes. MeritHyre handles all of it, so your team gets back the work that matters:
              assessing people, building relationships and making smart decisions.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section className="relative px-5 py-16 sm:px-6 sm:py-24">
        <div className="relative mx-auto max-w-[1180px]">
          <Glow color="teal" className="left-1/2 top-1/2 h-[380px] w-[860px] -translate-x-1/2" />
          <SectionHeading
            eyebrow="Our category"
            title="We're not an ATS. Keep yours."
            body="MeritHyre is a recruitment automation platform: the layer between your job boards and your ATS that does the sourcing, screening, interviewing and reporting at machine speed."
          />
          <div className="reveal mx-auto mt-14 flex max-w-4xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition-[translate,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]">
              <p className="text-xs text-subtle">Job boards</p>
              <p className="mt-1.5 font-semibold text-fg">LinkedIn · Indeed · more</p>
            </div>
            <ArrowRight aria-hidden className="mx-auto size-5 rotate-90 text-mh-400 sm:rotate-0" />
            <div className="bg-backdrop flex flex-col items-center rounded-2xl p-5 transition-[translate] duration-300 hover:-translate-y-1 sm:w-44 sm:flex-none">
              <LogoMark />
              <p className="mt-2 font-semibold text-fg">MeritHyre</p>
            </div>
            <ArrowRight aria-hidden className="mx-auto size-5 rotate-90 text-mh-400 sm:rotate-0" />
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition-[translate,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]">
              <p className="text-xs text-subtle">Your ATS</p>
              <p className="mt-1.5 font-semibold text-fg">Bullhorn · Greenhouse · Tellent</p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="relative px-5 py-16 sm:px-6 sm:py-24">
        <div className="relative mx-auto max-w-[1180px]">
          <Glow color="amber" className="-right-40 top-24 h-[440px] w-[600px]" />
          <SectionHeading eyebrow="What we believe" title="The principles we build by." />
          <ol className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal card group p-7 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className="text-sm font-medium tabular-nums text-mh-400 transition-colors duration-300 group-hover:text-sun-300">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
            <li className="reveal bg-backdrop group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-7">
              <div aria-hidden className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />
              <p className="relative font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg">
                Hold us to it.
              </p>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/80">
                Every principle here is something we can show you on one of your real roles.
              </p>
              <ButtonLink href={site.demoHref} arrow className="relative mt-6 self-start">
                Book a demo
              </ButtonLink>
            </li>
          </ol>
        </div>
      </section>

      <Divider />
      <CtaBand
        title={
          <>
            Start hiring.
            <br />
            Today.
          </>
        }
        body="A 30-minute demo on a real role, from job post to AI-interviewed shortlist."
      />
    </>
  );
}
