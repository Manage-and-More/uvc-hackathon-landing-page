import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Industrial Agents Hackathon · Manage & More × UVC Partners × Anthropic",
  description:
    "The first hackathon built inside a venture fund. Two days in Munich on agentic AI for industry, 24-25 October 2026. UVC portfolio companies set the challenges, Anthropic backs every team with Claude, and teams are scored on agents that actually run. Apply on Luma.",
  openGraph: {
    title: "Industrial Agents Hackathon: MM × UVC × Anthropic",
    description:
      "The first hackathon built inside a venture fund. Two days, Munich, 24-25 October 2026. Three challenge tracks set around the UVC portfolio. Teams are scored on agents that actually run.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
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
          DIRECTION CONTRACT: Night Shift, locked 2026-09-26

          THESIS: The page is a night shift on an industrial floor, seen from the
          control desk rather than the shop floor. Dark, quiet, exact. It shows what an
          industrial agent does instead of describing it, and it names nothing that is
          not signed.

          OWN-WORLD: The Luma key visual's palette without its photograph. Charcoal
          ground (#0A0C0D) under grain; a blue-green wash (#244446) and one burnt-orange
          light (#C4612A / #E2823A) that occupies no more than a tenth of any view.
          Archivo at 200 weight, tracked wide, in caps for display; Archivo light for
          prose; JetBrains Mono for every label, timestamp and data value. Hairlines,
          plates and a status board. No cards, no glass, no blur, no photo.

          STORY: An applicant understands in one screen that this is two days on
          live portfolio problems judged on what runs, watches an agent work in the
          console beside the headline, and applies. A prospective partner sees the
          open track slots and the compute partner already in place.

          FIRST VIEWPORT: Top bar with three co-equal logos, section links, a live
          countdown and Apply. Left: kicker "Hackathon", INDUSTRIAL / AGENTS at 200
          weight, one line, Apply on Luma. Right: the agent trace console. Three
          facts across the bottom. No logos in the hero.

          FINISH: unreviewed and undocumented is unfinished; this build ends with the
          design review, the QA pass, and DESIGN.md
-->`;
