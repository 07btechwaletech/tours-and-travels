import Image, { type StaticImageData } from "next/image";
import ayodhya from "@/assets/images/pkg-ayodhya.jpg";
import agra from "@/assets/images/agra.jpg";
import ghat from "@/assets/images/ghat-steps.jpg";
import { fleet } from "@/content/fleet";
import { tourPackages } from "@/content/packages";

type Postcard = {
  image: StaticImageData;
  alt: string;
  hindi: string;
  english: string;
  // Position, tilt, hover fan-out and scroll drift, per card.
  className: string;
};

const postcards: Postcard[] = [
  {
    image: ayodhya,
    alt: "Priests exchanging marigold garlands in Ayodhya",
    hindi: "अयोध्या",
    english: "Ayodhya",
    className: "left-0 top-[12%] -rotate-6 group-hover:-translate-x-5 group-hover:-rotate-9 drift-slow",
  },
  {
    image: agra,
    alt: "Taj Mahal in evening light, framed by trees",
    hindi: "आगरा",
    english: "Agra",
    className: "right-0 top-[18%] rotate-6 group-hover:translate-x-5 group-hover:rotate-9 drift-fast",
  },
  {
    image: ghat,
    alt: "Old ghat building above the Ganga with a moored boat, Varanasi",
    hindi: "वाराणसी",
    english: "Varanasi",
    className: "left-1/2 top-0 -translate-x-1/2 rotate-1 group-hover:-translate-y-3 drift-mid",
  },
];

const facts = [
  { value: "75", label: "Districts covered" },
  { value: String(fleet.length), label: "Cab types, 4-17 seats" },
  { value: String(tourPackages.length), label: "Tour packages" },
];

export function Intro() {
  return (
    <section className="shell grid items-center gap-10 pb-12 pt-16 md:gap-14 md:pb-24 md:pt-28 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-6">
        <h2 className="reveal-text max-w-[16ch] text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Your trip, planned by people who live in Varanasi
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
          We book the hotel, send the car, time the darshan and plan the route, so you only have to pack. You get one
          clear price on WhatsApp before you confirm.
        </p>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 md:mt-10 md:gap-8 md:pt-8">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse justify-end gap-2">
              <dt className="text-sm leading-snug text-muted">{fact.label}</dt>
              <dd className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.03em]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Postcard stack. Cards drift apart on scroll and fan out on hover. */}
      <div className="group relative mx-auto h-[20rem] w-full max-w-[36rem] sm:h-[30rem] lg:col-span-6 lg:h-[36rem]">
        {postcards.map((card) => (
          <figure
            key={card.english}
            className={`absolute w-[56%] rounded-[1.4rem] bg-surface p-2 pb-0 shadow-[0_40px_70px_-30px_rgba(14,27,43,0.5)] ring-1 ring-ink/5 transition-[translate,rotate] duration-700 ease-soft ${card.className}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]">
              <Image src={card.image} alt={card.alt} fill placeholder="blur" sizes="(min-width: 1024px) 20rem, 56vw" className="object-cover" />
            </div>
            <figcaption className="flex items-baseline justify-between gap-2 px-2 py-3">
              <span lang="hi" className="font-deva text-lg leading-none sm:text-xl">
                {card.hindi}
              </span>
              <span className="text-xs text-muted">{card.english}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
