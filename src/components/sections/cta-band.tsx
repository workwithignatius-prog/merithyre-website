import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

type Props = {
  title?: React.ReactNode;
  body?: string;
};

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
    <section className="px-5 py-20 sm:px-6 sm:py-28">
      <div className="reveal bg-backdrop relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] px-6 py-16 sm:px-14 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgb(9_9_10/0.68)_0%,rgb(9_9_10/0.3)_55%,transparent_100%)]" />
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
