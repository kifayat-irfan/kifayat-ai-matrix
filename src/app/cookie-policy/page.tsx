import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Kifayat AI Matrix.",
  alternates: { canonical: "/cookie-policy" },
};

export default function Cookie() {
  return (
    <article className="mx-auto max-w-3xl py-12 prose prose-invert max-w-none">
      <h1>Cookie Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>
      <p>
        This Cookie Policy explains how Kifayat AI Matrix uses cookies and similar
        technologies.
      </p>
      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device that help websites
        function and remember your preferences.
      </p>
      <h2>Cookies We Use</h2>
      <ul>
        <li><strong>Essential:</strong> Required for core site functionality.</li>
        <li><strong>Analytics:</strong> Help us understand how visitors use the site.</li>
        <li><strong>Advertising:</strong> Used by Google AdSense to serve relevant ads.</li>
      </ul>
      <h2>Managing Cookies</h2>
      <p>
        You can enable or disable cookies through your browser settings. Disabling
        cookies may affect site functionality.
      </p>
    </article>
  );
}
