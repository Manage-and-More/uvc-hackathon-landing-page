"use client";

import { useRef, type MouseEvent } from "react";

const CLOSE_MS = 220; // matches .faq__body.is-shut transition in globals.css

/* A native <details> row whose open and close animate via grid-template-rows.
   Timing is driven by a timer rather than transitionend, so a browser that
   skips the transition can never leave the row locked. Without JS the row is
   a plain details element; with reduced motion the native snap is left alone. */
export default function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const rowRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  const onSummaryClick = (e: MouseEvent) => {
    const row = rowRef.current;
    const body = bodyRef.current;
    if (!row || !body) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    window.clearTimeout(timer.current);

    if (row.open) {
      body.classList.add("is-shut");
      row.classList.add("is-shutting");
      timer.current = window.setTimeout(() => {
        row.open = false;
        body.classList.remove("is-shut");
        row.classList.remove("is-shutting");
      }, CLOSE_MS);
    } else {
      body.classList.add("is-shut");
      row.open = true;
      requestAnimationFrame(() => {
        void body.offsetHeight;
        body.classList.remove("is-shut");
      });
    }
  };

  return (
    <details className="faq__row" ref={rowRef}>
      <summary className="faq__q" onClick={onSummaryClick}>
        <span className="faq__no">Q.0{index}</span>
        <span>{q}</span>
        <span className="faq__sign" aria-hidden="true" />
      </summary>
      <div className="faq__body" ref={bodyRef}>
        <p className="faq__a">{a}</p>
      </div>
    </details>
  );
}
