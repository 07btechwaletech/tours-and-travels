import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { featuredDestinations, type Destination } from "@/content/destinations";

// Bento placement, by position in featuredDestinations.
// Phones and tablets: Varanasi full width, then pairs. Desktop: 7 tiles in 4 columns x 3 rows.
const tileLayout = [
  "col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
];

function DestinationTile({ destination, featured, className }: { destination: Destination; featured: boolean; className: string }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`reveal-media group relative isolate overflow-hidden rounded-[1.25rem] bg-ink sm:rounded-[1.75rem] lg:aspect-auto ${featured ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/5] sm:aspect-[4/3]"} ${className}`}
    >
      <Image
        src={destination.image}
        alt={destination.alt}
        fill
        placeholder="blur"
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        className="-z-10 object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/15 to-transparent" />

      <div className="flex h-full flex-col justify-end p-4 text-white sm:p-5 md:p-7">
        <p
          lang="hi"
          className={`font-deva leading-[1.1] ${featured ? "text-[clamp(2.5rem,5.5vw,5.5rem)]" : "text-[1.55rem] sm:text-[clamp(2rem,2.8vw,2.75rem)]"}`}
        >
          {destination.hindi}
        </p>
        <div className="mt-2 flex items-end justify-between gap-4 sm:mt-3">
          <div>
            <h3 className="text-[15px] font-semibold leading-tight tracking-tight sm:text-lg">{destination.name}</h3>
            <p className={`mt-0.5 text-sm text-white/75 ${featured ? "" : "hidden sm:block"}`}>{destination.highlights}</p>
          </div>
          <span className="hidden size-10 shrink-0 items-center sm:flex justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors duration-500 ease-soft group-hover:bg-marigold group-hover:text-ink">
            <ArrowUpRightIcon size={18} weight="light" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="shell scroll-mt-28 py-16 md:py-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12 md:gap-6">
        <h2 className="reveal-text max-w-[17ch] text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          The places people ask us about first
        </h2>
        <Link href="#regions" className="text-[15px] font-medium underline decoration-ink/30 underline-offset-[6px] transition-colors hover:decoration-ink">
          See all 75 districts
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:auto-rows-[17.5rem] lg:grid-cols-4">
        {featuredDestinations.map((destination, index) => (
          <DestinationTile
            key={destination.slug}
            destination={destination}
            featured={index === 0}
            className={tileLayout[index] ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
