import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Industrial AI Agents Hackathon · Manage & More × UVC Partners",
  description:
    "The first hackathon built inside a venture fund. Two days in Munich on agentic AI for industry, 24-25 October 2026. UVC portfolio companies set the challenges, UVC partners judge, and teams are scored on agents that actually run.",
  openGraph: {
    title: "Industrial AI Agents Hackathon",
    description:
      "The first hackathon built inside a venture fund. Two days, Munich, 24-25 October 2026. Four challenge tracks set around the UVC portfolio. Teams are scored on agents that actually run.",
    type: "website",
  },
};  

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <head>
        {/* Calendly's two hosts, warmed during page render so the scheduler
            pays no DNS/TLS cost when it mounts. */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link
          rel="preconnect"
          href="https://calendly.com"
          crossOrigin="anonymous"
        />
        {/* Opt into the reveal animations' hidden start state, then release it
            if the bundle never arrives to run them. Without the failsafe a
            failed hydration leaves half the page invisible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var e=document.documentElement;e.classList.add('js');" +
              "setTimeout(function(){if(!e.dataset.revealReady)e.classList.remove('js')},4000)",
          }}
        />
      </head>
      <body>
        <div
          hidden
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
        />
        {children}
      </body>
    </html>
  );
}

/* Emitted as a real HTML comment so it survives the production build and can be
   audited in the shipped markup. JSX comments do not. */
const DIRECTION_CONTRACT = `<!--
          IMPECCABLE DIRECTION CONTRACT — seed 732e1b23

          THESIS: The page is the hall, marked out before the equipment lands — what is
          painted is decided, what is hatched is open, and open means the reader has not
          chosen it yet. It refuses the dark-hero-plus-gradient-plus-glass-cards event page.

          OWN-WORLD: German factory-floor zone marking. Machine-grey concrete ground
          (#EAE9E5) under grit; UVC blue (#1500FF) as the ISO-mandatory route line and
          decided state; Manage & More cyan (#04A2CC) as secondary marking; caution amber
          (#B87A00) hatching for uncommissioned ground. Archivo, a signage grotesque,
          tabular numerals on every status value. Bays, plates, rules and stencil labels —
          no cards, no glass, no gradients.

          STORY: A UVC portfolio operator or partner understands this is a fund-structured
          hackathon on agentic AI, believes the people running it can deliver it, sees
          exactly which decisions are still open and who closes them, and books 30 minutes.

          FIRST VIEWPORT: Masthead strip with both logos co-equal, left. "Agents that
          actually run." set large at left on concrete. Support paragraph beneath, primary
          action inline. Status register right, tabular, open values in blue. Route line
          enters at the section boundary; the four bays begin at the fold.

          FORM: Marked Floor — candidate 6 of the grounded list, assigned by roll, seed
          key 732e1b23; confirmed by the user against three rendered first-viewport comps.

          FINISH: unreviewed and undocumented is unfinished; this build ends with the
          finish review, the verdict, and DESIGN.md
-->`;
