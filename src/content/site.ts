export const site = {
  name: "MeritHyre",
  url: "https://merithyre.ai",
  tagline: "AI-native recruitment automation",
  description:
    "MeritHyre sources, screens, ranks and interviews every applicant, then hands your team a decision-ready shortlist. From $99/month. No contract.",
  contact: {
    phone: "650-374-4160",
    phoneHref: "tel:+16503744160",
    email: "support@merithyre.ai",
    address: ["22693 Hesperian Blvd, Suite #205", "Hayward, CA 94541"],
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/merithyre",
    x: "https://x.com/merithyre",
    facebook: "https://www.facebook.com/merithyre/",
  },
  // The blog and legal pages still live on the current WordPress site.
  blogUrl: "https://merithyre.ai/blog/",
  privacyUrl: "https://merithyre.ai/privacy-policy/",
  termsUrl: "https://merithyre.ai/terms-of-service/",
  demoHref: "/contact-us/?topic=demo",
  /**
   * Product demo video for the homepage hero. Fill in ONE of these and the
   * "Watch the demo" button plays it; while both are empty it shows a
   * "coming soon / book a live demo" message.
   *  - src:      a direct MP4/WebM URL (e.g. "/demo.mp4" in /public, or a CDN link)
   *  - embedUrl: a YouTube / Vimeo / Loom embed URL (e.g. "https://www.youtube.com/embed/VIDEO_ID")
   */
  demoVideo: { src: "", embedUrl: "" } as { src: string; embedUrl: string },
  // Hard-coded on purpose: reading the clock during prerender breaks static rendering
  // under cacheComponents. Bump once a year.
  copyrightYear: 2026,
} as const;

export const regulations = [
  { name: "NYC Local Law 144", detail: "Automated employment decision tools" },
  { name: "EEOC", detail: "U.S. equal employment opportunity" },
  { name: "FEHA", detail: "California Fair Employment & Housing Act" },
  { name: "EU AI Act", detail: "Recruitment AI is high-risk in the EU" },
] as const;

export const integrations = ["Bullhorn", "Greenhouse", "Tellent", "LinkedIn", "Indeed"] as const;
