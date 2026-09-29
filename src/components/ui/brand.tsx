import Link from "next/link";
import { site } from "@/content/site";

/** Marigold disc with the Devanagari initial, then the wordmark. */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="flex size-9 items-center justify-center rounded-full bg-marigold pt-1 font-deva text-xl leading-none text-ink"
      >
        अ
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="text-lg font-semibold tracking-tight">{site.brand}</span>{" "}
        <span className="text-sm opacity-70">{site.descriptor}</span>
      </span>
    </Link>
  );
}
