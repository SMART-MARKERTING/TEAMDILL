import { Link, useLocation } from "wouter";
import { ArrowRight, Building2, Clock, FileCheck, Layers, Network, TrendingUp } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FunnelFAQ, type FaqItem, type GuideLink } from "@/components/FunnelFAQ";
import { TrustBlock } from "@/components/TrustBlock";
import { ComplianceFooter } from "@/components/ComplianceFooter";
import { LICENSED_STATES_TEXT } from "@/lib/compliance";
import { makeFunnelTracker, mykoalUrl, MYKOAL_ARTICLES } from "@/lib/funnelEvents";

const BRAND_RED = "#E31B23";
const BRAND_TEAL = "#13485A";
const CREAM = "#F8F5F0";

const trustPills = [
  { icon: FileCheck, label: "No income docs" },
  { icon: Clock, label: "Options in minutes" },
  { icon: Network, label: "99+ lender network" },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Qualify on the rent",
    body: "We look at the property's rental cash flow against its payment. Strong cash flow can carry the file on its own.",
  },
  {
    icon: FileCheck,
    title: "No personal income docs",
    body: "Skip the W2s, pay stubs, and tax returns. DSCR loans are built for investors whose returns do not tell the whole story.",
  },
  {
    icon: Layers,
    title: "Built to scale a portfolio",
    body: "Finance one rental or many. DSCR financing is designed for investors who want to keep buying without hitting income walls.",
  },
  {
    icon: Building2,
    title: "Long term and short term rentals",
    body: "Single family, condos, two to four units, and many short term rentals can work. Let us run your scenario and see what fits.",
  },
];

const howSteps = [
  { title: "Share the property", body: "Tell us about the rental, purchase price or value, and rough rent. An estimate is fine to start." },
  { title: "We run your numbers", body: "We check the cash flow against lender programs and find the strongest fit." },
  { title: "See your options", body: "Cameron walks you through your DSCR options and the path to close." },
];

const faqs: FaqItem[] = [
  {
    q: "What is a DSCR loan?",
    a: "A DSCR loan is a financing option for real estate investors that qualifies the loan on the rental property's cash flow rather than your personal income. DSCR stands for debt service coverage ratio, which compares the property's income to its payment. Terms are based on the property and a full application review.",
    learnMore: { href: mykoalUrl(MYKOAL_ARTICLES.dscrRequirementsAz), label: "DSCR loan requirements in Arizona", mykoal: true },
  },
  {
    q: "Do DSCR loans use personal income?",
    a: "Generally no. DSCR loans focus on whether the property's rental income can cover its payment, so many programs do not require personal income documents like W2s or tax returns. Specific documentation requirements vary by lender and are confirmed during underwriting.",
  },
  {
    q: "Can I use DSCR financing for a rental property?",
    a: "Yes. DSCR loans are built specifically for investment and rental properties, including many single-family homes, condos, and small multi-unit buildings. Eligibility depends on the property type and a full application review.",
  },
  {
    q: "Can short-term rental income count?",
    a: "Some programs allow short-term rental income to be considered when qualifying a DSCR loan, often using documented rental history or market data. Whether it applies depends on the lender, the property, and the market. We can check which programs may fit your scenario.",
    learnMore: { href: mykoalUrl(MYKOAL_ARTICLES.dscrRequirementsAz), label: "DSCR loan requirements in Arizona", mykoal: true },
  },
  {
    q: "Is DSCR only for Arizona properties?",
    a: `No. While we are based in Arizona, DSCR financing is available on eligible properties across the states where we are licensed. ${LICENSED_STATES_TEXT} Availability depends on the property location, the program, and a full application review.`,
  },
];

const guideLinks: GuideLink[] = [
  { href: mykoalUrl(MYKOAL_ARTICLES.dscrRequirementsAz), label: "Read the full guide: DSCR loan requirements in Arizona", mykoal: true },
];

const track = makeFunnelTracker("dscr");

function ctaHref(path: string) {
  const source = path === "/dscr-main" ? "dscr-main" : "dscr";
  return `/dscr-v3?lead_source=${source}`;
}

export default function Dscr() {
  const [location] = useLocation();
  const startHref = ctaHref(location);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <PageMeta
        title="DSCR Investor Loans | Cameron Dill at Adaxa Home"
        description="Finance rental property on its cash flow, not your tax returns. DSCR loans from Cameron Dill, Senior Loan Officer at Adaxa Home. NMLS 763991."
        canonical={location === "/dscr-main" ? "/dscr-main" : "/dscr"}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "DSCR Investor Loan",
          serviceType: "Debt Service Coverage Ratio Loan",
          provider: { "@type": "FinancialService", name: "Adaxa Home LLC", url: "https://smartr8.com/" },
          description:
            "DSCR investor loan review based on rental property cash flow, property value, requested loan amount, and credit profile.",
          url: `https://smartr8.com${location === "/dscr-main" ? "/dscr-main" : "/dscr"}`,
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
              DSCR Investor Loans
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight" style={{ color: BRAND_TEAL }}>
              Qualify on your rental's cash flow, not your tax returns
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto max-w-2xl">
              DSCR loans let real estate investors finance rental property based on what it earns, so you can keep
              growing your portfolio without handing over years of personal income docs.
            </p>
            <div className="mt-7">
              <Button
                type="button"
                asChild
                onClick={() => track.primaryCtaClick()}
                className="h-12 px-8 text-base shadow-lg rounded-xl border-0 hover:opacity-90"
                style={{ backgroundColor: BRAND_RED, color: "#FFFFFF" }}
              >
                <Link href={startHref}>
                  Get My DSCR Options <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">No credit pull to see your options. No commitment.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 max-w-xl mx-auto">
              {trustPills.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center justify-center text-center gap-1 py-3 px-2 rounded-xl border border-border bg-white">
                  <Icon className="h-5 w-5" style={{ color: "#1F8A5F" }} />
                  <span className="text-[11px] sm:text-xs font-semibold text-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-border p-6 bg-white">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(227,27,35,0.08)" }}>
                    <Icon className="h-6 w-6" style={{ color: BRAND_RED }} />
                  </div>
                  <h3 className="text-lg font-bold mb-1.5" style={{ color: BRAND_TEAL }}>{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16" style={{ backgroundColor: CREAM }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10" style={{ color: BRAND_TEAL }}>
              How it works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {howSteps.map((step, i) => (
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
          <TrustBlock />
        </section>

        <section className="px-4 py-12 sm:py-16" style={{ backgroundColor: CREAM }}>
          <FunnelFAQ items={faqs} guideLinks={guideLinks} track={track} />
          <div className="mt-10 text-center">
            <Button
              type="button"
              asChild
              onClick={() => track.secondaryCtaClick()}
              className="h-12 px-8 text-base shadow-lg rounded-xl border-0 hover:opacity-90"
              style={{ backgroundColor: BRAND_RED, color: "#FFFFFF" }}
            >
              <Link href={startHref}>
                Get My DSCR Options <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">No credit pull to see your options. No commitment.</p>
          </div>
        </section>
      </main>

      <ComplianceFooter />
      <Footer />
    </div>
  );
}
