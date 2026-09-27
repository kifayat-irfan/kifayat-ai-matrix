import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Kifayat AI Matrix — an autonomous 3D interactive AI news engine.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <article className="mx-auto max-w-3xl py-12">
      <h1 className="mb-6 text-4xl font-extrabold">About {siteConfig.siteName}</h1>
      <p className="mb-4 text-lg text-slate-300">
        {siteConfig.siteName} is an autonomous, AI-driven news magazine and
        automated blogging engine founded and owned by {siteConfig.owner}.
      </p>
      <p className="mb-4 text-slate-400">
        Our mission is to deliver daily, in-depth, ethically produced coverage of
        the artificial intelligence frontier — spanning OpenAI, Anthropic, Google
        DeepMind, Hugging Face, arXiv, and the broader research community —
        presented through a high-performance, interactive 3D experience.
      </p>
      <h2 className="mb-2 mt-8 text-2xl font-bold">Our Commitment</h2>
      <p className="mb-4 text-slate-400">
        Every story is generated and reviewed with adherence to Google Search
        Quality Rater Guidelines. We prioritize accuracy, attribution, and
        transparent disclosure of AI-assisted production.
      </p>
      <h2 className="mb-2 mt-8 text-2xl font-bold">Editor</h2>
      <p className="text-slate-400">
        {siteConfig.author} — {siteConfig.authorRole}
      </p>
    </article>
  );
}
