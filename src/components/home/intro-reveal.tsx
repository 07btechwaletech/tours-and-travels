"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Opening shot: the hero video plays inside giant KASHI letters (screen blend:
 * black text lets the video through), then the view zooms through the "I" into
 * the full video. Plays once per session; see the inline script in the root layout.
 */
export function IntroReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const zoomTargetRef = useRef<HTMLSpanElement>(null);

  // Zoom around the "I" and glide it to the screen centre (--zx/--zy), so its
  // stroke opens out evenly to both edges.
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const target = zoomTargetRef.current;
    if (!overlay || !target) return;

    const aim = () => {
      const box = target.getBoundingClientRect();
      const frame = overlay.getBoundingClientRect();
      const x = box.left + box.width / 2 - frame.left;
      const y = box.top + box.height / 2 - frame.top;
      overlay.style.transformOrigin = `${x}px ${y}px`;
      overlay.style.setProperty("--zx", `${frame.width / 2 - x}px`);
      overlay.style.setProperty("--zy", `${frame.height / 2 - y}px`);
    };

    aim();
    document.fonts.ready.then(aim);
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="intro-reveal pointer-events-none fixed inset-0 z-70 flex items-center justify-center bg-paper mix-blend-screen"
    >
      <span className="intro-reveal-word select-none whitespace-nowrap text-[min(27vw,46vh)] font-extrabold leading-[0.8] tracking-tighter text-black">
        KASH<span ref={zoomTargetRef} className="tracking-normal">I</span>
      </span>
    </div>
  );
}
