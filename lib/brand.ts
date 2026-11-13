// The marks, drawn once. The favicon (app/icon.svg), the home-screen icon,
// the link preview and the logo on the page all use these. The pick is
// option A in docs/design/logos.html; DESIGN.md records it.
//
// An SVG string cannot read CSS variables, so these hex values copy the
// tokens in app/globals.css. Change both together.

export const colors = {
  paper: "#1D2125",
  surface: "#272C31",
  line: "#444C54",
  ink: "#F2EFE9",
  inkMuted: "#B4B9BE",
  tile: "#FF6A13",
  onTile: "#1D2125",
  night: "#101315",
  answered: "#2C7355",
} as const;

/** Product mark, option A "Call comes back": a handset with an arrow coming in. */
export const PRODUCT_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="2" fill="${colors.tile}"/><g transform="translate(5 5) scale(0.9166)" fill="none" stroke="${colors.onTile}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2v6h6"/><path d="m22 2-6 6"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></g></svg>`;

/** The Sample Business's own mark: a roof line with two strokes of wind. */
export const KEYWIND_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="2" fill="${colors.surface}" stroke="${colors.tile}" stroke-width="1.5"/><path d="M6 17 16 9l10 8" fill="none" stroke="${colors.ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 21.5h9M12 25h11" fill="none" stroke="${colors.tile}" stroke-width="2" stroke-linecap="round"/></svg>`;
