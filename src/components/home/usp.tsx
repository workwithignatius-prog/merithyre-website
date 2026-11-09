import { ButtonLink } from "@/components/ui/button";
import { usps } from "@/content/usps";
import { site } from "@/content/site";

/** "Why MeritHyre": the product's differentiators on a light paper sheet, right after the hero. */
export function Usp() {
  return (
    <section id="why-merithyre" aria-labelledby="why-merithyre-title" className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-[1180px] overflow-clip rounded-[32px] bg-paper px-6 py-12 text-ink shadow-[0_40px_100px_-60px_rgb(52_227_156/0.5)] sm:px-12 sm:py-16 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-48 -top-48 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(52_227_156/0.3),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-56 -right-40 size-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(246_183_78/0.3),transparent)]"
        />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[15px] font-medium text-mh-700">Why MeritHyre</p>
            <h2
              id="why-merithyre-title"
              className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink"
            >
              Six reasons teams switch to MeritHyre.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-muted">
              AI-native from day one, not AI added to an old ATS. Here&apos;s what that means for your desk.
            </p>
            <ButtonLink href={site.demoHref} variant="ink" size="lg" arrow className="mt-8">
              See it on a real role
            </ButtonLink>
          </div>

          <ol className="border-t border-black/10">
            {usps.map((u, i) => (
              <li
                key={u.title}
                className="group grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 border-b border-black/10 py-6 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:items-start sm:gap-x-6"
              >
                <span className="pt-1 font-mono text-sm tabular-nums text-mh-700 transition-colors duration-300 group-hover:text-sun-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="transition-[translate] duration-300 group-hover:translate-x-1">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[22px]">{u.title}</h3>
                  <p className="mt-1.5 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">{u.body}</p>
                </div>
                <span className="col-start-2 mt-3 w-fit whitespace-nowrap rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-ink shadow-[0_6px_16px_-10px_rgb(0_0_0/0.35)] transition-[border-color,background-color] duration-300 group-hover:border-mh-700/30 group-hover:bg-mh-100 sm:col-start-auto sm:mt-1">
                  {u.proof}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
