import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { colors, PRODUCT_MARK_SVG } from "@/lib/brand";
import { siteName } from "@/lib/site";

// The link-preview card, drawn by the app in its own look (DEMO-STANDARD.md):
// the headline on charcoal, and a dark phone with the follow-up text arriving.
export const alt = `${siteName}. Every missed call gets an answer: by text, email or a callback.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "app/_og");
const [display, body400, body600] = await Promise.all([
  readFile(join(fontDir, "barlow-condensed-700.woff")),
  readFile(join(fontDir, "plex-400.woff")),
  readFile(join(fontDir, "plex-600.woff")),
]);

const mark = `data:image/svg+xml,${encodeURIComponent(PRODUCT_MARK_SVG)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: colors.paper,
          color: colors.ink,
          fontFamily: "Plex",
          padding: "64px 72px",
          borderBottom: `12px solid ${colors.tile}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mark} width={56} height={56} alt="" />
            <div style={{ fontSize: 34, fontWeight: 600 }}>{siteName}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontFamily: "Barlow", fontSize: 104, lineHeight: 0.98, letterSpacing: "0.005em" }}>
            <span>Every missed call</span>
            <span>gets an answer.</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 28, color: colors.inkMuted }}>
            By text, email or a callback. The lead lands in your pipeline.
          </div>
          <div style={{ display: "flex", marginTop: "auto" }}>
            <div style={{ display: "flex", padding: "14px 28px", borderRadius: 2, background: colors.tile, color: colors.onTile, fontSize: 26, fontWeight: 600 }}>
              Try the demo · no signup
            </div>
          </div>
        </div>
        <div style={{ display: "flex", width: 280, marginLeft: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 280, height: 500, borderRadius: 4, border: `2px solid ${colors.line}`, background: colors.night, padding: "36px 22px", gap: 14, color: colors.ink, fontSize: 20 }}>
            <div style={{ display: "flex", color: "#FF9A5C", fontWeight: 600, fontSize: 18 }}>Missed call · 7:42 PM</div>
            <div style={{ display: "flex", background: colors.answered, color: "#fff", borderRadius: 0, padding: "14px 16px", lineHeight: 1.3 }}>
              Sorry we missed your call! What&apos;s going on with your roof?
            </div>
            <div style={{ display: "flex", alignSelf: "flex-end", background: "#20262B", borderRadius: 0, padding: "12px 16px" }}>
              Leak after the storm
            </div>
            <div style={{ display: "flex", marginTop: "auto", background: colors.surface, color: colors.ink, borderRadius: 0, padding: "14px 16px", flexDirection: "column", gap: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 18 }}>New lead in your pipeline</span>
              <span style={{ fontSize: 16, color: colors.inkMuted }}>Leak · urgent · came in by text</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow", data: display, weight: 700, style: "normal" },
        { name: "Plex", data: body400, weight: 400, style: "normal" },
        { name: "Plex", data: body600, weight: 600, style: "normal" },
      ],
    },
  );
}
