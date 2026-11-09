import { site } from "./site";
import { segments } from "./segments";

export const mainNav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Solutions", href: "/staffing/", children: segments },
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/about-us/" },
  { label: "Blog", href: site.blogUrl },
] as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
      { label: "Compliance", href: "/#compliance" },
      { label: "Pricing", href: "/pricing/" },
    ],
  },
  {
    title: "Solutions",
    links: segments.map((s) => ({ label: s.name, href: s.href })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us/" },
      { label: "Contact", href: "/contact-us/" },
      { label: "Blog", href: site.blogUrl },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: site.privacyUrl },
      { label: "Terms of Service", href: site.termsUrl },
    ],
  },
] as const;
