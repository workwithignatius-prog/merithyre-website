# MeritHyre website

Marketing site for [merithyre.ai](https://merithyre.ai): AI-native recruitment automation.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript · Bricolage Grotesque + Geist fonts · Lucide icons.
Every page is statically prerendered.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes static)
npm run start      # serve the production build
npm run lint
```

Requires Node 20.9+.

## Pages

| URL | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/pricing/` | `src/app/pricing/page.tsx` |
| `/staffing/` · `/smbs-midmarket/` · `/enterprise/` · `/startups/` | `src/app/<slug>/page.tsx` → shared `src/components/solutions/solution-page.tsx` |
| `/about-us/` | `src/app/about-us/page.tsx` |
| `/contact-us/` | `src/app/contact-us/page.tsx` |

URLs (with trailing slashes) match the current WordPress site, so existing links and search rankings carry over.
`/merithyre-lp-staffing/` (a 404 on the old site) redirects to `/staffing/`.

## Editing copy

All copy lives in `src/content/`, separate from layout:

- `site.ts`: contact details, socials, blog/legal URLs, regulations, integrations
- `segments.ts`: everything on the four use-case pages (hero, stats, before/after, quotes)
- `pricing.ts`: plans, features, pricing FAQ
- `pipeline.ts`: the 7 stages
- `testimonials.ts`, `about.ts`, `navigation.ts`

## Design system

Defined in `src/app/globals.css` (Tailwind v4 `@theme`).

- **Canvas** `#09090a`: a warm near-black with plain panels and hairline borders. No grid meshes, frame lines, glowing pills or gradient-filled text.
- **Section rhythm:** sections are told apart by their surfaces, not by divider lines. On the homepage the order is: open hero, then the gradient stats band (`<Stats>`), the lit "How it works" stage (`<PipelineSection>`), cards, the featured testimonial (`<Quotes>`), the founders' letter card and the CTA band.
- **Brand green** `mh-*` is the logo green `#166534`, pushed luminous (`#34e39c`) for dark UI.
- **Amber** `sun-*` is reserved for moments where a **person** decides (shortlist gate, approvals, "held for review"). Green means the AI runs that stage.
- **Gradient** appears in two deliberate places:
  - `bg-backdrop`: the green → teal → sunrise-amber card that products sit on.
  - `<Swash>`: the hand-drawn underline that runs from green (AI) to amber (human).
  - `bg-atmosphere` adds a soft glow behind hero areas.
- **Type:** Bricolage Grotesque for headlines (`font-display`, in `src/fonts/`, OFL) and Geist for UI and body. Both are local files, so builds work offline.
- **Motion:** CSS-first. Covers the announcement marquee, the demo preview, the underline draw-in and scroll reveals (`animation-timeline: view()`, progressive enhancement). Everything respects `prefers-reduced-motion`.

## Homepage demo video

The hero's right side is a product-demo video slot (`src/components/home/demo-stage.tsx`).
- **Until there's a video:** it plays a silent 4-step product preview with chapter chips and a pause button. "Watch the product demo" opens a "coming soon, book a live demo" dialog.
- **To use a real video:** set **one** value in `src/content/site.ts` → `demoVideo`. Use `src` for an MP4/WebM file (e.g. `/demo.mp4` in `public/`) or `embedUrl` for a YouTube, Vimeo or Loom embed link.

The scrolling announcement bar is in `src/components/layout/announcement.tsx`.

## Contact form

`src/components/contact/contact-form.tsx` validates on the client.
- To deliver submissions, set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a URL that accepts a JSON POST (HubSpot, Formspree, your own API). See `.env.example`.
- Without it, the form shows the success state only.
- `?topic=demo&plan=smb` in the URL pre-selects the topic and pre-fills the message. Every "Book a demo" button uses this.

## SEO

- Per-page title, description, canonical and Open Graph (`src/lib/metadata.ts`)
- `public/og.png` share image
- `public/sitemap.xml` and `public/robots.txt`: static files, so they work in every build mode. Add new pages to the sitemap by hand.
- Structured data: Organization and SoftwareApplication with offers on `/`, FAQPage on `/pricing/`

## Temporary preview on GitHub Pages

```bash
npm run deploy:pages
```

This builds a static export and force-pushes it to the `gh-pages` branch. That branch holds build output only.

- The build sets `GITHUB_PAGES=true`, which serves the site under `/merithyre-website/`, adds noindex tags and turns off redirects.
- **One-time setup:** go to Settings → Pages → Build and deployment. Set Source to **Deploy from a branch** and Branch to **gh-pages** with folder **/ (root)**.
- **URL:** https://workwithignatius-prog.github.io/merithyre-website/
- Pages on a **private** repo needs a paid GitHub plan (Pro or Team). On the Free plan the repo must be public.
- The Pages site itself is visible to anyone with the link. The noindex tags keep it out of search engines.

## Deploy

Vercel is the zero-config option: import the repo and deploy. Any Node host works with `npm run build && npm run start`.

## Before launch

1. **Testimonials:** all quotes are carried over word-for-word from the current site. Confirm each named customer, then add logos and names where allowed.
2. **Blog and legal pages:** these still link to the WordPress URLs (`site.blogUrl`, `privacyUrl`, `termsUrl`). Before this site replaces merithyre.ai on the same domain, either keep WordPress on a subdomain (e.g. `blog.merithyre.ai`) and update those links, or migrate the posts.
3. **Compliance wording:** "Built for NYC LL144 · EEOC · FEHA · EU AI Act". Have counsel approve it.
4. **Product visuals** are illustrative HTML mockups (sample names, labelled as sample data). Add the real demo video via `demoVideo` (above) when it's ready.
5. **Form:** set `NEXT_PUBLIC_CONTACT_ENDPOINT`.
