"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { PostMeta } from "@/lib/types";

/** Article card with 3D tilt-on-hover perspective. */
export default function ArticleCard({ post }: { post: PostMeta }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

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
      className="group block overflow-hidden rounded-xl border border-matrix-cyan/20 bg-matrix-panel transition hover:border-matrix-cyan/60"
    >
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 matrix-grid-bg opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-matrix-cyan/10 to-matrix-purple/10">
          <span className="font-mono text-3xl text-matrix-cyan/60">◆</span>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="rounded bg-matrix-purple/20 px-2 py-0.5 font-medium text-matrix-purple">
            {post.category}
          </span>
          <span className="text-slate-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-100 transition group-hover:text-matrix-cyan">
          {post.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-slate-400">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{post.readingTime || 7} min read</span>
          <span className="text-matrix-cyan opacity-0 transition group-hover:opacity-100">
            Read →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
