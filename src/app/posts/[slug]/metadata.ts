import type { Metadata } from "next";
import type { PostMeta } from "@/lib/types";
import { newsArticleSchema, faqSchema, breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

/** Build the full Next.js Metadata object for a post page. */
export function postMetadata(post: PostMeta): Metadata {
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/posts/${post.slug}` },
    authors: [{ name: post.author }],
    keywords: [post.keyword, ...post.tags].filter((k): k is string => Boolean(k)),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
      siteName: siteConfig.siteName,
      url: `/posts/${post.slug}`,
      images: post.cover ? [{ url: post.cover, width: 1600, height: 900, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: siteConfig.social.twitter,
      images: post.cover ? [post.cover] : undefined,
    },
    robots: { index: true, follow: true, "max-image-preview": "large" as const },
    other: {
      "article:published_time": post.date,
      "article:modified_time": post.modified || post.date,
      "article:tag": post.tags.join(", "),
    },
  };
}

/** Collect the JSON-LD schema blocks to inject into the post page <head>. */
export function postJsonLd(post: PostMeta): object[] {
  const blocks: object[] = [
    newsArticleSchema(post),
    organizationSchema(),
    breadcrumbSchema([
      { name: siteConfig.siteName, path: "/" },
      { name: post.title, path: `/posts/${post.slug}` },
    ]),
  ];
  const faq = faqSchema(post.faq);
  if (faq) blocks.push(faq);
  return blocks;
}
