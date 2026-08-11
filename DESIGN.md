# Design

Recorded from the shipped build, not from intentions. Source of truth: `app/globals.css`, `app/page.tsx`, `app/layout.tsx`.

## World — Marked Floor

German factory-floor zone marking. The page is a hall marked out before the equipment lands — painted route lines, numbered bays, machine-grey concrete ground.

The world originally carried an open/decided state system (hatched amber for unassigned tracks, painted blue for settled ones). That was removed at the client's request: the page no longer signals which tracks are taken. Open items read as plain TBDs in the hero register instead.

This reconciles the three things the page must hold at once. ISO safety blue is already the mandatory-action colour on a factory floor, so UVC's blue becomes the route line and the decided state; Manage&More's cyan is the secondary marking; industrial AI is carried by the ground itself rather than illustrated with robot or node-graph imagery.

Direction contract with seed key `732e1b23` ships as an HTML comment, first child of `<body>` in `app/layout.tsx`. It is emitted via `dangerouslySetInnerHTML` because JSX comments are stripped at compile and would not survive the build.

## Color

| Token | Value | Role |
|---|---|---|
| `--concrete` | `#eae9e5` | ground |
| `--concrete-deep` | `#dcdbd6` | scrollbar track |
| `--ink` | `#15171a` | primary text, plates, rules |
| `--ink-70` | `#4a4d51` | body prose — 6.9:1 |
| `--ink-55` | `#5e6165` | labels, secondary — 5.0:1 |
| `--ink-40` | `#8b8e91` | **non-text only** (scrollbar, the `×` glyph) — fails 4.5:1 |
| `--route` | `#1500ff` | UVC. Route line, decided state, the one painted zone |
| `--mark` | `#04a2cc` | Manage&More. Graphic on light; text only on ink (6.2:1) |
| `--hair` / `--hair-strong` | `rgba(21,23,26,.16)` / `.34` | rules |

Strategy: restrained on the ground, with one Committed field — the `.verdict` band, full-bleed `--route`, carrying the judging criterion. It is the page's only saturated region and its density beat.

**Rules.** Cyan is never text on concrete (2.5:1). `--ink-40` is never text.

## Type

**Archivo** (variable, `wdth` axis loaded), self-hosted via `next/font/google`. One face, three registers:

- Display `.h-display` — `clamp(3rem, 8.4vw, 6rem)`, `wdth 104%`, tracking `-0.038em`
- Section `.h-section` — `clamp(1.9rem, 3.5vw, 2.85rem)`; block `.h-block` — `1.1875rem`
- **Marking** — `0.6875rem`, weight 700, **`font-stretch: 86%`**, tracking `0.14–0.17em`, uppercase, tabular numerals

The condensed width is what makes marking labels read as floor lettering rather than as generic small caps. It applies to `.label`, `.ftick`, `.btn`, `.mast__link`, `.mast__cta`, `.book__meta`. Tabular numerals on every data value.

Body 1.0625rem/1.55, measure capped at 66ch (`--measure`).

## Material

- **Ground**: `--concrete` + two-axis slab joints at `rgba(21,23,26,.045)` on a 264px cell, plus an inline SVG `feTurbulence` grit at 0.62 on a 190px tile. The joints are the floor's own slab geometry — the design detector flags this as `codex-grid-background` (advisory) and it is kept deliberately.
- **Painted bars**: 5px `--route` top bars on bays and floor ticks. Never side stripes.
- **Route direction marks**: `.rule--route::after` lays 115° white hatching over the first 96px, the way a real floor route is arrowed.

No gradients (except the sunk-band tint), no glass, no blur, no rounded cards, no shadows anywhere.

## Components

`.shell` (max 1420px) · `.band` / `.band--sunk` · `.rule--route` (zone head) · `.glance` (hero register) · `.floorline` + `.ftick` (bay addresses at the fold) · `.lane` (comparison lanes, `--ours` painted) · `.bay` (the focal grid) · `.verdict` (the painted zone) · `.stop` (run sheet) · `.tier` · `.fig` · `.faq` (native `<details>` toggles) · `.book` · `.mailto`.

The contact zone is a single stack capped at 900px: a painted blue **Book a call** action that opens Calendly in a new tab, the email action beneath it, then the organizer note. No embedded scheduler — Calendly's widget took 8–12s to become interactive, so the page routes out to it instead. Neither action prints an address or duplicates the organizer's name; Calendly carries both on arrival.

**Registers over cards.** Lanes, tiers, figures and FAQ are all ruled rows sharing hairlines, not repeated card containers. The bays are the one grid, and they share borders rather than floating.

## Motion

One authored moment: **marking gets painted on**, left to right, once, as each zone is reached. `.paint` scales X from 0 with `cubic-bezier(.16,1,.3,1)` over 1.05s; `.rise` lifts children 14px with a 70ms stagger.

Everything is visible by default. The hidden start state is scoped to `.js`, added to `<html>` by an inline script in `<head>`, so a blocked or failed script never eats the page. `prefers-reduced-motion` disables both and smooth scrolling.

## Browser surfaces

Themed, not defaulted: `::selection` (route blue; inverted inside `.verdict`), `caret-color`, `scrollbar-color` + webkit scrollbar, `:focus-visible` (3px route outline, 3px offset), link `text-underline-offset` and decoration colour, tabular numerals on all data.

## Responsive

Breakpoints 1080 / 900 / 760 / 620 / 520. Bays go 4 → 2 → 1. Floor ticks go 4 → 2, stacked. The run sheet's horizontal route becomes a vertical one. Masthead nav hides below 900; below 520 the lockup and CTA shrink so the strip fits 390px. Verified: no horizontal overflow at 390.

## Rules a future change must not break

1. Anything not confirmed in PRODUCT.md is either marked TBD or left off. Never invented.
2. Never name the compute partner lab, a challenge partner company, CSEE, or any € contribution or prize figure.
3. Hack-Nation is not referenced on this page at all, in any form.
4. Both logos stay co-equal. Neither organization is junior.
5. The four bays and the painted verdict zone are the page's focal moments. Do not dilute them.
