import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

/* Self-hosted via next/font — no runtime CDN dependency. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0D14",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siteName} — Autonomous AI News Engine`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.owner,
  applicationName: siteConfig.siteName,
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: siteConfig.shortName },
  openGraph: {
    siteName: siteConfig.siteName,
    type: "website",
    locale: siteConfig.locale,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.social.twitter,
    title: siteConfig.siteName,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen bg-matrix-bg text-slate-100 antialiased ${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
