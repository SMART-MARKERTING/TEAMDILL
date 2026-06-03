import { Home, BadgeCheck, KeyRound, Sparkles, Clock, ShieldCheck, Network } from "lucide-react";
import { ProductLanding, type ProductConfig } from "@/components/ProductLanding";

// Purchase funnel. Angle: pre approval and financing to buy a home, for first
// time buyers and move up buyers who want competitive offers. Shared stack.

const config: ProductConfig = {
  loanType: "PURCHASE",
  route: "/purchase",
  meta: {
    title: "Home Purchase Loans | Mykoal DeShazo at Adaxa Home",
    description:
      "Get pre approved and financed to buy your home with Mykoal DeShazo, Senior Loan Officer at Adaxa Home. Built for first time and move up buyers. NMLS 1912347.",
  },
  eyebrow: "Home Purchase",
  h1: "Get pre approved and make offers with confidence",
  subhead:
    "Whether it is your first home or your next one, a strong pre approval helps you shop in your range and make offers sellers take seriously. Let us get you ready to buy.",
  consentProduct: "home purchase",
  ctaLabel: "Get Pre Approved",
  serviceName: "Home Purchase Loan",
  serviceType: "Residential Purchase Mortgage",
  trustPills: [
    { icon: BadgeCheck, label: "Fast pre approval" },
    { icon: Clock, label: "Options in minutes" },
    { icon: Network, label: "99+ lender network" },
  ],
  benefits: [
    {
      icon: BadgeCheck,
      title: "Shop with a real pre approval",
      body: "Know your range before you tour homes. A solid pre approval keeps your search focused and your offers strong.",
    },
    {
      icon: Home,
      title: "First time buyer friendly",
      body: "New to buying? We walk you through every step in plain language and match you to programs that fit first time buyers.",
    },
    {
      icon: KeyRound,
      title: "Move up without the stress",
      body: "Buying your next home while juggling your current one? We help you line up the financing so the timing works.",
    },
    {
      icon: Sparkles,
      title: "Offers sellers respect",
      body: "A clean, well prepared file helps your offer stand out in a competitive market. Let us get your numbers ready.",
    },
  ],
  howSteps: [
    { title: "Tell us your goal", body: "Share where you are looking and your rough budget. An estimate is fine to start." },
    { title: "We run your numbers", body: "We match you to programs across our lender network and size up your pre approval." },
    { title: "See your options", body: "Mykoal walks you through your purchase options and gets you ready to make offers." },
  ],
};

export default function Purchase() {
  return <ProductLanding config={config} />;
}
