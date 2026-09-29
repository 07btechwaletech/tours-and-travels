"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

const UHD_VIDEO = {
  contentType: 'video/mp4; codecs="avc1.640033"',
  width: 3840,
  height: 2160,
  bitrate: 14_000_000,
  framerate: 24,
};

// Pick the lightest file that still looks sharp on this screen. 4K only when the
// device reports it can decode it smoothly and power-efficiently (no dropped frames).
async function pickSource() {
  const cssWidth = window.innerWidth;
  if (cssWidth < 768) return "/video/hero-720.mp4";
  if (cssWidth * window.devicePixelRatio < 2400) return "/video/hero-1080.mp4";
  try {
    const info = await navigator.mediaCapabilities.decodingInfo({ type: "file", video: UHD_VIDEO });
    return info.smooth && info.powerEfficient ? "/video/hero-2160.mp4" : "/video/hero-1080.mp4";
  } catch {
    return "/video/hero-1080.mp4";
  }
}

type NetworkInformation = { saveData?: boolean };

/**
 * Poster shows instantly (it is the LCP image; the video is kept 1px smaller so
 * it never replaces the poster as the LCP element). The video only starts
 * downloading after the page has loaded, so it never competes with first paint;
 * it fades in once frames are playing and pauses whenever it is off screen.
 * If the phone refuses autoplay (iOS Low Power Mode does this on every site),
 * the poster slowly zooms instead and the video starts on the first tap.
 * Skipped for reduced motion and Data Saver.
 */
export function HeroVideo({ poster }: { poster: StaticImageData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (!video || connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const retryOnTap = () => video.play().catch(() => {});
    const tryPlay = () => {
      // Set in code too: iOS only autoplays video that is muted and inline.
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.play().catch(() => {
        setBlocked(true);
        window.addEventListener("touchend", retryOnTap, { once: true, passive: true });
        window.addEventListener("click", retryOnTap, { once: true });
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tryPlay();
      else video.pause();
    });
    let timer = 0;
    let cancelled = false;
    const start = () =>
      pickSource().then((source) => {
        if (cancelled) return;
        video.src = source;
        observer.observe(video);
      });
    // Phones: let the first paint settle before decoding video (the poster is the same frame).
    const startAfterLoad = () => {
      timer = window.setTimeout(start, window.innerWidth < 768 ? 1500 : 0);
    };

    if (document.readyState === "complete") startAfterLoad();
    else window.addEventListener("load", startAfterLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", startAfterLoad);
      window.removeEventListener("touchend", retryOnTap);
      window.removeEventListener("click", retryOnTap);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-20 animate-settle">
      <Image
        src={poster}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className={`object-cover ${blocked && !playing ? "animate-kenburns" : ""}`}
      />
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
