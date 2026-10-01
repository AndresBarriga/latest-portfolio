import posthog from "posthog-js";

/**
 * Central event catalog: every PostHog event name and its property shape
 * lives here so call sites never hand-write an event name or guess at a
 * property key. Add new events to this map, not inline at the call site.
 */
type AnalyticsEvents = {
  work_row_click: { case: string; position: number };
  scroll_depth: { page: string; depth: 25 | 50 | 75 | 100 };
  decision_record_open: { case: string; field: string };
  video_play: { page: string };
  video_complete: { page: string };
  cv_download: { source_page: string };
  booking_click: { source_page: string };
  contact_click: {
    channel: "email" | "linkedin" | "github";
    source_page: string;
  };
  outbound_click: { destination: string };
};

export type AnalyticsEventName = keyof AnalyticsEvents;
export type AnalyticsEventProperties<E extends AnalyticsEventName> =
  AnalyticsEvents[E];

export const NO_TRACK_STORAGE_KEY = "analytics-off";

// Flips true only after posthog.init() actually runs (production, no
// no-track flag, key present). Every track/capture call below checks this
// first, so components never need to know *why* analytics might be off.
let enabled = false;

export function markAnalyticsEnabled() {
  enabled = true;
}

export function isAnalyticsEnabled() {
  return enabled;
}

export function isNoTrackFlagSet(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(NO_TRACK_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/** Opts an already-initialized session out immediately (used by /no-track
 * when analytics happened to init before the flag was set in this tab). */
export function disableAnalyticsNow() {
  if (!enabled) return;
  posthog.opt_out_capturing();
  enabled = false;
}

const ENTRY_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

// posthog-js already attaches utm_* to every event (not just $pageview) by
// recomputing them from the current URL each time — but only while that URL
// still carries the query string. Once an App Router client-side navigation
// moves to a page without ?utm_..., later events (e.g. cv_download,
// contact_click fired from /about or /cv) lose it. posthog.register() keeps
// these as in-memory super properties for the rest of the tab's events,
// same pattern as registerGeoCountry's `country` property below — under
// cookieless_mode this is memory-only already (no cookie, no localStorage),
// so it's naturally gone on the next visit and never persisted client-side.
// Called once per full page load (from the same init gate as posthog.init),
// so it captures first-touch UTMs for the whole visit, not just the
// landing page.
export function registerEntryUtmParams() {
  if (!enabled) return;
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ENTRY_UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  if (Object.keys(utm).length > 0) posthog.register(utm);
}

export function track<E extends AnalyticsEventName>(
  event: E,
  properties: AnalyticsEventProperties<E>,
  options?: Parameters<typeof posthog.capture>[2]
) {
  if (!enabled) return;
  posthog.capture(event, properties, options);
}

export function capturePageview(url: string) {
  if (!enabled) return;
  posthog.capture("$pageview", { $current_url: url });
}

// posthog-js's own automatic $pageleave only fires on a real document
// unload (tab close, external link, hard reload) — it has no way to know
// about a client-side route change, since we capture pageviews ourselves
// (capture_pageview: false). Without this, scroll depth is only ever
// measurable for whichever page happens to be open when the tab closes.
// Called on every SPA navigation for the page being left; the very last
// page of a visit still gets its $pageleave from posthog-js's native
// unload handling, so this isn't called on unmount.
//
// We don't pass $prev_pageview_duration (or $prev_pageview_pathname) here:
// posthog-js's internal PageViewManager recomputes both on every event
// literally named "$pageleave" and always overwrites whatever we send for
// those two keys, using its own last-seen-$pageview timestamp rather than
// ours. That internal timer can be read more than once before it resets
// (e.g. a tab backgrounded then closed can fire posthog-js's native
// pageleave twice off the same stale timestamp), so $prev_pageview_duration
// is not reliable for either bot or human sessions — don't build anything
// on it. $prev_pageview_max_scroll_percentage doesn't have this problem
// (it's a running max, not a point-in-time clock read), which is why we
// still rely on it elsewhere.
export function capturePageleave(pathname: string) {
  if (!enabled) return;
  posthog.capture("$pageleave", { $pathname: pathname });
}
