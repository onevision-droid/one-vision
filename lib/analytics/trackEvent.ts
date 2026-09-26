export type AnalyticsEvent =
  | "donate_start"
  | "donate_complete"
  | "volunteer_start"
  | "volunteer_complete"
  | "help_request_start"
  | "help_request_complete"
  | "campaign_action"
  | "report_download"
  | "story_open"
  | "search"
  | "contact_submit"
  | "newsletter_subscribe";

export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, unknown>
) {
  // Check if window is defined (browser environment)
  if (typeof window !== "undefined") {
    // We would integrate actual analytics here (e.g. Plausible, PostHog, Vercel Analytics)
    // For now, log in dev mode without PII
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event]: ${eventName}`, properties);
    }
  }
}

