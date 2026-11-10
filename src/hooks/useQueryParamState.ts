"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/**
 * Keeps a small piece of UI state (a tab, a filter) in the URL query string so
 * it can be linked to and survives reload. Renders `fallback` on the server and
 * for unknown values; the fallback value is kept out of the URL.
 */
export function useQueryParamState<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T
): [T, (next: T) => void] {
  const raw = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(key),
    () => null
  );
  const value = raw !== null && (allowed as readonly string[]).includes(raw) ? (raw as T) : fallback;

  const setValue = useCallback(
    (next: T) => {
      const url = new URL(window.location.href);
      if (next === fallback) url.searchParams.delete(key);
      else url.searchParams.set(key, next);
      window.history.replaceState(null, "", url);
      listeners.forEach((notify) => notify());
    },
    [key, fallback]
  );

  return [value, setValue];
}
