"use client";

import { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------------------
   RouteProgress — the page's route line gets painted as the reader walks it.
   A fixed vertical track at the left edge whose blue fill tracks scroll
   position. Direct DOM writes via rAF, no re-renders.
   ------------------------------------------------------------------------- */
export function RouteProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fill.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="routeprog" aria-hidden="true">
      <div ref={fillRef} className="routeprog__fill" />
    </div>
  );
}

/* ----------------------------------------------------------------------------
   CountUp — a figure ticks up to its value when it enters the viewport.
   Server-renders the final value, so no-JS and crawlers see the real number.
   ------------------------------------------------------------------------- */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (v: number) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = format(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          el.textContent = format(0);
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   NavSpy — masthead links carry a painted underline for the section currently
   on the floor. Renders the same anchors with or without JS.
   ------------------------------------------------------------------------- */
export function NavSpy({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = items
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        // Of the sections crossing the reading band, take the last to enter.
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="mast__nav" aria-label="Sections">
      {items.map(([text, href]) => (
        <a
          key={href}
          className={`mast__link${active === href ? " is-active" : ""}`}
          href={href}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
