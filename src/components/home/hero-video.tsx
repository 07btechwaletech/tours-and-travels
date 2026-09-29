"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

// Pick the lightest file that still looks sharp on this screen.
function pickSource() {
  const cssWidth = window.innerWidth;
  if (cssWidth < 768) return "/video/hero-720.mp4";
  return cssWidth * window.devicePixelRatio >= 2400 ? "/video/hero-2160.mp4" : "/video/hero-1080.mp4";
}

type NetworkInformation = { saveData?: boolean };

/**
 * Poster shows instantly (it is the LCP image; the video is kept 1px smaller so
 * it never replaces the poster as the LCP element). The video only starts
 * downloading after the page has loaded, so it never competes with first paint;
 * it fades in once frames are playing and pauses whenever it is off screen.
 * Skipped for reduced motion and Data Saver.
 */
export function HeroVideo({ poster }: { poster: StaticImageData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (!video || connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    let timer = 0;
    const start = () => {
      video.src = pickSource();
      observer.observe(video);
    };
    // Phones: let the first paint settle before decoding video (the poster is the same frame).
    const startAfterLoad = () => {
      timer = window.setTimeout(start, window.innerWidth < 768 ? 1500 : 0);
    };

    if (document.readyState === "complete") startAfterLoad();
    else window.addEventListener("load", startAfterLoad, { once: true });
    return () => {
      window.removeEventListener("load", startAfterLoad);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-20 animate-settle">
      <Image src={poster} alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setPlaying(true)}
        className={`absolute left-px top-px h-[calc(100%-2px)] w-[calc(100%-2px)] object-cover transition-opacity duration-[1600ms] ease-soft ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
