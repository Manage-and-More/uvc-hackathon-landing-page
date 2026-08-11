import Image from "next/image";
import Reveal from "./reveal";

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

const NAV = [
  ["Format", "#format"],
  ["Tracks", "#tracks"],
  ["Partners", "#partners"],
  ["Status", "#status"],
  ["Questions", "#faq"],
];

const GLANCE: [string, string][] = [
  ["Format", "Two days, on site"],
  ["Where", "Munich"],
  ["When", "Oct – Nov 2026"],
  ["Builders", "≈ 150 target"],
  ["Judged on", "Working software"],
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

const BAYS: {
  no: string;
  kind: string;
  body: string;
  state: string;
  open: boolean;
}[] = [
  {
    no: "01",
    kind: "UVC hypothesis track",
    body: "A challenge built on an investment hypothesis UVC is actively testing. The only track that needs no outside partner.",
    state: "No outside partner needed",
    open: false,
  },
  {
    no: "02",
    kind: "Portfolio startup track",
    body: "A live production problem from a UVC portfolio company, with the person who owns it standing in the room for two days.",
    state: "Partner — to be assigned",
    open: true,
  },
  {
    no: "03",
    kind: "Portfolio startup track",
    body: "A second portfolio company, a second real problem. Reserved for UVC portfolio companies.",
    state: "Partner — to be assigned",
    open: true,
  },
  {
    no: "04",
    kind: "Corporate track",
    body: "An industrial operator's problem at the scale it actually occurs. Most likely a UVC LP or partner company.",
    state: "Partner — to be assigned",
    open: true,
  },
];

const RUNSHEET: [string, string, string][] = [
  [
    "Saturday, morning",
    "Kick-off",
    "Tracks are opened by the people who set them. Teams pick a bay and start.",
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

const TIERS: {
  title: string;
  who: string;
  gets: string[];
  state: string;
  open: boolean;
}[] = [
  {
    title: "Challenge partner",
    who: "A UVC portfolio company, or a UVC LP for the corporate track",
    gets: [
      "A problem you choose, worked on by strong technical teams for two days",
      "A CTO or C-level seat on the jury",
      "Two days watching how those builders work under pressure",
      "Working prototypes, evaluated on whether they run",
    ],
    state: "3 tracks open",
    open: true,
  },
  {
    title: "Jury seat",
    who: "A UVC partner",
    gets: [
      "One UVC seat on the jury alongside the challenge partners",
      "A concentrated look at strong technical builders under a deadline",
      "Evaluation of working software, not of decks",
    ],
    state: "Seats being offered",
    open: true,
  },
  {
    title: "Compute partner",
    who: "An AI lab",
    gets: [
      "AI credits used for building across the whole weekend",
      "Credits as prizes for the winning teams",
      "Presence at a two-day event about agents that ship",
    ],
    state: "In conversation",
    open: true,
  },
];

const FIGURES: [string, string][] = [
  ["$2.3B+", "raised by startups founded by Manage&More alumni"],
  ["260+", "startups founded by the community"],
  ["10+", "venture funds founded by alumni"],
  ["3", "Munich hackathon hubs run by this team"],
  ["≈ 100", "builders on site at each of them"],
];

const STATUS: {
  item: string;
  state: string;
  open: boolean;
  detail: string;
  closes: string;
}[] = [
  {
    item: "Format",
    state: "Set",
    open: false,
    detail: "Two days on site. Saturday kick-off, Sunday demos and jury.",
    closes: "Decided",
  },
  {
    item: "Date",
    state: "Open",
    open: true,
    detail: "A weekend in October or November 2026.",
    closes: "Fixed once challenge partners confirm availability",
  },
  {
    item: "Venue",
    state: "Open",
    open: true,
    detail: "Munich. Candidates identified, none agreed.",
    closes: "Confirmed against final headcount",
  },
  {
    item: "Challenge tracks",
    state: "3 of 4 open",
    open: true,
    detail:
      "Two reserved for UVC portfolio companies, one for a corporate partner or LP.",
    closes: "Closes as partners commit",
  },
  {
    item: "Jury",
    state: "Open",
    open: true,
    detail:
      "A CTO or C-level seat per challenge partner, one UVC partner, one corporate seat.",
    closes: "Filled as tracks are taken",
  },
  {
    item: "Compute partner",
    state: "In conversation",
    open: true,
    detail: "Credits for building across the weekend and as prizes.",
    closes: "Needs dates and a confirmed outline",
  },
  {
    item: "Prizes",
    state: "Open",
    open: true,
    detail: "Cash and credits. Structure not yet set.",
    closes: "Set together with the challenge partners",
  },
  {
    item: "Applications",
    state: "Not open",
    open: true,
    detail: "This page is for partners, not participants.",
    closes: "Opens once date and venue are fixed",
  },
];

const FAQ: { q: string; a: string; tbd?: boolean }[] = [
  {
    q: "When is it?",
    a: "Targeting a weekend in October or November 2026. The exact weekend is fixed together with the challenge partners.",
    tbd: true,
  },
  {
    q: "Which days of the week?",
    a: "Saturday and Sunday. Kick-off Saturday morning, final demos and jury Sunday evening.",
  },
  {
    q: "Where?",
    a: "Munich. Venue candidates are identified; none is agreed yet, and the final choice depends on headcount.",
    tbd: true,
  },
  {
    q: "Who is it for?",
    a: "Around 150 builders on site, depending on the venue. Applications are not open yet.",
  },
  {
    q: "What will teams actually work on?",
    a: "Four challenge tracks: two live production problems from UVC portfolio companies, one from a corporate partner, and one built on a UVC investment hypothesis.",
  },
  {
    q: "Who can be a challenge partner?",
    a: "The two startup tracks are reserved for UVC portfolio companies. The corporate track is most likely a UVC LP or partner company, though there is some flexibility there.",
  },
  {
    q: "What does a challenge partner contribute?",
    a: "TBD",
    tbd: true,
  },
  {
    q: "What do winning teams get?",
    a: "TBD — a mix of cash prizes and AI credits. The structure is being set with the challenge partners.",
    tbd: true,
  },
  {
    q: "Who judges?",
    a: "A CTO or C-level representative from each challenge partner, one UVC partner, and one seat for the corporate partner.",
  },
  {
    q: "How are teams judged?",
    a: "On agents that actually run. Working software at the demo, not the pitch alone.",
  },
  {
    q: "Is there a compute partner?",
    a: "We are in conversation with a compute partner to supply AI credits for building across the weekend and as prizes. Not confirmed yet.",
    tbd: true,
  },
  {
    q: "Do participants apply on their own or as a team?",
    a: "TBD",
    tbd: true,
  },
  {
    q: "When do applications open?",
    a: "TBD — once the date and venue are fixed.",
    tbd: true,
  },
  {
    q: "Who is organizing it?",
    a: "Manage&More and UVC Partners, both part of UnternehmerTUM.",
  },
];

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="mast">
        <div className="shell mast__in">
          <div className="lockup">
            <Image
              src="/brand/manage-and-more.png"
              alt="Manage&More"
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

          <nav className="mast__nav" aria-label="Sections">
            {NAV.map(([text, href]) => (
              <a key={href} className="mast__link" href={href}>
                {text}
              </a>
            ))}
          </nav>

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
              <h1 className="h-display">
                Agents that
                <br />
                actually run.
              </h1>

              <p className="prose lede hero__prose">
                A two-day hackathon on agentic AI for industry, in Munich.{" "}
                <strong>UVC portfolio companies set the challenges</strong>, UVC
                partners judge, and teams are scored on software that runs at
                the demo — not on the pitch alone.
              </p>

              <div className="hero__actions">
                <a className="btn" href="#contact">
                  Book 30 minutes
                  <span className="btn__mark">
                    <Arrow />
                  </span>
                </a>
                <a className="btn btn--ghost" href="#format">
                  See the format
                </a>
              </div>
            </div>

            <dl className="glance">
              {GLANCE.map(([k, v]) => (
                <div className="glance__row" key={k}>
                  <dt className="label">{k}</dt>
                  <dd className="glance__v">{v}</dd>
                </div>
              ))}
              <div className="glance__row glance__row--open">
                <dt className="label">Tracks</dt>
                <dd className="glance__v">
                  <span className="state state--open">
                    <span className="state__chip" aria-hidden="true" />3 of 4
                    open
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* The floor itself enters the first viewport: route line, four bay
              addresses, three of them still hatched. */}
          <div className="floorline" aria-hidden="true">
            <div className="floorline__route" />
            <div className="shell floorline__ticks">
              {BAYS.map((bay) => (
                <span
                  className={`ftick${bay.open ? " ftick--open" : ""}`}
                  key={bay.no}
                >
                  <span className="ftick__no">Bay {bay.no}</span>
                  <span className="ftick__state">
                    {bay.open ? "Unassigned" : "Set"}
                  </span>
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

        {/* ---- the bays -------------------------------------------------- */}
        <section className="band" id="tracks">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">Four bays on the floor.</h2>
                <p className="prose">
                  Each track is one partner&rsquo;s problem, worked on by
                  several teams at once. Three of the four are unassigned —
                  which is the reason you are reading this page.
                </p>
              </div>
            </Reveal>

            <ol className="bays">
              {BAYS.map((bay) => (
                <Reveal
                  as="li"
                  key={bay.no}
                  className={`bay${bay.open ? " bay--open" : ""}`}
                >
                  <div className="bay__addr">
                    <span className="label bay__no">Bay {bay.no}</span>
                    <span
                      className={`state ${bay.open ? "state--open" : "state--set"}`}
                    >
                      <span className="state__chip" aria-hidden="true" />
                      {bay.open ? "Open" : "Set"}
                    </span>
                  </div>
                  <h3 className="h-block bay__kind">{bay.kind}</h3>
                  <p className="bay__body">{bay.body}</p>
                  <p
                    className={`bay__plate${bay.open ? " hatch" : ""}`}
                    aria-label={`Status: ${bay.state}`}
                  >
                    {bay.state}
                  </p>
                </Reveal>
              ))}
            </ol>

          </div>

          {/* The one painted zone on the floor: the criterion the whole
              weekend is built around. */}
          <div className="verdict">
            <div className="shell verdict__in">
              <p className="verdict__text">
                Teams are judged on <em>agents that actually run</em> — a demo
                that executes, not a deck that describes one.
              </p>
              <p className="verdict__note">
                Every team demonstrates in front of the jury on Sunday evening.
                What does not run does not score.
              </p>
            </div>
          </div>

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

        {/* ---- tiers ----------------------------------------------------- */}
        <section className="band band--sunk" id="partners">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">What a partner gets.</h2>
                <p className="prose">
                  Three ways to be in this. What each one costs is a
                  conversation, not a number on a page — but here is exactly
                  what each one returns.
                </p>
              </div>
            </Reveal>

            <div className="tiers">
              {TIERS.map((tier) => (
                <Reveal as="div" key={tier.title} className="tier">
                  <div className="tier__id">
                    <h3 className="h-block">{tier.title}</h3>
                    <p className="tier__who">{tier.who}</p>
                    <span
                      className={`state ${tier.open ? "state--open" : "state--set"}`}
                    >
                      <span className="state__chip" aria-hidden="true" />
                      {tier.state}
                    </span>
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
                  alt="Manage&More"
                  width={596}
                  height={139}
                  className="org__logo org__logo--mm"
                />
                <p className="org__body">
                  UnternehmerTUM&rsquo;s flagship entrepreneurship program.
                  Alumni have founded more than 260 startups — komoot, Konux,
                  IDnow, Tado, StudySmarter, Proglove, Fernride, Constellr,
                  OroraTech and ZenML among them — which have raised over $2.3B,
                  plus more than ten venture funds.
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
              {FIGURES.map(([n, what]) => (
                <div className="fig" key={what}>
                  <span className="fig__n">{n}</span>
                  <span className="fig__what">{what}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="record">
              <p className="record__text">
                The team organizing this has run the Munich hub of the
                Hack-Nation Global AI Hackathon three times, with roughly a
                hundred builders on site each time — venue, catering, sponsoring
                and the full on-site execution. That is the same set of things
                this event needs.
              </p>
              <p className="record__note">
                Hack-Nation is a separate initiative that we neither own nor
                run. We organized the Munich hub only, and the global
                program&rsquo;s figures are not ours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- status ---------------------------------------------------- */}
        <section className="band band--sunk" id="status">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">Where it stands.</h2>
                <p className="prose">
                  Nothing here is dressed up as decided. Each open item is open
                  because the people we are talking to are the ones who close
                  it.
                </p>
              </div>
            </Reveal>

            <Reveal className="ledger">
              <div className="ledger__head" aria-hidden="true">
                <span className="label">Item</span>
                <span className="label">Status</span>
                <span className="label">What closes it</span>
              </div>
              {STATUS.map((row) => (
                <div className="ledger__row" key={row.item}>
                  <div className="ledger__item">
                    <h3 className="h-block">{row.item}</h3>
                    <p className="ledger__detail">{row.detail}</p>
                  </div>
                  <div className="ledger__state">
                    <span
                      className={`state ${row.open ? "state--open" : "state--set"}`}
                    >
                      <span className="state__chip" aria-hidden="true" />
                      {row.state}
                    </span>
                  </div>
                  <p className="ledger__closes">{row.closes}</p>
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
                <h2 className="h-section">Questions.</h2>
                <p className="prose">
                  The ones we get asked. Where the honest answer is still TBD,
                  it says TBD.
                </p>
              </div>
            </Reveal>

            <dl className="faq">
              {FAQ.map((row) => (
                <div className="faq__row" key={row.q}>
                  <dt className="faq__q">{row.q}</dt>
                  <dd className="faq__a">
                    {row.tbd && (
                      <span className="state state--open faq__tbd">
                        <span className="state__chip" aria-hidden="true" />
                        TBD
                      </span>
                    )}
                    <span>{row.a}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- contact --------------------------------------------------- */}
        <section className="band contact" id="contact">
          <div className="shell">
            <Reveal className="zone">
              <div className="rule rule--route paint" />
              <div className="zone__head">
                <h2 className="h-section">
                  Take a bay, take a jury seat,
                  <br />
                  or ask what it would cost you.
                </h2>
                <p className="prose">
                  Thirty minutes is enough to walk through the format, the
                  tracks still open, and what a partner actually commits to.
                </p>
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
                  "Industrial AI Agents Hackathon — partner enquiry",
                )}`}
              >
                <span className="mailto__text">
                  Or reach out by email instead
                </span>
                <span className="mailto__arrow">
                  <Arrow />
                </span>
              </a>

              <p className="contact__note">
                This event is organized by Manage&amp;More together with UVC
                Partners.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="shell foot__in">
          <div className="lockup lockup--foot">
            <Image
              src="/brand/manage-and-more.png"
              alt="Manage&More"
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
            Industrial AI Agents Hackathon · Munich · October – November 2026.
            Nothing on this page is confirmed unless it says so.
          </p>
        </div>
      </footer>
    </>
  );
}
