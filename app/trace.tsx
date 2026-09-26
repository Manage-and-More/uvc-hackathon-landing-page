"use client";

import { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------------------
   AgentTrace: an illustrative console. Four made-up examples type out line by
   line once the console is in view. Nothing here is a brief. Server-renders the first
   example in full so the section reads without JS and under reduced motion.
   The animated body is decorative for assistive tech; a static description
   carries the meaning.
   ------------------------------------------------------------------------- */

type Kind = "task" | "tool" | "ask" | "human" | "done";
type Line = [string, Kind, string];

const EXAMPLES: Line[][] = [
  [
    ["16:27:44", "task", "ECN-0932: bracket wall 2.0 → 2.5 mm"],
    ["16:27:45", "tool", "plm.affected_assemblies → 7 BOMs, 3 drawings"],
    ["16:27:49", "tool", "cad.check_fit(assembly=…) ×7 → 1 interference"],
    ["16:27:53", "tool", "erp.open_orders(BRK-2210) → 240 pcs in flight"],
    ["16:27:54", "ask", 'engineer: "A-114 collides at 2.5 mm. Hold?"'],
    ["16:28:31", "human", "hold, I will look at A-114"],
    ["16:28:32", "tool", "plm.set_status(hold) → 4 owners notified"],
    ["16:28:32", "done", "✓ triaged in 48 s, no silent BOM edits"],
  ],
  [
    ["09:41:03", "task", "RFP #4471: 38-page spec, deadline Friday"],
    ["09:41:05", "tool", "parse_requirements → 212 requirements, 3 ambiguous"],
    ["09:41:09", "tool", "rules.check ×212 → 197 met, 4 red flags"],
    ["09:41:12", "tool", "norms.lookup(EU) → 2 clauses to state"],
    ["09:41:15", "tool", "cpq.configure → B-220, list + 3 options"],
    ["09:41:16", "ask", 'sales eng: "1 hard flag (IP67 at −40 °C). Bid?"'],
    ["09:41:52", "human", "push back on IP67, draft the rest"],
    ["09:41:53", "tool", "crm.write_back → draft + questions"],
    ["09:41:53", "done", "✓ bid pack in 50 s, every line traceable"],
  ],
  [
    ["14:02:10", "task", "supplier risk review: 61 suppliers, Q4"],
    ["14:02:11", "tool", "erp.open_orders → 418 lines, 61 suppliers"],
    ["14:02:14", "tool", "market.signals(supplier=…) ×61 → 2 flagged"],
    ["14:02:19", "tool", "erp.lead_times → 1 supplier slipping 3 wks"],
    ["14:02:20", "tool", "catalog.alternatives → 2 qualified, +4 %"],
    ["14:02:21", "ask", 'buyer: "move BRK-2210 to the alternate?"'],
    ["14:02:58", "human", "yes, keep December as is"],
    ["14:02:59", "tool", "erp.split_order → draft PO, needs sign-off"],
    ["14:03:00", "done", "✓ memo + draft PO in 50 s, sources cited"],
  ],
  [
    ["03:12:07", "task", "line 4 alarm: cycle time +18 % on station 12"],
    ["03:12:08", "tool", "mes.history(12, 6h) → drift since 01:40"],
    ["03:12:11", "tool", "cmms.tickets(12) → last service 11 wks ago"],
    ["03:12:13", "tool", "erp.stock(GRP-114) → 2 spare grippers"],
    ["03:12:14", "tool", "shift_plan → changeover window 05:30"],
    ["03:12:15", "ask", 'shift lead: "swap gripper at 05:30, or run on?"'],
    ["03:12:41", "human", "swap at 05:30"],
    ["03:12:42", "tool", "cmms.work_order → WO-8821, parts reserved"],
    ["03:12:42", "done", "✓ scheduled in 35 s, no line stop"],
  ],
];

function secs(ts: string) {
  const [h, m, s] = ts.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

export default function AgentTrace() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [example, setExample] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const runRef = useRef(0);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  // Capability gate: only animate with IntersectionObserver and full motion.
  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setAnimated(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(e.isIntersecting);
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const running = animated && visible && !paused;

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (!running) {
      // Stop typing while the section is offscreen or paused; the run token
      // invalidates any pending callbacks.
      runRef.current++;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      return;
    }

    const myRun = ++runRef.current;
    const lines = EXAMPLES[example];
    body.innerHTML = "";
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const lineEl = (l: Line) => {
      const d = document.createElement("div");
      d.className = `trace__ln trace__ln--${l[1]}`;
      d.innerHTML =
        `<span class="trace__ts">${l[0]}</span>` +
        `<span class="trace__kind">${l[1]}</span>` +
        `<span class="trace__msg"></span>`;
      return d;
    };

    const type = (el: HTMLElement, text: string, cb: () => void) => {
      const cur = document.createElement("span");
      cur.className = "trace__cursor";
      el.appendChild(cur);
      let i = 0;
      const step = () => {
        if (myRun !== runRef.current) return;
        if (i <= text.length) {
          if (el.firstChild === cur) {
            el.insertBefore(document.createTextNode(text.slice(0, i)), cur);
          } else if (el.firstChild) {
            el.firstChild.nodeValue = text.slice(0, i);
          }
          i++;
          const ch = text.charAt(i - 1);
          let d = 12 + Math.random() * 20;
          if (ch === "," || ch === ".") d += 80;
          later(step, d);
        } else {
          cur.remove();
          cb();
        }
      };
      step();
    };

    let i = 0;
    const next = () => {
      if (myRun !== runRef.current) return;
      if (i >= lines.length) {
        later(() => {
          if (myRun !== runRef.current) return;
          setExample((e) => (e + 1) % EXAMPLES.length);
        }, 6000);
        return;
      }
      const l = lines[i];
      const el = lineEl(l);
      body.appendChild(el);
      type(el.querySelector(".trace__msg") as HTMLElement, l[2], () => {
        let wait = 0;
        if (i + 1 < lines.length) {
          const gap = Math.max(0, secs(lines[i + 1][0]) - secs(l[0]));
          wait = 240 + Math.min(gap, 25) * 50;
        }
        if (l[1] === "ask") wait += 500;
        later(() => {
          i++;
          next();
        }, wait);
      });
    };
    next();
  }, [running, example]);

  const onNext = () => setExample((e) => (e + 1) % EXAMPLES.length);

  return (
    <div className="trace" ref={rootRef}>
      <div className="console">
        <div className="console__head">
          <span>
            <i className="led led--on" aria-hidden="true" />
            <b>Agent trace</b>
          </span>
          <span className="console__ctl">
            <span>
              0{example + 1} / 0{EXAMPLES.length}
            </span>
            {animated && (
              <>
                <button
                  type="button"
                  className="console__next"
                  onClick={() => setPaused((p) => !p)}
                  aria-pressed={paused}
                  aria-label={paused ? "Resume the trace" : "Pause the trace"}
                >
                  {paused ? "play" : "pause"}
                </button>
                <button
                  type="button"
                  className="console__next"
                  onClick={onNext}
                  aria-label="Next example"
                >
                  next <span aria-hidden="true">→</span>
                </button>
              </>
            )}
          </span>
        </div>
        <p className="sr-only">
          An illustrative trace of an industrial agent: it reads a task, calls
          the company&rsquo;s own systems, asks a person before the risky step,
          and writes the result back.
        </p>
        <div
          className="console__body"
          ref={bodyRef}
          aria-hidden={animated ? "true" : undefined}
        >
          {!animated &&
            EXAMPLES[0].map((l, idx) => (
              <div key={idx} className={`trace__ln trace__ln--${l[1]}`}>
                <span className="trace__ts">{l[0]}</span>
                <span className="trace__kind">{l[1]}</span>
                <span className="trace__msg">{l[2]}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
