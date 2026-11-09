import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Hand-drawn underline under a phrase. The stroke runs from brand green (AI)
 * to sunrise amber (human), and draws itself in once on load.
 * The gradient (#swash-gradient) is defined once in the root layout.
 */
export function Swash({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 22"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.16em] left-[-2%] z-0 h-[0.3em] w-[104%] overflow-visible"
      >
        <path
          className="swash-path"
          pathLength={1}
          d="M4 15.5C52 8.5 101 5.2 151 6.4c40 1 81 5.6 145 2.6"
          fill="none"
          stroke="url(#swash-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Put once near the top of <body>. */
export function SwashDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="swash-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#34e39c" />
          <stop offset="0.55" stopColor="#b9ec6b" />
          <stop offset="1" stopColor="#f6b74e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
