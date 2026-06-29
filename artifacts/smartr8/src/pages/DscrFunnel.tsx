import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  DollarSign,
  Home,
  Info,
  KeyRound,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TcpaConsent, TcpaSubmitNotice } from "@/components/TcpaConsent";
import { submitCrmLead } from "@/lib/submitCrmLead";
import { trackFbEvent } from "@/lib/fbq";
import { makeFunnelTracker } from "@/lib/funnelEvents";
import "./helocV3.css";

const SESSION_KEY = "funnel_dscr_v3";
const FUNNEL_VERSION = "dscr-v3";
const AUTO_ADVANCE_MS = 180;
const STEP_LABELS = ["Property", "Rental", "Credit", "About you"];

function leadSourceAttribution(): { pageUrlOverride?: string; sourceOverride?: string } {
  try {
    const source = new URLSearchParams(window.location.search).get("lead_source");
    if (source !== "dscr-main") return {};
    return {
      pageUrlOverride: `${window.location.origin}/dscr-main`,
      sourceOverride: "dscr-main",
    };
  } catch {
    return {};
  }
}

type OptionDef = { id: string; icon?: typeof Building2; title: string; sub: string };

const PROPERTY_TYPES: OptionDef[] = [
  { id: "single_family", icon: Home, title: "Single family", sub: "Detached rental home" },
  { id: "condo", icon: Building2, title: "Condo or townhome", sub: "Investor condo, townhome, or PUD" },
  { id: "two_to_four", icon: KeyRound, title: "2 to 4 units", sub: "Duplex, triplex, or fourplex" },
  { id: "short_term", icon: DollarSign, title: "Short term rental", sub: "Airbnb, VRBO, or furnished rental" },
];

const CREDIT: OptionDef[] = [
  { id: "excellent", title: "Excellent", sub: "740+" },
  { id: "good", title: "Good", sub: "680 to 739" },
  { id: "fair", title: "Fair", sub: "620 to 679" },
  { id: "building", title: "Still building", sub: "Below 620" },
  { id: "unsure", title: "Not sure", sub: "That's okay" },
];

type Stage = "s0" | "s1" | "s2" | "s3";
type Data = {
  propertyValue: string;
  loanAmount: string;
  monthlyRent: string;
  propertyType: string;
  credit: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  honeypot: string;
  pageLoadTime: number;
};

const DEFAULT_DATA: Data = {
  propertyValue: "",
  loanAmount: "",
  monthlyRent: "",
  propertyType: "",
  credit: "",
  first: "",
  last: "",
  email: "",
  phone: "",
  honeypot: "",
  pageLoadTime: 0,
};

type ConsentState = {
  ready: boolean;
  consent: boolean;
  consent_version: string;
  consent_text: string;
  turnstile_token: string;
};

const EMPTY_CONSENT: ConsentState = {
  ready: false,
  consent: false,
  consent_version: "",
  consent_text: "",
  turnstile_token: "",
};

function optionLabel(options: OptionDef[], id: string): string {
  const match = options.find((x) => x.id === id);
  return match ? `${match.title} (${match.sub})` : "";
}

function Progress({ current, total = 4 }: { current: number; total?: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="progress">
      <div className="progress-head">
        <span className="s">
          Step {current + 1} of {total}
        </span>
        <span className="p">{pct}%</span>
      </div>
      <div className="p-steps">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={"p-st " + (i < current ? "done" : i === current ? "now" : "")}>
            <i></i>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepHead({ eyebrow, title, help }: { eyebrow?: string; title: string; help?: string }) {
  return (
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="q-title">{title}</h2>
      {help && <p className="q-help">{help}</p>}
    </div>
  );
}

function OptionCard({
  icon: Icon,
  title,
  sub,
  selected,
  onClick,
}: {
  icon?: typeof Building2;
  title: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={"opt" + (selected ? " sel" : "")} onClick={onClick}>
      {Icon && (
        <span className="oic">
          <Icon size={22} />
        </span>
      )}
      <span className="otxt">
        <b>{title}</b>
        {sub && <small>{sub}</small>}
      </span>
      <span className="chk">
        <Check size={13} strokeWidth={3.4} />
      </span>
    </button>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string | null;
  children: ReactNode;
}) {
  return (
    <div className={"field" + (error ? " err" : "")}>
      {label && <label>{label}</label>}
      {children}
      {error ? (
        <span className="errmsg">
          <AlertTriangle size={13} /> {error}
        </span>
      ) : (
        hint && <span className="hint">{hint}</span>
      )}
    </div>
  );
}

function MoneyInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const fmt = (v: string) => {
    const n = (v || "").replace(/[^\d]/g, "");
    return n ? Number(n).toLocaleString("en-US") : "";
  };
  return (
    <div className="adorn">
      <span className="pre">$</span>
      <input
        inputMode="numeric"
        value={fmt(value)}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
      />
    </div>
  );
}

function Reassure({
  icon = "lock",
  title,
  children,
}: {
  icon?: "lock" | "info" | "shield";
  title: string;
  children?: ReactNode;
}) {
  const Icon = icon === "info" ? Info : icon === "shield" ? ShieldCheck : Lock;
  return (
    <div className="reassure">
      <Icon size={18} />
      <div>
        <b>{title}</b>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}

function NavRow({
  onBack,
  onNext,
  nextLabel = "Continue",
  disabled,
  under,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  disabled?: boolean;
  under?: string;
}) {
  return (
    <>
      <div className="nav-row">
        {onBack && (
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            <ArrowLeft size={17} /> Back
          </button>
        )}
        {onNext && (
          <button type="button" className="btn btn-primary" disabled={disabled} onClick={onNext}>
            {nextLabel} <ArrowRight size={18} />
          </button>
        )}
      </div>
      {under && <p className="under-cta">{under}</p>}
    </>
  );
}

type StepProps = {
  data: Data;
  set: (patch: Partial<Data>) => void;
  onNext: () => void;
  onBack?: () => void;
};

function StepProperty({ data, set, onNext, onBack }: StepProps) {
  return (
    <div className="step">
      <Progress current={0} />
      <StepHead
        eyebrow="The rental"
        title="What numbers should we run for the property?"
        help="Use estimates if you are still shopping or finalizing a purchase."
      />
      <div className="q-body">
        <Field label="Estimated property value or purchase price" hint="What the rental is worth or expected to sell for.">
          <MoneyInput value={data.propertyValue} onChange={(v) => set({ propertyValue: v })} placeholder="450,000" />
        </Field>
        <Field label="Requested loan amount or current balance" hint="For a purchase, use the loan amount you want to finance.">
          <MoneyInput value={data.loanAmount} onChange={(v) => set({ loanAmount: v })} placeholder="315,000" />
        </Field>
        <Reassure icon="info" title="DSCR loans focus on the property">
          The first pass is about value, debt, and rent, not W2s or tax returns.
        </Reassure>
        <NavRow
          onBack={onBack}
          onNext={onNext}
          disabled={!data.propertyValue || !data.loanAmount}
          under="No personal income docs needed to start."
        />
      </div>
    </div>
  );
}

function StepRental({ data, set, onNext, onBack }: StepProps) {
  const choose = (propertyType: string) => {
    set({ propertyType });
    window.setTimeout(onNext, AUTO_ADVANCE_MS);
  };

  return (
    <div className="step">
      <Progress current={1} />
      <StepHead
        eyebrow="Rental income"
        title="What type of rental is it?"
        help="Add the estimated rent first, then pick the closest property type."
      />
      <div className="q-body">
        <Field label="Estimated monthly rent" hint="Long term rent, market rent, or short term rental projection.">
          <MoneyInput value={data.monthlyRent} onChange={(v) => set({ monthlyRent: v })} placeholder="3,200" />
        </Field>
        <div className="opts cols-2">
          {PROPERTY_TYPES.map((p) => (
            <OptionCard
              key={p.id}
              icon={p.icon}
              title={p.title}
              sub={p.sub}
              selected={data.propertyType === p.id}
              onClick={() => choose(p.id)}
            />
          ))}
        </div>
        <NavRow onBack={onBack} onNext={onNext} disabled={!data.monthlyRent || !data.propertyType} />
      </div>
    </div>
  );
}

function StepCredit({ data, set, onNext, onBack }: StepProps) {
  const choose = (credit: string) => {
    set({ credit });
    window.setTimeout(onNext, AUTO_ADVANCE_MS);
  };

  return (
    <div className="step">
      <Progress current={2} />
      <StepHead
        eyebrow="Borrower profile"
        title="Roughly where is your credit?"
        help="A ballpark lets Cameron narrow the DSCR programs that may fit."
      />
      <div className="q-body">
        <div className="opts">
          {CREDIT.map((c) => (
            <OptionCard
              key={c.id}
              title={c.title}
              sub={c.sub}
              selected={data.credit === c.id}
              onClick={() => choose(c.id)}
            />
          ))}
        </div>
        <Reassure icon="shield" title="Checking options will not affect your credit">
          A full credit review only happens if you decide to move forward.
        </Reassure>
        <NavRow onBack={onBack} />
      </div>
    </div>
  );
}

function StepAbout({
  data,
  set,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
  consentState,
  setConsentState,
}: {
  data: Data;
  set: (patch: Partial<Data>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string;
  consentState: ConsentState;
  setConsentState: (s: ConsentState) => void;
}) {
  const { first, last, email, phone } = data;
  const emailOk = /\S+@\S+\.\S+/.test(email || "");
  const ready =
    !!first &&
    !!last &&
    emailOk &&
    (phone || "").replace(/\D/g, "").length >= 10 &&
    consentState.ready;

  return (
    <div className="step">
      <Progress current={3} />
      <StepHead
        eyebrow="About you"
        title="Almost done. Where should we send your DSCR options?"
        help="Cameron personally reviews every investor scenario."
      />
      <form
        className="q-body"
        onSubmit={(e) => {
          e.preventDefault();
          if (ready && !isSubmitting) onSubmit();
        }}
      >
        <input
          type="text"
          name="website"
          value={data.honeypot}
          onChange={(e) => set({ honeypot: e.target.value })}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
        />
        <div className="grid2">
          <Field label="First name">
            <input
              className="inp"
              value={first}
              placeholder="Jane"
              autoComplete="given-name"
              onChange={(e) => set({ first: e.target.value })}
            />
          </Field>
          <Field label="Last name">
            <input
              className="inp"
              value={last}
              placeholder="Doe"
              autoComplete="family-name"
              onChange={(e) => set({ last: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Email" error={email && !emailOk ? "Enter a valid email address." : null}>
          <input
            className="inp"
            type="email"
            value={email}
            placeholder="jane@example.com"
            autoComplete="email"
            onChange={(e) => set({ email: e.target.value })}
          />
        </Field>
        <Field label="Mobile phone" hint="So Cameron can text you your options.">
          <input
            className="inp"
            type="tel"
            value={phone}
            placeholder="(480) 555-0199"
            autoComplete="tel"
            onChange={(e) => set({ phone: e.target.value })}
          />
        </Field>
        <Reassure icon="lock" title="Your info stays private">
          We only use your details to review the DSCR scenario and follow up on your request.
        </Reassure>
        <TcpaConsent onChange={setConsentState} />
        {submitError && (
          <div className="reassure" style={{ background: "var(--red-50)", color: "var(--red-700)" }}>
            <AlertTriangle size={18} />
            <div>
              <b>{submitError}</b>
            </div>
          </div>
        )}
        <NavRow
          onBack={onBack}
          onNext={() => {
            if (ready && !isSubmitting) onSubmit();
          }}
          disabled={!ready || isSubmitting}
          nextLabel={isSubmitting ? "Submitting..." : "See My DSCR Options"}
          under="No cost. No obligation. Investor focused review."
        />
        <TcpaSubmitNotice />
      </form>
    </div>
  );
}

export default function Dscr() {
  const tracker = useRef(makeFunnelTracker("dscr")).current;
  const [stage, setStage] = useState<Stage>("s0");
  const [data, setData] = useState<Data>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return { ...DEFAULT_DATA, pageLoadTime: Date.now() };
      const saved = JSON.parse(raw) as Partial<Data>;
      return { ...DEFAULT_DATA, ...saved, pageLoadTime: saved.pageLoadTime || Date.now() };
    } catch {
      return { ...DEFAULT_DATA, pageLoadTime: Date.now() };
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [consentState, setConsentState] = useState<ConsentState>(EMPTY_CONSENT);

  useEffect(() => {
    trackFbEvent("ViewContent", {
      content_name: "DSCR",
      content_category: "Mortgage",
      funnel_version: FUNNEL_VERSION,
    });
    tracker.formStart();
  }, [tracker]);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }, [data]);

  const set = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));
  const go = (s: Stage) => {
    setStage(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const trackStep = (step: number, stepName: string) => {
    try {
      const payload = {
        event: "dscr_step_completed",
        page: "dscr",
        step_number: step,
        step_name: stepName,
        funnel_version: FUNNEL_VERSION,
      };
      if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
      else if (typeof window.gtag === "function") {
        window.gtag("event", "dscr_step_completed", {
          page: "dscr",
          step_number: step,
          step_name: stepName,
          funnel_version: FUNNEL_VERSION,
        });
      }
    } catch {}
  };
  const advanceFrom = (from: Stage, to: Stage) => {
    const steps: Record<Stage, { n: number; name: string }> = {
      s0: { n: 1, name: "property_numbers" },
      s1: { n: 2, name: "rental_income" },
      s2: { n: 3, name: "credit_score" },
      s3: { n: 4, name: "about_you" },
    };
    trackStep(steps[from].n, steps[from].name);
    go(to);
  };

  const SUBMIT_ERR =
    "Something went wrong with your submission. Please text or call Cameron directly at 805-415-0275 and he will get back to you within minutes.";

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError("");
    const attribution = leadSourceAttribution();
    const dscrGoal = [
      `Property type: ${optionLabel(PROPERTY_TYPES, data.propertyType)}`,
      `Estimated monthly rent: $${Number(data.monthlyRent || 0).toLocaleString("en-US")}`,
      `Funnel version: ${FUNNEL_VERSION}`,
    ].join(" | ");

    try {
      const result = await submitCrmLead({
        loanType: "DSCR",
        firstName: data.first,
        lastName: data.last,
        email: data.email,
        phone: data.phone,
        consent: consentState.consent,
        consent_text: consentState.consent_text,
        consent_version: consentState.consent_version,
        homeValue: data.propertyValue,
        mortgageBalance: data.loanAmount,
        creditScore: optionLabel(CREDIT, data.credit),
        loanPurpose: dscrGoal,
        honeypot: data.honeypot,
        pageLoadTime: data.pageLoadTime,
        turnstile_token: consentState.turnstile_token,
        ...attribution,
      });

      if (result.success) {
        trackFbEvent("Lead", {
          content_name: "DSCR",
          content_category: "Mortgage",
          funnel_version: FUNNEL_VERSION,
        });
        trackStep(4, "about_you");
        tracker.formSubmit();
        setSubmitError("");
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        setSubmitError(result.error || SUBMIT_ERR);
        setIsSubmitting(false);
      }
    } catch {
      setSubmitError(SUBMIT_ERR);
      setIsSubmitting(false);
    }
  }

  let screen: ReactNode;
  if (stage === "s0") {
    screen = (
      <div className="funnel-wrap">
        <StepProperty data={data} set={set} onNext={() => advanceFrom("s0", "s1")} />
      </div>
    );
  } else if (stage === "s1") {
    screen = (
      <div className="funnel-wrap">
        <StepRental data={data} set={set} onBack={() => go("s0")} onNext={() => advanceFrom("s1", "s2")} />
      </div>
    );
  } else if (stage === "s2") {
    screen = (
      <div className="funnel-wrap">
        <StepCredit data={data} set={set} onBack={() => go("s1")} onNext={() => advanceFrom("s2", "s3")} />
      </div>
    );
  } else {
    screen = (
      <div className="funnel-wrap">
        {submitted ? (
          <div className="step">
            <Progress current={3} />
            <div className="q-body">
              <div className="reassure">
                <Check size={18} />
                <div>
                  <b>Thanks, {data.first || "your request is in"}.</b>
                  <p>
                    Cameron will review the rental value, requested loan amount, rent, property type, and credit band
                    you shared, then follow up with DSCR options.
                  </p>
                </div>
              </div>
              <a className="btn btn-primary" href="tel:8054150275">
                Call or text Cameron <ArrowRight size={18} />
              </a>
            </div>
          </div>
        ) : (
          <StepAbout
            data={data}
            set={set}
            onBack={() => go("s2")}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
            consentState={consentState}
            setConsentState={setConsentState}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <PageMeta
        title="DSCR Investor Loan Options | Cameron Dill at Adaxa Home"
        description="Run a DSCR investor loan scenario based on rental cash flow, property value, requested loan amount, and credit profile with Cameron Dill at Adaxa Home."
        canonical="/dscr"
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
          areaServed: [
            "Arizona",
            "California",
            "Colorado",
            "Connecticut",
            "Florida",
            "Idaho",
            "Pennsylvania",
            "Texas",
            "Virginia",
            "Washington",
          ].map((name) => ({ "@type": "State", name })),
          url: "https://smartr8.com/dscr",
        }}
      />

      <Header />
      <div className="heloc-v3 flex-1 flex flex-col">
        <main className="main">{screen}</main>
      </div>
      <Footer />
    </div>
  );
}
