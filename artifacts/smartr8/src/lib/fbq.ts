declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type StandardEvent =
  | "Lead"
  | "CompleteRegistration"
  | "ViewContent"
  | "Contact"
  | "SubmitApplication"
  | "Schedule";

/**
 * Generate a unique event ID for Meta Pixel deduplication.
 *
 * When both the browser pixel and Stape's Conversions API Gateway fire
 * the same event, Meta needs a shared `eventID` to match them and count
 * only once. Without it, every event is double-counted.
 *
 * Uses `crypto.randomUUID()` where available (all modern browsers),
 * with a timestamp+random fallback for legacy environments.
 */
export function generateEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

export function trackFbEvent(
  event: StandardEvent,
  params?: Record<string, unknown>,
): void {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      const eventID = generateEventId();
      window.fbq("track", event, params ?? {}, { eventID });
    }
  } catch {
    // Never let analytics break user flow
  }
}
