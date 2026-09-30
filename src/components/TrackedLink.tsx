"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import {
  track,
  type AnalyticsEventName,
  type AnalyticsEventProperties,
} from "@/src/lib/analytics";

/**
 * A next/link Link that fires one analytics event on click, then behaves
 * like any other link — used for internal rows (work_row_click) and
 * external anchors alike (contact, CV, repo links), since Link forwards
 * anchor props like `download` and renders a plain <a> for external URLs
 * anyway. Exists because the pages that need this (about, cv, work,
 * lab/[slug]) are Server Components, and a function prop like `onClick`
 * can't cross the server/client boundary — only serializable props like
 * `event`/`properties` can. The click handler lives in here, inside the
 * client bundle, calling the shared `track()` helper directly.
 */
export function TrackedLink<E extends AnalyticsEventName>({
  event,
  properties,
  onClick,
  ...linkProps
}: ComponentProps<typeof Link> & {
  event: E;
  properties: AnalyticsEventProperties<E>;
}) {
  return (
    <Link
      {...linkProps}
      onClick={(e) => {
        track(event, properties);
        onClick?.(e);
      }}
    />
  );
}
