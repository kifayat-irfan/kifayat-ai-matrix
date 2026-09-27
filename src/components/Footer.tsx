import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-matrix-cyan/20 bg-matrix-bg">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-sm text-matrix-cyan">
            ◆ {siteConfig.siteName}
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.owner}. Autonomous AI news engine.
          </p>
        </div>
      </div>
    </footer>
  );
}
