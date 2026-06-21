import { Link, useLocation } from "wouter";
import { ArrowRight, Clock, Home, Layers, Lock, PiggyBank, ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FunnelFAQ, type FaqItem, type GuideLink } from "@/components/FunnelFAQ";
import { TrustBlock } from "@/components/TrustBlock";
import { ComplianceFooter } from "@/components/ComplianceFooter";
import { makeFunnelTracker, mykoalUrl, MYKOAL_ARTICLES } from "@/lib/funnelEvents";

const BRAND_RED = "#E31B23";
const BRAND_TEAL = "#13485A";
const CREAM = "#F8F5F0";

const trustPills = [
  { icon: Home, label: "Keep your 1st-mortgage rate" },
  { icon: Clock, label: "Options in minutes" },
  { icon: Lock, label: "Soft review only" },
];

const benefits = [
  {
    icon: Home,
    title: "Keep your current rate",
    body: "A HELOC is a second lien behind your existing mortgage, so your first-mortgage rate and term stay exactly where they are.",
  },
  {
    icon: PiggyBank,
    title: "Draw what you need",
    body: "Access your equity as a revolving line and draw funds when you need them, rather than taking one lump sum up front.",
  },
  {
    icon: Layers,
    title: "Consolidate higher-rate debt",
    body: "Many homeowners use a HELOC to consolidate higher-rate balances, subject to their goals and a full application review.",
  },
  {
    icon: ShieldCheck,
    title: "Guidance, not pressure",
    body: "See your options with no obligation. There is no credit pull just to review what may fit your goals.",
  },
];

const howSteps = [
  { title: "Tell us about your home", body: "Share your estimated home value and mortgage balance. An estimate is fine to start." },
  { title: "We review your equity", body: "We look at what your equity could unlock and which programs may fit your goals." },
  { title: "See your options", body: "Mykoal walks you through the next steps, with no obligation." },
];

const faqs: FaqItem[] = [
  {
    q: "What is a HELOC?",
    a: "A HELOC, or home equity line of credit, is a revolving credit line secured by the equity in your home. You can draw funds as you need them during the draw period and repay over time, similar to how a credit card works but tied to your property. How much you can access depends on your equity, your credit profile, and a full application review.",
  },
  {
    q: "Does a HELOC replace my current mortgage?",
    a: "No. A HELOC sits behind your existing mortgage as a second lien, so your current first mortgage and its rate stay exactly where they are. That makes it a common way to tap equity without refinancing a low first-mortgage rate you want to keep.",
  },
  {
    q: "Can I use a HELOC for debt consolidation?",
    a: "Many homeowners use a HELOC to consolidate higher-rate balances into a single line tied to their home equity. Whether it makes sense for you depends on your balances, your goals, and what you qualify for under a full application review. We can walk through your numbers with no obligation.",
  },
  {
    q: "How long does a HELOC take?",
    a: "Timelines vary by lender and by how quickly your documents come together, but many HELOCs move faster than a full refinance. Once we review your scenario, we can give you a realistic timeline for your situation. Actual closing time is subject to underwriting and verification.",
  },
  {
    q: "Is a HELOC better than a cash-out refinance?",
    a: "It depends on your current mortgage rate and your goals. A HELOC keeps your existing first mortgage in place, while a cash-out refinance replaces it with a new, larger loan. Many borrowers compare both before deciding which path fits.",
    learnMore: { href: mykoalUrl(MYKOAL_ARTICLES.helocVsCashOut), label: "HELOC vs. cash-out refinance", mykoal: true },
  },
];

const guideLinks: GuideLink[] = [
  { href: mykoalUrl(MYKOAL_ARTICLES.helocVsCashOut), label: "Read the full guide: HELOC vs. cash-out refinance", mykoal: true },
];

const track = makeFunnelTracker("heloc");

function ctaHref(path: string) {
  const source = path === "/heloc-main" ? "heloc-main" : "heloc-options";
  return `/heloc-v3?lead_source=${source}`;
}

export default function HelocOptions() {
  const [location] = useLocation();
  const startHref = ctaHref(location);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <PageMeta
        title="HELOC Options | Mykoal DeShazo at Adaxa Home"
        description="Tap your home equity with a HELOC and keep your current mortgage rate. See your options from Mykoal DeShazo, Senior Loan Officer at Adaxa Home. NMLS #1912347."
        canonical={location === "/heloc-main" ? "/heloc-main" : "/heloc-options"}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "HELOC (Home Equity Line of Credit)",
          serviceType: "Home Equity Line of Credit",
          provider: { "@type": "FinancialService", name: "Adaxa Home LLC", url: "https://smartr8.com/" },
          description:
            "HELOC review from Mykoal DeShazo at Adaxa Home for homeowners who want to access equity while keeping their current first mortgage in place.",
          url: `https://smartr8.com${location === "/heloc-main" ? "/heloc-main" : "/heloc-options"}`,
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
              HELOC Options
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight" style={{ color: BRAND_TEAL }}>
              Tap your home equity without touching your mortgage rate
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto max-w-2xl">
              A home equity line of credit sits behind your current mortgage, so you can access equity while keeping
              the low first-mortgage rate you already have.
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
                  See My HELOC Options <ArrowRight className="ml-2 h-5 w-5" />
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
                See My HELOC Options <ArrowRight className="ml-2 h-5 w-5" />
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
