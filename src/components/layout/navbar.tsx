"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/content/navigation";
import { segments } from "@/content/segments";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const closeMenuSoon = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || mobileOpen
          ? "border-b border-white/[0.07] bg-canvas/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-5 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            "children" in item ? (
              <li key={item.label} ref={menuRef} className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenuSoon}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="solutions-menu"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex h-9 items-center gap-1 rounded-full px-3.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                  <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-200", menuOpen && "rotate-180")} />
                </button>
                <div
                  id="solutions-menu"
                  className={cn(
                    "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200",
                    menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                  )}
                >
                  <div className="rounded-2xl border border-white/10 bg-panel/95 p-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-1">
                      {segments.map((s) => (
                        <Link
                          key={s.slug}
                          href={s.href}
                          onClick={() => setMenuOpen(false)}
                          className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-mh-400">
                            <s.icon aria-hidden className="size-[18px]" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium text-fg">{s.name}</span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-muted">{s.short}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-[13px] text-muted">
                      <span>Every plan includes the full AI pipeline</span>
                      <Link
                        href="/pricing/"
                        onClick={() => setMenuOpen(false)}
                        className="group inline-flex items-center gap-1 font-medium text-mh-300 hover:text-mh-200"
                      >
                        From $99/mo
                        <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <NavLink
                  href={item.href}
                  className={cn(
                    "flex h-9 items-center rounded-full px-3.5 text-sm transition-colors hover:text-fg",
                    pathname === item.href ? "text-fg" : "text-muted",
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/contact-us/" className="hidden h-9 items-center rounded-full px-3.5 text-sm text-muted transition-colors hover:text-fg sm:flex">
            Contact
          </Link>
          <ButtonLink href={site.demoHref} size="sm" className="max-[360px]:hidden">
            Book a demo
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-fg lg:hidden"
          >
            {mobileOpen ? <X aria-hidden className="size-[18px]" /> : <Menu aria-hidden className="size-[18px]" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.07] bg-canvas px-5 pb-10 lg:hidden"
      >
        <ul className="divide-y divide-white/[0.07]">
          <li>
            <Link href="/#how-it-works" className="block py-4 text-lg text-fg" onClick={() => setMobileOpen(false)}>
              How it works
            </Link>
          </li>
          <li className="py-4">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-mh-400">Solutions</span>
            <ul className="mt-3 grid gap-1">
              {segments.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="flex items-center gap-3 rounded-xl py-2.5 text-fg" onClick={() => setMobileOpen(false)}>
                    <s.icon aria-hidden className="size-[18px] text-mh-400" />
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {[
            { label: "Pricing", href: "/pricing/" },
            { label: "About", href: "/about-us/" },
            { label: "Blog", href: site.blogUrl },
            { label: "Contact", href: "/contact-us/" },
          ].map((l) => (
            <li key={l.label}>
              <NavLink href={l.href} className="block py-4 text-lg text-fg">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ButtonLink href={site.demoHref} size="lg" arrow className="mt-6 w-full">
          Book a demo
        </ButtonLink>
      </div>
    </header>
  );
}
