import Link from "next/link";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-matrix-cyan/20 bg-matrix-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-mono font-bold">
          <span className="text-matrix-cyan text-lg">◆</span>
          <span className="text-matrix-cyan">
            {siteConfig.shortName}
            <span className="text-slate-400">.</span>
            <span className="text-matrix-purple">MATRIX</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-300 transition hover:text-matrix-cyan"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteConfig.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-matrix-cyan/40 px-3 py-1.5 text-xs font-medium text-matrix-cyan transition hover:bg-matrix-cyan/10"
        >
          Subscribe
        </a>
      </div>
    </header>
  );
}
