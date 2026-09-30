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
    api_host: "https://eu.i.posthog.com",
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
