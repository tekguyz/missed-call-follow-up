# Missed Call Follow-Up (`missed-call-follow-up`)

## What this is

The landing page and one-click demo for TEKGUYZ package A, "Missed-call follow-up" (`tekguyz-one` `brand/solutions.md` § 6 A). The demo plays Keywind Roofing, a made-up roofer in South Florida. Built to `C:/Projects/claude-config/DEMO-STANDARD.md`. Tracking issue: #1.

Next.js (App Router), Tailwind 4, Vitest, on Vercel. No backend (ADR 0001): nothing is sent, and the demo lives in the visitor's browser.

Next.js rules: @AGENTS.md

## Commands

- `npm run test:unit` for tests. Never `npm test`.
- `npm run typecheck` runs `next typegen` first, so route types exist.
- `npm run lint`.

## Rules

- Follow `DESIGN.md` for the look. Colors and type sizes are tokens in `app/globals.css`; Tailwind's own colors and sizes are off. Change `DESIGN.md` first.
- The marks live once, in `lib/brand.ts`. `app/icon.svg` must equal `PRODUCT_MARK_SVG` (a test checks it).
- Never a price, a statistic, a setup-time claim or a phone number, real or placeholder. `app/__tests__/guards.test.ts` checks the last two.
- TEKGUYZ appears only in the small "Built by TEKGUYZ" credit. Never in the app name, URL or screens.
- Never a real business name. Keywind Roofing was checked as unused on 2026-11-10.
- The steps of a call are pure functions in `lib/demo/conversation.ts`; screens never change a Run by hand. Data goes through `lib/demo/store.ts`.
- `next`, `react`, `react-dom` and `eslint-config-next` are pinned to exact versions. Bump them together.
- Follow `C:/Projects/claude-config/README-STANDARD.md` for the README. A PR that finishes a ticket updates its Status table.

## Issues and labels

New work goes to GitHub Issues (`gh` CLI). Labels: `ready-for-agent`, `ready-for-human`, `bug`, `enhancement`, `documentation`, `question`, and one Model label per issue (`opus-medium`, `sonnet-high`…). How to pick it is in the global rules.
