import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarProfileIcon, CalendarCheckIcon, BuildingsIcon } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button-link";
import { findPlace, packagesFor, places } from "@/content/places";
import { toSlug } from "@/content/regions";
import { site } from "@/content/site";
import { formatINR, phoneHref, whatsappLink } from "@/lib/contact";

// One static page per place; unknown slugs are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const place = findPlace((await params).slug);
  if (!place) return {};
  return {
    title: `${place.name} tour packages and cabs`,
    description: `Plan a trip to ${place.name}, ${site.state}: tour packages, temple darshan and outstation cabs from ${site.city}.`,
    // Template page until each place gets its own written content (the SEO pages phase).
    robots: { index: false, follow: true },
  };
}

const services = [
  { icon: CarProfileIcon, title: "Cab with a local driver", body: "Sedan, SUV, Innova or Tempo Traveller, from Varanasi or any city in UP." },
  { icon: BuildingsIcon, title: "Hotels that suit your budget", body: "Close to the temples and ghats, matched to your budget." },
  { icon: CalendarCheckIcon, title: "Darshan and sightseeing timed for you", body: "A day-by-day plan so you are not stuck in queues or traffic." },
];

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const place = findPlace((await params).slug);
  if (!place) notFound();

  const { destination, region } = place;
  const trips = packagesFor(place);
  const nearby = region?.places.filter((name) => toSlug(name) !== place.slug).slice(0, 14) ?? [];
  const message = `Hi, I want to plan a trip to ${place.name}. Please share the details.`;

  return (
    <>
      <section id="top" className="relative isolate flex min-h-[62svh] items-end overflow-hidden text-white md:min-h-[70svh]">
        <div className="absolute inset-2 -z-10 overflow-hidden rounded-3xl bg-ink md:inset-3 md:rounded-[2.25rem]">
          {destination ? (
            <Image src={destination.image} alt={destination.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
          ) : (
            <p aria-hidden lang="hi" className="absolute -bottom-6 right-4 select-none font-deva text-[clamp(8rem,30vw,24rem)] leading-none text-white/5">
              {region?.hindi}
            </p>
          )}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,27,43,0.55)_0%,rgba(14,27,43,0.15)_40%,rgba(14,27,43,0.85)_100%)]" />
        </div>

        <div className="shell pb-10 pt-32 md:pb-16">
          <div className="px-2 md:px-4">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden className="mx-2">/</span>
              <Link href="/#regions" className="hover:text-white">{region?.name ?? "Uttar Pradesh"}</Link>
              <span aria-hidden className="mx-2">/</span>
              <span aria-current="page" className="text-white">{place.name}</span>
            </nav>
            <p lang="hi" className="mb-3 font-deva text-xl text-marigold md:text-2xl">
              {destination?.hindi ?? region?.hindi}
            </p>
            <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[1] tracking-[-0.035em]">{place.name}</h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80 md:text-xl">
              {destination?.highlights ?? region?.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={whatsappLink(message)} external>
                Plan my trip
              </ButtonLink>
              <ButtonLink href={phoneHref} variant="glass">
                Call us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="max-w-[16ch] text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Plan your {place.name} trip with one message
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
            Tell us your dates and how many people are travelling. We send a day-by-day plan with the cab, hotel
            and one total price on WhatsApp.
          </p>
          <ul className="mt-10 grid gap-6">
            {services.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-marigold/20 text-ink">
                  <Icon size={22} weight="light" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          {trips.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold">Tour packages that include {place.name}</h2>
              <ul className="mt-6 grid gap-3">
                {trips.map((trip) => (
                  <li key={trip.slug}>
                    <a
                      href={whatsappLink(`Hi, I would like to plan the ${trip.title} trip (${trip.duration}). Please share the details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-[1.5rem] bg-surface p-3 ring-1 ring-ink/[0.06] transition-colors hover:bg-white"
                    >
                      <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                        <Image src={trip.image} alt="" fill sizes="80px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-muted">{trip.duration}</span>
                        <span className="block truncate text-lg font-semibold tracking-tight">{trip.title}</span>
                        <span className="block text-sm text-muted">From ₹{formatINR(trip.priceFrom)} per person</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="rounded-[2rem] bg-ink p-8 text-paper">
              <h2 className="text-2xl font-semibold tracking-tight">A custom trip to {place.name}</h2>
              <p className="mt-3 text-paper/70">
                We plan {place.name} around your dates, with a cab from Varanasi or any city in Uttar Pradesh.
              </p>
              <ButtonLink href={whatsappLink(message)} external className="mt-8">
                Plan my trip
              </ButtonLink>
            </div>
          )}

          {nearby.length > 0 && region && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold">More places in {region.name}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {nearby.map((name) => (
                  <li key={name}>
                    <Link
                      href={`/destinations/${toSlug(name)}`}
                      className="inline-flex rounded-full bg-surface px-4 py-2 text-[15px] ring-1 ring-ink/10 transition-colors duration-300 ease-soft hover:bg-ink hover:text-paper"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
