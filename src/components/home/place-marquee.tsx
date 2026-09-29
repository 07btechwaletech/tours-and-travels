// Decorative band of UP place names. The real, linked list lives in <Regions />.
const places: [hindi: string, english: string][] = [
  ["वाराणसी", "Varanasi"],
  ["अयोध्या", "Ayodhya"],
  ["प्रयागराज", "Prayagraj"],
  ["आगरा", "Agra"],
  ["मथुरा", "Mathura"],
  ["वृंदावन", "Vrindavan"],
  ["लखनऊ", "Lucknow"],
  ["सारनाथ", "Sarnath"],
  ["चित्रकूट", "Chitrakoot"],
  ["गोरखपुर", "Gorakhpur"],
  ["कुशीनगर", "Kushinagar"],
  ["झाँसी", "Jhansi"],
];

export function PlaceMarquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y border-line py-6 md:py-10">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-baseline gap-14 pr-14 md:gap-20 md:pr-20">
            {places.map(([hindi, english]) => (
              <span key={english} className="flex items-baseline gap-4 whitespace-nowrap">
                <span lang="hi" className="font-deva text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.15]">
                  {hindi}
                </span>
                <span className="text-sm text-muted md:text-base">{english}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
