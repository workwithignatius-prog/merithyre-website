import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Decorative background pieces. Everything here is aria-hidden.
 */

const glowColors = {
  green: "rgb(47 154 104 / 0.2)",
  teal: "rgb(27 111 115 / 0.22)",
  amber: "rgb(231 165 82 / 0.13)",
} as const;

/** Soft colour glow behind a section. Position it with className. */
export function Glow({ className, color = "green" }: { className?: string; color?: keyof typeof glowColors }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 rounded-full blur-3xl", className)}
      style={{ background: `radial-gradient(closest-side, ${glowColors[color]}, transparent)` }}
    />
  );
}

/**
 * Small product fragment that floats beside a centred heading (wide screens only).
 * Tilted at rest; straightens when hovered.
 */
export function FloatChip({
  children,
  className,
  tilt = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  tilt?: "left" | "right";
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-float absolute z-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#141517]/90 px-4 py-3 text-[13px] text-fg shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)] backdrop-blur transition-[rotate,border-color,background-color] duration-500 ease-out hover:rotate-0 hover:border-white/25 hover:bg-[#191a1d] xl:flex",
        tilt === "left" ? "-rotate-[5deg]" : "rotate-[4deg]",
        className,
      )}
      style={{ animationDelay: `${-delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Two-line text block used inside chips. */
export function ChipText({ top, bottom, topClass }: { top: ReactNode; bottom: ReactNode; topClass?: string }) {
  return (
    <span className="leading-tight">
      <span className={cn("block font-semibold text-fg", topClass)}>{top}</span>
      <span className="block text-xs text-muted">{bottom}</span>
    </span>
  );
}
