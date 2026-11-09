import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import { ogImage } from "@/lib/metadata";
import "./globals.css";

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
  themeColor: "#060708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-mh-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
