"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/trackEvent";

interface SearchTrackerProps {
  query: string;
  count: number;
}

export function SearchTracker({ query, count }: SearchTrackerProps) {
  useEffect(() => {
    if (query) {
      trackEvent("search", { query, count });
    }
  }, [query, count]);

  return null;
}
