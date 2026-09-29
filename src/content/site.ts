// Business details shown across the site.
// TODO(client): replace the placeholder phone, WhatsApp and email before launch.
export const site = {
  // Live URL for SEO tags, robots.txt and the sitemap. Set NEXT_PUBLIC_SITE_URL once the
  // client's domain is connected; until then Vercel's production URL is used automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  name: "Anup Tours & Travels",
  brand: "Anup",
  descriptor: "Tours & Travels",
  city: "Varanasi",
  state: "Uttar Pradesh",
  description:
    "Tour packages, temple darshan and outstation cabs from Varanasi to all 75 districts of Uttar Pradesh.",
  phone: "+91 00000 00000",
  whatsapp: "910000000000",
  email: "hello@example.com",
  nav: [
    { label: "Destinations", hindi: "गंतव्य", href: "/#destinations" },
    { label: "Tour packages", hindi: "यात्रा पैकेज", href: "/#packages" },
    { label: "Cabs", hindi: "टैक्सी", href: "/#cabs" },
    { label: "All of UP", hindi: "पूरा उत्तर प्रदेश", href: "/#regions" },
  ],
} as const;
