"use client";

import { Suspense, useEffect, useRef, type ReactNode } from "react";
import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import {
  capturePageleave,
  capturePageview,
  isNoTrackFlagSet,
  markAnalyticsEnabled,
  registerEntryUtmParams,
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
  // Opting out after init doesn't actually stop posthog-js's own
  // autocaptures here: with cookieless_mode "always", its internal
  // is_capturing() check returns true unconditionally, ignoring
  // opt_out_capturing() entirely. So /no-track must never call
  // posthog.init() in the first place, rather than init-then-opt-out.
  if (window.location.pathname === "/no-track") return;
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
    // Deliberately off: the per-element clickmap needs autocapture, but we
    // don't want every click captured — the position-based heatmap below
    // and our own named events already cover the clicks that matter.
    autocapture: false,
    // Heatmaps, dead-click detection and web vitals/performance capture
    // are all off: our own named events plus scroll_depth already cover
    // the engagement signals that matter here, and each of these loads
    // its own extra script and fires its own background event traffic for
    // very little incremental insight on a low-traffic portfolio site.
    // (`capture_heatmaps` is the current option name — `enable_heatmaps`
    // still works but is deprecated.)
    capture_heatmaps: false,
    capture_dead_clicks: false,
    capture_performance: false,
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
  registerEntryUtmParams();
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
  const prevPageRef = useRef<{ pathname: string; enteredAt: number } | null>(
    null
  );

  useEffect(() => {
    let url = `${window.location.origin}${pathname}`;
    const search = searchParams.toString();
    if (search) url += `?${search}`;

    const now = Date.now();
    const prev = prevPageRef.current;
    if (prev && prev.pathname !== pathname) {
      capturePageleave(prev.pathname, (now - prev.enteredAt) / 1000);
    }
    prevPageRef.current = { pathname, enteredAt: now };

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
