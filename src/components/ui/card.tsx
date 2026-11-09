import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Plain surface card with a quiet hover lift. */
export function Card({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-panel transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
