import Image from "next/image";
import ritual from "@/assets/images/ghat-ritual.jpg";
import { ButtonLink } from "@/components/ui/button-link";

const steps = [
  {
    title: "Tell us where and when",
    body: "Send your cities, dates and how many people are travelling. One call or WhatsApp message is enough.",
  },
  {
    title: "Get a day-by-day plan",
    body: "We send hotels, darshan timings, the cab and one total price. Change anything until it suits you.",
  },
  {
    title: "Travel with a local driver",
    body: "Your driver meets you at the station or airport and stays with you for the whole trip.",
  },
];

// Devanagari numerals, used as the step markers.
const numerals = ["१", "२", "३"];

export function HowItWorks() {
  return (
    <section className="render-lazy bg-ink text-paper">
      <div className="shell grid gap-10 py-16 md:gap-12 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-5">
          <h2 className="reveal-text max-w-[14ch] text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Planning a trip takes one message
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-paper/70">
            No long forms. Share a few details and we take it from there.
          </p>
          <ButtonLink href="#plan" className="mt-8 self-start">
            Plan my trip
          </ButtonLink>

          {/* Fills the rest of the column so it matches the height of the steps. */}
          <div className="reveal-media relative mt-10 hidden min-h-64 flex-1 overflow-hidden rounded-[1.75rem] lg:block">
            <Image
              src={ritual}
              alt="Morning prayers on a ghat in Varanasi, boats on the river behind"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ol className="border-b border-white/10 lg:col-span-7">
          {steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 py-7 md:grid-cols-[6rem_1fr] md:gap-6 md:py-11">
              <span aria-hidden className="font-deva text-5xl leading-none text-marigold md:text-7xl">
                {numerals[index]}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-[46ch] text-lg leading-relaxed text-paper/70">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
