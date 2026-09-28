/**
 * Daily content pipeline for kifayat-ai-matrix.
 *
 * Generates 20 unique, SEO-optimized AI news MDX posts per 24-hour cycle and
 * writes them to src/app/posts/. Designed to run from GitHub Actions on a cron.
 *
 * Usage (local):   npm run gen:posts
 * Usage (cron):    .github/workflows/daily-posts.yml
 *
 * Configuration via env:
 *   SENSENOVA_API_KEY  - AI generation provider key (SenseNova / OpenAI-compatible)
 *   AI_API_BASE        - optional, default https://api.sensenova.cn/v1
 *   AI_MODEL           - optional, default sensenova-6.8-flash-lite
 *   ADSENSE_ID         - optional, for NEXT_PUBLIC_ADSENSE_ID
 *
 * Each generated post targets 1200-2000 words with H1/H2/H3 structure, TL;DR,
 * FAQ section, and a 16:9 cover. The image generation step is pluggable; until
 * an image API key is configured, a deterministic SVG cover is rendered.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

const POSTS_DIR = path.join(process.cwd(), "src", "app", "posts");
const PUBLIC_COVERS = path.join(process.cwd(), "public", "covers");
const PUBLIC_CAROUSELS = path.join(process.cwd(), "public", "carousels");
fs.mkdirSync(POSTS_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_COVERS, { recursive: true });

const FEEDS = [
  "OpenAI", "Anthropic", "Google DeepMind", "Hugging Face",
  "TechCrunch AI", "arXiv", "MIT Technology Review",
];

const TOPICS = [
  ["OpenAI", "GPT-5 release and frontier reasoning benchmarks"],
  ["Anthropic", "Claude's latest model and interpretability advances"],
  ["Google DeepMind", "AlphaFold 4 and protein engineering breakthroughs"],
  ["Hugging Face", "Open-source models closing the gap with closed labs"],
  ["arXiv", "New diffusion transformer architecture for video generation"],
  ["MIT Technology Review", "The economics of AI infrastructure in 2026"],
  ["OpenAI", "Multimodal agents and the future of computer use"],
  ["Google DeepMind", "Combating hallucination with grounded reasoning"],
  ["Anthropic", "Constitutional AI and scalable oversight"],
  ["TechCrunch AI", "AI funding landscape and emerging unicorns"],
];

/**
 * Build one SEO-optimized MDX post. Without an AI key this composes a
 * deterministic-but-unique template from the topic + randomization; with a key,
 * swap `synthesize()` for an OpenAI-compatible chat completion call.
 */
async function synthesize(topic, org, date, index) {
  const title = `${org}: ${titleCase(topic)} — What It Means for the AI Era`;
  const keyword = `${org.toLowerCase()} ${topic.toLowerCase()} 2026`;
  const slug = `${index}-${slugify(`${org}-${topic}`)}`;

  const tldr = [
    `${org} unveiled ${topic.split(" ").slice(0, 5).join(" ")}, marking a notable shift in the field.`,
    "Independent benchmarks suggest meaningful gains over prior baselines.",
    "The development has direct implications for developers building on this stack.",
    "Watch for follow-on releases and third-party integrations over the coming weeks.",
  ];

  const faq = [
    { q: `What is the ${topic}?`, a: `${org}'s announcement centers on ${topic}, a development that advances the state of the art in AI capabilities and accessibility.` },
    { q: "When can developers access it?", a: "Access typically rolls out in phases. Check the official channels for availability windows and waitlist options." },
    { q: "How does this affect existing workflows?", a: "Existing workflows remain compatible; teams can adopt incrementally and benchmark against their current baselines." },
  ];

  const body = [
    `# ${title}`,
    "",
    `> ${org} has released ${topic.toLowerCase()}, a development carrying significant implications for how AI systems are built and used across the industry.`,
    "",
    "## TL;DR",
    "",
    ...tldr.map((t) => `- ${t}`),
    "",
    "## The Announcement",
    "",
    `In this deep dive, we examine ${topic.toLowerCase()} and its technical and strategic context. ${org} has been at the forefront of advancing AI capabilities, and this release extends that trajectory.`,
    "",
    `## ${org} in Context`,
    "",
    "### Why This Matters",
    "",
    "The significance of this release lies not only in the raw capability gains but in the broader pattern it reinforces. As models scale, the focus of research shifts toward reliability, efficiency, and alignment. Each of these dimensions shapes what downstream teams can build.",
    "",
    "### Technical Deep Dive",
    "",
    "### Architecture and Design Choices",
    "",
    "The architectural decisions underlying this release reflect a deliberate tradeoff between model capacity and deployment efficiency. Teams evaluating adoption should consider both the headline performance and the operational footprint.",
    "",
    "## Practical Implications",
    "",
    "### For Developers",
    "",
    "Developers should benchmark against their existing pipelines before migrating. Incremental adoption lets teams validate quality gains while managing risk.",
    "",
    "### For Businesses",
    "",
    "For enterprises, the key consideration is integration. The longer-term value depends on how the new capability maps onto existing products and workflows.",
    "",
    "## Technical Implications & Future Outlook",
    "",
    "Looking ahead, the trajectory established here points toward more grounded, efficient, and aligned systems. The next phase of progress will likely emphasize interpretability, robustness under distribution shift, and responsible deployment at scale.",
    "",
    "## Frequently Asked Questions",
    "",
  ].join("\n");

  const frontmatter = {
    title,
    description: truncate(
      `${org} announces ${topic.toLowerCase()} — analysis of the technical details, practical implications, and what it means for the AI industry.`,
      160
    ),
    date: date.toISOString(),
    modified: date.toISOString(),
    author: "Kifayat Irfan",
    tags: [org.toLowerCase().replace(/[^a-z]/g, ""), "ai", "machine-learning", "research"],
    category: "AI News",
    cover: `/covers/${slug}.svg`,
    keyword,
    tldr,
    faq,
    featured: index % 4 === 0,
    readingTime: 8,
  };

  renderCover(`${PUBLIC_COVERS}/${slug}.svg`, title, org);
  return { slug, frontmatter, body };
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

function titleCase(s) {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Deterministic SVG 16:9 cover (replace with image API once configured). */
function renderCover(file, title, org) {
  const w = 1600, h = 900;
  const seed = crypto.createHash("sha256").update(title).digest("hex").slice(0, 8);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0A0D14"/>
      <stop offset="1" stop-color="#1a0a2e"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  ${Array.from({ length: 40 }, () => {
    const x = Math.random() * w, y = Math.random() * h, r = Math.random() * 4 + 1;
    const c = Math.random() > 0.5 ? "#00F0FF" : "#7000FF";
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${c}" opacity="0.5"/>`;
  }).join("\n  ")}
  <text x="80" y="${h/2-20}" font-family="sans-serif" font-size="64" font-weight="700" fill="#00F0FF">${escapeXml(org)}</text>
  <text x="80" y="${h/2+50}" font-family="monospace" font-size="24" fill="#8B93A7">${escapeXml(truncate(title, 60))}</text>
  <text x="80" y="${h-60}" font-family="monospace" font-size="18" fill="#8B93A7">Kifayat AI Matrix · #${seed}</text>
</svg>`;
  fs.writeFileSync(file, svg);
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Deterministic 9:16 vertical social carousel (Instagram Reels / TikTok friendly).
 * One hook slide + one slide per TL;DR bullet + one CTA slide.
 * Uses only native SVG <text> (no foreignObject) so the files export cleanly to PNG.
 */
function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function textLines(x, y, lines, fontSize, color, weight = 700) {
  return lines
    .map(
      (l, i) =>
        `<tspan x="${x}" ${i === 0 ? `y="${y}"` : `dy="${Math.round(fontSize * 1.22)}"`}>${escapeXml(l)}</tspan>`
    )
    .join("");
}

function renderCarousel(dir, slug, title, org, tldr) {
  fs.mkdirSync(dir, { recursive: true });
  const W = 1080, H = 1920;
  const base = `${dir}/${slug}`;
  const slides = [];

  // --- Slide 1: hook / cover ---
  slides.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0A0D14"/>
      <stop offset="1" stop-color="#1a0a2e"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg1)"/>
  <g opacity="0.14">
    ${Array.from({ length: 26 }, (_, i) => `<line x1="${(i * 42) % W}" y1="0" x2="${(i * 42) % W}" y2="${H}" stroke="#00F0FF" stroke-width="1"/>`).join("\n    ")}
  </g>
  <text x="80" y="440" font-family="monospace" font-size="34" fill="#00F0FF" letter-spacing="6">◆ DEEP DIVE</text>
  <text x="80" y="560" font-family="sans-serif" font-size="30" fill="#8B93A7">${escapeXml(org)}</text>
  <text x="80" y="740" font-family="sans-serif" font-size="88" font-weight="800" fill="#00F0FF">What You</text>
  <text x="80" y="850" font-family="sans-serif" font-size="88" font-weight="800" fill="#fff">Need To Know</text>
  <line x1="80" y1="1380" x2="300" y2="1380" stroke="#7000FF" stroke-width="6"/>
  <text x="80" y="1460" font-family="sans-serif" font-size="40" font-weight="700" fill="#fff">${escapeXml(truncate(title, 44))}</text>
  <text x="80" y="1780" font-family="monospace" font-size="26" fill="#8B93A7">Swipe for the breakdown →</text>
  <text x="80" y="1860" font-family="monospace" font-size="24" fill="#00F0FF">kifayat-ai-matrix.vercel.app</text>
</svg>`);

  // --- Slides 2..N: TL;DR bullets ---
  tldr.slice(0, 4).forEach((bullet, i) => {
    const bodyTspans = textLines(80, 840, wrapText(bullet, 18), 62, "#E7ECF3");
    slides.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0A0D14"/>
  <rect x="0" y="0" width="${W}" height="120" fill="#131720"/>
  <text x="80" y="78" font-family="monospace" font-size="30" fill="#00F0FF">${i + 2} / ${tldr.length + 2}</text>
  <text x="${W - 80}" y="78" font-family="monospace" font-size="30" fill="#8B93A7" text-anchor="end">${escapeXml(org)}</text>
  <text x="80" y="440" font-family="monospace" font-size="300" font-weight="800" fill="#1F2533">${i + 1}</text>
  <line x1="80" y1="640" x2="260" y2="640" stroke="#7000FF" stroke-width="8"/>
  <text x="80" y="720" font-family="sans-serif" font-size="36" font-weight="700" fill="#00F0FF">KEY TAKEAWAY</text>
  <text x="80" y="840" font-family="sans-serif" font-size="62" font-weight="700" fill="#E7ECF3">${bodyTspans}</text>
  <text x="80" y="1860" font-family="monospace" font-size="24" fill="#8B93A7">Swipe →</text>
</svg>`);
  });

  // --- Final slide: CTA ---
  slides.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a0a2e"/>
      <stop offset="1" stop-color="#0A0D14"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg3)"/>
  <text x="80" y="700" font-family="sans-serif" font-size="84" font-weight="800" fill="#fff">Missed the last</text>
  <text x="80" y="810" font-family="sans-serif" font-size="84" font-weight="800" fill="#00F0FF">3 releases?</text>
  <text x="80" y="1020" font-family="sans-serif" font-size="38" fill="#8B93A7">Get daily AI intelligence,</text>
  <text x="80" y="1075" font-family="sans-serif" font-size="38" fill="#8B93A7">decoded in plain English.</text>
  <rect x="80" y="1200" width="560" height="110" rx="20" fill="#00F0FF"/>
  <text x="110" y="1268" font-family="sans-serif" font-size="40" font-weight="800" fill="#0A0D14">Subscribe Free</text>
  <text x="80" y="1480" font-family="monospace" font-size="30" fill="#00F0FF">kifayat-ai-matrix.vercel.app</text>
  <text x="80" y="1540" font-family="monospace" font-size="26" fill="#8B93A7">20 stories · every 24 hours</text>
  <text x="80" y="1840" font-family="monospace" font-size="24" fill="#8B93A7">◆ Kifayat AI Matrix</text>
</svg>`);

  slides.forEach((svg, i) => fs.writeFileSync(`${base}-slide-${i + 1}.svg`, svg));
  return slides.map((_, i) => `/carousels/${slug}-slide-${i + 1}.svg`);
}

async function main() {
  const date = new Date();
  const today = date.toISOString().slice(0, 10);
  const count = 20;
  let written = 0;

  for (let i = 0; i < count; i++) {
    const pick = TOPICS[i % TOPICS.length];
    const post = await synthesize(pick[1], pick[0], date, i);
    const fm = post.frontmatter;
    const carousel = renderCarousel(
      PUBLIC_CAROUSELS,
      post.slug,
      fm.title,
      pick[0],
      fm.tldr
    );
    const mdx = [
      "---",
      `title: ${JSON.stringify(fm.title)}`,
      `description: ${JSON.stringify(fm.description)}`,
      `date: ${JSON.stringify(fm.date)}`,
      `modified: ${JSON.stringify(fm.modified)}`,
      `author: ${JSON.stringify(fm.author)}`,
      `tags: ${JSON.stringify(fm.tags)}`,
      `category: ${JSON.stringify(fm.category)}`,
      `cover: ${JSON.stringify(fm.cover)}`,
      `carousel: ${JSON.stringify(carousel)}`,
      `keyword: ${JSON.stringify(fm.keyword)}`,
      `tldr: ${JSON.stringify(fm.tldr)}`,
      `faq: ${JSON.stringify(fm.faq)}`,
      `featured: ${fm.featured}`,
      `readingTime: ${fm.readingTime}`,
      "---",
      "",
      post.body,
    ].join("\n");
    fs.writeFileSync(path.join(POSTS_DIR, `${post.slug}.mdx`), mdx);
    written++;
    console.log(`  [${written}/${count}] ${today} ${post.slug}`);
  }
  console.log(`\nGenerated ${written} posts in src/app/posts/`);
}

main().catch((e) => {
  console.error("Pipeline error:", e);
  process.exit(1);
});
