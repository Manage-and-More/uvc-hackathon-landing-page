import Image from "next/image";
import Reveal from "./reveal";
import FaqItem from "./faq";
import { CountUp, NavSpy, RouteProgress } from "./fx";

const EMAIL = "akshat.tandon@tum.de";
const CALENDLY = "https://calendly.com/akshat-tandon-tum/30min";

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M1 7.5h12M8 2.5l5 5-5 5" />
    </svg>
  );
}

const NAV: [string, string][] = [
  ["Format", "#format"],
  ["Tracks", "#tracks"],
  ["Prizes", "#prizes"],
  ["Partners", "#partners"],
  ["FAQ", "#faq"],
];

const GLANCE: [string, string][] = [
  ["Format", "Two days, on site"],
  ["When", "24-25 October 2026"],
  ["Where", "Munich · venue TBD"],
  ["Builders", "≈ 150"],
];

const LANES: {
  title: string;
  body: string;
  verdict: string;
  ours?: boolean;
}[] = [
  {
    title: "A corporate hackathon",
    body: "Real budget, real brand, a real problem. But the problem belongs to one company's roadmap, and there is no investor in the room when a team turns out to be exceptional.",
    verdict: "No investor access",
  },
  {
    title: "A student hackathon",
    body: "Real builders and real energy. But the problems are invented for the weekend, and nothing that gets built has anyone waiting for it on Monday.",
    verdict: "No production problems",
  },
  {
    title: "This one",
    body: "The fund's portfolio sets the challenges, so every track is a live commercial problem with its owner in the room. The fund's partners judge, so teams are evaluated by people who back startups for a living.",
    verdict: "Both, structurally",
    ours: true,
  },
];

const TRACKS: { no: string; kind: string; body: string }[] = [
  {
    no: "01",
    kind: "UVC hypothesis",
    body: "A challenge built on an investment hypothesis UVC is actively testing.",
  },
  {
    no: "02",
    kind: "Portfolio startup",
    body: "A live production problem from a UVC portfolio company, with the person who owns it in the room for two days.",
  },
  {
    no: "03",
    kind: "Portfolio startup",
    body: "A second portfolio company, a second real problem, reserved for the UVC portfolio.",
  },
  {
    no: "04",
    kind: "Corporate",
    body: "An industrial operator's problem at the scale it actually occurs.",
  },
];

const DIRECTIONS: [string, string][] = [
  [
    "Engineering & design",
    "Copilots inside CAD and CAE workflows, design-space exploration, engineering-change automation.",
  ],
  [
    "Technical sales & quoting",
    "Specification parsing, configure-to-quote, proposal generation over complex catalogues.",
  ],
  [
    "Procurement & supply chain",
    "Supplier-risk detection, sourcing automation, document and ERP extraction.",
  ],
  [
    "Operations & process",
    "Process signals turned into autonomous, tool-using resolution across live enterprise systems.",
  ],
];

const RUNSHEET: [string, string, string][] = [
  [
    "Saturday, morning",
    "Kick-off",
    "Tracks are opened by the people who set them. Teams pick a track and start.",
  ],
  [
    "Saturday → Sunday",
    "Build",
    "Two days on site. Challenge owners stay reachable. A compute partner supplies AI credits for building across the weekend.",
  ],
  [
    "Sunday, evening",
    "Demos and jury",
    "Every team demonstrates a running agent. The jury scores what runs.",
  ],
];

const PRIZES: {
  track: string;
  note?: string;
  prizes: [string, string, string];
}[] = [
  {
    track: "Overall winner",
    note: "Across all tracks",
    prizes: ["10,000 AI credits", "2,000 AI credits", "1,000 AI credits"],
  },
  {
    track: "Corporate track",
    prizes: ["€1,500", "€1,000", "€500"],
  },
  {
    track: "Startup tracks",
    note: "Each",
    prizes: ["€1,000", "€500", "€200"],
  },
  {
    track: "UVC track",
    note: "Every place includes a mentoring session with a UVC partner",
    prizes: ["€500", "€200", "€100"],
  },
];

const SLOTS: { tier: string; desc: string }[] = [
  {
    tier: "Challenge partner",
    desc: "A UVC portfolio company with a live production problem. Owns Track 02.",
  },
  {
    tier: "Challenge partner",
    desc: "A second UVC portfolio company, a second real problem. Owns Track 03.",
  },
  {
    tier: "Corporate partner",
    desc: "An industrial operator, preferably a UVC LP. Owns Track 04.",
  },
  {
    tier: "Compute partner",
    desc: "An AI lab. Credits for building through the weekend and as prizes.",
  },
  {
    tier: "Strategic partner",
    desc: "An ecosystem partner strengthening the program and the talent pool.",
  },
];

const TIERS: { title: string; who: string; gets: string[] }[] = [
  {
    title: "Challenge partner",
    who: "A UVC portfolio company, or a UVC LP for the corporate track",
    gets: [
      "A problem you choose, worked on by strong technical teams for two days",
      "A CTO or C-level seat on the jury",
      "Two days watching how those builders work under pressure",
      "Working prototypes, evaluated on whether they run",
    ],
  },
  {
    title: "Jury seat",
    who: "A UVC partner",
    gets: [
      "One UVC seat on the jury alongside the challenge partners",
      "A concentrated look at strong technical builders under a deadline",
      "Evaluation of working software, not of decks",
    ],
  },
  {
    title: "Compute partner",
    who: "An AI lab",
    gets: [
      "AI credits used for building across the whole weekend",
      "Credits as prizes for the winning teams",
      "Presence at a two-day event about agents that ship",
    ],
  },
];

const FIGURES: {
  prefix?: string;
  value: number;
  decimals?: number;
  suffix: string;
  what: string;
}[] = [
  {
    prefix: "$",
    value: 2.3,
    decimals: 1,
    suffix: "B+",
    what: "raised by startups founded by Manage & More alumni",
  },
  { value: 260, suffix: "+", what: "startups founded by the community" },
  { value: 10, suffix: "+", what: "venture funds founded by alumni" },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What does a challenge partner contribute?",
    a: "Three things: a partner fee that covers venue and catering, one challenge with an owner on site over the weekend, and the prizes for your track. We co-shape the challenge brief with you.",
  },
  {
    q: "What makes a good challenge?",
    a: "A real agentic problem from your domain, with a dataset or a sandbox API so teams can build something that runs. The best briefs stay open enough to invite solutions you have not thought of.",
  },
  {
    q: "How much of our team's time does it take?",
    a: "Upfront work to shape the challenge, then being there for the kick-off and the final pitches. In between, most partners stay close to their track to answer questions and meet teams, but that part is optional.",
  },
  {
    q: "Who are the participants?",
    a: "Talented builders from a range of backgrounds. Applications run through Luma with resume, LinkedIn and motivation, and our team curates every admission. Selection is for a high density of talent.",
  },
  {
    q: "Do people apply solo or in teams?",
    a: "Both. Solo applicants form teams on hackathon day, and the schedule plans time for exactly that.",
  },
  {
    q: "How are teams judged?",
    a: "On the pitch and, above all, on how the problem is solved technically: agents that actually work, not agents that work hypothetically. Each challenge partner holds one seat on the jury, and a UVC partner judges the open track.",
  },
  {
    q: "What do partners walk away with?",
    a: "Participant profiles, the prototypes built on your track, and direct access to the talent behind them.",
  },
  {
    q: "Who is organizing it?",
    a: "Manage & More, UnternehmerTUM's flagship entrepreneurship program, together with UVC Partners. The team has organized several hackathons, most recently hosting the Munich hub of Hack-Nation.",
  },
];

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <RouteProgress />

      <header className="mast">
        <div className="shell mast__in">
          <div className="lockup">
            <Image
              src="/brand/manage-and-more.png"
              alt="Manage & More"
              width={596}
              height={139}
              className="lockup__mm"
              priority
            />
            <span className="lockup__x" aria-hidden="true">
              ×
            </span>
            <Image
              src="/brand/uvc-partners.png"
              alt="UVC Partners"
              width={362}
              height={288}
              className="lockup__uvc"
              priority
            />
          </div>

          <NavSpy items={NAV} />

          <a className="mast__cta" href="#contact">
            Book 30 minutes
          </a>
        </div>
        <div className="mast__rule" />
      </header>

      <main id="main">
        {/* ---- hero ------------------------------------------------------ */}
        <section className="band hero">
          <div className="shell hero__in">
            <div className="hero__lead">
              <p className="label hero__kick">
                Agentic AI for industry · Munich · 24-25 October 2026
              </p>

              <h1 className="h-display">
                <span className="hline">
                  <span className="hline__in">Industrial AI</span>
                </span>
                <span className="hline">
                  <span className="hline__in">Agents Hackathon</span>
                </span>
              </h1>

              <p className="prose lede hero__prose">
                <strong>
                  The first hackathon built inside a venture fund.
                </strong>{" "}
                UVC portfolio companies set the challenges, UVC partners sit on
                the jury, and teams get their feedback from the people who
                actually invest. Scored on agents that run at the demo, not on
                the pitch.
              </p>
            </div>

            <dl className="glance">
              {GLANCE.map(([k, v]) => (
                <div className="glance__row" key={k}>
                  <dt className="label">{k}</dt>
                  <dd className="glance__v">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The floor itself enters the first viewport. */}
          <div className="floorline" aria-hidden="true">
            <div className="floorline__route" />
            <div className="shell floorline__ticks">
              {TRACKS.map((track) => (
                <span className="ftick" key={track.no}>
                  <span className="ftick__no">Track {track.no}</span>
                  <span className="ftick__state">{track.kind}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---- the wedge ------------------------------------------------- */}
        <section className="band band--sunk" id="format">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">
                  Built around the fund,
                  <br />
                  not the sponsor.
                </h2>
                <p className="prose">
                  Most hackathons put a company&rsquo;s logo on the wall and
                  call it a partnership. Here the venture fund is the structure
                  itself: its portfolio supplies the problems, its partners sit
                  on the jury, and it gets two days of concentrated exposure to
                  builders it would otherwise meet one CV at a time.
                </p>
              </div>
            </Reveal>

            <ul className="lanes">
              {LANES.map((lane) => (
                <Reveal
                  as="li"
                  key={lane.title}
                  className={`lane rise${lane.ours ? " lane--ours" : ""}`}
                >
                  <h3 className="h-block lane__title">{lane.title}</h3>
                  <p className="lane__body">{lane.body}</p>
                  <span className="lane__verdict label">{lane.verdict}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- the tracks ------------------------------------------------ */}
        <section className="band" id="tracks">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">Four tracks on the floor.</h2>
                <p className="prose">
                  Each track is one partner&rsquo;s problem, worked on by
                  several teams at once.
                </p>
              </div>
            </Reveal>

            <ol className="bays">
              {TRACKS.map((track) => (
                <Reveal as="li" key={track.no} className="bay">
                  <span className="label bay__no">Track {track.no}</span>
                  <h3 className="h-block bay__kind">{track.kind}</h3>
                  <p className="bay__body">{track.body}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal className="directions">
              <div className="directions__head">
                <span className="label">The problem space</span>
                <p className="directions__note">
                  Industrial AI agents span the whole value chain. Partners
                  define their own briefs; these directions only give a feel
                  for the floor.
                </p>
              </div>
              <ul className="directions__grid">
                {DIRECTIONS.map(([title, body]) => (
                  <li className="direction" key={title}>
                    <h3 className="direction__title">{title}</h3>
                    <p className="direction__body">{body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* The one painted zone on the floor: the criterion the whole
              weekend is built around. */}
          <Reveal className="verdict">
            <div className="shell verdict__in">
              <p className="verdict__text">
                Teams are judged on <em>agents that actually run</em>: a demo
                that executes, not a deck that describes one.
              </p>
              <p className="verdict__sub">
                Reliability, tool use over real APIs, deployment against
                sensitive data. Not demo polish.
              </p>
            </div>
          </Reveal>

          <div className="shell">
            <Reveal className="runsheet">
              {RUNSHEET.map(([when, what, detail]) => (
                <div className="stop" key={what}>
                  <div className="stop__mark" aria-hidden="true" />
                  <span className="label stop__when">{when}</span>
                  <h3 className="h-block stop__what">{what}</h3>
                  <p className="stop__detail">{detail}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- prizes ----------------------------------------------------- */}
        <section className="band band--sunk" id="prizes">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">What winning pays.</h2>
                <p className="prose">
                  Every track carries its own podium, and one team takes the
                  overall title. The structure below is the current plan and
                  may still evolve with the final partner line-up.
                </p>
              </div>
            </Reveal>

            <div className="prizes">
              <div className="prizes__cols" aria-hidden="true">
                <span />
                <span className="label">1st</span>
                <span className="label">2nd</span>
                <span className="label">3rd</span>
              </div>
              {PRIZES.map((row) => (
                <Reveal as="div" key={row.track} className="prize rise">
                  <div className="prize__track">
                    <h3 className="h-block">{row.track}</h3>
                    {row.note && <p className="prize__note">{row.note}</p>}
                  </div>
                  {row.prizes.map((p, i) => (
                    <div className="prize__cell" key={i}>
                      <span className="label prize__place">
                        {["1st", "2nd", "3rd"][i]}
                      </span>
                      <span className="prize__v">{p}</span>
                    </div>
                  ))}
                </Reveal>
              ))}
            </div>

            <p className="prizes__foot">
              Every track winner additionally takes AI credits home.
            </p>
          </div>
        </section>

        {/* ---- partners --------------------------------------------------- */}
        <section className="band" id="partners">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">The partner line-up.</h2>
                <p className="prose">
                  Organized by Manage &amp; More and UVC Partners. Around them,
                  five partner slots. Each is announced here as it is signed.
                </p>
              </div>
            </Reveal>

            <div className="slots">
              <Reveal as="div" className="slot slot--set">
                <span className="label slot__tier">Organized by</span>
                <div className="slot__logos">
                  <Image
                    src="/brand/manage-and-more.png"
                    alt="Manage & More"
                    width={596}
                    height={139}
                    className="slot__logo slot__logo--mm"
                  />
                  <Image
                    src="/brand/uvc-partners.png"
                    alt="UVC Partners"
                    width={362}
                    height={288}
                    className="slot__logo slot__logo--uvc"
                  />
                </div>
                <p className="slot__desc">
                  Both under UnternehmerTUM. Owns Track 01, the UVC hypothesis
                  track.
                </p>
              </Reveal>

              {SLOTS.map((slot, i) => (
                <Reveal as="div" key={`${slot.tier}-${i}`} className="slot">
                  <span className="label slot__tier">{slot.tier}</span>
                  <div className="slot__plate">
                    <span className="slot__tba">To be announced</span>
                  </div>
                  <p className="slot__desc">{slot.desc}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="subzone">
              <span className="label">What each partner gets</span>
            </Reveal>

            <div className="tiers">
              {TIERS.map((tier) => (
                <Reveal as="div" key={tier.title} className="tier">
                  <div className="tier__id">
                    <h3 className="h-block">{tier.title}</h3>
                    <p className="tier__who">{tier.who}</p>
                  </div>
                  <ul className="tier__gets">
                    {tier.gets.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- who is delivering ----------------------------------------- */}
        <section className="band band--sunk" id="who">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">Who is running it.</h2>
              </div>
            </Reveal>

            <div className="orgs">
              <Reveal as="div" className="org">
                <Image
                  src="/brand/manage-and-more.png"
                  alt="Manage & More"
                  width={596}
                  height={139}
                  className="org__logo org__logo--mm"
                />
                <p className="org__body">
                  UnternehmerTUM&rsquo;s flagship entrepreneurship program,
                  running project teams of students and young professionals on
                  real ventures. Alumni have founded more than 260 startups,
                  among them komoot, Konux, IDnow, Tado, Proglove, Fernride
                  and OroraTech, which have raised over $2.3B, plus more than
                  ten venture funds.
                </p>
              </Reveal>

              <Reveal as="div" className="org">
                <Image
                  src="/brand/uvc-partners.png"
                  alt="UVC Partners"
                  width={362}
                  height={288}
                  className="org__logo org__logo--uvc"
                />
                <p className="org__body">
                  Unternehmertum Venture Capital Partners. Munich and Berlin,
                  backing B2B startups across Europe from the earliest stages up
                  to Series A, with initial investments up to €10M and funds
                  supported by the European Investment Fund. Portfolio includes
                  Isar Aerospace, Proxima Fusion, Flix, TWAICE, Tacto, Aleph
                  Alpha, planqc, Capmo and Q.ANT.
                </p>
              </Reveal>
            </div>

            <Reveal className="figures">
              {FIGURES.map((fig) => (
                <div className="fig" key={fig.what}>
                  <CountUp
                    className="fig__n"
                    value={fig.value}
                    decimals={fig.decimals}
                    prefix={fig.prefix}
                    suffix={fig.suffix}
                  />
                  <span className="fig__what">{fig.what}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- faq ------------------------------------------------------- */}
        <section className="band" id="faq">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">FAQ.</h2>
                <p className="label zone__tag">For our partners</p>
              </div>
            </Reveal>

            <div className="faq">
              {FAQ.map((row) => (
                <FaqItem key={row.q} q={row.q} a={row.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ---- contact --------------------------------------------------- */}
        <section className="band band--sunk contact" id="contact">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">
                  Take a track, take a jury seat,
                  <br />
                  or ask what it would cost you.
                </h2>
              </div>
            </Reveal>

            <div className="contact__stack">
              <a
                className="book"
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="book__label">Book a call</span>
                <span className="book__meta">30 minutes · video</span>
                <span className="book__arrow">
                  <Arrow />
                </span>
              </a>

              <a
                className="mailto"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Industrial AI Agents Hackathon: partner enquiry",
                )}`}
              >
                <span className="mailto__text">
                  Or reach out by email instead
                </span>
                <span className="mailto__arrow">
                  <Arrow />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="shell foot__in">
          <div className="lockup lockup--foot">
            <Image
              src="/brand/manage-and-more.png"
              alt="Manage & More"
              width={596}
              height={139}
              className="lockup__mm"
            />
            <span className="lockup__x" aria-hidden="true">
              ×
            </span>
            <Image
              src="/brand/uvc-partners.png"
              alt="UVC Partners"
              width={362}
              height={288}
              className="lockup__uvc"
            />
          </div>
          <p className="foot__note">
            Industrial AI Agents Hackathon · Munich · 24-25 October 2026
          </p>
        </div>
      </footer>
    </>
  );
}
