import Image from "next/image";
import Reveal from "./reveal";
import FaqItem from "./faq";
import AgentTrace from "./trace";
import { CountUp, Countdown, Material, NavSpy } from "./fx";

const EMAIL = "akshat.tandon@tum.de";
const LUMA = "https://luma.com/070qezlj";
const HOSTS = {
  mm: { href: "https://www.manageandmore.de", alt: "Manage & More" },
  uvc: { href: "https://www.uvcpartners.com", alt: "UVC Partners" },
  an: { href: "https://www.anthropic.com", alt: "Anthropic" },
};

const NAV: [string, string][] = [
  ["Concept", "#concept"],
  ["Tracks", "#tracks"],
  ["Partners", "#partners"],
  ["FAQ", "#faq"],
];

const LANES: { title: string; body: string; verdict: string; ours?: boolean }[] = [
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

const RUNSHEET: { when: string; date: string; what: string; detail: string }[] = [
  {
    when: "Sat 10:00",
    date: "24 Oct",
    what: "Kick-off",
    detail: "Check-in, opening and track briefings from the challenge owners. Teams form, and hacking starts at noon.",
  },
  {
    when: "Sat → Sun",
    date: "overnight",
    what: "Build",
    detail: "Venue open all night. Office hours with the problem owners and with Anthropic.",
  },
  {
    when: "Sun 15:00",
    date: "25 Oct",
    what: "Code freeze and demos",
    detail: "Submissions close at 15:00. Track judging from 15:30, finals and awards at 17:30.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Who can apply?",
    a: "Anyone who takes ownership and ships. We don't select on background: full-stack engineers, data scientists, designers and business people all belong on the floor, and every team finds its own mix. What we look for is agency, and the drive to work on frontier problems from the portfolio of a deep-tech VC.",
  },
  {
    q: "Do I need a team?",
    a: "No. Apply solo or as a team of up to 4. Solo applicants form teams on Saturday morning, and the schedule plans time for exactly that.",
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

function HostLogo({
  which,
  className,
  priority = false,
}: {
  which: keyof typeof HOSTS;
  className: string;
  priority?: boolean;
}) {
  const host = HOSTS[which];
  const dims =
    which === "mm"
      ? { src: "/brand/manage-and-more.png", w: 596, h: 139 }
      : which === "uvc"
        ? { src: "/brand/uvc-partners.png", w: 362, h: 288 }
        : { src: "/brand/anthropic.svg", w: 1024, h: 115 };
  return (
    <a
      className="hostlink"
      href={host.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${host.alt} (opens in a new tab)`}
    >
      <Image
        src={dims.src}
        alt={host.alt}
        width={dims.w}
        height={dims.h}
        className={className}
        priority={priority}
      />
    </a>
  );
}

function Logos({ variant }: { variant: "top" | "foot" }) {
  return (
    <div className={`lockup lockup--${variant}`}>
      <HostLogo which="mm" className="lockup__mm" priority={variant === "top"} />
      {variant === "top" && <i className="lockup__bar" aria-hidden="true" />}
      <HostLogo which="uvc" className="lockup__uvc" priority={variant === "top"} />
      {variant === "top" && <i className="lockup__bar" aria-hidden="true" />}
      <HostLogo which="an" className="lockup__an" priority={variant === "top"} />
    </div>
  );
}

function Eyebrow({ no, label }: { no: string; label: string }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow__no">{no}</span>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}

function ZoneHead({
  no,
  label,
  title,
  children,
}: {
  no: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="zone rv">
      <div className="zone__head">
        <Eyebrow no={no} label={label} />
        <h2 className="h-sec">{title}</h2>
      </div>
      {children && <div className="zone__body prose">{children}</div>}
    </Reveal>
  );
}

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Material />
      <div className="grain" aria-hidden="true" />

      <header className="top">
        <div className="top__in">
          <Logos variant="top" />
          <NavSpy items={NAV} />
          <div className="top__right">
            <Countdown />
            <a
              className="btn btn--line"
              href={LUMA}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---- hero -------------------------------------------------------- */}
        <section className="hero" id="top">
          <div className="hero__in">
            <div className="hero__lead">
              <div>
                <p className="hero__kick">Hackathon</p>
                <h1 className="h-hero">
                  <span className="hline">
                    <span className="hline__in">Industrial</span>
                  </span>
                  <span className="hline">
                    <span className="hline__in">Agents</span>
                  </span>
                </h1>
              </div>
              <div className="hero__sub">
                <p className="mono">Munich · 24-25 October 2026</p>
                <p className="lede">
                  Two days in Munich on live problems from the UVC portfolio.
                  Judged on what runs.
                </p>
                <a
                  className="btn btn--solid"
                  href={LUMA}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply on Luma <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="hero__side">
              <AgentTrace />
            </div>
            <div className="hero__foot">
              <span className="mono">Two days on site</span>
              <span className="mono">≈100 builders</span>
              <span className="mono">Teams up to 4</span>
            </div>
          </div>
        </section>

        {/* ---- the wedge --------------------------------------------------- */}
        <section className="band band--sunk" id="concept">
          <div className="shell">
            <ZoneHead
              no="01"
              label="Why this one"
              title={
                <>
                  Built around the fund,
                  <br />
                  not the sponsor.
                </>
              }
            >
              <p>
                Most hackathons put a company&rsquo;s logo on the wall and call it a
                partnership. Here the venture fund is the structure itself: its
                portfolio supplies the problems, its partners sit on the jury, and
                the builders get two days in front of the people who fund what comes
                next.
              </p>
            </ZoneHead>
            <Reveal as="ul" className="lanes rv">
              {LANES.map((lane) => (
                <li
                  key={lane.title}
                  className={`lane${lane.ours ? " lane--ours" : ""}`}
                >
                  <h3 className="lane__title">{lane.title}</h3>
                  <p className="lane__body">{lane.body}</p>
                  <span className="lane__verdict">{lane.verdict}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- tracks ------------------------------------------------------ */}
        <section className="band" id="tracks">
          <div className="shell">
            <ZoneHead
              no="02"
              label="Tracks"
              title={
                <>
                  Three tracks.
                  <br />
                  Three live problems.
                </>
              }
            >
              <p>
                Live problems from the UVC portfolio, several teams per track.
                Briefs are revealed at kick-off.
              </p>
            </ZoneHead>
            <Reveal as="ul" className="plates rv">
              {TRACKS.map((no) => (
                <li className="plate" key={no}>
                  <span className="mono plate__no">Track {no}</span>
                  <div className="plate__tba">To be announced</div>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- run sheet --------------------------------------------------- */}
        <section className="band band--sunk" id="runsheet">
          <div className="shell">
              <ZoneHead
                no="03"
                label="Run sheet"
                title={
                  <>
                    Thirty-one hours.
                    <br />
                    One sheet.
                  </>
                }
              >
                <p>
                  The venue stays open overnight. Challenge owners hold office hours,
                  and every team builds with Claude credits from Anthropic.
                </p>
              </ZoneHead>
              <Reveal className="sheet rv">
                {RUNSHEET.map((s) => (
                  <div className="stop" key={s.what}>
                    <div className="stop__when">
                      {s.when}
                      <small>{s.date}</small>
                    </div>
                    <div className="stop__dot" aria-hidden="true" />
                    <div className="stop__what">
                      <h3 className="stop__title">{s.what}</h3>
                      <p className="stop__detail">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
          </div>
        </section>

        {/* ---- partners ---------------------------------------------------- */}
        <section className="band" id="partners">
          <div className="shell">
            <ZoneHead no="04" label="Partners" title="Partners." />

            <Reveal className="pgrid rv">
              <div className="pgroup pgroup--challenge">
                <div className="pgroup__head">
                  <span className="mono">Challenge partners</span>
                </div>
                <div className="pgroup__slots">
                  {TRACKS.map((no) => (
                    <div className="pslot pslot--open" key={no}>
                      <span className="pslot__box" aria-hidden="true" />
                      <span className="pslot__label">
                        Track {no}
                        <small>To be announced</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pgroup pgroup--compute">
                <div className="pgroup__head">
                  <span className="mono">Compute partner</span>
                  <span className="mono pgroup__count pgroup__count--on">
                    <i className="led led--on" aria-hidden="true" /> online
                  </span>
                </div>
                <div className="pgroup__slots">
                  <a
                    className="pslot pslot--set"
                    href={HOSTS.an.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Anthropic (opens in a new tab)"
                  >
                    <Image
                      src="/brand/anthropic.svg"
                      alt="Anthropic"
                      width={1024}
                      height={115}
                      className="pslot__logo pslot__logo--an"
                    />
                    <span className="pslot__label">
                      <small>Claude for every team · office hours through the night</small>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ---- who runs it ------------------------------------------------- */}
        <section className="band band--sunk" id="who">
          <div className="shell">
            <ZoneHead
              no="05"
              label="Hosts"
              title={
                <>
                  A program that builds founders.
                  <br />A fund that backs them.
                </>
              }
            />
            <Reveal className="orgs rv">
              <div className="org">
                <HostLogo which="mm" className="org__logo org__logo--mm" />
                <p className="org__body">
                  <b>UnternehmerTUM&rsquo;s flagship entrepreneurship program</b>,
                  running project teams of students and young professionals on real
                  ventures. Alumni have founded komoot, Konux, Tado, Fernride and
                  more.
                </p>
                <div className="figs">
                  <div className="fig">
                    <CountUp className="fig__n" value={260} suffix="+" />
                    <span className="fig__w">Startups founded</span>
                  </div>
                  <div className="fig">
                    <CountUp
                      className="fig__n"
                      value={2.3}
                      decimals={1}
                      prefix="$"
                      suffix="B+"
                    />
                    <span className="fig__w">Raised by alumni</span>
                  </div>
                  <div className="fig">
                    <CountUp className="fig__n" value={10} suffix="+" />
                    <span className="fig__w">Venture funds</span>
                  </div>
                </div>
              </div>
              <div className="org">
                <HostLogo which="uvc" className="org__logo org__logo--uvc" />
                <p className="org__body">
                  <b>Unternehmertum Venture Capital Partners.</b> Munich and Berlin,
                  backing B2B startups across Europe from the earliest stages up to
                  Series A. Portfolio includes Isar Aerospace, Proxima Fusion, Flix,
                  TWAICE and Tacto.
                </p>
                <div className="figs">
                  <div className="fig">
                    <CountUp className="fig__n" value={10} prefix="€" suffix="M" />
                    <span className="fig__w">Up to, initial</span>
                  </div>
                  <div className="fig">
                    <CountUp className="fig__n" value={2} />
                    <span className="fig__w">Offices · MUC, BER</span>
                  </div>
                  <div className="fig">
                    <CountUp className="fig__n" value={3} />
                    <span className="fig__w">Tracks from the portfolio</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- faq --------------------------------------------------------- */}
        <section className="band" id="faq">
          <div className="shell">
            <ZoneHead no="06" label="Before you apply" title="Questions." />
            <Reveal className="faq rv">
              {FAQ.map((row, i) => (
                <FaqItem key={row.q} q={row.q} a={row.a} index={i + 1} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- apply ------------------------------------------------------- */}
        <section className="band band--sunk apply" id="apply">
          <div className="shell">
            <Reveal className="rv">
              <Eyebrow no="07" label="Apply" />
              <h2 className="h-big apply__title">
                Around 100 places. Selection is rolling.
              </h2>
              <div className="apply__row">
                <a
                  className="btn btn--solid"
                  href={LUMA}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply on Luma <span aria-hidden="true">→</span>
                </a>
                <a
                  className="link"
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    "Industrial Agents Hackathon",
                  )}`}
                >
                  Questions? Reach out by email
                </a>
              </div>
              <p className="mono apply__meta">
                Teams up to 4 · <Countdown short />
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="shell foot__in">
          <Logos variant="foot" />
          <p className="mono foot__note">
            Industrial Agents Hackathon · Munich · 24-25 October 2026
          </p>
        </div>
      </footer>
    </>
  );
}
