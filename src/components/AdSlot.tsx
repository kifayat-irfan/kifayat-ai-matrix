import { siteConfig } from "@/lib/site";

/**
 * AdSense slot placeholder. Renders a labelled dev box when no AdSense ID is
 * configured, and a real <ins> ad container once NEXT_PUBLIC_ADSENSE_ID is set.
 * All slots are non-intrusive per AdSense Publisher Policies.
 */
export function AdSlot({
  slot,
  format = "auto",
  className = "",
}: {
  slot: "header" | "in-article-2" | "in-article-6" | "sidebar" | "mobile-bottom";
  format?: "auto" | "horizontal" | "vertical" | "banner";
  className?: string;
}) {
  const label: Record<string, string> = {
    header: "Header Banner (728x90)",
    "in-article-2": "In-Article Interstitial",
    "in-article-6": "In-Article Interstitial",
    sidebar: "Sidebar (300x600)",
    "mobile-bottom": "Sticky Mobile Bottom Anchor",
  };

  if (!siteConfig.adsenseClientId) {
    return (
      <aside
        className={`mx-auto mb-6 rounded-lg border border-dashed border-matrix-cyan/25 bg-matrix-panel/50 px-4 py-6 text-center text-xs text-slate-600 ${className}`}
        aria-hidden="true"
      >
        Ad placeholder — {label[slot]} ({format})
      </aside>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={siteConfig.adsenseClientId}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
      aria-label="advertisement"
    />
  );
}
