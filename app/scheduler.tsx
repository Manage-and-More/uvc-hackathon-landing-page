"use client";

import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/akshat-tandon-tum/30min";

/**
 * Calendly, loaded only once the contact zone is actually reached.
 * Until then it costs nothing, and if the script never arrives the
 * direct link underneath still works.
 */
export default function Scheduler() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || armed) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setArmed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "320px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, [armed]);

  return (
    <div className="sched">
      <div className="sched__head">
        <span className="label">30 minutes · video call</span>
        <span className="state state--set">
          <span className="state__chip" aria-hidden="true" />
          Open now
        </span>
      </div>

      <div
        ref={ref}
        className="calendly-inline-widget sched__frame"
        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=eae9e5&text_color=15171a&primary_color=1500ff`}
      >
        {!ready && (
          <div className="sched__wait">
            <span className="label">Loading the calendar…</span>
            <a className="sched__fallback" href={CALENDLY_URL}>
              Open it in a new tab instead
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
