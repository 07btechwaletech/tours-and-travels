import { Cabs } from "@/components/home/cabs";
import { Destinations } from "@/components/home/destinations";
import { Enquiry } from "@/components/home/enquiry";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Intro } from "@/components/home/intro";
import { IntroReveal } from "@/components/home/intro-reveal";
import { Packages } from "@/components/home/packages";
import { PlaceMarquee } from "@/components/home/place-marquee";
import { Regions } from "@/components/home/regions";
import { tourPackages } from "@/content/packages";
import { regions } from "@/content/regions";
import { site } from "@/content/site";

// Structured data so Google can show the business in local results.
const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.state, addressCountry: "IN" },
  areaServed: { "@type": "State", name: site.state },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }} />
      <IntroReveal />
      <Hero />
      <Intro />
      <PlaceMarquee />
      <Destinations />
      <Packages packages={tourPackages} />
      <Cabs />
      <HowItWorks />
      <Regions regions={regions} />
      <Enquiry />
    </>
  );
}
