import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Announcement } from "@/components/layout/announcement";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SwashDefs } from "@/components/ui/swash";
import { PageFrame } from "@/components/ui/decor";
import { site } from "@/content/site";
import { ogImage } from "@/lib/metadata";
import "./globals.css";

// Display face for headlines (OFL, see src/fonts/OFL-bricolage-grotesque.txt).
const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-variable.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MeritHyre | AI Recruitment Automation Platform",
    template: "%s | MeritHyre",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  // Keep the temporary GitHub Pages preview out of search results.
  ...(process.env.GITHUB_PAGES === "true" && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#09090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable}`}
    >
      <body className="grain flex min-h-dvh flex-col">
        <SwashDefs />
        <PageFrame />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <Announcement />
        <Navbar />
        <main id="main" className="flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
