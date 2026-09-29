import poster from "@/assets/images/hero-poster.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { tourPackages } from "@/content/packages";
import { HeroTripCard } from "./hero-trip-card";
import { HeroVideo } from "./hero-video";

const headline = ["From the ghats of Kashi", "to every corner of Uttar Pradesh."];

// Word index across both lines, for the stagger.
const lines = headline.map((line, lineIndex) => {
  const offset = headline.slice(0, lineIndex).reduce((count, previous) => count + previous.split(" ").length, 0);
  return line.split(" ").map((word, wordIndex) => ({ word, index: offset + wordIndex }));
});

// --intro is the length of the opening zoom (near 0 when it has already played this session).
const delay = (ms: number) => ({ animationDelay: `calc(var(--intro) + ${ms}ms)` });

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[82svh] items-end overflow-hidden text-white md:min-h-dvh">
      {/* Rounded video frame, inset from the page edge. Scales back as the page scrolls. */}
      <div className="hero-frame absolute inset-2 -z-10 overflow-hidden rounded-3xl bg-ink md:inset-3 md:rounded-[2.25rem]">
        <HeroVideo poster={poster} />
        {/* Golden-hour warmth over the river's grey morning sky (plain alpha, no blend mode). */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_85%_at_85%_0%,rgba(233,162,59,0.16),transparent_60%)]"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/25 md:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,27,43,0.55)_0%,rgba(14,27,43,0)_26%,rgba(14,27,43,0)_45%,rgba(14,27,43,0.8)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,27,43,0.6)_0%,rgba(14,27,43,0.2)_45%,rgba(14,27,43,0)_70%)]"
        />

        {/* Devanagari mark in the open sky; drifts slower than the page (parallax). Tablet and up: phones have no room above the copy. */}
        <div aria-hidden className="hero-glyph pointer-events-none absolute left-[4%] top-[13%] hidden select-none md:block">
          <p
            lang="hi"
            className="font-deva text-[clamp(6.5rem,15vw,16rem)] leading-none text-white/15 animate-fade"
            style={delay(250)}
          >
            काशी
          </p>
        </div>

        <p
          className="absolute right-6 top-24 hidden text-right text-xs leading-relaxed text-white/70 animate-fade md:block lg:right-10 lg:top-28"
          style={delay(500)}
        >
          25.31° N, 83.01° E
          <br />
          The ghats of Varanasi
        </p>
      </div>

      <div className="hero-copy shell pb-10 pt-32 md:pb-24 md:pt-40">
        <div className="px-2 md:px-4">
          <p lang="hi" className="mb-5 font-deva text-xl text-marigold animate-fade md:text-2xl" style={delay(0)}>
            काशी से पूरे उत्तर प्रदेश तक
          </p>

          <h1 className="text-[clamp(2.5rem,5.6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {lines.map((words, lineIndex) => (
              <span key={lineIndex} className="block text-balance">
                {words.map(({ word, index }) => (
                  <span key={index}>
                    <span className="mb-[-0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
                      <span className="inline-block animate-word" style={delay(40 + index * 45)}>
                        {word}
                      </span>
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="mt-6 grid items-end gap-8 md:mt-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="max-w-[46ch] text-lg leading-relaxed text-white/80 animate-fade md:text-xl" style={delay(650)}>
                Tour packages, temple darshan and outstation cabs across all 75 districts, planned around your dates
                and your family.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 animate-fade md:mt-8" style={delay(800)}>
                <ButtonLink href="#plan">Plan my trip</ButtonLink>
                <ButtonLink href="#packages" variant="glass">
                  <span className="sm:hidden">Packages</span>
                  <span className="hidden sm:inline">View tour packages</span>
                </ButtonLink>
              </div>
            </div>
            <div className="hidden animate-fade lg:block" style={delay(1000)}>
              <HeroTripCard trips={tourPackages.slice(0, 4)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
