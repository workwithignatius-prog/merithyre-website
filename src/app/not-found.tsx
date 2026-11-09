import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative px-5 py-32 text-center sm:px-6 sm:py-40">
      <div aria-hidden className="bg-hero-center pointer-events-none absolute inset-x-0 -top-40 bottom-0" />
      <div className="relative mx-auto max-w-xl">
        <p className="font-display text-8xl font-bold tracking-[-0.05em] text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white">This page isn&apos;t in the pipeline.</h1>
        <p className="mt-4 text-white/75">It may have moved when we rebuilt the site. Blog posts now live under /blog/.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/blog/" variant="glass">
            Read the blog
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
