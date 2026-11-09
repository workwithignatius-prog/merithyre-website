import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Plain surface card. On hover it lifts, the border brightens and a thin
 * green-to-amber line draws across the top edge. Children can react via `group-hover:`.
 */
export function Card({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-panel transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#121315]",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-mh-400 via-[#b9ec6b] to-sun-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {children}
    </div>
  );
}
