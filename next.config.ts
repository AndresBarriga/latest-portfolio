import type { NextConfig } from "next";

// Reverse-proxies PostHog traffic through this domain (EU cloud), per
// https://posthog.com/docs/advanced/proxy/nextjs — so events aren't sent
// directly to a third-party domain that ad/tracker blockers can flag.
// "/ledger" is deliberately not an obvious analytics-sounding path.
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ledger/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ledger/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ledger/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
