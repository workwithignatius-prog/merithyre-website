import { integrations } from "@/content/site";

/** Integration names as a logo row. Sits at the foot of the homepage hero. */
export function StackStrip() {
  return (
    <div aria-label="Integrations" role="group" className="flex flex-col items-center gap-6 text-center lg:flex-row lg:gap-14 lg:text-left">
      <p className="max-w-[15rem] shrink-0 text-sm leading-snug text-white/60">
        Plugs into the tools you already use. <span className="text-white/85">Your ATS stays.</span>
      </p>
      <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
        {integrations.map((name) => (
          <li
            key={name}
            className="cursor-default font-display text-[22px] font-semibold tracking-[-0.03em] text-white/55 transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:text-white"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
