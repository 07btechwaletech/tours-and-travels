"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const arrowButton =
  "flex size-12 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-ink/10 transition-[background-color,transform] duration-500 ease-soft hover:bg-white active:scale-95";

/** Previous/next buttons for a horizontal scroll rail, found by id. The rail itself stays server-rendered. */
export function RailArrows({ railId, label }: { railId: string; label: string }) {
  const scrollRail = (direction: 1 | -1) => {
    const rail = document.getElementById(railId);
    const card = rail?.querySelector("li");
    if (!rail || !card) return;
    rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => scrollRail(-1)} className={arrowButton} aria-label={`Previous ${label}`} aria-controls={railId}>
        <ArrowLeftIcon size={20} weight="light" aria-hidden />
      </button>
      <button type="button" onClick={() => scrollRail(1)} className={arrowButton} aria-label={`Next ${label}`} aria-controls={railId}>
        <ArrowRightIcon size={20} weight="light" aria-hidden />
      </button>
    </div>
  );
}
