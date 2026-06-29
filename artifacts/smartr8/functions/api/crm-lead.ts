// @ts-nocheck
// POST /api/crm-lead
//
// Product-funnel lead intake for DSCR, cash-out, rate-and-term, purchase, VA,
// and any future direct CRM form. This endpoint now routes through the shared
// lead orchestrator so every accepted lead is stored in D1 before being
// forwarded to the configured GHL / LeadConnector webhook.

import { log } from "../_lib/log";
import { normalizeEmail, normalizeName, normalizePhoneE164US } from "../_lib/normalize";
import { processLead } from "../_lib/orchestrate";
import { verifyTurnstile } from "../_lib/turnstile";
import type { Env, Lead, TcpaConsent } from "../_lib/types";

const VALID_LOAN_TYPES = new Set(["HELOC", "DSCR", "CASHOUT_REFI", "RT_REFI", "PURCHASE", "VA"]);

const ALLOWED_ORIGINS = new Set(["https://smartr8.com", "https://www.smartr8.com"]);
function isAllowedOrigin(o) {
  return ALLOWED_ORIGINS.has(o) || /^https:\/\/[^.]+\.pages\.dev$/.test(o);
}
function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin : "https://smartr8.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
function jsonResponse(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

function str(v) {
  return typeof v === "string" ? v.trim() : "";
}

function funnelFromLoanType(loanType: string): Lead["funnel"] {
  if (loanType === "HELOC") return "heloc";
  if (loanType === "DSCR") return "see-my-options";
  if (loanType === "CASHOUT_REFI") return "cash-out";
  if (loanType === "RT_REFI") return "rate-reduction";
  if (loanType === "PURCHASE") return "purchase";
  return "other";
}

function loanRequestFromLoanType(loanType: string): string {
  if (loanType === "HELOC") return "HELOC";
  if (loanType === "DSCR") return "DSCR";
  if (loanType === "CASHOUT_REFI") return "Cash-Out Refinance";
  if (loanType === "RT_REFI") return "Rate and Term Refinance";
  if (loanType === "PURCHASE") return "Purchase";
  if (loanType === "VA") return "VA";
  return loanType;
}

export async function onRequest(context) {
  const { request, env, waitUntil } = context;
  const origin = request.headers.get("Origin") ?? "";
  const cors = corsHeaders(origin);

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400, cors);
  }

  if (body.honeypot && String(body.honeypot).trim().length > 0) {
    log("info", "crm_lead.honeypot_drop", {});
    return jsonResponse({ success: true }, 200, cors);
  }
  if (body.pageLoadTime && body.pageLoadTime > 0) {
    const elapsed = Date.now() - body.pageLoadTime;
    if (elapsed < 8_000) {
      log("info", "crm_lead.too_fast_drop", { elapsed });
      return jsonResponse({ success: true }, 200, cors);
    }
  }

  const firstName = normalizeName(str(body.firstName) || str(body.first_name));
  const lastName = normalizeName(str(body.lastName) || str(body.last_name));
  const email = normalizeEmail(str(body.email));
  const rawPhone = str(body.phone);
  const phone = rawPhone ? normalizePhoneE164US(rawPhone) : "";
  const loanType = str(body.loanType).toUpperCase();
  const smsConsent = body.consent === true || body.consent === "true";

  const homeValue = str(body.home_value) || str(body.homeValue);
  const mortgageBalance = str(body.mortgage_balance) || str(body.mortgageBalance);
  const credit = str(body.credit) || str(body.creditScore);
  const dob = str(body.dob);
  const loanPurpose = str(body.loanPurpose) || str(body.loan_goal) || str(body.purpose);
  const criteriaNotes = [
    homeValue ? `Home Value: ${homeValue}` : "",
    mortgageBalance ? `Mortgage Balance: ${mortgageBalance}` : "",
    credit ? `Credit Score: ${credit}` : "",
    loanPurpose ? `Loan Purpose: ${loanPurpose}` : "",
    dob ? `DOB: ${dob}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!email && !phone) {
    return jsonResponse({ success: false, error: "Enter an email or phone number." }, 400, cors);
  }
  if (rawPhone && !phone) {
    return jsonResponse({ success: false, error: "Phone must be a valid US number." }, 400, cors);
  }
  if (!VALID_LOAN_TYPES.has(loanType)) {
    return jsonResponse({ success: false, error: "Unknown loan type." }, 400, cors);
  }
  if (smsConsent && !phone) {
    return jsonResponse({ success: false, error: "A phone number is required to opt into texts." }, 400, cors);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For") ?? "unknown";
  const userAgent = request.headers.get("User-Agent") ?? "";

  if (body.turnstile_token) {
    const ts = await verifyTurnstile((env as Env).TURNSTILE_SECRET_KEY, String(body.turnstile_token), ip);
    if (!ts.ok) return jsonResponse({ success: false, error: `turnstile: ${ts.error}` }, 403, cors);
  }

  const quoteFields: Record<string, string> = { loanType };
  if (homeValue) quoteFields.home_value = homeValue;
  if (mortgageBalance) quoteFields.mortgage_balance = mortgageBalance;
  if (credit) quoteFields.credit = credit;
  if (loanPurpose) quoteFields.loan_goal = loanPurpose;
  if (dob) quoteFields.dob = dob;

  const lead: Lead = {
    lead_id: crypto.randomUUID(),
    created_at: Date.now(),
    funnel: funnelFromLoanType(loanType),
    first_name: firstName,
    last_name: lastName,
    email,
    phone_e164: phone,
    loan_request: loanRequestFromLoanType(loanType),
    notes: criteriaNotes,
    quote_fields: quoteFields,
    source: str(body.source) || "smartr8.com",
    landing_page: str(body.page_url),
    utm_source: str(body.utm_source),
    utm_medium: str(body.utm_medium),
    utm_campaign: str(body.utm_campaign),
    utm_content: str(body.utm_content),
    utm_term: str(body.utm_term),
    ip,
    user_agent: userAgent,
  };

  const consent: TcpaConsent | null = smsConsent && str(body.consent_text) && str(body.consent_version)
    ? {
        consent_id: crypto.randomUUID(),
        lead_id: lead.lead_id,
        consent_version: str(body.consent_version),
        consent_text: str(body.consent_text),
        ip,
        user_agent: userAgent,
        page_url: str(body.page_url),
        created_at: lead.created_at,
      }
    : null;

  const result = await processLead(lead, consent, env as Env, { waitUntil }, ip);
  return jsonResponse({ success: true, lead_id: result.lead_id, duplicate: result.duplicate === true }, 200, cors);
}
