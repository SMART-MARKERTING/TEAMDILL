import { Building2, TrendingUp, FileCheck, Layers, ShieldCheck, Clock, Network } from "lucide-react";
import { ProductLanding, type ProductConfig } from "@/components/ProductLanding";

// DSCR investor funnel. Angle: qualify on the property's rental cash flow, not
// personal income docs. Built for rental property investors. Mirrors the
// /heloc-v2 stack and brand styling via the shared <ProductLanding />.

const config: ProductConfig = {
  loanType: "DSCR",
  route: "/dscr",
  meta: {
    title: "DSCR Investor Loans | Mykoal DeShazo at Adaxa Home",
    description:
      "Finance rental property on its cash flow, not your tax returns. DSCR loans from Mykoal DeShazo, Senior Loan Officer at Adaxa Home. NMLS 1912347.",
  },
  eyebrow: "DSCR Investor Loans",
  h1: "Qualify on your rental's cash flow, not your tax returns",
  subhead:
    "DSCR loans let real estate investors finance rental property based on what it earns, so you can keep growing your portfolio without handing over years of personal income docs.",
  consentProduct: "DSCR loan",
  ctaLabel: "Get My DSCR Options",
  serviceName: "DSCR Investor Loan",
  serviceType: "Debt Service Coverage Ratio Loan",
  trustPills: [
    { icon: FileCheck, label: "No income docs" },
    { icon: Clock, label: "Options in minutes" },
    { icon: Network, label: "99+ lender network" },
  ],
  benefits: [
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
  ],
  howSteps: [
    { title: "Share the property", body: "Tell us about the rental and the rough rent. An estimate is fine to start." },
    { title: "We run your numbers", body: "We check the cash flow against lender programs and find the strongest fit." },
    { title: "See your options", body: "Mykoal walks you through your DSCR options and the path to close." },
  ],
};

export default function Dscr() {
  return <ProductLanding config={config} />;
}
