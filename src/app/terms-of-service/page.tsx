import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Kifayat AI Matrix.",
  alternates: { canonical: "/terms-of-service" },
};

export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl py-12 prose prose-invert max-w-none">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>
      <p>
        By accessing Kifayat AI Matrix, you agree to these Terms of Service.
      </p>
      <h2>Use of Content</h2>
      <p>
        All content on this site is provided for informational purposes. You may
        not reproduce, distribute, or commercially exploit content without
        permission.
      </p>
      <h2>No Warranty</h2>
      <p>
        Content is provided “as is” without warranty of any kind. AI-assisted
        reporting may contain inaccuracies; verify important information from
        primary sources.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        In no event shall Kifayat AI Matrix be liable for damages arising from the
        use of this site.
      </p>
    </article>
  );
}
