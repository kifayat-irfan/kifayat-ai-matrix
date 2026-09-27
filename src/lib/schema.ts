import type { PostMeta } from "./types";
import { siteConfig } from "./site";

/** NewsArticle schema — Google structured data for post pages. */
export function newsArticleSchema(post: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/posts/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    image: post.cover ? resolveAsset(post.cover) : undefined,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    articleSection: post.category,
    keywords: [post.keyword, ...post.tags].filter(Boolean).join(", "),
    author: { "@type": "Person", name: post.author, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
  };
}

/** FAQPage schema for People-Also-Ask snippet targeting. */
export function faqSchema(faq: { q: string; a: string }[] | undefined) {
  if (!faq || !faq.length) return;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Organization + Breadcrumb schema shared across the site. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.path}`,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.url,
    founder: { "@type": "Person", name: siteConfig.owner },
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
  };
}

function resolveAsset(cover: string): string {
  if (cover.startsWith("http")) return cover;
  return `${siteConfig.url}${cover.startsWith("/") ? "" : "/"}${cover}`;
}
