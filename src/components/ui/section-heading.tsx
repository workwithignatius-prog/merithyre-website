import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small section label: plain text, no pill, no glow. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[15px] font-medium text-mh-300", className)}>{children}</p>;
}

type Props = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  /** Optional <FloatChip>s placed in the empty space either side of a centred heading (desktop). */
  decor?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, body, align = "center", decor, className }: Props) {
  return (
    <div className={cn("relative", className)}>
      {decor}
      <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && <Label>{eyebrow}</Label>}
        <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-fg">
          {title}
        </h2>
        {body && (
          <p className={cn("mt-5 text-[17px] leading-relaxed text-muted sm:text-lg", align === "center" && "mx-auto max-w-2xl")}>
            {body}
          </p>
        )}
      </div>
    </div>
  );
}
