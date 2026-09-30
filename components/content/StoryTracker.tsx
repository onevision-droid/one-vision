"use client";

import { useEffect } from"react";
import { trackEvent } from"@/lib/analytics/trackEvent";

interface StoryTrackerProps {
  slug: string;
  title: string;
}

export function StoryTracker({ slug, title }: StoryTrackerProps) {
  useEffect(() => {
    trackEvent("story_open", { slug, title });
  }, [slug, title]);

  return null;
}
