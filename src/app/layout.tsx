import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siteName} — Autonomous AI News Engine`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.owner,
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
      <body className="min-h-screen bg-matrix-bg text-slate-100 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
