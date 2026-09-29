import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { featuredDestinations } from "@/content/destinations";
import { tourPackages } from "@/content/packages";
import { site } from "@/content/site";
import { phoneHref, whatsappLink } from "@/lib/contact";

const linkClass = "text-paper/70 transition-colors hover:text-paper";

export function SiteFooter() {
  return (
    <footer className="render-lazy overflow-hidden bg-ink text-paper">
      <div className="shell pb-8 pt-14 md:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <Brand />
            <p className="mt-6 max-w-[38ch] leading-relaxed text-paper/70">{site.description}</p>
            <ul className="mt-8 space-y-2">
              <li><a href={phoneHref} className={linkClass}>{site.phone}</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp</a></li>
              <li><a href={`mailto:${site.email}`} className={linkClass}>{site.email}</a></li>
              <li className="text-paper/70">{site.city}, {site.state}</li>
            </ul>
          </div>

          <nav aria-label="Destinations" className="lg:col-span-3">
            <h2 className="font-medium">Destinations</h2>
            <ul className="mt-5 space-y-2">
              {featuredDestinations.map((destination) => (
                <li key={destination.slug}>
                  <Link href={`/destinations/${destination.slug}`} className={linkClass}>{destination.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tour packages" className="lg:col-span-4">
            <h2 className="font-medium">Tour packages</h2>
            <ul className="mt-5 space-y-2">
              {tourPackages.map((pkg) => (
                <li key={pkg.slug}>
                  <Link href="/#packages" className={linkClass}>{pkg.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Decorative: drawn from CSS content so it is not read or contrast-checked as text. */}
        <p
          aria-hidden
          lang="hi"
          data-text="उत्तर प्रदेश"
          className="mt-12 select-none whitespace-nowrap font-deva text-[clamp(3.25rem,14vw,10rem)] leading-[1.15] text-white/6 before:content-[attr(data-text)]"
        />

        <div className="mt-4 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-sm text-paper/55">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Website by BtechWaleTech</p>
        </div>
      </div>
    </footer>
  );
}
