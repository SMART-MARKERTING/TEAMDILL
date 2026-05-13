import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Zap, Layers, Shield, Clock, Phone } from "lucide-react";

const OPTION_1_HREF = "https://heloc.deephavenmortgage.com/prequal/consent?lo=mykoal-deshazo";
const OPTION_2_HREF = "https://heloc.adaxahome.com/account/heloc/register?referrer=07b7dc41-da1d-4044-8cfc-694ebbc1d3b7";

export default function HelocInstantOptions() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <Header />

      {/* ── Intro strip ── */}
      <section className="py-12 md:py-16 px-4 text-center bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-2xl">
          <div
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border"
            style={{ borderColor: "#13485A", color: "#13485A" }}
          >
            <Zap className="h-3.5 w-3.5" />
            Instant Options
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
            Choose Your<br />HELOC Path
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Two fast digital options. Review both and pick the one that fits — I'll follow up either way.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-7 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Soft credit check only</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Results in minutes</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> No commitment required</span>
          </div>
        </div>
      </section>

      {/* ── Split panels ── */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* Panel 1 — Flexible Financing */}
        <div
          className="relative flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: "#13485A" }}
        >
          {/* Big decorative number */}
          <span
            className="pointer-events-none select-none absolute -bottom-6 -right-4 text-[220px] md:text-[280px] font-black leading-none"
            style={{ color: "rgba(255,255,255,0.04)" }}
          >
            01
          </span>

          <div className="relative z-10 flex flex-col h-full p-8 md:p-12 lg:p-16">
            {/* Badge */}
            <div className="mb-8">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              >
                <Layers className="h-3.5 w-3.5" />
                Option 1
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Flexible<br />Financing
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-xs">
              Broad program eligibility. A streamlined online start for borrowers who want to explore their options.
            </p>

            {/* Feature list */}
            <ul className="space-y-3.5 mb-10 flex-1">
              {[
                "Streamlined online prequalification",
                "Wide range of program eligibility",
                "Alternative documentation may be available",
                "Review lender disclosures before proceeding",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span
                    className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={OPTION_1_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-14 rounded-xl font-black text-base transition-all hover:gap-3 active:scale-[0.98]"
              style={{ backgroundColor: "white", color: "#13485A" }}
            >
              Continue
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Divider — mobile horizontal, desktop vertical */}
        <div className="md:hidden h-px w-full bg-gray-200" />
        <div className="hidden md:flex items-center justify-center w-px bg-gray-200 relative">
          <span
            className="absolute z-20 h-10 w-10 rounded-full flex items-center justify-center text-xs font-black border-2 border-white shadow-lg"
            style={{ backgroundColor: "#1a1a1a", color: "white" }}
          >
            OR
          </span>
        </div>

        {/* Panel 2 — Fast Digital Path */}
        <div
          className="relative flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: "#8B0F0F" }}
        >
          {/* Big decorative number */}
          <span
            className="pointer-events-none select-none absolute -bottom-6 -right-4 text-[220px] md:text-[280px] font-black leading-none"
            style={{ color: "rgba(255,255,255,0.04)" }}
          >
            02
          </span>

          <div className="relative z-10 flex flex-col h-full p-8 md:p-12 lg:p-16">
            {/* Badges */}
            <div className="mb-8 flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              >
                <Zap className="h-3.5 w-3.5" />
                Option 2
              </span>
              <span
                className="inline-flex items-center gap-1 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#FFD700", color: "#1a1a1a" }}
              >
                Fastest Option
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Fast Digital<br />Path
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-xs">
              Fully online, built to move quickly. Designed to minimize paperwork and get you to a decision fast.
            </p>

            {/* Feature list */}
            <ul className="space-y-3.5 mb-10 flex-1">
              {[
                "Fully digital end-to-end process",
                "Fast rate review and next steps",
                "Speed and timing vary by profile and property",
                "Review all lender terms before proceeding",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span
                    className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={OPTION_2_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-14 rounded-xl font-black text-base transition-all hover:gap-3 active:scale-[0.98]"
              style={{ backgroundColor: "white", color: "#8B0F0F" }}
            >
              Continue
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <section className="py-10 px-4 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            <strong className="text-gray-700">Not sure which to pick?</strong> Either way I'll reach out to review your results with you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href="tel:9494185486"
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#13485A" }}
            >
              <Phone className="h-4 w-4" />
              Call (949) 418-5486
            </a>
            <a
              href="sms:9494185486"
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg font-bold text-sm border-2 border-gray-300 hover:border-gray-400 text-gray-700 transition-colors"
            >
              Text Me Instead
            </a>
          </div>

          {/* Disclaimer */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-400 leading-relaxed mb-5">
            <strong className="text-gray-500">Important:</strong> Qualification and timing vary by lender and borrower profile. Not all applicants will qualify. Review each lender's disclosures for full terms before proceeding.
          </div>

          <p className="text-xs text-gray-400">
            Equal Housing Opportunity. NMLS #1912347. This is not a commitment to lend. All terms subject to lender approval.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
