import Link from "next/link";
import { cn } from "@/lib/cn";

/** MeritHyre lockup: the green "M" tile from the brand logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 place-items-center rounded-[9px] bg-mh-700 font-display text-[18px] font-bold leading-none text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22)] transition-transform duration-300 group-hover:-rotate-[8deg] group-hover:scale-105",
        className,
      )}
    >
      M
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="MeritHyre home" className={cn("group flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-fg">
        Merit<span className="text-mh-400">Hyre</span>
      </span>
    </Link>
  );
}
