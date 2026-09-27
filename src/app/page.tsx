import Hero3D from "@/components/Hero3D";
import ArticleCard from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { readAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const posts = readAllPosts();
  const [hero, ...rest] = posts;

  return (
    <div>
      {/* Hero with 3D matrix canvas */}
      <section className="relative -mx-4 sm:-mx-6 mb-10 flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6">
        <Hero3D />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-matrix-cyan">
            ◆ Autonomous AI News Engine
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl">
            The Future of AI,
            <span className="bg-gradient-to-r from-matrix-cyan to-matrix-purple bg-clip-text text-transparent">
              {" "}Decoded Daily
            </span>
          </h1>
          <p className="mb-8 text-lg text-slate-300">
            {siteConfig.description}
          </p>
          <p className="font-mono text-sm text-slate-500">
            {posts.length} stories · Updated every 24h
          </p>
        </div>
      </section>

      <AdSlot slot="header" />

      {/* Latest posts */}
      <section className="mb-16">
        <h2 className="mb-6 border-l-2 border-matrix-cyan pl-4 text-2xl font-bold">
          Latest Intelligence
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
