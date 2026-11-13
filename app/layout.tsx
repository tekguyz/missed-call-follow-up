import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import { siteDescription, siteName, siteTagline, siteUrl } from "@/lib/site";
import "./globals.css";

// Fonts and colors follow DESIGN.md.
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-barlow" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-plex" });

// The link preview: title, description and app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: `${siteName} · ${siteTagline}`, template: `%s · ${siteName}` },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${siteName} · ${siteTagline}`, description: siteDescription },
};

export const viewport: Viewport = { themeColor: "#1d2125" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} ${plex.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-body text-ink">{children}</body>
    </html>
  );
}
