"use client";

import { useRef, type ComponentProps, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

/** A card whose border glow follows the cursor. Purely decorative. */
export function SpotlightCard({ className, children, ...rest }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div ref={ref} onMouseMove={onMove} className={cn("card card-glow spotlight overflow-hidden", className)} {...rest}>
      {children}
    </div>
  );
}
