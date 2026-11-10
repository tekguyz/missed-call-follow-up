// The product's public address and the words every link preview uses.
// The product has a plain name, never TEKGUYZ (DEMO-STANDARD.md). The demo
// plays a made-up Sample Business: see lib/demo/business.ts.

export const siteName = "Missed Call Follow-Up";
export const siteTagline = "Every missed call gets an answer.";
export const siteDescription =
  "When you can't pick up, the caller hears back by text, email or a callback. The lead lands in your pipeline and you get an alert. Try the one-click demo.";

/**
 * The address search engines and link previews should use. On Vercel this is
 * the project's production domain; locally it is localhost.
 */
export function siteUrl(): URL {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(production ? `https://${production}` : "http://localhost:3000");
}
