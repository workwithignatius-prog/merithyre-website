import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[13px] font-medium text-muted",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-mh-400 shadow-[0_0_10px_2px_rgb(52_227_156/0.6)]" />
      {children}
    </span>
  );
}

type Props = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, body, align = "center", as = "h2", className }: Props) {
  const Heading = as;
  return (
    <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "text-gradient mt-5 font-semibold tracking-[-0.04em]",
          as === "h1" ? "text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.98]" : "text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.04]",
        )}
      >
        {title}
      </Heading>
      {body && (
        <p className={cn("mt-5 text-[17px] leading-relaxed text-muted sm:text-lg", align === "center" && "mx-auto max-w-2xl")}>
          {body}
        </p>
      )}
    </div>
  );
}
