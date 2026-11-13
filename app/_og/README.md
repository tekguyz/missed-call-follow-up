# Fonts for drawn images

`ImageResponse` (the link preview, `app/opengraph-image.tsx`) cannot use `next/font` and cannot read WOFF2, so it reads these WOFF files. All are SIL Open Font License.

| File | Font | Source |
|---|---|---|
| `barlow-condensed-700.woff` | Barlow Condensed Bold | npm `@fontsource/barlow-condensed`, `files/barlow-condensed-latin-700-normal.woff` |
| `plex-400.woff` | IBM Plex Sans Regular | npm `@fontsource/ibm-plex-sans`, `files/ibm-plex-sans-latin-400-normal.woff` |
| `plex-600.woff` | IBM Plex Sans SemiBold | npm `@fontsource/ibm-plex-sans`, `files/ibm-plex-sans-latin-600-normal.woff` |
