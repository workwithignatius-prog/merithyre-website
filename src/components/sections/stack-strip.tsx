import { integrations } from "@/content/site";

export function StackStrip() {
  return (
    <section aria-label="Integrations" className="px-5 py-14 sm:px-6">
      <div className="reveal mx-auto max-w-[1180px] text-center">
        <p className="text-sm text-subtle">Plugs into the tools you already use. Your ATS stays.</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {integrations.map((name) => (
            <li key={name} className="cursor-default font-display text-[22px] font-semibold tracking-[-0.03em] text-white/40 transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:text-white">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
