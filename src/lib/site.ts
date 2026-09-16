// Single source of truth for the production URL. Override via the
// NEXT_PUBLIC_SITE_URL env var (e.g. in Vercel project settings) if the
// domain changes — nothing else in the codebase should hardcode it.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://andresbarrigaportoflio.vercel.app";
