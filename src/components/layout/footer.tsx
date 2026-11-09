import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LogoMark } from "./logo";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/ui/social-icons";
import { footerNav } from "@/content/navigation";
import { regulations, site } from "@/content/site";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "text-sm text-muted transition-colors hover:text-fg";
  return href.startsWith("http") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Footer() {
  const socials = [
    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: site.socials.x, label: "X", Icon: XIcon },
    { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  ];
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#040505]">
      <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-10 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div>
            <Link href="/" aria-label="MeritHyre home" className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[19px] font-semibold tracking-[-0.035em]">
                Merit<span className="text-mh-400">Hyre</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              AI-native recruitment automation, built by a team that spent 20 years running a staffing agency.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden className="size-4 text-mh-400" />
                <a href={site.contact.phoneHref} className="hover:text-fg">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4 text-mh-400" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-fg">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden className="mt-0.5 size-4 text-mh-400" />
                <span>
                  {site.contact.address[0]}
                  <br />
                  {site.contact.address[1]}
                </span>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="text-[13px] font-medium text-fg">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-8">
          <span className="mr-2 text-xs text-subtle">Built for</span>
          {regulations.map((r) => (
            <span key={r.name} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
              {r.name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-subtle">
            © {site.copyrightYear} MeritHyre. All rights reserved.
          </p>
          <ul className="flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={`MeritHyre on ${label}`}
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/20 hover:text-fg"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
