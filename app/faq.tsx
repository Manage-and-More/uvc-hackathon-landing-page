"use client";

import { useRef, type MouseEvent } from "react";

/* A native <details> row whose open and close get a measured height
   transition. Without JS the row still works as a plain details element;
   with reduced motion the native snap is left alone. */
export default function FaqItem({ q, a }: { q: string; a: string }) {
  const rowRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const onSummaryClick = (e: MouseEvent) => {
    const row = rowRef.current;
    const body = bodyRef.current;
    if (!row || !body) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (row.dataset.anim) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    row.dataset.anim = "1";
    const done = () => {
      body.style.height = "";
      delete row.dataset.anim;
    };

    if (row.open) {
      body.style.height = `${body.scrollHeight}px`;
      requestAnimationFrame(() => {
        // Force the start height to land before collapsing.
        void body.offsetHeight;
        body.style.height = "0px";
      });
      body.addEventListener(
        "transitionend",
        () => {
          row.open = false;
          done();
        },
        { once: true },
      );
    } else {
      row.open = true;
      const target = body.scrollHeight;
      body.style.height = "0px";
      requestAnimationFrame(() => {
        void body.offsetHeight;
        body.style.height = `${target}px`;
      });
      body.addEventListener("transitionend", done, { once: true });
    }
  };

  return (
    <details className="faq__row" ref={rowRef}>
      <summary className="faq__q" onClick={onSummaryClick}>
        <span>{q}</span>
        <span className="faq__sign" aria-hidden="true" />
      </summary>
      <div className="faq__body" ref={bodyRef}>
        <p className="faq__a">{a}</p>
      </div>
    </details>
  );
}
