import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";
import { readPost, getAllSlugs } from "@/lib/posts";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import Carousel from "@/components/Carousel";
import { postMetadata, postJsonLd } from "./metadata";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** ISR: rebuild at most once every 3600s to pick up new daily posts. */
export const revalidate = 3600;

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const post = readPost(params.slug);
  if (!post) return { title: "Not Found" };
  return postMetadata(post);
};

/**
 * Compile Markdown/MDX source to static HTML on the server using remark.
 * Synchronous, dependency-free of React, and safe during Next.js prerendering.
 */
function mdxToHtml(source: string): string {
  try {
    return unified().use(remarkParse).use(remarkHtml).processSync(source).toString();
  } catch {
    return `<p>${source.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`;
  }
}

/** Read the body of a post and split into chunks on H2 headings. */
function readPostBody(slug: string): string[] {
  const file = path.join(process.cwd(), "src", "app", "posts", `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { content } = matter(raw);
  // Split on H2 headings so we can insert in-article ad interstitials.
  return content.split(/(?=\n## )/);
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = readPost(params.slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const chunks = readPostBody(post.slug).map((c) => mdxToHtml(c));

  return (
    <article className="mx-auto max-w-3xl py-10">
      <JsonLd blocks={postJsonLd(post)} />
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-matrix-cyan"
      >
        ← All stories
      </Link>

      <span className="mb-3 inline-block rounded bg-matrix-purple/20 px-2 py-0.5 text-xs font-medium text-matrix-purple">
        {post.category}
      </span>
      <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
      <p className="mb-6 text-lg text-slate-300">{post.description}</p>

      <div className="mb-8 flex items-center gap-3 border-y border-matrix-cyan/20 py-3 text-sm text-slate-400">
        <span>By {post.author}</span>
        <span>·</span>
        <span>{date}</span>
        <span>·</span>
        <span>{post.readingTime || 7} min read</span>
      </div>

      {post.carousel && post.carousel.length > 0 && (
        <div className="mb-10 flex flex-col items-center">
          <Carousel slides={post.carousel} alt={post.title} />
          <p className="mt-3 text-center font-mono text-xs text-slate-500">
            📱 Social carousel — swipe to preview this story
          </p>
        </div>
      )}

      {post.tldr && post.tldr.length > 0 && (
        <aside className="mb-8 rounded-lg border border-matrix-cyan/30 bg-matrix-panel/60 p-5">
          <h2 className="mb-3 font-mono text-sm uppercase tracking-wide text-matrix-cyan">TL;DR</h2>
          <ul className="space-y-2">
            {post.tldr.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-200">
                <span className="text-matrix-cyan">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="prose prose-invert max-w-none prose-a:text-matrix-cyan">
        {chunks.map((html, i) => (
          <div key={i}>
            {i === 1 && <AdSlot slot="in-article-2" />}
            {i === 4 && <AdSlot slot="in-article-6" />}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        ))}
      </div>

      {post.faq && post.faq.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {post.faq.map((f, i) => (
              <details key={i} className="rounded-lg border border-matrix-cyan/20 bg-matrix-panel/50 p-4">
                <summary className="cursor-pointer font-medium text-slate-100">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-matrix-cyan/30 px-3 py-1 text-xs text-matrix-cyan">
            #{t}
          </span>
        ))}
      </div>
    </article>
  );
}
