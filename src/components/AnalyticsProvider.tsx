"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import {
  capturePageview,
  isNoTrackFlagSet,
  markAnalyticsEnabled,
} from "@/src/lib/analytics";

// Guards posthog.init() to exactly one call per page load. Done at module
// scope (not inside an effect) so it runs during the first render, before
// PageviewTracker's effect fires — effects run child-before-parent, so an
// init deferred to this component's own effect would lose the very first
// pageview.
let didAttemptInit = false;

function initPostHogIfNeeded() {
  if (didAttemptInit) return;
  didAttemptInit = true;

  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (isNoTrackFlagSet()) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    // Routed through our own domain via the rewrites in next.config.ts,
    // instead of eu.i.posthog.com directly, so tracker blockers are less
    // likely to catch it. ui_host keeps PostHog's own in-app links (e.g.
    // the toolbar) pointing at the real app instead of the proxy path.
    api_host: "/ledger",
    ui_host: "https://eu.posthog.com",
    // No cookies, no localStorage device ID: PostHog derives an
    // anonymous, non-persistent identity server-side instead. This is
    // also why the site ships with no cookie consent banner.
    cookieless_mode: "always",
    // We never call posthog.identify(), so this guarantees no person
    // profile is ever created for a visitor.
    person_profiles: "identified_only",
    disable_session_recording: true,
    autocapture: false,
    // We capture pageviews ourselves in PageviewTracker (below), once per
    // App Router navigation, instead of relying on posthog-js's own
    // full-page-load detection.
    capture_pageview: false,
    capture_pageleave: true,
    // Traffic on a personal portfolio is low enough that batching buys
    // nothing, and posthog-js's default queue only flushes on a size
    // threshold or tab close — on a low-traffic site that meant events
    // could sit unsent for an entire visit. Sending each capture
    // immediately trades a little request overhead for events that are
    // never silently stuck in an unflushed queue.
    request_batching: false,
  });
  markAnalyticsEnabled();
  registerGeoCountry();
}

// Attaches a coarse country property to every subsequent event via
// posthog.register(), which keeps it in memory for this page session only
// (no cookie, no localStorage) — so it's naturally gone on the next visit
// and never persisted client-side. Fetched once per page load, same as
// init above. /api/geo reads the country server-side from Vercel's geo
// header; no IP address ever reaches the client or PostHog.
function registerGeoCountry() {
  fetch("/api/geo")
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { country: string | null } | null) => {
      if (data) posthog.register({ country: data.country });
    })
    .catch(() => {
      // Best-effort: events still capture fine without a country property.
    });
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let url = `${window.location.origin}${pathname}`;
    const search = searchParams.toString();
    if (search) url += `?${search}`;
    capturePageview(url);
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  initPostHogIfNeeded();

  return (
    <>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
