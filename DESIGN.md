---
name: Missed Call Follow-Up
description: The evening after the job. A dark phone on the left, the owner's calm board on the right, and a roof-tile red that only means "a call needs you".
colors:
  paper: "#F6F3EC"
  surface: "#FFFFFF"
  sunk: "#EEEAE0"
  line: "#DDD7CB"
  ink: "#15212C"
  ink-muted: "#56626D"
  tile: "#B9472A"
  tile-deep: "#963A22"
  tile-soft: "#F6E3DC"
  answered: "#2C7355"
  answered-soft: "#E2EFE8"
  night: "#15212C"
  night-raised: "#223242"
  on-night: "#F6F3EC"
  on-night-muted: "#A9B6C2"
typography:
  display: { fontFamily: "Bricolage Grotesque", fontSize: "2.75rem (4rem from 1024px)", fontWeight: 700, lineHeight: 1.02 }
  headline: { fontFamily: "Bricolage Grotesque", fontSize: "1.875rem", fontWeight: 700, lineHeight: 1.12 }
  title: { fontFamily: "Bricolage Grotesque", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.3 }
  body: { fontFamily: "Schibsted Grotesk", fontSize: "1rem", fontWeight: 400, lineHeight: 1.55 }
  label: { fontFamily: "Schibsted Grotesk", fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.4 }
  micro: { fontFamily: "Schibsted Grotesk", fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.35 }
---

# Design rules

The rulebook for every screen. Tokens live in `app/globals.css`; hex copies for drawn images live in `lib/brand.ts`. Change this file first.

## The idea

A missed call happens in the evening, when the owner is off the roof. So the caller's phone is drawn in **night** colors, and the owner's office is drawn on warm **paper**. Two worlds side by side; the demo moves a lead from one to the other.

## Color

1. **Tile red** (`tile`) means one thing: a call that needs someone. The missed call, the alert dot, the main button. Never decoration.
2. **Answered green** (`answered`) means the business has replied: the follow-up bubbles, the "lead in" state.
3. Everything else is ink on paper. No gradients on the page, no other accent colors.
4. Light theme only. The phone is dark because it is a phone at night, not a dark mode.

## Shape

Decided 2026-11-13 (founder, tekguyz/missed-call-follow-up#6): the charcoal and square-corner restyle was tried and dropped; it was too dark and the square phone looked odd. Pill buttons were also too round. So: buttons, tabs and panels use 8px corners (`rounded-lg`), chips and small cards 6px (`rounded-md`), the phone frame and chat bubbles stay softly rounded because it is a phone, and dots and call circles stay round. No pills, no large 2xl cards.

## Type

Bricolage Grotesque for display, headline and title. Schibsted Grotesk for everything else. Six sizes only, as tokens: `text-display`, `text-headline`, `text-title`, `text-body`, `text-label`, `text-micro`. Tailwind's own sizes are off.

## Layout

- Landing page: one column up to 1024px, a max width of 72rem. 16px side gutter on phones.
- Demo: from 1024px, the phone (fixed 22rem wide) on the left and the owner's office on the right. Below 1024px, two tabs, "Caller's phone" and "Owner's office"; the owner tab shows a red dot when an alert arrives.
- The pipeline board: 4 columns from 1280px, 2 columns from 640px, 1 column below.
- Touch targets are at least 44px.

## Logo

**Picked: option A, "Call comes back"** (Claude's pick, 2026-11-10; the founder chose "just build it" and can switch). A handset with an incoming arrow on a tile-red rounded square. Source: `PRODUCT_MARK_SVG` in `lib/brand.ts`. Options: `docs/design/logos.html`.

The Sample Business, Keywind Roofing, has its own mark (`KEYWIND_MARK_SVG`): a roof line with two strokes of wind, on night. It shows only inside the demo.

## Motion

Motion shows a change of state, nothing else:

1. The phone rings: a soft red ring pulse on the call button, only while ringing.
2. A new message, alert or lead arrives: a 320ms rise and fade in.
3. The visitor's new lead: a hairline draws from the left under the card, once.

Under `prefers-reduced-motion: reduce` all three are off and nothing is hidden. Content is visible by default.

## Demo banner

A thin ink-on-sunk bar at the top of every demo screen: "You are in the demo. Nothing is sent." with Reset demo, Leave the demo and "Built by TEKGUYZ". It carries `data-demo-banner` so `tools/capture` hides it.
