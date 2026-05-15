import React from "react";
import { WorksheetInputs, ScenarioResults, money, pct, yrs } from "@/lib/worksheetCalc";

interface WorksheetDocumentProps {
  id?: string;
  inputs: WorksheetInputs;
  results: ScenarioResults;
}

const NAVY = "#1F2A44";
const GOLD = "#C9A74D";
const LIGHT = "#F4F1EA";
const GREEN = "#2E7D4F";
const GRAY = "#6B7280";
const BORDER = "#E5E5E5";
const ROW_ALT = "#FAFAFA";

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 12,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const thStyle: React.CSSProperties = {
  background: NAVY,
  color: "#fff",
  padding: "7px 10px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: 11,
};

const thNumStyle: React.CSSProperties = { ...thStyle, textAlign: "right" };

const tdStyle: React.CSSProperties = {
  padding: "6px 10px",
  borderBottom: `1px solid ${BORDER}`,
  color: "#333",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: 12,
};

const tdNumStyle: React.CSSProperties = { ...tdStyle, textAlign: "right" };

function rateAprStr(rate: number, apr: number, optional = false): string {
  if (apr > 0) return `${pct(rate)} Rate / ${pct(apr)} APR`;
  if (optional) return `${pct(rate)} Rate (APR not disclosed)`;
  return pct(rate);
}

const EhoSvg = ({ color = NAVY, size = 32 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x={0} y={0} width={64} height={64} fill="none" stroke={color} strokeWidth={2} />
    <path
      d="M 12 34 L 32 18 L 52 34 L 52 52 L 12 52 Z"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <line x1={22} y1={40} x2={42} y2={40} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    <line x1={22} y1={46} x2={42} y2={46} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);

const WorksheetDocument = React.forwardRef<HTMLDivElement, WorksheetDocumentProps>(
  ({ id, inputs, results }, ref) => {
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const { current, consolidated, accelerated } = results;
    const totalSaved = consolidated.totalInterest - accelerated.totalInterest;
    const timeSaved = consolidated.years - accelerated.years;

    const contactParts: string[] = [];
    if (inputs.contactPhone) contactParts.push(inputs.contactPhone);
    if (inputs.contactEmail) contactParts.push(inputs.contactEmail);
    if (inputs.contactNMLS) contactParts.push("NMLS #" + inputs.contactNMLS);

    const licensingLine: string[] = [];
    if (inputs.companyName) licensingLine.push(inputs.companyName);
    if (inputs.companyNMLS) licensingLine.push("Company NMLS #" + inputs.companyNMLS);
    if (inputs.contactNMLS) licensingLine.push(inputs.preparedBy + " NMLS #" + inputs.contactNMLS);
    const licensingStr = licensingLine.join(" | ");
    const stateStr = inputs.licenseStates
      ? `Licensed to originate mortgage loans in ${inputs.licenseStates}.`
      : "";

    const existBalanceVal = `${money(inputs.existBalance)} @ ${rateAprStr(inputs.existRate, inputs.existAPR, true)}`;
    const newLoanVal = `${money(inputs.loanAmount)} @ ${rateAprStr(inputs.loanRate, inputs.loanAPR)}`;

    const complianceText = [
      licensingStr ? licensingStr + ". " : "",
      stateStr ? stateStr + " " : "",
      "Verify licensing at www.nmlsconsumeraccess.org.",
      "\n\n",
      "This document is for informational and illustrative purposes only and does NOT constitute a commitment to lend, an offer to extend credit, a Loan Estimate as required under 12 CFR 1026.19, or a guarantee of any specific terms or rates. The interest rate and APR shown are hypothetical for illustration only. Actual rates, APR, fees, and terms depend on credit approval, property appraisal, income and asset verification, loan-to-value, occupancy, property type, debt-to-income ratio, and current market conditions, and are subject to change without notice. APR reflects estimated finance charges including interest, certain fees, and prepaid items, calculated over the life of the loan.",
      "\n\n",
      "The \u201ceffective rate\u201d calculation illustrates how applying additional principal payments may reduce total interest paid over the life of the loan; it is NOT the loan\u2019s contractual interest rate, NOT the Annual Percentage Rate (APR) required under the Truth in Lending Act, and assumes consistent voluntary additional principal payments. Results depend on the borrower actually making those payments. Past payment behavior does not guarantee future performance.",
      "\n\n",
      "Consult a licensed loan originator for an official Loan Estimate disclosing actual loan terms, costs, and APR. All loans subject to underwriting approval. Programs, rates, terms, and conditions subject to change without notice.",
      "\n\n",
      `Equal Housing Opportunity. ${inputs.companyName || "Adaxa Home LLC"} is an Equal Housing Lender. We do business in accordance with the Federal Fair Housing Law and the Equal Credit Opportunity Act. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding contract), because all or part of the applicant\u2019s income derives from any public assistance program, or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act.`,
      "\n\n",
      `Prepared ${dateStr}.`,
    ].join("");

    return (
      <div
        id={id}
        ref={ref}
        style={{
          width: "100%",
          maxWidth: 816,
          margin: "0 auto",
          background: "#fff",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#333",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        {/* Header bar */}
        <div
          style={{
            background: NAVY,
            color: "#fff",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 0.5 }}>
              {inputs.companyName}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, opacity: 0.85 }}>
              <EhoSvg color="#ffffff" size={22} />
              <span style={{ fontSize: 8, color: "#fff", lineHeight: 1.2 }}>
                Equal Housing<br />Opportunity
              </span>
            </div>
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: GOLD,
            }}
          >
            Loan Benefits Worksheet
          </div>
        </div>

        {/* Title row */}
        <div style={{ padding: "20px 24px 8px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: NAVY,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Loan Benefits Worksheet
          </h1>
          <div style={{ color: GRAY, fontSize: 12, marginTop: 4 }}>
            Prepared for <strong style={{ color: NAVY }}>{inputs.clientName || "Client"}</strong>
            &nbsp;•&nbsp;{dateStr}
          </div>
        </div>

        {/* Top row: snapshot + debts */}
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "12px 24px",
            alignItems: "flex-start",
          }}
        >
          {/* Current Picture */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: 4,
              }}
            >
              Your Current Picture
            </h2>
            <table style={tableStyle}>
              <tbody>
                {[
                  ["Existing Mortgage Balance", existBalanceVal],
                  ["Existing Mortgage P&I", money(inputs.existPayment)],
                  ["Monthly Escrow (taxes & ins.)", money(inputs.existEscrow)],
                  ["Total Other Debt Balance", money(results.debtBalance)],
                  ["Total Debt Payments", money(results.debtMinPmt)],
                ].map(([label, val], i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? ROW_ALT : "#fff" }}>
                    <td style={tdStyle}>{label}</td>
                    <td style={tdNumStyle}>{val}</td>
                  </tr>
                ))}
                <tr style={{ background: LIGHT }}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: NAVY }}>
                    Current Total Outflow
                  </td>
                  <td style={{ ...tdNumStyle, fontWeight: 700, color: NAVY }}>
                    {money(results.currentTotalOutflow)}
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>New Loan Amount</td>
                  <td style={tdNumStyle}>{newLoanVal}</td>
                </tr>
                <tr style={{ background: ROW_ALT }}>
                  <td style={tdStyle}>New Loan Monthly P&I</td>
                  <td style={tdNumStyle}>{money(results.newLoanPmt)}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Extra Monthly Contribution</td>
                  <td style={tdNumStyle}>{money(inputs.extraMonthly)}</td>
                </tr>
                {inputs.cashBack > 0 && (
                  <tr style={{ background: ROW_ALT }}>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>Cash Back at Closing</td>
                    <td style={{ ...tdNumStyle, fontWeight: 700, color: GREEN }}>
                      {money(inputs.cashBack)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Debts table */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: 4,
              }}
            >
              Debts Rolled Into New Mortgage
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Debt</th>
                  <th style={thNumStyle}>Balance</th>
                  <th style={thNumStyle}>Rate</th>
                  <th style={thNumStyle}>Min Pmt</th>
                </tr>
              </thead>
              <tbody>
                {inputs.debts.map((d, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? ROW_ALT : "#fff" }}>
                    <td style={tdStyle}>{d.name}</td>
                    <td style={tdNumStyle}>{money(d.balance)}</td>
                    <td style={tdNumStyle}>{pct(d.rate)}</td>
                    <td style={tdNumStyle}>{money(d.payment)}</td>
                  </tr>
                ))}
                <tr style={{ background: LIGHT }}>
                  <td style={{ ...tdStyle, fontWeight: 700, color: NAVY }}>TOTALS</td>
                  <td style={{ ...tdNumStyle, fontWeight: 700 }}>{money(results.debtBalance)}</td>
                  <td style={tdNumStyle}>—</td>
                  <td style={{ ...tdNumStyle, fontWeight: 700 }}>{money(results.debtMinPmt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison table */}
        <div style={{ padding: "4px 24px 12px" }}>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: 13,
              fontWeight: 700,
              color: NAVY,
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 4,
            }}
          >
            Your Three Paths Compared
          </h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: "22%" }}></th>
                <th style={{ ...thNumStyle, width: "26%" }}>
                  Current Path
                  <br />
                  <span style={{ fontWeight: 400, fontSize: 10 }}>
                    (Keep Existing Mortgage + Debts)
                  </span>
                </th>
                <th style={{ ...thNumStyle, width: "26%" }}>
                  Refinance
                  <br />
                  <span style={{ fontWeight: 400, fontSize: 10 }}>(Standard Payment)</span>
                </th>
                <th
                  style={{
                    ...thNumStyle,
                    width: "26%",
                    background: GOLD,
                    color: NAVY,
                  }}
                >
                  Refinance
                  <br />
                  <span style={{ fontWeight: 400, fontSize: 10 }}>+ Savings Applied</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Monthly Payment",
                  cur: money(current.monthlyPmt),
                  con: money(consolidated.monthlyPmt),
                  acc: money(accelerated.monthlyPmt),
                  accNote: true,
                },
                {
                  label: "Time to Debt-Free",
                  cur: yrs(current.years),
                  con: yrs(consolidated.years),
                  acc: yrs(accelerated.years),
                },
                {
                  label: "Total Interest",
                  cur: "—",
                  con: money(consolidated.totalInterest),
                  acc: money(accelerated.totalInterest),
                },
                {
                  label: "Interest Saved",
                  cur: "—",
                  con: "— (baseline)",
                  acc: money(totalSaved),
                  highlight: true,
                },
                {
                  label: "Time Saved",
                  cur: "—",
                  con: "— (baseline)",
                  acc: yrs(timeSaved),
                  highlight: true,
                },
                {
                  label: "Effective Rate on New Loan",
                  cur: "—",
                  con: (
                    <strong>
                      {inputs.loanAPR > 0
                        ? `${pct(inputs.loanRate)} Rate / ${pct(inputs.loanAPR)} APR`
                        : pct(inputs.loanRate)}
                    </strong>
                  ),
                  acc: (
                    <strong>
                      {pct(accelerated.effectiveRate ?? 0)}
                      <sup style={{ fontSize: 9 }}>†</sup>
                    </strong>
                  ),
                },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 1 ? ROW_ALT : "#fff" }}>
                  <td style={{ ...tdStyle, fontWeight: 600, color: NAVY }}>{row.label}</td>
                  <td style={tdNumStyle}>{row.cur}</td>
                  <td style={tdNumStyle}>{row.con}</td>
                  <td
                    style={{
                      ...tdNumStyle,
                      background: "rgba(201,167,77,0.12)",
                      fontWeight: row.highlight ? 700 : undefined,
                      color: row.highlight ? GREEN : undefined,
                    }}
                  >
                    {row.acc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 10, color: GRAY, marginTop: 4 }}>
            † Illustrated effective rate assumes {money(inputs.extraMonthly)}/mo extra principal payment; this is not the loan&apos;s APR.
          </div>
        </div>

        {/* Banner */}
        <div
          style={{
            margin: "0 24px 12px",
            background: NAVY,
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 4,
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          By redirecting {money(inputs.extraMonthly)}/month back onto your new loan&apos;s principal,
          your {pct(inputs.loanRate)} Rate{inputs.loanAPR > 0 ? ` / ${pct(inputs.loanAPR)} APR` : ""} loan
          effectively costs you {pct(accelerated.effectiveRate ?? 0)}{" "}
          (illustrated effective rate, not APR) — saving {money(totalSaved)} and{" "}
          {timeSaved.toFixed(1)} years vs. a standard refinance.
        </div>

        {/* Bottom row: explainer + key numbers */}
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "4px 24px 12px",
          }}
        >
          <div style={{ flex: 2 }}>
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: 4,
              }}
            >
              How This Strategy Works
            </h2>
            <div style={{ fontSize: 12, lineHeight: 1.7, color: "#333" }}>
              <p style={{ margin: "0 0 8px" }}>
                Today you pay a mortgage payment <em>plus</em> every other debt —{" "}
                {money(results.currentTotalOutflow)} total each month. When the refi closes, the
                existing mortgage and all other debts are replaced by a single{" "}
                {money(results.newLoanPmt)} payment — freeing up {money(results.freedUp)} of
                monthly cash flow.
              </p>
              <p style={{ margin: "0 0 8px" }}>
                You then commit {money(inputs.extraMonthly)} of that freed-up cash back to the new
                loan&apos;s <strong>principal</strong> each month. Every dollar of principal retired
                early <strong>never accrues interest again</strong>, which is why your{" "}
                {inputs.loanAPR > 0
                  ? <><strong>{pct(inputs.loanRate)} Rate / {pct(inputs.loanAPR)} APR</strong> loan</>
                  : <><strong>{pct(inputs.loanRate)}</strong> loan</>
                }{" "}
                effectively costs you{" "}
                <strong>{pct(accelerated.effectiveRate ?? 0)}</strong> in practice (illustrated
                effective rate, not APR).
              </p>
              <p style={{ margin: 0 }}>
                Cash flow actually improves — you pay{" "}
                {money(results.freedUp - inputs.extraMonthly)} less per month than you do today
                while still paying the loan off in {accelerated.years.toFixed(1)} years instead of{" "}
                {consolidated.years.toFixed(0)}.
              </p>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                borderBottom: `2px solid ${GOLD}`,
                paddingBottom: 4,
              }}
            >
              Key Numbers at a Glance
            </h2>
            <table style={tableStyle}>
              <tbody>
                {[
                  ["Stated interest rate", pct(inputs.loanRate)],
                  ["APR", inputs.loanAPR > 0 ? pct(inputs.loanAPR) : "(not entered)"],
                  ["Monthly amount applied to principal", money(inputs.extraMonthly)],
                  ["Years shaved off", timeSaved.toFixed(1) + " years"],
                  ["Total interest eliminated", money(totalSaved)],
                  ["Effective interest rate†", pct(accelerated.effectiveRate ?? 0)],
                  ...(inputs.cashBack > 0 ? [["Cash back at closing", money(inputs.cashBack)]] : []),
                ].map(([label, val], i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? ROW_ALT : "#fff" }}>
                    <td style={tdStyle}>{label}</td>
                    <td style={{ ...tdNumStyle, color: GREEN, fontWeight: 600 }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature block */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 24px",
            borderTop: `3px solid ${GOLD}`,
            marginTop: 8,
          }}
        >
          <img
            src="/mykoal-headshot.jpg"
            alt={inputs.preparedBy}
            crossOrigin="anonymous"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "top",
              border: `2px solid ${GOLD}`,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: NAVY }}>{inputs.preparedBy}</div>
            <div style={{ fontSize: 12, color: GRAY }}>{inputs.preparedByTitle}</div>
            <div style={{ fontSize: 12, color: GRAY }}>{inputs.companyName}</div>
            <div style={{ fontSize: 11, color: GRAY, marginTop: 2 }}>
              {contactParts.join(" • ")}
            </div>
          </div>
        </div>

        {/* Compliance footer */}
        <div
          style={{
            background: LIGHT,
            padding: "10px 24px",
            borderTop: `1px solid ${BORDER}`,
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            pageBreakInside: "avoid",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <EhoSvg color={NAVY} size={32} />
            <div style={{ fontSize: 8, color: NAVY, lineHeight: 1.3, textAlign: "center", maxWidth: 60 }}>
              <strong>Equal Housing<br />Opportunity</strong>
            </div>
          </div>

          <div style={{ fontSize: 8.5, color: GRAY, lineHeight: 1.55, whiteSpace: "pre-line" }}>
            {complianceText}
          </div>
        </div>
      </div>
    );
  },
);

WorksheetDocument.displayName = "WorksheetDocument";
export default WorksheetDocument;
