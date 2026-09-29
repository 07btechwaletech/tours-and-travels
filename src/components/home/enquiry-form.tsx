"use client";

import { useState, type FormEvent } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/contact";

type Errors = Partial<Record<"name" | "phone", string>>;

const inputClass =
  "w-full rounded-2xl bg-white px-4 py-3 text-[15px] text-ink ring-1 ring-ink/15 transition-shadow placeholder:text-muted/80 focus:outline-none focus:ring-2 focus:ring-marigold aria-[invalid=true]:ring-red-700";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Builds a WhatsApp message from the form and opens it.
 * TODO(cms): also save the enquiry to Postgres once the admin panel exists.
 */
export function EnquiryForm({ destinations }: { destinations: string[] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const nextErrors: Errors = {};
    if (!value("name")) nextErrors.name = "Enter your name.";
    if (value("phone").replace(/\D/g, "").length < 10) nextErrors.phone = "Enter a 10-digit mobile number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const lines = [
      "Hi, I want to plan a trip.",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Going to: ${value("destination")}`,
      value("date") && `Travel date: ${value("date")}`,
      `Travellers: ${value("travellers")}`,
      value("message") && `Notes: ${value("message")}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field id="phone" label="Mobile number" error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
        </Field>
      </div>

      <Field id="destination" label="Where do you want to go?">
        <select id="destination" name="destination" className={inputClass} defaultValue={destinations[0]}>
          {destinations.map((destination) => (
            <option key={destination}>{destination}</option>
          ))}
          <option>Somewhere else in UP</option>
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="date" label="Travel date">
          <input id="date" name="date" type="date" className={inputClass} />
        </Field>
        <Field id="travellers" label="Travellers">
          <input id="travellers" name="travellers" type="number" min={1} max={60} defaultValue={2} className={inputClass} />
        </Field>
      </div>

      <Field id="message" label="Anything we should know? (optional)">
        <textarea id="message" name="message" rows={3} className={`${inputClass} resize-none`} />
      </Field>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-[15px] font-medium text-paper transition-[background-color,transform] duration-500 ease-soft hover:bg-ink-soft active:scale-[0.98]"
      >
        <WhatsappLogoIcon size={20} weight="light" aria-hidden />
        Send on WhatsApp
      </button>

      <p aria-live="polite" className="min-h-5 text-sm text-muted">
        {sent && "WhatsApp opened in a new tab. Press send there to reach us."}
      </p>
    </form>
  );
}
