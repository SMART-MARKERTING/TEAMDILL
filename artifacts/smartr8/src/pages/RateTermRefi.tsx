import { TrendingDown, Timer, ShieldOff, Wallet, Clock, ShieldCheck, Network } from "lucide-react";
import { ProductLanding, type ProductConfig } from "@/components/ProductLanding";

// Rate and Term Refinance funnel. Angle: lower your rate or payment, shorten
// your term, or remove mortgage insurance. No cash out. Shared stack + styling.

const config: ProductConfig = {
  loanType: "RT_REFI",
  route: "/rate-and-term-refi",
  meta: {
    title: "Rate and Term Refinance | Mykoal DeShazo at Adaxa Home",
    description:
      "Lower your rate or payment, shorten your term, or drop mortgage insurance with a rate and term refinance from Mykoal DeShazo at Adaxa Home. NMLS 1912347.",
  },
  eyebrow: "Rate and Term Refinance",
  h1: "Reset your mortgage to fit where you are now",
  subhead:
    "A rate and term refinance reworks your existing loan with no cash out. Lower your payment, shorten your term, or remove mortgage insurance once you have the equity to do it.",
  consentProduct: "rate and term refinance",
  ctaLabel: "Get My Refinance Options",
  serviceName: "Rate and Term Refinance",
  serviceType: "Rate and Term Mortgage Refinance",
  trustPills: [
    { icon: ShieldCheck, label: "Soft credit only" },
    { icon: Clock, label: "Options in minutes" },
    { icon: Network, label: "99+ lender network" },
  ],
  benefits: [
    {
      icon: TrendingDown,
      title: "Lower your payment",
      body: "If the market has moved or your credit has improved, a refinance may ease your monthly payment. Let us run your numbers.",
    },
    {
      icon: Timer,
      title: "Shorten your term",
      body: "Move toward owning your home sooner by shortening the term. We will show you how the tradeoffs look for your goals.",
    },
    {
      icon: ShieldOff,
      title: "Drop mortgage insurance",
      body: "Built enough equity? A refinance can be the moment you finally stop paying mortgage insurance.",
    },
    {
      icon: Wallet,
      title: "Keep your equity in place",
      body: "This is a no cash out option, so it is built purely around a better rate, term, or payment, not pulling money out.",
    },
  ],
  howSteps: [
    { title: "Tell us about your loan", body: "Share your rough balance and goal. An estimate is fine to get started." },
    { title: "We run your numbers", body: "We compare programs across our lender network to find your strongest fit." },
    { title: "See your options", body: "Mykoal walks you through your refinance options and the path to close." },
  ],
};

export default function RateTermRefi() {
  return <ProductLanding config={config} />;
}
