"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/src/lib/analytics";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// SSR has no matchMedia; assume no preference until the client subscribes.
function getServerSnapshot() {
  return false;
}

/**
 * Respects prefers-reduced-motion: when set, the video never autoplays and
 * exposes native controls instead. Uses useSyncExternalStore rather than
 * effect + setState so the reduced-motion read stays hydration-safe.
 */
export function FeatureVideo({
  src,
  poster,
  ariaLabel,
}: {
  src: string;
  poster?: string;
  ariaLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const pathname = usePathname();
  const hasFiredPlay = useRef(false);
  const hasFiredComplete = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked by the browser; controls remain available.
      });
    }
  }, [reducedMotion]);

  function handlePlay() {
    if (hasFiredPlay.current) return;
    hasFiredPlay.current = true;
    track("video_play", { page: pathname });
  }

  // `loop` means the native "ended" event never fires (the browser seeks
  // back to 0 and keeps playing instead of ending) — near-end timeupdate
  // is the standard stand-in for detecting a full watch-through. Fires
  // once per page visit, on whichever loop iteration first reaches it.
  function handleTimeUpdate(event: React.SyntheticEvent<HTMLVideoElement>) {
    if (hasFiredComplete.current) return;
    const video = event.currentTarget;
    if (video.duration && video.currentTime >= video.duration - 0.25) {
      hasFiredComplete.current = true;
      track("video_complete", { page: pathname });
    }
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reducedMotion}
      controls={reducedMotion}
      aria-label={ariaLabel}
      onPlay={handlePlay}
      onTimeUpdate={handleTimeUpdate}
      className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full border border-hairline-dark"
    />
  );
}
