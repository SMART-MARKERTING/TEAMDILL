// Automated funnel quote.
//
// When a client completes the HELOC v3 funnel (which captures an *exact*
// home value and mortgage balance), we turn their numbers into a two-option
// quote — a HELOC at 90% LTV and a cash-out refinance at 80% LTV — and email
// it to them via the existing `POST /api/quote/send` Cloudflare Function
// (the same endpoint the broker Quick-Quote tool at quote.smartr8.com uses).
//
// This module is split into pure, unit-tested calc/builder functions and a
// thin fire-and-forget `sendAutoQuote()` wrapper. Lead capture never depends
// on the quote succeeding — if Resend is down or the math yields no equity,
// the lead is still captured and Mykoal follows up by hand.

import { getRateEstimate } from "@/lib/rateEstimate";

// Max combined LTV per product. HELOC tops out higher than an agency cash-out
// refinance, matching how Mykoal quotes these by hand.
export const HELOC_LTV = 0.9;
export const CASHOUT_LTV = 0.8;

// Don't auto-send a quote for a sliver of equity — below this the email reads
// as discouraging rather than helpful, and the lead is better served by a
// human conversation. Tunable.
export const MIN_HELOC_AVAILABLE = 10_000;

// Mykoal's advisor block, rendered into the email signature + reply-to.
const ADVISOR = {
  name: "Mykoal DeShazo",
  title: "Senior Loan Officer",
  company: "Adaxa Home",
  nmls: "1912347",
  phone: "(480) 206-9290",
  email: "mykoal@adaxahome.com",
  web: "smartr8.com",
} as const;

const DISCLAIMER =
  "This is a preliminary estimate based on the information you provided — not an offer, approval, " +
  "or commitment to lend. Figures assume an estimated 90% loan-to-value for the HELOC and 80% for " +
  "the cash-out refinance, use your self-reported home value (no appraisal), and a soft-estimate " +
  "rate for your stated credit range. Your actual available funds, rate, APR, and payment depend on " +
  "a full application, credit review, appraisal, and underwriting, and may differ. All loans are " +
  "subject to credit approval and property eligibility. Adaxa Home, LLC NMLS #2380533; " +
  "Mykoal DeShazo NMLS #1912347. Equal Housing Opportunity.";

// v3 funnel credit-bucket id → rate-table band key. The bands span the bucket
// labels (e.g. "good" = 680–739), so we pick the band the bucket's midpoint
// lands in — a defensible "as low as" estimate. "unsure" has no priceable
// band and falls back to "—" rate/payment in the email.
const CREDIT_RATE_KEY: Record<string, string | null> = {
  excellent: "740 – 779",
  good: "700 – 739",
  fair: "620 – 659",
  building: "580 – 619",
  unsure: null,
};

const usd = (n: number): string => "$" + Math.round(n).toLocaleString("en-US");
const roundK = (n: number): number => Math.round(n / 1000) * 1000;

/** Standard fully-amortizing monthly payment (e.g. 30-yr cash-out refi). */
export function monthlyAmortizing(principal: number, annualRatePct: number, months = 360): number {
  if (principal <= 0) return 0;
  const mr = annualRatePct / 100 / 12;
  if (mr === 0) return principal / months;
  return (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
}

/** Interest-only monthly payment on a drawn HELOC balance. */
export function monthlyInterestOnly(balance: number, annualRatePct: number): number {
  if (balance <= 0) return 0;
  return (balance * annualRatePct) / 100 / 12;
}

export interface QuoteNumbers {
  homeValue: number;
  balance: number;
  /** HELOC line available at 90% LTV, less the first-mortgage balance. */
  helocAvailable: number;
  /** Cash-out refi: new first-lien loan at 80% LTV. */
  cashOutNewLoan: number;
  cashOutPayoff: number;
  /** Cash pulled out (new loan − payoff), clamped at 0. */
  cashOutAmount: number;
}

/** Pure equity math. Amounts are rounded to the nearest $1,000 for display. */
export function computeQuoteNumbers(homeValueRaw: string | number, balanceRaw: string | number): QuoteNumbers {
  const homeValue = Number(homeValueRaw) || 0;
  const balance = Number(balanceRaw) || 0;
  const helocAvailable = roundK(Math.max(0, homeValue * HELOC_LTV - balance));
  const cashOutNewLoan = roundK(homeValue * CASHOUT_LTV);
  const cashOutPayoff = roundK(balance);
  const cashOutAmount = roundK(Math.max(0, homeValue * CASHOUT_LTV - balance));
  return { homeValue, balance, helocAvailable, cashOutNewLoan, cashOutPayoff, cashOutAmount };
}

export interface QuoteInput {
  firstName: string;
  lastName: string;
  email: string;
  homeValue: string | number;
  balance: string | number;
  /** v3 credit-bucket id: excellent | good | fair | building | unsure. */
  creditId: string;
}

/** The body POSTed to /api/quote/send. Mirrors the broker tool's contract. */
export interface QuotePayload {
  clientName: string;
  clientEmail: string;
  bcc?: string;
  source: string;
  options: {
    date: string;
    loanType: string;
    a: { termLabel: string; loanAmount: string; payoff: string; cashOut: string; rate: string; apr: string; payment: string };
    b: { termLabel: string; lineAmount: string; draw: string; rate: string; apr: string; payment: string };
  };
  advisor: typeof ADVISOR;
  disclaimer: string;
}

/**
 * Build the /api/quote/send payload from funnel data, or return null when
 * there isn't enough HELOC equity to be worth auto-sending. Pure + testable.
 */
export function buildQuotePayload(input: QuoteInput): QuotePayload | null {
  const n = computeQuoteNumbers(input.homeValue, input.balance);
  if (n.helocAvailable < MIN_HELOC_AVAILABLE) return null;

  const rateKey = CREDIT_RATE_KEY[input.creditId] ?? null;
  const helocRange = rateKey ? getRateEstimate(rateKey, "heloc") : null;
  const cashoutRange = rateKey ? getRateEstimate(rateKey, "cashout") : null;

  // Headline the low end of the band ("as low as"); the disclaimer makes the
  // estimate nature explicit. APR is intentionally left blank — we don't have
  // enough to quote a precise APR, and the email omits the APR line when empty.
  const helocRatePct = helocRange ? Number(helocRange.low) : null;
  const cashoutRatePct = cashoutRange ? Number(cashoutRange.low) : null;

  const helocRate = helocRatePct != null ? `${helocRatePct.toFixed(2)}%` : "—";
  const cashoutRate = cashoutRatePct != null ? `${cashoutRatePct.toFixed(2)}%` : "—";

  const helocPayment =
    helocRatePct != null ? `${usd(monthlyInterestOnly(n.helocAvailable, helocRatePct))}/mo` : "—";
  const cashoutPayment =
    cashoutRatePct != null ? `${usd(monthlyAmortizing(n.cashOutNewLoan, cashoutRatePct))}/mo` : "—";

  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const clientName = [input.firstName, input.lastName].filter(Boolean).join(" ").trim();

  return {
    clientName,
    clientEmail: input.email,
    bcc: ADVISOR.email,
    source: "funnel-auto",
    options: {
      date,
      loanType: "Estimate",
      a: {
        termLabel: "30-yr fixed",
        loanAmount: usd(n.cashOutNewLoan),
        payoff: usd(n.cashOutPayoff),
        cashOut: usd(n.cashOutAmount),
        rate: cashoutRate,
        apr: "",
        payment: cashoutPayment,
      },
      b: {
        termLabel: "Variable rate",
        lineAmount: usd(n.helocAvailable),
        draw: usd(n.helocAvailable),
        rate: helocRate,
        apr: "",
        payment: helocPayment,
      },
    },
    advisor: ADVISOR,
    disclaimer: DISCLAIMER,
  };
}

/**
 * Fire-and-forget: build + POST the auto-quote. Never throws; resolves to
 * whether the email was dispatched. Same-origin call (funnel + endpoint both
 * on smartr8.com), so no CORS round-trip.
 */
export async function sendAutoQuote(input: QuoteInput): Promise<boolean> {
  try {
    const payload = buildQuotePayload(input);
    if (!payload) return false;
    const res = await fetch("/api/quote/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; emailOk?: boolean };
    return !!(json.success && json.emailOk);
  } catch {
    return false;
  }
}
