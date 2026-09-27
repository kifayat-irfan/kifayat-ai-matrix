export const siteConfig = {
  siteName: "Kifayat AI Matrix",
  shortName: "KAM",
  description:
    "Autonomous 3D interactive AI news magazine and automated blogging engine by Kifayat Irfan. " +
    "Daily deep-dive coverage of OpenAI, Anthropic, Google DeepMind, Hugging Face, and frontier AI research.",
  author: "Kifayat Irfan",
  authorRole: "Editor-in-Chief & Principal SEO Content Manager",
  owner: "Kifayat Irfan",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kifayat-ai-matrix.vercel.app",
  locale: "en_US",
  timezone: "UTC",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_ID || "",
  social: {
    twitter: "@kifayatifran",
    github: "https://github.com/kifayatifran",
  },
} as const;

export type SiteConfig = typeof siteConfig;
