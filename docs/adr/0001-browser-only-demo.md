# The demo runs in the browser, with no backend

The TEKGUYZ demo standard expects a Supabase anonymous sign-in per Demo Visitor. For Missed Call Follow-Up we chose a browser-only demo instead, like FancyFam (its ADR 0001). The sample pipeline ships with the app, and what a visitor does stays in their own browser's local storage. Every visitor is walled off by design, nothing costs money, and there is no sign-in, visit cap or cleanup job to build.

Nothing is ever sent. The text, the email and the voice callback are drawn on a phone on screen; no SMS, email or AI call leaves the browser. A real setup for a client is a separate job, built for that client's phone system and CRM.

All demo data goes through one store (`lib/demo/store.ts`) that a real backend could replace.

## Consequences

- The standard's server rules (POST-only sign-in, RLS walls, visit cap, 7-day cleanup) have nothing to guard. Do not "fix" the demo by adding them.
- "Try the demo" is a plain link, because opening the demo writes nothing on a server.
- The landing page has no form and no sign-in page; the footer credit is the only way to get in touch.
- When the browser blocks storage (some framed or private windows), the demo still works and forgets on reload.
