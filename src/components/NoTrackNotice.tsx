"use client";

import { useEffect } from "react";
import { NO_TRACK_STORAGE_KEY, disableAnalyticsNow } from "@/src/lib/analytics";

export function NoTrackNotice() {
  // Setting localStorage and opting an already-running session out are
  // synchronous, one-off side effects with nothing for React to render
  // differently on completion — so this stays a plain effect with no
  // state, rather than an effect that sets state to reflect "done".
  useEffect(() => {
    try {
      window.localStorage.setItem(NO_TRACK_STORAGE_KEY, "true");
    } catch {
      // Storage unavailable (private mode, blocked site data) — nothing to
      // persist, but analytics was already off if it's blocked this hard.
    }
    // Covers the case where analytics already initialized earlier in this
    // tab, before this flag was set — without this, opting out would only
    // take effect on the next page load.
    disableAnalyticsNow();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center px-6 py-16 sm:px-12">
      <h1 className="m-0 mb-3 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
        Analytics off on this browser
      </h1>
      <p className="max-w-[52ch] text-[15px] leading-[1.6] text-body-muted">
        This flag lives in this browser&apos;s local storage, so it only
        applies here. Clearing site data, switching browsers, or using
        another device will re-enable analytics on this site.
      </p>
    </div>
  );
}
