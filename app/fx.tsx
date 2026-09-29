"use client";

import { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------------------
   Material: the page's ground. A fixed layer whose orange glow and blue-green
   wash drift with scroll progress, written as a custom property from rAF.
   Also flags the top bar once the reader has left the hero.
   ------------------------------------------------------------------------- */
export function Material() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (!reduce) el.style.setProperty("--gy", p.toFixed(3));
      doc.classList.toggle("is-scrolled", window.scrollY > 40);
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

  return <div ref={ref} className="material" aria-hidden="true" />;
}

/* ----------------------------------------------------------------------------
   Countdown to the application deadline. Server-renders a static placeholder
   so nothing shifts; the client fills the live value once mounted.
   ------------------------------------------------------------------------- */
const DEADLINE = Date.parse("2026-10-18T23:59:59+02:00");

function pad(n: number, l: number) {
  return String(n).padStart(l, "0");
}

export function Countdown({ short = false }: { short?: boolean }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const tick = () => {
      let s = Math.floor((DEADLINE - Date.now()) / 1000);
      if (s <= 0) {
        setText("Applications closed");
        return false;
      }
      const d = Math.floor(s / 86400);
      s -= d * 86400;
      const h = Math.floor(s / 3600);
      s -= h * 3600;
      const m = Math.floor(s / 60);
      s -= m * 60;
      setText(
        short
          ? d > 0
            ? `Applications close 18 October · ${d} ${d === 1 ? "day" : "days"} left`
            : "Applications close tonight"
          : `Applications close in ${pad(d, 2)}d ${pad(h, 2)}h ${pad(m, 2)}m ${pad(s, 2)}s`,
      );
      return true;
    };
    if (!tick()) return;
    const id = window.setInterval(() => {
      if (!tick()) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [short]);

  return (
    <span
      className={short ? "cd cd--short" : "cd"}
      aria-label="Countdown to the application deadline"
    >
      {text || "Applications close 18 October"}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   CountUp: a figure ticks up to its value and paints the bar above it each
   time it enters the viewport, and resets when it leaves. Server-renders the
   final value.
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
    })}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fig = el.closest(".fig");
    const numEl = el.querySelector(".fig__num") as HTMLElement | null;
    if (!numEl) return;

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const dur = 1500;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        numEl.textContent = format(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          cancelAnimationFrame(raf);
          if (e.isIntersecting) {
            fig?.classList.add("is-on");
            numEl.textContent = format(0);
            run();
          } else {
            fig?.classList.remove("is-on");
            numEl.textContent = format(value);
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      <span className="fig__num">{format(value)}</span>
      {suffix && <sup className="fig__sup">{suffix}</sup>}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   NavSpy: top-bar links underline the section in view.
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
    <nav className="top__nav" aria-label="Sections">
      {items.map(([text, href]) => (
        <a
          key={href}
          className={`top__link${active === href ? " is-active" : ""}`}
          href={href}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
