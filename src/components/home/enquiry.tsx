import Image from "next/image";
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/dist/ssr";
import waterfront from "@/assets/images/ghats-waterfront.jpg";
import { featuredDestinations } from "@/content/destinations";
import { site } from "@/content/site";
import { phoneHref } from "@/lib/contact";
import { EnquiryForm } from "./enquiry-form";

export function Enquiry() {
  return (
    <section id="plan" className="relative isolate scroll-mt-20 overflow-hidden">
      <Image src={waterfront} alt="" fill placeholder="blur" sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/75 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(14,27,43,0.85)_0%,rgba(14,27,43,0.6)_55%,rgba(14,27,43,0.35)_100%)]" />

      <div className="shell grid items-center gap-10 py-16 md:gap-12 md:py-28 lg:grid-cols-12">
        <div className="text-white lg:col-span-6">
          <h2 className="reveal-text max-w-[14ch] text-[clamp(2.25rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Tell us your dates. We will plan the rest.
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-white/75">
            Fill this in and WhatsApp opens with your details ready to send. Prefer to talk? Call us.
          </p>
          <ul className="mt-10 space-y-4 text-lg">
            <li>
              <a href={phoneHref} className="inline-flex items-center gap-3 hover:text-marigold">
                <PhoneIcon size={22} weight="light" aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-marigold">
                <EnvelopeSimpleIcon size={22} weight="light" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] bg-white/10 p-1.5 ring-1 ring-white/15 lg:col-span-6 xl:col-span-5 xl:col-start-8">
          <div className="rounded-[calc(2rem-0.375rem)] bg-surface p-6 md:p-8">
            <EnquiryForm destinations={featuredDestinations.map((destination) => destination.name)} />
          </div>
        </div>
      </div>
    </section>
  );
}
