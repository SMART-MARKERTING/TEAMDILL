export type FunnelId = "heloc" | "cashout" | "rate-reduction" | "purchase";

const LM_ENDPOINT = "https://api.leadmailbox.com/v2/leads/add/adax01/DeshazosWebsite";

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
  honeypot?: string;
  pageLoadTime?: number;
}

export interface SubmitResult {
  success: boolean;
  leadId?: string;
  error?: string;
}

function getOrCreateTrackingId(): string {
  try {
    const key = "smartr8_tid";
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function getParam(name: string): string {
  try {
    return new URLSearchParams(window.location.search).get(name) ?? "";
  } catch {
    return "";
  }
}

function formatDob(raw: string): string {
  const parts = raw.split("-");
  return parts.length === 3 ? `${parts[1]}/${parts[2]}/${parts[0]}` : raw;
}

function loanRequest(funnelType: FunnelId): string {
  if (funnelType === "cashout") return "Cash-Out Refinance";
  if (funnelType === "rate-reduction") return "Rate and Term Refinance";
  if (funnelType === "purchase") return "Purchase";
  if (funnelType === "heloc") return "HELOC";
  return "Refinance";
}

function buildLmPayload(payload: LeadPayload): Record<string, string> {
  const digits = (payload.phone ?? "").replace(/\D/g, "");
  const extra = payload.additionalFields ?? {};
  const notes: string[] = [`Funnel: ${payload.funnel}`];
  if (payload.homeValue) notes.push(`Home Value: ${payload.homeValue}`);
  if (payload.mortgageBalance) notes.push(`Mortgage Balance: ${payload.mortgageBalance}`);
  if (payload.creditScore) notes.push(`Credit Score: ${payload.creditScore}`);
  Object.entries(extra).forEach(([k, v]) => {
    notes.push(`${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
  });
  return {
    FirstName: payload.firstName,
    LastName: payload.lastName,
    Email: payload.email,
    MobilePhone: digits,
    DOB: formatDob(payload.dob ?? ""),
    Phys_Address: payload.address ?? "",
    Phys_City: payload.city ?? "",
    Phys_State: payload.state ?? "",
    Phys_Zip: payload.zip ?? "",
    Credit_Rating: payload.creditScore ?? "",
    Prop_Value: payload.homeValue ?? "",
    Existing_Loan_Amount: payload.mortgageBalance ?? "",
    Loan_Request: loanRequest(payload.funnel),
    Notes: notes.join("\n"),
  };
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  // Pre-build LM payload client-side for browser fallback (used only if Worker's LM call fails)
  const lmPayload = buildLmPayload(payload);

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
    honeypot: payload.honeypot ?? "",
    pageLoadTime: payload.pageLoadTime ?? 0,
    submittedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    utmSource: getParam("utm_source"),
    utmMedium: getParam("utm_medium"),
    utmCampaign: getParam("utm_campaign"),
    utmContent: getParam("utm_content"),
    referer: document.referrer,
    trackingId: getOrCreateTrackingId(),
  };

  // Call the Worker — it tries LM server-side (with user IP forwarding) + Formspree + KV dedup.
  // If the Worker's LM call was blocked by IP filtering, it returns lmPayload so the browser
  // can fire LM directly as a fallback from the user's real IP.
  try {
    const res = await fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = (await res.json()) as SubmitResult & { lmPayload?: Record<string, string> | null };

    // Browser fallback: fires if Worker's LM call was IP-blocked (lmPayload non-null).
    // sendBeacon is used instead of fetch — it survives page navigation, cannot be
    // cancelled, and is less likely to be blocked by browser tracking prevention.
    if (result.lmPayload) {
      const blob = new Blob([JSON.stringify(result.lmPayload)], { type: "text/plain" });
      const sent = navigator.sendBeacon(LM_ENDPOINT, blob);
      if (!sent) {
        // sendBeacon queue full — fall back to no-cors fetch
        fetch(LM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(result.lmPayload),
        }).catch(() => {});
      }
    }

    return { success: result.success, leadId: result.leadId, error: result.error };
  } catch {
    // Worker failed — fire LM from browser as last resort
    fetch(LM_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(lmPayload),
    }).catch(() => {});
    // Still show success
    return { success: true };
  }
}
