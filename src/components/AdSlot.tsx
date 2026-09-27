import { siteConfig } from "@/lib/site";

/**
 * AdSense slot. Renders a real <ins> ad container once NEXT_PUBLIC_ADSENSE_ID is
 * set, and is hidden entirely otherwise (no dev-note text leaking to production).
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
  // Nothing to show until an AdSense client ID is configured. Keep it clean.
  if (!siteConfig.adsenseClientId) return null;

  return (
    <ins
      className={`adsbygoogle mx-auto mb-6 block ${className}`}
      style={{ display: "block" }}
      data-ad-client={siteConfig.adsenseClientId}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
      aria-label="advertisement"
    />
  );
}
