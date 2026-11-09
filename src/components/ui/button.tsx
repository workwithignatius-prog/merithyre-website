import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-white text-[#0b0b0c] hover:bg-[#e9e8e3]",
  secondary: "border border-white/15 text-fg hover:border-white/30 hover:bg-white/[0.05]",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[15px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({ href, variant = "primary", size = "md", arrow, className, children, ...rest }: ButtonLinkProps) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  if (href.startsWith("http")) {
    return (
      <a href={href} className={buttonClasses(variant, size, className)} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}
