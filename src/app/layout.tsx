import type { Metadata } from "next";
import { Bricolage_Grotesque, Tiro_Devanagari_Hindi } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// Used only for Hindi place names. Not preloaded: it swaps in after first paint.
const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tour packages and cabs across Uttar Pradesh`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below may add data-intro-seen before React loads.
    <html lang="en" className={`${bricolage.variable} ${tiro.variable}`} suppressHydrationWarning>
      <head>
        {/* Play the opening zoom once per session. Runs before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;sessionStorage.getItem('intro-seen')?d.setAttribute('data-intro-seen',''):sessionStorage.setItem('intro-seen','1')}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
