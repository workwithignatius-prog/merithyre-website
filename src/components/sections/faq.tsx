import { Plus } from "lucide-react";

/** Accessible accordion built on <details>, no client JS needed. */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-fg transition-colors hover:text-mh-200 [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/10 text-muted transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-mh-400/40 group-open:bg-mh-400/10 group-open:text-mh-300">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="pb-6 pr-12 text-[15.5px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
