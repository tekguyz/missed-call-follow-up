<p align="center"><img src="docs/banner.svg" alt="Missed Call Follow-Up" width="100%"></p>

<p align="center">
  <img src="https://img.shields.io/badge/status-demo%20built-b9472a?labelColor=f6f3ec" alt="Status: demo built">
  <img src="https://img.shields.io/badge/Next.js-16-15212c?labelColor=f6f3ec" alt="Next.js 16">
  <img src="https://img.shields.io/badge/backend-none-b9472a?labelColor=f6f3ec" alt="No backend">
  <img src="https://img.shields.io/badge/tests-Vitest-2c7355?labelColor=f6f3ec" alt="Tests: Vitest">
</p>

**Every missed call gets an answer: a landing page and a one-click demo of a missed-call follow-up for trade businesses.**

Live site: after the first deploy (#1) · press Try the demo

## Status

| Row | |
|---|---|
| Phase | Demo built, deploy next |
| Shipped | Landing page and one-click demo (local) |
| Next | Deploy to Vercel and showcase pictures (#1) |
| Updated | 2026-11-10 |

## What it does

- A landing page that explains the fix in four steps and opens the demo with one press.
- The demo plays Keywind Roofing, a made-up roofer in South Florida. The visitor plays the caller.
- The visitor picks how the business follows up: text, email or an automated voice callback.
- They call, nobody answers, and the follow-up arrives on a drawn phone. It asks what's wrong, where, and how soon; the visitor taps replies.
- The owner's office gets an alert the moment the call is missed, and another when the lead lands.
- The lead appears in New on a pipeline board (New, Called back, Quote sent, Won), and can be moved along.
- Reset demo brings back the sample pipeline.

## What it never does

- Sends anything. No SMS, no email, no phone call, no AI call leaves the browser.
- Keeps anything on a server. The demo lives in the visitor's own browser (ADR 0001).
- Shows a real business, a real person, a price, a statistic or a phone number.
- Lets search engines index the demo. Only the landing page is indexed.

## Stack

Next.js 16 (App Router) and Tailwind 4 on Vercel. No database, no API routes. Vitest for unit tests.

## Run it locally

Needs Node 24 and npm. No env vars.

```bash
npm install
npm run dev
```

## Tests

`npm run test:unit`. Never `npm test` (it fails on purpose). CI runs typecheck, lint, `test:unit` and the build on every PR.

## Docs

- `DESIGN.md`: the look, colors, type and the picked logo.
- `PRODUCT.md`: who it is for and the voice.
- `CONTEXT.md`: the words the code uses.
- `docs/adr/0001-browser-only-demo.md`: why there is no backend.
- `docs/design/logos.html`: the three logo options.

---

<p align="center">Built by <a href="https://tekguyz.com">TEKGUYZ</a></p>
