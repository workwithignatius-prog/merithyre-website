import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden px-5 py-32 text-center sm:px-6 sm:py-40">
      <div aria-hidden className="bg-grid fade-radial absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-xl">
        <p className="text-gradient-brand text-7xl font-semibold tracking-[-0.06em]">404</p>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-fg">This page isn&apos;t in the pipeline.</h1>
        <p className="mt-4 text-muted">It may have moved when we rebuilt the site.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact-us/" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
