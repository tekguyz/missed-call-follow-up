---
name: Missed Call Follow-Up
description: Storm-ready and job-site plain. A dark charcoal board, square corners, heavy rules, and one signal orange that only means "act now".
colors:
  paper: "#1D2125"
  surface: "#272C31"
  sunk: "#16191C"
  line: "#444C54"
  ink: "#F2EFE9"
  ink-muted: "#B4B9BE"
  tile: "#FF6A13"
  tile-deep: "#FF8236"
  tile-soft: "#3B2616"
  tile-text: "#FF9A5C"
  on-tile: "#1D2125"
  answered: "#5FC08A"
  answered-soft: "#1F3A2B"
  bubble-out: "#2C7355"
  night: "#101315"
  night-raised: "#20262B"
  on-night: "#F2EFE9"
  on-night-muted: "#B0B6BC"
typography:
  display: { fontFamily: "Barlow Condensed", fontSize: "3.25rem (5rem from 1024px)", fontWeight: 700, lineHeight: 1 }
  headline: { fontFamily: "Barlow Condensed", fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.08 }
  title: { fontFamily: "Barlow Condensed", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }
  body: { fontFamily: "IBM Plex Sans", fontSize: "1rem", fontWeight: 400, lineHeight: 1.55 }
  label: { fontFamily: "IBM Plex Sans", fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.4 }
  micro: { fontFamily: "IBM Plex Sans", fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.35 }
---

# Design rules

The rulebook for every screen. Tokens live in `app/globals.css`; hex copies for drawn images live in `lib/brand.ts`. Change this file first.

## The five picks (decided 2026-11-13, tekguyz/missed-call-follow-up#6)

| Column | Pick |
|---|---|
| Ground | Dark charcoal `#1d2125`; panels `#272c31`; text `#f2efe9` |
| Accent | Signal orange `#ff6a13`, for the one main action and live states. Dark text on orange buttons |
| Display font | Barlow Condensed, 600 and 700, for headings and big numbers |
| Body font | IBM Plex Sans |
| Shape | Square corners (0 to 2px). 2px rules between sections. No pill buttons, no soft shadows |

Closest row in `claude-config/LOOKS.md`: none comes close. Every other demo is a warm or cool off-white page; this one is dark, orange, condensed and square. This demo's own earlier look (off-white, ink, Bricolage, pills) is retired.

## The idea

Storm-ready, job-site plain. A missed call happens in the evening, when the owner is off the roof. The whole page is one dark board. The caller's phone is the darkest thing on it (**night**), the owner's office sits on charcoal panels. The demo moves a lead from one to the other.

## Color

1. **Signal orange** (`tile`) means one thing: a call that needs someone, or the main action. The missed call, the alert dot, the main button. Never decoration. Text on orange is charcoal (`on-tile`), never white. Orange used as text is `tile-text` (a lighter step) on panels and on the soft orange chip.
2. **Answered green** (`answered`, `bubble-out`) means the business has replied: the follow-up bubbles, the "lead in" state.
3. Everything else is light ink on charcoal. No gradients, no other accent colors.
4. Dark theme only. All text pairs are at least WCAG AA (4.5:1): ink 12:1 on panels, ink-muted 7:1, on-tile 5.6:1 on orange, tile-text 6.7:1 on panels, white on `bubble-out` 5.7:1.

## Type

Barlow Condensed for display, headline, title and the main buttons (headings 700, never below 600). IBM Plex Sans for everything else. Six sizes only, as tokens: `text-display`, `text-headline`, `text-title`, `text-body`, `text-label`, `text-micro`. Tailwind's own sizes are off.

## Shape

Square. Corners are 0, or 2px (`rounded-xs`, `rounded-sm`) on buttons, panels and the phone frame. No pill buttons, no round avatars, no soft shadows. Sections are split by 2px rules (`border-y-2`, `border-b-2`); cards inside a section use a 1px line. Secondary buttons are outlined in `ink-muted`, 2px.

## Layout

- Landing page: one column up to 1024px, a max width of 72rem. 16px side gutter on phones.
- Demo: from 1024px, the phone (fixed 22rem wide) on the left and the owner's office on the right. Below 1024px, two tabs, "Caller's phone" and "Owner's office"; the owner tab shows an orange dot when an alert arrives.
- The pipeline board: 4 columns from 1280px, 2 columns from 640px, 1 column below.
- Touch targets are at least 44px.

## Logo

**Picked: option A, "Call comes back"** (Claude's pick, 2026-11-10; the founder chose "just build it" and can switch). A charcoal handset with an incoming arrow on a signal-orange square (2px corners). Source: `PRODUCT_MARK_SVG` in `lib/brand.ts`. Options: `docs/design/logos.html`.

The Sample Business, Keywind Roofing, has its own mark (`KEYWIND_MARK_SVG`): a light roof line with two orange strokes of wind, on a charcoal panel with an orange edge. It shows only inside the demo.

## Motion

Motion shows a change of state, nothing else:

1. The phone rings: an orange ring pulse on the call button, only while ringing.
2. A new message, alert or lead arrives: a 320ms rise and fade in.
3. The visitor's new lead: a hairline draws from the left under the card, once.

Under `prefers-reduced-motion: reduce` all three are off and nothing is hidden. Content is visible by default.

## Demo banner

A thin muted-ink-on-sunk bar with a 2px rule under it at the top of every demo screen: "You are in the demo. Nothing is sent." with Reset demo, Leave the demo and "Built by TEKGUYZ". It carries `data-demo-banner` so `tools/capture` hides it.
