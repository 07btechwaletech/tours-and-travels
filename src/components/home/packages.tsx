import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { TourPackage } from "@/content/packages";
import { formatINR, whatsappLink } from "@/lib/contact";
import { RailArrows } from "./rail-arrows";

const RAIL_ID = "package-rail";

// Left padding that lines the first card up with the page container.
const railInset = "px-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]";
const snapInset = "scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]";

function PackageCard({ pkg }: { pkg: TourPackage }) {
  const message = `Hi, I would like to plan the ${pkg.title} trip (${pkg.duration}). Please share the details.`;
  return (
    <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="reveal-media rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.06]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)]">
          <Image
            src={pkg.image}
            alt={pkg.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 640px) 400px, 82vw"
            className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="px-2 pt-5">
        <p className="text-sm text-muted">{pkg.duration}</p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight">{pkg.title}</h3>
        <p className="mt-1.5 text-[15px] text-muted">{pkg.stops.join(", ")}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
          <p className="text-sm text-muted">
            From <span className="text-lg font-semibold text-ink">₹{formatINR(pkg.priceFrom)}</span> per person
          </p>
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-500 ease-soft group-hover:bg-marigold group-hover:text-ink">
            <ArrowUpRightIcon size={18} weight="light" aria-hidden />
            <span className="sr-only">Plan this trip on WhatsApp</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export function Packages({ packages }: { packages: TourPackage[] }) {
  return (
    <section id="packages" className="scroll-mt-28 pb-16 md:pb-28 [timeline-scope:--rail]">
      <div className="shell mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
        <div>
          <h2 className="reveal-text text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">Tour packages</h2>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">
            Hotel, cab and darshan timings already worked out. Every trip can be changed to fit your dates.
          </p>
        </div>
        <RailArrows railId={RAIL_ID} label="packages" />
      </div>

      <ul id={RAIL_ID} className={`no-scrollbar relative flex snap-x [scroll-timeline:--rail_x] snap-mandatory gap-5 overflow-x-auto pb-2 ${railInset} ${snapInset}`}>
        {packages.map((pkg) => (
          <li key={pkg.slug} className="w-[82vw] max-w-[25rem] shrink-0 snap-start">
            <PackageCard pkg={pkg} />
          </li>
        ))}
        <li className="w-[82vw] max-w-[25rem] shrink-0 snap-start">
          <div className="flex aspect-[4/5] flex-col justify-between rounded-[2rem] bg-ink p-8 text-paper">
            <p className="font-deva text-6xl leading-none text-marigold" lang="hi" aria-hidden>
              यात्रा
            </p>
            <div>
              <h3 className="text-3xl font-semibold leading-tight tracking-tight">Have your own route in mind?</h3>
              <p className="mt-3 text-paper/70">Tell us the cities and the number of days. We will price it for you.</p>
              <a
                href="#plan"
                className="mt-8 inline-flex rounded-full bg-marigold px-6 py-3 text-[15px] font-medium text-ink transition-colors duration-500 ease-soft hover:bg-marigold-light"
              >
                Plan my trip
              </a>
            </div>
          </div>
        </li>
      </ul>

      {/* Shows how far through the row you are (scroll-driven, no JS). */}
      <div className="shell mt-6 md:mt-8">
        <div aria-hidden className="rail-track h-0.5 overflow-hidden rounded-full bg-line">
          <div className="rail-progress h-full origin-left rounded-full bg-ink" />
        </div>
      </div>
    </section>
  );
}
