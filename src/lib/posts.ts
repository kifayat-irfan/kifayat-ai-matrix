import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta } from "./types";

export const POSTS_DIR = path.join(process.cwd(), "src", "app", "posts");

/** Read all MDX posts from the local content directory (zero database). */
export function readAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".mdx"))
    .map((d) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, d.name), "utf8");
      const { data, content } = matter(raw);
      const slug = d.name.replace(/\.mdx$/, "");
      const fm = data as Partial<Post>;
      return {
        slug,
        title: String(fm.title || slug),
        description: String(fm.description || ""),
        date: String(fm.date || ""),
        modified: fm.modified ? String(fm.modified) : undefined,
        author: String(fm.author || "Kifayat Irfan"),
        tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
        category: String(fm.category || "AI"),
        cover: String(fm.cover || ""),
        carousel: Array.isArray(fm.carousel) ? (fm.carousel as string[]) : undefined,
        keyword: fm.keyword ? String(fm.keyword) : undefined,
        tldr: Array.isArray(fm.tldr) ? (fm.tldr as string[]) : undefined,
        faq: Array.isArray(fm.faq) ? (fm.faq as Post["faq"]) : undefined,
        featured: Boolean(fm.featured),
        readingTime: typeof fm.readingTime === "number" ? fm.readingTime : 7,
        mdxSource: content,
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function readAllSources(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of readAllPosts()) {
    out[p.slug] = (p as unknown as Post).mdxSource;
  }
  return out;
}

export function readPost(slug: string): Post | undefined {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<Post>;
  return {
    slug,
    title: String(fm.title || slug),
    description: String(fm.description || ""),
    date: String(fm.date || ""),
    modified: fm.modified ? String(fm.modified) : undefined,
    author: String(fm.author || "Kifayat Irfan"),
    tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
    category: String(fm.category || "AI"),
    cover: String(fm.cover || ""),
    carousel: Array.isArray(fm.carousel) ? (fm.carousel as string[]) : undefined,
    keyword: fm.keyword ? String(fm.keyword) : undefined,
    tldr: Array.isArray(fm.tldr) ? (fm.tldr as string[]) : undefined,
    faq: Array.isArray(fm.faq) ? (fm.faq as Post["faq"]) : undefined,
    featured: Boolean(fm.featured),
    readingTime: typeof fm.readingTime === "number" ? fm.readingTime : 7,
    mdxSource: content,
  };
}

export function getAllSlugs(): string[] {
  return readAllPosts().map((p) => p.slug);
}
