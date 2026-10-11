import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(
    "https://tools.goodfolkdigital.com"
  ),

  title: {
    default: "Goodfolk Toolbox",
    template: "%s | Goodfolk Toolbox",
  },

  description:
    "100 free online tools and calculators.",

  openGraph: {
    title: "Goodfolk Toolbox",
    description:
      "100 free online tools and calculators.",
    siteName: "Goodfolk Toolbox",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Goodfolk Toolbox",
    description:
      "100 free online tools and calculators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<Analytics /></body>
      <GoogleAnalytics gaId="G-G6L5WEM83E" />
    </html>
  );
}