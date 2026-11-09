import { integrations } from "@/content/site";

export function StackStrip() {
  return (
    <section aria-label="Integrations" className="px-5 py-14 sm:px-6">
      <div className="reveal mx-auto max-w-[1180px] text-center">
        <p className="text-sm text-subtle">Plugs into the tools you already use. Your ATS stays.</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {integrations.map((name) => (
            <li key={name} className="text-[22px] font-semibold tracking-[-0.04em] text-white/45 transition-colors hover:text-white/80">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
