"use client";

import type Lenis from "lenis";
import { useEffect } from "react";

/**
 * Eased wheel scrolling for mouse users. Loaded after the page is idle and
 * never on touch screens (native touch scrolling is already smooth), so it
 * costs nothing on first load. Reduced motion turns it off (Lenis default).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let lenis: Lenis | undefined;
    let cancelled = false;
    const start = () =>
      import("lenis").then(({ default: LenisClass }) => {
        if (!cancelled) lenis = new LenisClass({ autoRaf: true, lerp: 0.13 });
      });
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start) : window.setTimeout(start, 1);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      lenis?.destroy();
    };
  }, []);

  return null;
}
