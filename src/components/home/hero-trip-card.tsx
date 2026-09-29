"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { TourPackage } from "@/content/packages";
import { formatINR, whatsappLink } from "@/lib/contact";

/**
 * Glass card in the hero that cycles through featured trips, story style.
 * The progress bar's CSS animation drives the timing (onAnimationEnd), so
 * hovering pauses both the bar and the rotation with no timers.
 */
export function HeroTripCard({ trips }: { trips: TourPackage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trip = trips[index];

  const next = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIndex((current) => (current + 1) % trips.length);
  };

  return (
    <a
      href={whatsappLink(`Hi, I would like to plan the ${trip.title} trip (${trip.duration}). Please share the details.`)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={`${trip.title}, ${trip.duration}, from ₹${formatINR(trip.priceFrom)} per person. Plan this trip on WhatsApp`}
      className="group block w-[23rem] rounded-[1.75rem] bg-white/10 p-2 text-white ring-1 ring-white/20 backdrop-blur-xl transition-colors duration-500 ease-soft hover:bg-white/15"
    >
      <div className="flex gap-1.5 px-3 pt-2" aria-hidden>
        {trips.map((item, itemIndex) => (
          <span key={item.slug} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
            {itemIndex === index ? (
              <span
                key={`active-${index}`}
                onAnimationEnd={next}
                className="block h-full origin-left animate-progress rounded-full bg-white"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              />
            ) : (
              <span className={`block h-full rounded-full bg-white ${itemIndex < index ? "opacity-100" : "opacity-0"}`} />
            )}
          </span>
        ))}
      </div>

      <div key={trip.slug} className="flex items-center gap-4 p-3 animate-fade">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
          <Image src={trip.image} alt="" fill sizes="80px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-white/70">Featured trip, {trip.duration}</p>
          <p className="mt-0.5 truncate text-lg font-semibold leading-tight tracking-tight">{trip.title}</p>
          <p className="mt-1 text-sm text-white/80">From ₹{formatINR(trip.priceFrom)}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-marigold text-ink transition-transform duration-500 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRightIcon size={18} weight="bold" aria-hidden />
        </span>
      </div>
    </a>
  );
}
