import { site } from "@/content/site";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;

export const formatINR = (amount: number) => new Intl.NumberFormat("en-IN").format(amount);
