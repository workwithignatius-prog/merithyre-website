import Link from "next/link";
import { cn } from "@/lib/cn";

/** MeritHyre lockup: the green "M" tile from the brand logo, tuned for dark backgrounds. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 place-items-center rounded-[9px] bg-gradient-to-b from-mh-600 to-mh-700 text-[17px] font-bold leading-none text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_0_0_1px_rgb(52_227_156/0.35),0_0_24px_-6px_rgb(52_227_156/0.7)]",
        className,
      )}
    >
      M
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="MeritHyre home" className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[19px] font-semibold tracking-[-0.035em] text-fg">
        Merit<span className="text-mh-400">Hyre</span>
      </span>
    </Link>
  );
}
