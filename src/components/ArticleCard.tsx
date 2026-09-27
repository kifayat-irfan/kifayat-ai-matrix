"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { PostMeta } from "@/lib/types";

/** Article card with 3D tilt-on-hover perspective + real cover image. */
export default function ArticleCard({ post }: { post: PostMeta }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.a
      href={`/posts/${post.slug}`}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.98 }}
      className="group block overflow-hidden rounded-2xl border border-matrix-cyan/15 bg-matrix-panel shadow-lg shadow-black/30 transition-colors duration-300 hover:border-matrix-cyan/50"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-matrix-cyan/10 via-matrix-bg to-matrix-purple/10">
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 matrix-grid-bg opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-matrix-panel via-matrix-panel/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-matrix-bg/80 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-matrix-cyan backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime || 7} min read</span>
        </div>
        <h3 className="font-display mb-2.5 line-clamp-2 text-lg font-bold leading-snug text-slate-100 transition-colors group-hover:text-matrix-cyan">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-matrix-cyan">
            Read
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              {" "}→
            </span>
          </span>
          <span className="text-slate-600">{post.author.split(" ")[0]}</span>
        </div>
      </div>
    </motion.a>
  );
}
