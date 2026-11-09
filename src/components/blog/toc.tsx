"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** "On this page" list that highlights the section being read. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <ol className="space-y-1 border-l border-white/10">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l py-1.5 pl-4 text-[13.5px] leading-snug transition-colors duration-200",
              active === item.id ? "border-mh-400 text-fg" : "border-transparent text-subtle hover:text-fg",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
