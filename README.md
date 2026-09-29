# Anup Tours & Travels website

Next.js 16 (App Router) + Tailwind CSS v4. PostgreSQL and the admin panel (CMS) come next.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, <html>
    globals.css           design tokens (colors, fonts, easing) + scroll animations
    (site)/               public website: header, footer, smooth scroll
      page.tsx            homepage (sections below, plus TravelAgency schema)
  components/
    home/                 one file per homepage section
    layout/               site header, footer, smooth scroll
    ui/                   shared pieces (ButtonLink, Brand)
  content/                all site text and data (swap for Postgres queries when the CMS lands)
    site.ts               name, phone, WhatsApp, email, nav
    destinations.ts       featured destinations (homepage grid)
    packages.ts           tour packages
    fleet.ts              cab types and per-km rates
    regions.ts            UP regions and places (links to /destinations/[slug])
  lib/contact.ts          WhatsApp link, phone link, INR formatting
  assets/images/          photos (Pexels licence, free for commercial use)
public/video/             hero video: 720p (phones), 1080p (laptops), 4K (large and retina screens)
```

## Before launch

Search the code for `TODO(client)`:

- `content/site.ts`: real phone, WhatsApp number and email
- `content/packages.ts`: real package prices
- `content/fleet.ts`: real per-km cab rates

The `/destinations/[slug]` links are ready for the SEO location pages.
