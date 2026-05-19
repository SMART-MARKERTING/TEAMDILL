// HELOC funnel A/B split test.
//
// Variant A (control): the full /heloc funnel.
// Variant B (test): the 1-step /heloc/quick fast-path lead capture.
//
// The bucket is assigned once per browser session and persisted in
// sessionStorage, so a visitor stays in the same arm for their whole session.
// sessionStorage (not localStorage) per project rules.

const HELOC_AB_KEY = "smartr8_heloc_ab_v1";

export type HelocVariant = "A" | "B";

/**
 * Returns this session's HELOC split-test bucket, assigning one (50/50) on the
 * first call. Safe to call repeatedly; the result is stable for the session.
 * Falls back to the control arm ("A") if sessionStorage is unavailable.
 */
export function getHelocBucket(): HelocVariant {
  try {
    const stored = sessionStorage.getItem(HELOC_AB_KEY);
    if (stored === "A" || stored === "B") return stored;
    const assigned: HelocVariant = Math.random() < 0.5 ? "A" : "B";
    sessionStorage.setItem(HELOC_AB_KEY, assigned);
    return assigned;
  } catch {
    return "A";
  }
}
