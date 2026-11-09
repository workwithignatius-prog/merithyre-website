import { RefreshCw, ShieldCheck, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Swash } from "@/components/ui/swash";
import { site } from "@/content/site";
import { DemoStage } from "./demo-stage";

const badges = [
  { icon: RefreshCw, text: "Bullhorn & Greenhouse sync" },
  { icon: ShieldCheck, text: "Built for NYC LL144" },
  { icon: UsersRound, text: "Founded by recruiters" },
];

export function Hero() {
  return (
    <section className="relative px-5 pb-20 pt-10 sm:px-6 sm:pt-16 lg:pb-28">
      <div aria-hidden className="bg-atmosphere pointer-events-none absolute inset-x-0 -top-28 bottom-0" />

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <ul className="flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <li
                key={b.text}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[13px] font-medium text-white/85"
              >
                <b.icon aria-hidden className="size-3.5 text-mh-300" />
                {b.text}
              </li>
            ))}
          </ul>

          <h1 className="mt-8 font-display text-[clamp(2.9rem,6vw,5.2rem)] font-bold leading-[0.97] tracking-[-0.04em] text-fg">
            Hire at machine speed.
            <br />
            Decide like <Swash>a human.</Swash>
          </h1>

          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            MeritHyre sources, screens, ranks and interviews every applicant overnight, then hands your team a decision-ready
            shortlist. You make every call.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={site.demoHref} size="lg" arrow>
              Book a demo
            </ButtonLink>
            <ButtonLink href="/#how-it-works" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-subtle">From $99/month · No contract · Live in under a day</p>
        </div>

        <DemoStage />
      </div>
    </section>
  );
}
