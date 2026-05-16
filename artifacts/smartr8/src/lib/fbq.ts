declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type StandardEvent =
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "SubmitApplication"
  | "Schedule";

export function trackFbEvent(
  event: StandardEvent,
  params?: Record<string, unknown>,
): void {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", event, params ?? {});
    }
  } catch {
    // Never let analytics break user flow
  }
}
