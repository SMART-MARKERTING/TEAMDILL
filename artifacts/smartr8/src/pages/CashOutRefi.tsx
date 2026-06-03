import { Banknote, Layers, Wallet, PiggyBank, Clock, ShieldCheck, Network } from "lucide-react";
import { ProductLanding, type ProductConfig } from "@/components/ProductLanding";

// Cash Out Refinance funnel. Angle: replace your mortgage and take equity as
// cash for debt consolidation, projects, or reserves. Shared stack + styling.

const config: ProductConfig = {
  loanType: "CASHOUT_REFI",
  route: "/cash-out-refi",
  meta: {
    title: "Cash Out Refinance | Mykoal DeShazo at Adaxa Home",
    description:
      "Turn your home equity into cash with a cash out refinance from Mykoal DeShazo, Senior Loan Officer at Adaxa Home. See your options with no credit pull. NMLS 1912347.",
  },
  eyebrow: "Cash Out Refinance",
  h1: "Put your home equity to work as cash",
  subhead:
    "Replace your current mortgage with a new one and take the difference in cash. Use it to consolidate higher interest debt, fund a project, or build reserves you can lean on.",
  consentProduct: "cash out refinance",
  ctaLabel: "Get My Cash Out Options",
  serviceName: "Cash Out Refinance",
  serviceType: "Cash Out Mortgage Refinance",
  trustPills: [
    { icon: ShieldCheck, label: "Soft credit only" },
    { icon: Clock, label: "Options in minutes" },
    { icon: Network, label: "99+ lender network" },
  ],
  benefits: [
    {
      icon: Banknote,
      title: "Tap your equity",
      body: "Convert the equity you have built into cash in hand, with one new mortgage instead of a second monthly bill.",
    },
    {
      icon: Layers,
      title: "Consolidate higher interest debt",
      body: "Roll high interest balances into one home backed payment. Let us run your numbers and show what it could do.",
    },
    {
      icon: Wallet,
      title: "Fund the big stuff",
      body: "Renovations, tuition, a business move, or anything else on your list. Your equity can do more than sit still.",
    },
    {
      icon: PiggyBank,
      title: "Build a safety cushion",
      body: "Set cash aside for emergencies and peace of mind. We will help you decide how much makes sense to pull.",
    },
  ],
  howSteps: [
    { title: "Tell us about your home", body: "Share your rough value and what you owe. An estimate works to start." },
    { title: "We run your numbers", body: "We compare programs across our lender network to find your strongest fit." },
    { title: "See your options", body: "Mykoal walks you through your cash out options and the path to close." },
  ],
};

export default function CashOutRefi() {
  return <ProductLanding config={config} />;
}
