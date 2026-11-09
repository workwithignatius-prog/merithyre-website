import type { Quote } from "@/content/testimonials";

function initials(text: string) {
  return text
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function Quotes({ items }: { items: Quote[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((q) => (
        <figure key={q.quote} className="reveal card group flex flex-col p-7 transition-[translate,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-[#121315]">
          <svg aria-hidden viewBox="0 0 24 24" className="size-6 text-mh-400/70 transition-[color,rotate] duration-300 group-hover:-rotate-6 group-hover:text-sun-300" fill="currentColor">
            <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6.5v-6.5H7c0-1.38 1.12-2.5 2.5-2.5V6Zm10 0c-3.04 0-5.5 2.46-5.5 5.5V18h6.5v-6.5H17c0-1.38 1.12-2.5 2.5-2.5V6Z" />
          </svg>
          <blockquote className="mt-5 flex-1 text-[16.5px] leading-relaxed text-fg">“{q.quote}”</blockquote>
          <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-5">
            <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-[11px] font-semibold text-muted">
              {initials(q.company && !/company$/i.test(q.company) ? q.company : q.author)}
            </span>
            <span className="text-sm">
              <span className="block font-medium text-fg">{q.author}</span>
              {q.company && <span className="block text-subtle">{q.company}</span>}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
