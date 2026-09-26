"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Adds .is-on while the element is in view and removes it when it leaves, so
   reveals play again on the way back. Everything is visible without JS. */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "tr" | "ul" | "ol";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Tells the layout's failsafe that the bundle arrived and the reveals are
    // being driven, so it should leave the hidden start state alone.
    document.documentElement.dataset.revealReady = "1";

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-on");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-on", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error -- polymorphic tag, ref type is compatible at runtime
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
