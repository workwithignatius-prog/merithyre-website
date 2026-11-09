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

const chipTones = {
  dark: "border-white/10 bg-[#141517]/90 text-fg hover:border-white/25 hover:bg-[#191a1d]",
  green: "border-transparent bg-mh-400 text-[#062012] hover:bg-mh-300",
  amber: "border-transparent bg-sun-400 text-[#2b1c04] hover:bg-sun-300",
} as const;

const chipShapes = {
  card: "gap-3 rounded-2xl px-4 py-3",
  pill: "gap-2 rounded-full py-2 pr-3.5 pl-2",
} as const;

/**
 * Small product fragment that floats beside a centred heading (wide screens only).
 * Tilted at rest; straightens when hovered. `angle` (degrees) overrides `tilt`.
 */
export function FloatChip({
  children,
  className,
  tilt = "left",
  angle,
  delay = 0,
  tone = "dark",
  shape = "card",
}: {
  children: ReactNode;
  className?: string;
  tilt?: "left" | "right";
  angle?: number;
  delay?: number;
  tone?: keyof typeof chipTones;
  shape?: keyof typeof chipShapes;
}) {
  const deg = angle ?? (tilt === "left" ? -5 : 4);
  return (
    <div
      aria-hidden
      className={cn(
        "animate-float absolute z-10 hidden items-center border text-[13px] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)] backdrop-blur rotate-(--chip-tilt) transition-[rotate,border-color,background-color] duration-500 ease-out hover:rotate-0 xl:flex",
        chipTones[tone],
        chipShapes[shape],
        className,
      )}
      style={{ animationDelay: `${-delay}s`, "--chip-tilt": `${deg}deg` } as CSSProperties}
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
