import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Kifayat AI Matrix.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Privacy() {
  return (
    <article className="mx-auto max-w-3xl py-12 prose prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>
      <p>
        This Privacy Policy describes how Kifayat AI Matrix (“we”) collects, uses,
        and shares information when you visit our site.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect anonymized usage analytics, and Google AdSense and similar
        services may use cookies to serve relevant advertisements.
      </p>
      <h2>Cookies &amp; Advertising</h2>
      <p>
        We use cookies and third-party advertising partners to personalize content
        and measure performance. You can manage cookie preferences in your browser
        settings. See our Cookie Policy for details.
      </p>
      <h2>Data Retention</h2>
      <p>We retain aggregated analytics data only as long as necessary to operate and improve the site.</p>
      <h2>Contact</h2>
      <p>For privacy questions, contact us via the Contact page.</p>
    </article>
  );
}
