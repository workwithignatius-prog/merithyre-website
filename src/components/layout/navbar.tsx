"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { segments } from "@/content/segments";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing/", sticker: "$99" },
  { label: "About", href: "/about-us/" },
  { label: "Blog", href: site.blogUrl },
];

function NavLink({ href, className, onClick, children }: { href: string; className?: string; onClick?: () => void; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);

  // Close menus when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const closeMenuSoon = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  };

  const linkCls =
    "relative flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-colors after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:origin-center after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <header className="sticky top-3 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-[1180px] items-center rounded-full border border-white/10 bg-[#121315]/90 pl-5 pr-2 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl"
      >
        <Logo />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
          <li ref={menuRef} className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenuSoon}>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="solutions-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(linkCls, "gap-1", menuOpen ? "text-white" : "text-white/75 hover:text-white")}
            >
              Solutions
              <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", menuOpen && "rotate-180")} />
            </button>
            <div
              id="solutions-menu"
              className={cn(
                "absolute left-1/2 top-full w-[540px] -translate-x-1/2 pt-4 transition-all duration-200",
                menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
              )}
            >
              <div className="rounded-[26px] border border-white/10 bg-[#121315] p-2.5 shadow-[0_30px_80px_-24px_rgb(0_0_0/0.9)]">
                <div className="grid grid-cols-2 gap-1">
                  {segments.map((s) => (
                    <Link
                      key={s.slug}
                      href={s.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-mh-300">
                        <s.icon aria-hidden className="size-[18px]" />
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium text-fg">{s.name}</span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{s.short}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/pricing/"
                  onClick={() => setMenuOpen(false)}
                  className="group mt-1 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-[13px] text-muted transition-colors hover:bg-white/[0.07]"
                >
                  <span>Every plan includes the full pipeline</span>
                  <span className="inline-flex items-center gap-1 font-medium text-fg">
                    See pricing
                    <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <NavLink href={l.href} className={cn(linkCls, pathname === l.href ? "text-white after:scale-x-100" : "text-white/75 hover:text-white")}>
                {l.label}
                {l.sticker && (
                  <span
                    aria-hidden
                    className="absolute -right-2.5 -top-2.5 rotate-[14deg] rounded-md bg-mh-400 px-1.5 py-px text-[10px] font-bold leading-4 text-[#062012] shadow-sm"
                  >
                    {l.sticker}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <ButtonLink href={site.demoHref} size="sm" className="h-12 px-6 text-base max-sm:hidden">
            Book a demo
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-12 place-items-center rounded-full text-fg transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {mobileOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="mx-auto mt-2 max-h-[calc(100dvh-7rem)] max-w-[1180px] overflow-y-auto rounded-[28px] border border-white/10 bg-[#121315] p-3 shadow-[0_30px_80px_-24px_rgb(0_0_0/0.9)] lg:hidden"
      >
        <p className="px-3 pb-1 pt-2 text-[13px] font-medium text-subtle">Solutions</p>
        <ul className="grid gap-0.5 sm:grid-cols-2">
          {segments.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-fg hover:bg-white/[0.05]">
                <s.icon aria-hidden className="size-[18px] text-mh-300" />
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="my-2 h-px bg-white/[0.07]" />
        <ul className="grid gap-0.5">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink href={l.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-2xl px-3 py-3 text-lg text-fg hover:bg-white/[0.05]">
                {l.label}
                {l.sticker && <span className="rounded-md bg-mh-400 px-1.5 text-[11px] font-bold text-[#062012]">from {l.sticker}</span>}
              </NavLink>
            </li>
          ))}
          <li>
            <Link href="/contact-us/" onClick={() => setMobileOpen(false)} className="flex rounded-2xl px-3 py-3 text-lg text-fg hover:bg-white/[0.05]">
              Contact
            </Link>
          </li>
        </ul>
        <ButtonLink href={site.demoHref} size="lg" arrow className="mt-2 w-full" onClick={() => setMobileOpen(false)}>
          Book a demo
        </ButtonLink>
      </div>
    </header>
  );
}
