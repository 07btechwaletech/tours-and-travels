import Image from "next/image";
import { SuitcaseRollingIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr";
import highway from "@/assets/images/cab-highway.jpg";
import { ButtonLink } from "@/components/ui/button-link";
import { fleet } from "@/content/fleet";
import { whatsappLink } from "@/lib/contact";

export function Cabs() {
  return (
    <section id="cabs" className="shell scroll-mt-28 pb-16 md:pb-28">
      <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-media rounded-[2rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/[0.06] lg:col-span-5">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(2rem-0.375rem)] sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src={highway}
              alt="SUV on an open highway at dusk"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="reveal-text max-w-[16ch] text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Outstation cabs with drivers who know UP
          </h2>
          <p className="mt-4 max-w-[50ch] text-lg leading-relaxed text-muted">
            Airport and station pickups, one-way drops and multi-day trips. Clean cars, fixed per-km rates.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 md:mt-10">
            {fleet.map((vehicle) => (
              <li key={vehicle.name} className="rounded-[1.25rem] bg-surface p-4 ring-1 ring-ink/[0.06] sm:rounded-[1.5rem] sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-base font-semibold leading-tight tracking-tight sm:text-xl">{vehicle.name}</h3>
                  <p className="whitespace-nowrap">
                    <span className="text-xl font-semibold sm:text-2xl">₹{vehicle.ratePerKm}</span>
                    <span className="text-sm text-muted"> per km</span>
                  </p>
                </div>
                <p className="mt-1 text-xs text-muted sm:text-sm">{vehicle.models}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs sm:mt-5 sm:gap-5 sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <UsersIcon size={18} weight="light" aria-hidden /> {vehicle.seats} seats
                  </span>
                  <span className="flex items-center gap-1.5">
                    <SuitcaseRollingIcon size={18} weight="light" aria-hidden /> {vehicle.bags} bags
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={whatsappLink("Hi, I want to book a cab.")} variant="dark" external>
              Book a cab
            </ButtonLink>
            <p className="text-sm text-muted">Tolls, parking and state permits are charged at actuals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
