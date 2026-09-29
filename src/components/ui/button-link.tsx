import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type Variant = "primary" | "glass" | "dark";

const styles: Record<Variant, { button: string; icon: string }> = {
  primary: { button: "bg-marigold text-ink hover:bg-marigold-light", icon: "bg-ink/10" },
  glass: { button: "bg-ink/30 text-white ring-1 ring-white/25 hover:bg-white/20 sm:bg-white/10 sm:backdrop-blur-md", icon: "bg-white/15" },
  dark: { button: "bg-ink text-paper hover:bg-ink-soft", icon: "bg-white/10" },
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

/** Pill button with the arrow nested in its own circle. */
export function ButtonLink({ href, children, variant = "primary", external = false, className = "" }: Props) {
  const { button, icon } = styles[variant];
  const classes = `group inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[15px] font-medium transition-[background-color,transform] duration-500 ease-soft active:scale-[0.98] ${button} ${className}`;

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={`flex size-9 items-center justify-center rounded-full transition-transform duration-500 ease-soft group-hover:-translate-y-px group-hover:translate-x-0.5 ${icon}`}
      >
        <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
