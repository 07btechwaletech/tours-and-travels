"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { Brand } from "@/components/ui/brand";
import { site } from "@/content/site";
import { phoneHref, whatsappLink } from "@/lib/contact";

const sectionIds = site.nav.map((item) => item.href.split("#")[1]);
const menuItems = [...site.nav, { label: "Plan my trip", hindi: "यात्रा की योजना", href: "/#plan" }];

/**
 * Floating pill nav. Glass over the hero video, solid once the page scrolls
 * past it, and highlights the section in view. All detection uses
 * IntersectionObserver, never a scroll listener.
 */
export function SiteHeader() {
  const [overHero, setOverHero] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    // Root is a thin band just under the nav, so it turns solid as soon as it leaves the video.
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "-56px 0px -88% 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Root is a thin band across the middle of the viewport.
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? inView.add(entry.target.id) : inView.delete(entry.target.id)));
        setActiveId(sectionIds.find((id) => inView.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const onDark = overHero || menuOpen;
  const closeMenu = () => setMenuOpen(false);
  const roundButton = `flex size-10 items-center justify-center rounded-full transition-colors duration-500 ease-soft ${
    onDark ? "bg-white/10 hover:bg-white/20" : "bg-ink/5 hover:bg-ink/10"
  }`;

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 animate-fade [animation-delay:calc(var(--intro)+0.45s)] md:top-5">
        <div
          className={`flex h-14 w-full max-w-[1240px] items-center justify-between gap-4 rounded-full pl-4 pr-2 ring-1 transition-[background-color,color,box-shadow] md:backdrop-blur-md duration-700 ease-soft md:h-16 md:pl-5 ${
            onDark
              ? "bg-ink/45 text-white ring-white/15 md:bg-ink/25"
              : "bg-surface/95 text-ink md:bg-surface/85 ring-ink/10 shadow-[0_12px_40px_-16px_rgba(14,27,43,0.35)]"
          }`}
        >
          <Brand />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-1 text-[15px]">
              {site.nav.map((item, index) => {
                const active = !overHero && activeId === sectionIds[index];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "location" : undefined}
                      className={`block rounded-full px-4 py-2 transition-colors duration-500 ease-soft ${
                        active
                          ? "bg-ink text-paper"
                          : onDark
                            ? "text-white/85 hover:bg-white/10 hover:text-white"
                            : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={phoneHref} className="hidden items-center gap-2 rounded-full px-3 text-[15px] opacity-85 transition-opacity hover:opacity-100 xl:flex">
              <PhoneIcon size={18} weight="light" aria-hidden />
              {site.phone}
            </a>
            <a href={phoneHref} aria-label={`Call ${site.phone}`} className={`hidden md:flex xl:hidden ${roundButton}`}>
              <PhoneIcon size={18} weight="light" aria-hidden />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={`hidden md:flex ${roundButton}`}
            >
              <WhatsappLogoIcon size={19} weight="light" aria-hidden />
            </a>
            <Link
              href="/#plan"
              className="hidden rounded-full bg-marigold px-5 py-2.5 text-[15px] font-medium text-ink transition-[background-color,transform] duration-500 ease-soft hover:bg-marigold-light active:scale-[0.98] sm:block"
            >
              Plan my trip
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`relative lg:hidden ${roundButton}`}
            >
              <span
                className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-current transition-transform duration-500 ease-soft ${
                  menuOpen ? "rotate-45" : "-translate-y-0.75"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 bg-current transition-transform duration-500 ease-soft ${
                  menuOpen ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`fixed inset-0 z-40 overflow-hidden bg-ink/95 backdrop-blur-xl transition-[opacity,visibility] duration-500 ease-soft lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <p aria-hidden lang="hi" className="pointer-events-none absolute bottom-24 -right-4 select-none font-deva text-[42vw] leading-none text-white/5">
          यात्रा
        </p>
        <nav aria-label="Mobile" className="shell relative flex h-full flex-col pb-8 pt-24 text-paper">
          <ul className="flex-1">
            {menuItems.map((item, index) => (
              <li
                key={item.href}
                style={{ transitionDelay: menuOpen ? `${100 + index * 55}ms` : "0ms" }}
                className={`border-b border-white/10 transition-[transform,opacity] duration-700 ease-soft ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Link href={item.href} onClick={closeMenu} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="text-[clamp(1.9rem,7.5vw,2.75rem)] font-medium leading-tight tracking-tight">{item.label}</span>
                  <span lang="hi" className="font-deva text-base text-marigold sm:text-lg">
                    {item.hindi}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3">
            <a href={phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-4 text-[15px] font-medium ring-1 ring-white/15">
              <PhoneIcon size={18} weight="light" aria-hidden /> Call us
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-marigold py-4 text-[15px] font-medium text-ink"
            >
              <WhatsappLogoIcon size={19} weight="light" aria-hidden /> WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
