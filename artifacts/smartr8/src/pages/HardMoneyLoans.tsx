import { Link } from "wouter";
import { ArrowRight, Banknote, Building2, CheckCircle2, Clock, Hammer, Home, Layers, ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FunnelFAQ, type FaqItem } from "@/components/FunnelFAQ";
import { TrustBlock } from "@/components/TrustBlock";
import { ComplianceFooter } from "@/components/ComplianceFooter";

const BRAND_RED = "#E31B23";
const BRAND_TEAL = "#13485A";
const CREAM = "#F8F5F0";

const faqs: FaqItem[] = [
  {
    q: "What is a hard money loan?",
    a: "A hard money loan is private or investor-focused financing that usually leans more heavily on the property, project, exit strategy, and borrower experience than a conventional mortgage does. Terms, costs, and documentation vary by lender and are subject to a full application review.",
  },
  {
    q: "Can hard money be used for a fix and flip?",
    a: "Yes. Many investors use hard money or fix and flip financing to acquire a property, complete repairs, and sell or refinance after the project is finished. Approval depends on the property, purchase price, rehab scope, borrower profile, and exit strategy.",
  },
  {
    q: "What is a bridge loan?",
    a: "A bridge loan is short-term financing used to bridge a timing gap, such as buying or improving a property before selling, refinancing, or stabilizing it. Bridge loans are usually temporary and should have a clear exit plan.",
  },
  {
    q: "Can I finance construction or renovation costs?",
    a: "Some construction, rehab, and fix and flip programs can include funds for improvements, often released through draws as work is completed. The structure depends on the lender, budget, contractor details, appraisal, and project scope.",
  },
  {
    q: "Are hard money loans only for investors?",
    a: "Most hard money, fix and flip, construction bridge, and investor bridge programs are designed for business-purpose real estate investors. Owner-occupied consumer loans have different rules and may require a different product.",
  },
  {
    q: "How fast can a hard money or bridge loan close?",
    a: "Some private lending and bridge programs can move faster than conventional financing when the file, valuation, title, and project details are ready. Actual timing depends on the lender, property, documentation, and underwriting review.",
  },
];

const products = [
  {
    icon: Hammer,
    title: "Fix and flip loans",
    body: "Short-term investor financing for acquisition and renovation, built around the project plan and exit strategy.",
  },
  {
    icon: Layers,
    title: "Bridge loans",
    body: "Temporary financing for investors who need to buy, stabilize, sell, or refinance on a timeline that conventional loans may not fit.",
  },
  {
    icon: Building2,
    title: "Construction and rehab",
    body: "Options that may include renovation or construction draws, depending on project scope and lender requirements.",
  },
  {
    icon: Home,
    title: "Rental investor exits",
    body: "When the project becomes a rental, Cameron can also compare DSCR takeout financing after the property is stabilized.",
  },
];

const steps = [
  { title: "Share the deal", body: "Send the address, purchase price, rehab budget, timeline, and planned exit." },
  { title: "Match the structure", body: "We compare hard money, bridge, construction, and DSCR-style takeout paths where available." },
  { title: "Move with a plan", body: "You get a clear next step based on the property, not vague promises or one-size-fits-all terms." },
];

export default function HardMoneyLoans() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <PageMeta
        title="Hard Money, Fix and Flip, Construction & Bridge Loans | Smartr8"
        description="Explore hard money loans, fix and flip financing, construction rehab loans, and bridge loans for real estate investors with Cameron Dill at Adaxa Home."
        canonical="/hard-money-loans"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Hard Money, Fix and Flip, Construction and Bridge Loans",
          serviceType: "Real Estate Investor Financing",
          provider: { "@type": "FinancialService", name: "Adaxa Home LLC", url: "https://smartr8.com/" },
          description:
            "Investor-focused real estate financing guidance for hard money, fix and flip, construction rehab, bridge loans, and DSCR takeout options.",
          url: "https://smartr8.com/hard-money-loans",
        }}
      />

      <Header />

      <main className="flex-1">
        <section className="px-4 pt-10 pb-12 sm:pt-16 sm:pb-16" style={{ backgroundColor: CREAM }}>
          <div className="mx-auto max-w-3xl text-center">
            <span
              className="inline-flex items-center text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ backgroundColor: "rgba(227,27,35,0.08)", color: BRAND_RED, borderColor: BRAND_RED }}
            >
              Investor Financing
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight" style={{ color: BRAND_TEAL }}>
              Hard money, fix and flip, construction, and bridge loan options
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto max-w-2xl">
              Need funding for a real estate investment deal that does not fit a conventional box? Cameron can help you
              compare investor financing paths and the exit strategy that makes the deal work.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <Button
                type="button"
                asChild
                className="h-12 px-8 text-base shadow-lg rounded-xl border-0 hover:opacity-90"
                style={{ backgroundColor: BRAND_RED, color: "#FFFFFF" }}
              >
                <a href="sms:8054150275">
                  Text My Deal <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button type="button" asChild variant="outline" className="h-12 px-8 text-base rounded-xl border-2">
                <Link href="/dscr-main">Compare DSCR Takeout</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Subject to lender guidelines, underwriting, valuation, title, and full application review.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border p-6 bg-white">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(227,27,35,0.08)" }}>
                    <Icon className="h-6 w-6" style={{ color: BRAND_RED }} />
                  </div>
                  <h2 className="text-lg font-bold mb-1.5" style={{ color: BRAND_TEAL }}>{title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16" style={{ backgroundColor: CREAM }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: BRAND_TEAL }}>
              How investor deal review works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center sm:text-left">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white mb-3 mx-auto sm:mx-0" style={{ backgroundColor: BRAND_RED }}>
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: BRAND_TEAL }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl grid gap-5 md:grid-cols-3">
            {[
              { icon: Clock, title: "Timeline matters", body: "Private and bridge lenders often care about speed, scope, and exit. Bring the timeline early." },
              { icon: Banknote, title: "Capital stack clarity", body: "Know purchase price, rehab budget, reserves, and expected resale or refinance plan." },
              { icon: ShieldCheck, title: "No blanket promises", body: "Terms depend on the property, borrower, valuation, documentation, and full lender review." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border p-6 bg-white">
                <Icon className="h-6 w-6 mb-4" style={{ color: "#1F8A5F" }} />
                <h3 className="text-base font-bold mb-1.5" style={{ color: BRAND_TEAL }}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16" style={{ backgroundColor: CREAM }}>
          <FunnelFAQ items={faqs} />
          <div className="mt-10 text-center">
            <Button
              type="button"
              asChild
              className="h-12 px-8 text-base shadow-lg rounded-xl border-0 hover:opacity-90"
              style={{ backgroundColor: BRAND_RED, color: "#FFFFFF" }}
            >
              <a href="sms:8054150275">
                Text My Deal <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" style={{ color: "#1F8A5F" }} />
              Hard money, fix and flip, bridge, construction, and DSCR takeout review
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <TrustBlock />
        </section>
      </main>

      <ComplianceFooter />
      <Footer />
    </div>
  );
}
