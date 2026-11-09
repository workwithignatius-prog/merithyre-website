import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

type Props = {
  title?: React.ReactNode;
  body?: string;
};

const picks = [
  { name: "Maria Delgado", score: "4.3" },
  { name: "Kwame Asante", score: "4.1" },
  { name: "Priya Nair", score: "3.9" },
];

/** Decorative shortlist + approve stack for the empty right side of the band (wide screens). */
function ShortlistStack() {
  return (
    <div aria-hidden className="absolute right-12 top-1/2 hidden w-[330px] -translate-y-1/2 xl:block">
      <div className="rotate-[4deg] rounded-[22px] border border-white/10 bg-[#0e0f11]/92 px-5 pb-10 pt-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] transition-[rotate] duration-500 ease-out hover:rotate-0">
        <p className="text-xs text-white/55">Shortlist ready at 6:12 AM</p>
        <p className="mt-1 font-display text-lg font-semibold tracking-[-0.02em] text-fg">Warehouse Shift Lead</p>
        <ul className="mt-3 space-y-1.5">
          {picks.map((p) => (
            <li key={p.name} className="flex items-center justify-between rounded-xl bg-white/[0.05] px-3 py-2 text-[13px] transition-colors hover:bg-white/[0.09]">
              <span className="text-fg">{p.name}</span>
              <span className="tabular-nums text-white/60">{p.score} / 5</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative -mt-5 ml-auto mr-6 flex w-fit -rotate-[3deg] items-center gap-2 rounded-full bg-sun-400 px-5 py-3 text-sm font-semibold text-[#2a1a02] shadow-[0_20px_40px_-16px_rgb(0_0_0/0.7)] transition-[rotate,scale] duration-500 ease-out hover:rotate-0 hover:scale-105">
        <Check className="size-4" strokeWidth={3} />
        Approve 3 for final interview
      </div>
    </div>
  );
}

export function CtaBand({
  title = (
    <>
      Make the decision.
      <br />
      Not the process.
    </>
  ),
  body = "See MeritHyre run one of your real roles in a 30-minute live demo. No setup. No commitment.",
}: Props) {
  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="reveal bg-backdrop relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] px-6 py-16 sm:px-14 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgb(9_9_10/0.55)_0%,rgb(9_9_10/0.16)_55%,transparent_100%)]" />
        <ShortlistStack />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">{title}</h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">{body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={site.demoHref} size="lg" arrow>
              Book a demo
            </ButtonLink>
            <ButtonLink href="/pricing/" size="lg" variant="secondary" className="border-white/30 bg-black/20 backdrop-blur-sm">
              See pricing
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
