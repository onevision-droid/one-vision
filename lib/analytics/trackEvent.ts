export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  // Check if window is defined (browser environment)
  if (typeof window !== "undefined") {
    // We would integrate actual analytics here (e.g. PostHog, Google Analytics)
    // For now, just log in dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event]: ${eventName}`, properties);
    }
  }
}
