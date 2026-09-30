"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/src/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

/** Mount on /work/[slug] and /lab pages only. Fires each depth threshold
 * at most once per page visit. */
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    firedRef.current = new Set();

    function handleScroll() {
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const full = document.documentElement.scrollHeight;
      if (full <= viewport) return;

      const scrolledPercent = ((scrollTop + viewport) / full) * 100;

      for (const threshold of THRESHOLDS) {
        if (scrolledPercent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          track("scroll_depth", { page: pathname, depth: threshold });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
