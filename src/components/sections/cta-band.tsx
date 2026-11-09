import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

type Props = {
  title?: React.ReactNode;
  body?: string;
};

export function CtaBand({
  title = (
    <>
      Make the decision. <span className="text-gradient-brand">Not the process.</span>
    </>
  ),
  body = "See MeritHyre run one of your real roles in a 30-minute live demo. No setup. No commitment.",
}: Props) {
  return (
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="reveal relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-white/10 bg-panel px-6 py-16 text-center sm:px-12 sm:py-24">
        <div aria-hidden className="bg-grid fade-radial absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(52_227_156/0.35),transparent)] blur-2xl"
        />
        <div className="relative">
          <h2 className="text-gradient mx-auto max-w-3xl text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={site.demoHref} size="lg" arrow>
              Book a demo
            </ButtonLink>
            <ButtonLink href="/pricing/" size="lg" variant="secondary">
              See pricing
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
