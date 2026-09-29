"use client";

import Link from "next/link";
import { useState } from "react";
import { toSlug, type Region } from "@/content/regions";

export function Regions({ regions }: { regions: Region[] }) {
  const [activeId, setActiveId] = useState(regions[0].id);
  const active = regions.find((region) => region.id === activeId) ?? regions[0];

  return (
    <section id="regions" className="shell scroll-mt-28 py-16 md:py-28">
      <h2 className="reveal-text max-w-[18ch] text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
        Every district of Uttar Pradesh
      </h2>
      <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-muted">
        We plan trips and send cabs to all 75 districts. Pick a region to see the main places we cover.
      </p>

      <div role="tablist" aria-label="Regions of Uttar Pradesh" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {regions.map((region) => {
          const selected = region.id === active.id;
          return (
            <button
              key={region.id}
              type="button"
              role="tab"
              id={`tab-${region.id}`}
              aria-selected={selected}
              aria-controls="region-panel"
              onClick={() => setActiveId(region.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-500 ease-soft ${
                selected ? "bg-ink text-paper" : "bg-surface text-ink ring-1 ring-ink/10 hover:bg-white"
              }`}
            >
              {region.name}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        id="region-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="mt-10 grid gap-10 animate-fade lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <p lang="hi" className="font-deva text-[clamp(3.5rem,7vw,6rem)] leading-[1.1]">
            {active.hindi}
          </p>
          <p className="mt-4 max-w-[36ch] text-lg leading-relaxed text-muted">{active.blurb}</p>
        </div>
        <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
          {active.places.map((place) => (
            <li key={place}>
              <Link
                href={`/destinations/${toSlug(place)}`}
                className="inline-flex rounded-full bg-surface px-4 py-2 text-[15px] ring-1 ring-ink/10 transition-colors duration-300 ease-soft hover:bg-ink hover:text-paper"
              >
                {place}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
