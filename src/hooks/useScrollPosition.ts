"use client";

import { useSyncExternalStore, useCallback, useRef } from "react";

/**
 * Hook que detecta si el usuario ha scrolleado más de un umbral desde el top.
 * Usa useSyncExternalStore (React 19 compatible) con listener de scroll real.
 *
 * @param threshold - píxeles desde el top para considerar "scrolled" (default 500)
 * @returns `true` cuando scrollY >= threshold, `false` si no.
 */

const SCROLL_LISTENERS = new Set<() => void>();

function subscribe(listener: () => void) {
  SCROLL_LISTENERS.add(listener);
  window.addEventListener("scroll", listener, { passive: true });
  return () => {
    SCROLL_LISTENERS.delete(listener);
    window.removeEventListener("scroll", listener);
  };
}

function getSnapshot(threshold: number) {
  return typeof window !== "undefined" ? window.scrollY >= threshold : false;
}

const getServerSnapshot = () => false;

export function useScrollPosition(threshold = 500) {
  // Memoize snapshot function per threshold to keep referential stability
  const snapshotFn = useCallback(() => getSnapshot(threshold), [threshold]);
  // Store threshold for the subscribe wrapper
  const thresholdRef = useRef(threshold);
  thresholdRef.current = threshold;

  return useSyncExternalStore(subscribe, snapshotFn, getServerSnapshot);
}
