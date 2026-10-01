import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// CV short links: /c/<slug> -> destination with CV-attribution UTMs.
// This is a Proxy (the renamed "middleware" convention in Next.js 16;
// `npx @next/codemod middleware-to-proxy` is the same migration) rather
// than a next.config redirect because next.config's `has`-based query
// capture can't drop the original ?co= once it's used to fill
// utm_campaign — Next auto-forwards any incoming query param the
// destination doesn't already claim, leaving a stray `co=` sitting next
// to utm_campaign in the final URL.
// 307 (temporary): destinations can change without browsers/CDNs caching
// the old target.
const CV_LINKS: Record<string, string> = {
  portfolio: "/",
  integrations: "/work/shared-integration-service",
  mcp: "/work/mcp-orchestration",
  translation: "/work/translation-cache",
  scanning: "/work/document-scanning-decision",
  healthtech: "/work/remote-patient-monitoring",
  "how-we-build": "/how-we-build",
  rag: "/lab/ask-ai-productinfo",
  "video-studio": "/lab/feature-video-studio",
};

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice("/c/".length);
  const destination = CV_LINKS[slug];
  if (!destination) return NextResponse.next();

  const company = request.nextUrl.searchParams.get("co");

  const url = request.nextUrl.clone();
  url.pathname = destination;
  url.search = "";
  url.searchParams.set("utm_source", "cv");
  url.searchParams.set("utm_medium", "pdf");
  url.searchParams.set("utm_campaign", company ?? "cv-2026");
  url.searchParams.set("utm_content", slug);

  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: "/c/:slug",
};
