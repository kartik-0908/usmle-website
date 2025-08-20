// landing/src/useReferral.ts
import { useEffect, useMemo } from "react";

export function useReferralParams() {
  const url = useMemo(() => new URL(window.location.href), []);
  const ref = url.searchParams.get("ref");
  const utm = ["source","medium","campaign","term","content"]
    .map(k => [`utm_${k}`, url.searchParams.get(`utm_${k}`)])
    .filter(([,v]) => v);

  // Build a query string you can tack onto CTA links
  const params = new URLSearchParams();
  if (ref) params.set("ref", ref);
  utm.forEach(([k, v]) => params.set(k, v!));
  return params.toString(); // e.g. "ref=alice&utm_source=alice"
}
