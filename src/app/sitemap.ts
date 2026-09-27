import type { MetadataRoute } from "next";
import { getAllSlugs, readPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

const STATIC = [
  "/",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllSlugs().map((slug) => {
    const p = readPost(slug);
    return {
      url: `${siteConfig.url}/posts/${slug}`,
      lastModified: p?.modified || p?.date || new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    };
  });

  return [
    ...STATIC.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts,
  ];
}
