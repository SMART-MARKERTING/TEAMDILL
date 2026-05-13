const API_BASE =
  (process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://smartr8.com").replace(/\/$/, "");

const SUBMIT_ENDPOINT = `${API_BASE}/api/submit-lead`;

export type FunnelId = "heloc" | "cashout" | "rate-reduction" | "purchase";

export interface LeadPayload {
  funnel: FunnelId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  homeValue?: string;
  mortgageBalance?: string;
  creditScore?: string;
  dob?: string;
  additionalFields?: Record<string, string | string[]>;
}

export interface SubmitResult {
  success: boolean;
  fallback?: boolean;
  leadId?: string;
  error?: string;
}

function getOrCreateTrackingId(): string {
  return crypto.randomUUID();
}

function formatDob(raw: string): string {
  const parts = raw.split("-");
  return parts.length === 3 ? `${parts[1]}/${parts[2]}/${parts[0]}` : raw;
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const body = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    address: payload.address ?? "",
    city: payload.city ?? "",
    state: payload.state ?? "",
    zip: payload.zip ?? "",
    homeValue: payload.homeValue ?? "",
    mortgageBalance: payload.mortgageBalance ?? "",
    creditScore: payload.creditScore ?? "",
    dob: formatDob(payload.dob ?? ""),
    funnelType: payload.funnel,
    additionalFields: payload.additionalFields ?? {},
    source: "smartr8-mobile-app",
    submittedAt: new Date().toISOString(),
    trackingId: getOrCreateTrackingId(),
  };

  const response = await fetch(SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Submit failed with status ${response.status}`);
  }

  return response.json() as Promise<SubmitResult>;
}
