export interface FaqItem {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  /** ISO 8601 published date */
  date: string;
  /** ISO 8601 last-modified date */
  modified?: string;
  author: string;
  tags: string[];
  category: string;
  /** 16:9 featured poster URL or relative public path */
  cover: string;
  /** Optional 3-5 slide social carousel of image paths */
  carousel?: string[];
  /** Target long-tail SEO keyword phrase */
  keyword?: string;
  /** TL;DR executive summary bullets */
  tldr?: string[];
  faq?: FaqItem[];
  /** Whether the post qualifies for a rendered social carousel */
  featured?: boolean;
  /** Reading time in minutes */
  readingTime?: number;
}

export interface Post extends PostFrontmatter {
  slug: string;
  /** Compiled MDX source */
  mdxSource: string;
}

export interface PostMeta extends Omit<Post, "mdxSource"> {}
