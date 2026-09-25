import Image from "next/image";
import Reveal from "./reveal";
import FaqItem from "./faq";
import { CountUp, NavSpy, RouteProgress } from "./fx";

const EMAIL = "akshat.tandon@tum.de";
const LUMA = "https://luma.com/070qezlj";

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
  ["Concept", "#concept"],
  ["Tracks", "#tracks"],
  ["Partners", "#partners"],
  ["FAQ", "#faq"],
];

const GLANCE: [string, string][] = [
  ["Format", "Two days, on site"],
  ["When", "24-25 October 2026"],
  ["Where", "Munich"],
  ["Builders", "≈ 100"],
  ["Teams", "Solo or 2-4"],
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

const TRACKS = ["01", "02", "03"];

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
    "Saturday, 10:00",
    "Kick-off",
    "Check-in, opening and track briefings from the challenge owners. Teams form, and hacking starts at noon.",
  ],
  [
    "Saturday → Sunday",
    "Build",
    "The venue stays open overnight. Challenge owners hold office hours, and every team builds with Claude credits from Anthropic.",
  ],
  [
    "Sunday, 15:00",
    "Code freeze and demos",
    "Submissions close at 15:00. Track judging from 15:30, finals and awards at 17:30.",
  ],
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
    q: "Who can apply?",
    a: "Anyone who takes ownership and ships. We don't select on background: full-stack engineers, data scientists, designers and business people all belong on the floor, and every team finds its own mix. What we look for is agency, and the drive to work on frontier problems from the portfolio of a deep-tech VC.",
  },
  {
    q: "Do I need a team?",
    a: "No. Apply solo or as a team of 2-4. Solo applicants form teams on Saturday morning, and the schedule plans time for exactly that.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Food, drinks and compute are covered for the whole weekend, including AI credits for every team.",
  },
  {
    q: "Where exactly is it?",
    a: "In Munich. The address is sent to accepted participants.",
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
            <span className="lockup__x" aria-hidden="true">
              ×
            </span>
            <Image
              src="/brand/anthropic.svg"
              alt="Anthropic"
              width={1024}
              height={115}
              className="lockup__anthropic"
              priority
            />
          </div>

          <NavSpy items={NAV} />

          <a
            className="mast__cta"
            href={LUMA}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
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
                Manage &amp; More × UVC Partners × Anthropic · Munich · 24-25
                October 2026
              </p>

              <h1 className="h-display">
                <span className="hline">
                  <span className="hline__in">Industrial</span>
                </span>
                <span className="hline">
                  <span className="hline__in">Agents Hackathon</span>
                </span>
              </h1>

              <p className="prose lede hero__prose">
                <strong>
                  The first hackathon built inside a venture fund.
                </strong>{" "}
                UVC portfolio companies set the challenges, with real data to
                build against. Anthropic backs every team with Claude. The
                jury is the people who own the problems and the people who
                invest, and it scores agents that run, not pitches.
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
              {TRACKS.map((no) => (
                <span className="ftick" key={no}>
                  <span className="ftick__no">Track {no}</span>
                  <span className="ftick__state">To be announced</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---- the wedge ------------------------------------------------- */}
        <section className="band band--sunk" id="concept">
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
                  on the jury, and the builders get two days in front of the
                  people who fund what comes next.
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
                <h2 className="h-section">Three tracks on the floor.</h2>
                <p className="prose">
                  Each track is a live problem from a UVC portfolio company,
                  worked on by several teams at once. Partners are announced
                  as they sign; briefs are revealed at the kick-off.
                </p>
              </div>
            </Reveal>

            <ol className="bays">
              {TRACKS.map((no) => (
                <Reveal as="li" key={no} className="bay">
                  <span className="label bay__no">Track {no}</span>
                  <h3 className="h-block bay__kind">To be announced</h3>
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

        {/* ---- partners --------------------------------------------------- */}
        <section className="band band--sunk" id="partners">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">The partner line-up.</h2>
                <p className="prose">
                  Hosted by Manage &amp; More and UVC Partners, together with
                  Anthropic. Challenge and ecosystem partners are announced
                  here as they sign.
                </p>
              </div>
            </Reveal>

            <div className="slots">
              <Reveal as="div" className="slot slot--set">
                <span className="label slot__tier">Hosted by</span>
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
                  Both under UnternehmerTUM. M&amp;M runs the weekend; UVC
                  brings the portfolio and the jury.
                </p>
              </Reveal>

              <Reveal as="div" className="slot slot--set">
                <span className="label slot__tier">AI partner</span>
                <div className="slot__logos">
                  <Image
                    src="/brand/anthropic.svg"
                    alt="Anthropic"
                    width={1024}
                    height={115}
                    className="slot__logo slot__logo--anthropic"
                  />
                </div>
                <p className="slot__desc">
                  Co-host of the weekend. Every team builds with Claude.
                </p>
              </Reveal>

              <Reveal as="div" className="slot">
                <span className="label slot__tier">
                  Ecosystem &amp; compute partners
                </span>
                <div className="slot__plate">
                  <span className="slot__tba">To be announced</span>
                </div>
                <p className="slot__desc">
                  Cloud credits, tools, food and drinks for 100 builders.
                  Want to back the weekend?{" "}
                  <a href={`mailto:${EMAIL}`}>Get in touch</a>.
                </p>
              </Reveal>

              {TRACKS.map((no) => (
                <Reveal as="div" key={no} className="slot">
                  <span className="label slot__tier">
                    Challenge partner · Track {no}
                  </span>
                  <div className="slot__plate">
                    <span className="slot__tba">To be announced</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- who is delivering ----------------------------------------- */}
        <section className="band" id="who">
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
        <section className="band band--sunk" id="faq">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">FAQ.</h2>
              </div>
            </Reveal>

            <div className="faq">
              {FAQ.map((row) => (
                <FaqItem key={row.q} q={row.q} a={row.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ---- apply ----------------------------------------------------- */}
        <section className="band contact" id="apply">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">
                  Around 100 places.
                  <br />
                  Selection is rolling.
                </h2>
              </div>
            </Reveal>

            <div className="contact__stack">
              <a
                className="book"
                href={LUMA}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="book__label">Apply on Luma</span>
                <span className="book__meta">Solo or in teams of 2-4</span>
                <span className="book__arrow">
                  <Arrow />
                </span>
              </a>

              <a
                className="mailto"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  "Industrial Agents Hackathon",
                )}`}
              >
                <span className="mailto__text">
                  Questions? Reach out by email
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
            <span className="lockup__x" aria-hidden="true">
              ×
            </span>
            <Image
              src="/brand/anthropic.svg"
              alt="Anthropic"
              width={1024}
              height={115}
              className="lockup__anthropic"
            />
          </div>
          <p className="foot__note">
            Industrial Agents Hackathon · Munich · 24-25 October 2026
          </p>
        </div>
      </footer>
    </>
  );
}
