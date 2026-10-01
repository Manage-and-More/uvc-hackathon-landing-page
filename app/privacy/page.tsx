import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Industrial Agents Hackathon",
  robots: { index: false },
};

const MM_PRIVACY = "https://www.manageandmore.de/privacy-policy/";

/* Deliberately short. This page covers only what the landing page itself does:
   static hosting on Vercel, no cookies, no analytics, no embeds. Add a section
   here before adding any tracking, embed or form. */
export default function Privacy() {
  return (
    <main className="legal shell">
      <a className="mono legal__back" href="/">
        <span aria-hidden="true">← </span>Industrial Agents Hackathon
      </a>
      <h1 className="h-sec">Privacy Policy</h1>
      <p className="mono legal__date">As of 1 October 2026</p>

      <div className="prose legal__body">
        <h2>Controller</h2>
        <p>
          UnternehmerTUM GmbH, Lichtenbergstraße 6, 85748 Garching b. München,
          Germany. Manage &amp; More is a programme of UnternehmerTUM. Privacy
          enquiries:{" "}
          <a href="mailto:datenschutz@unternehmertum.de">
            datenschutz@unternehmertum.de
          </a>
          .
        </p>
        <p>
          Data protection officer: Alexander Stolberg-Stolberg, SVF Lawyers,
          Oberanger 30, 80331 München,{" "}
          <a href="mailto:stolberg@unternehmertum.de">stolberg@unternehmertum.de</a>
          .
        </p>

        <h2>In short</h2>
        <p>
          This page sets no cookies, runs no analytics or tracking, and embeds
          no third-party content. Fonts are served from this site, not from
          Google.
        </p>

        <h2>Hosting</h2>
        <p>
          The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina,
          CA 91723, USA. When you open a page, your browser sends technical data
          such as your IP address, the time of the request, the page requested
          and your browser&apos;s user agent. Vercel processes this data in
          server logs to deliver the site and keep it secure, and deletes it
          once it is no longer needed for that purpose. The legal basis is our
          legitimate interest in a secure, working website (Art. 6(1)(f)
          GDPR). Vercel acts as our processor under a data processing
          agreement. Data may be processed in the USA; Vercel is certified
          under the EU-US Data Privacy Framework (Art. 45 GDPR).
        </p>

        <h2>Email</h2>
        <p>
          If you email us, we use your address and message only to answer you,
          and delete them once your enquiry is settled unless retention is
          required by law (Art. 6(1)(b) and (f) GDPR).
        </p>

        <h2>Applications and links to other sites</h2>
        <p>
          Applications are handled on Luma. This site links to Luma, Notion,
          LinkedIn and Instagram but shares no data with them. Once you follow
          a link, the privacy policy of that service applies.
        </p>

        <h2>Your rights</h2>
        <p>
          You have the right to access, rectification, erasure, restriction of
          processing, data portability and to object to processing based on
          legitimate interest (Art. 15-21 GDPR). To exercise them, write to the
          address above. You may also lodge a complaint with a supervisory
          authority, for example the Bavarian Data Protection Authority
          (BayLDA), Promenade 18, 91522 Ansbach.
        </p>

        <p>
          For anything not covered here, the{" "}
          <a href={MM_PRIVACY} target="_blank" rel="noopener noreferrer">
            Manage &amp; More privacy policy
          </a>{" "}
          applies.
        </p>
      </div>
    </main>
  );
}
