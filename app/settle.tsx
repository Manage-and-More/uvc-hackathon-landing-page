"use client";

import { useEffect } from "react";

/* ScrollSettle: when the reader stops scrolling near a section edge, glide to
   it. Reach is wider ahead of the scroll direction than behind, so the page
   never yanks back. Any input, or a scroll we didn't write, cancels the glide.
   Off for touch and reduced motion. */

const REACH_AHEAD = 0.66; // of viewport height: fires once ~1/3 of the next block shows
const REACH_BEHIND = 0.25;
const IDLE_MS = 140; // quiet time before settling
const HOLD_MS = 60; // beat before the glide starts
const GLIDE_MIN_MS = 420;
const GLIDE_MAX_MS = 900;
const GLIDE_MS_PER_PX = 0.6;
const ALIGNED_PX = 2;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

export default function ScrollSettle() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const top = document.querySelector<HTMLElement>(".top");
    const bar = () => top?.getBoundingClientRect().height ?? 0;

    let idle = 0;
    let raf = 0;
    let animating = false;
    let lastY = window.scrollY;
    let restY = window.scrollY; // where the reader last came to rest
    let written = 0;
    let dir = 1;

    const targets = () => {
      const b = bar();
      const list: number[] = [0];
      document.querySelectorAll<HTMLElement>("main .band").forEach((el) => {
        list.push(Math.round(el.getBoundingClientRect().top + window.scrollY - b));
      });
      return list;
    };

    const cancel = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      animating = false;
      lastY = restY = window.scrollY;
    };

    const glide = (to: number) => {
      const from = window.scrollY;
      const delta = to - from;
      const dur = Math.min(GLIDE_MAX_MS, GLIDE_MIN_MS + Math.abs(delta) * GLIDE_MS_PER_PX);
      const t0 = performance.now();
      written = from;
      animating = true;
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        written = from + delta * easeOut(t);
        window.scrollTo({ top: written, behavior: "instant" });
        if (t < 1) raf = requestAnimationFrame(step);
        else cancel();
      };
      raf = requestAnimationFrame(step);
    };

    const settle = () => {
      if (animating) return;
      const y = window.scrollY;
      const from = restY;
      restY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y >= max - ALIGNED_PX) return;
      const ahead = window.innerHeight * REACH_AHEAD;
      const behind = window.innerHeight * REACH_BEHIND;
      let best = 0;
      let bestDelta = Infinity;
      for (const t of targets()) {
        const d = t - y;
        if (Math.abs(d) < ALIGNED_PX) return;
        const isAhead = Math.sign(d) === dir;
        // an edge behind only counts as an overshoot if this gesture crossed it
        const crossed = dir > 0 ? t > from + ALIGNED_PX : t < from - ALIGNED_PX;
        if (!isAhead && !crossed) continue;
        const limit = isAhead ? ahead : behind;
        if (Math.abs(d) <= limit && Math.abs(d) < Math.abs(bestDelta)) {
          best = t;
          bestDelta = d;
        }
      }
      if (bestDelta === Infinity) return;
      idle = window.setTimeout(() => glide(Math.min(best, max)), HOLD_MS);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (animating) {
        if (Math.abs(y - written) > ALIGNED_PX) cancel(); // someone else is steering
        return;
      }
      if (y !== lastY) dir = y > lastY ? 1 : -1;
      lastY = y;
      window.clearTimeout(idle);
      idle = window.setTimeout(settle, IDLE_MS);
    };

    const onInput = () => {
      if (animating) cancel();
      window.clearTimeout(idle);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onInput, { passive: true });
    window.addEventListener("touchstart", onInput, { passive: true });
    window.addEventListener("keydown", onInput);
    window.addEventListener("pointerdown", onInput);
    return () => {
      cancel();
      window.clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onInput);
      window.removeEventListener("touchstart", onInput);
      window.removeEventListener("keydown", onInput);
      window.removeEventListener("pointerdown", onInput);
    };
  }, []);

  return null;
}
