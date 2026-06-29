# 10DLC Campaign Resubmission Package

Reference for resubmitting the A2P 10DLC campaign after the `709` rejection
("Lead Gen / Affiliate Marketing prohibited; high-risk financial services").

The fix is **not** in code — the website opt-in (`src/lib/tcpa.ts` consent v4)
and Privacy Policy §5 ("SMS communication and A2P 10DLC compliance") are already
compliant. The rejection is about how the campaign **use case** was registered.
Resubmit reframed as **first-party customer care** from a licensed mortgage
originator.

- **Brand:** Cameron Dill / Adaxa Home (TCR ID CPO2A0R)
- **NMLS:** #763991 (individual) / #2380533 (Adaxa Home, LLC)

---

## 1. Campaign use case

**Use case:** `Customer Care` (avoid "Marketing" / "Mixed" / "Lead Generation")

## 3. Campaign details

**Vertical:** `Financial Services` (or `Real Estate` if Financial Services isn't listed)

**Campaign description:**

> First-party customer-care messaging from a licensed mortgage loan originator
> (Adaxa Home, LLC, NMLS #2380533) to consumers who personally submitted an
> inquiry on smartr8.com requesting help with their own mortgage or home-equity
> options. Messages are 1:1 follow-ups about the consumer's own request:
> scheduling, document follow-up, and answering questions. No third-party,
> purchased, or affiliate-sourced contacts; no lead resale.

**Opt-In Workflow Description (message flow):**

> Consumers opt in digitally at smartr8.com by submitting a mortgage / home-equity
> inquiry form and checking an unchecked-by-default consent box agreeing to
> receive recurring SMS from Cameron Dill (NMLS #763991) / Adaxa Home, LLC.
> Consent language and Privacy Policy (with the SMS clause) are at
> https://smartr8.com/privacy. No opt-ins are purchased or sourced from third
> parties.

**Sample messages:**

1. Hi {Name}, it's Cameron at Adaxa Home (NMLS #763991) following up on the mortgage request you submitted on smartr8.com. Is now a good time to go over your options? Reply STOP to opt out, HELP for help.
2. {Name}, I pulled a couple of options for your home-equity goal. Want me to text or email the details? Msg & data rates may apply. Reply STOP to opt out.
3. Quick follow-up on your request - I have a few times open this week to talk it through. Reply STOP to opt out.
4. {Name}, I still have the documents checklist ready when you are. Reply with any questions. Reply STOP to opt out, HELP for help.
5. Reminder: your call with Cameron at Adaxa Home is set for {time}. Reply to reschedule. Reply STOP to opt out.

## Keywords

- **Opt-out keywords:** `STOP, STOPALL, UNSUBSCRIBE, QUIT, CANCEL, END`
- **Opt-in keywords:** `START, YES, UNSTOP`
- **Help keywords:** `HELP, INFO`

## Auto-responses

**Opt-in message:**

> Adaxa Home: Thanks for confirming! You'll get occasional mortgage updates from
> Cameron Dill (NMLS #763991). Msg frequency varies. Msg & data rates may
> apply. Reply HELP for help, STOP to opt out.

**Opt-out message:**

> Adaxa Home: You're unsubscribed and will receive no further messages. Reply
> START to resubscribe.

**Help message:**

> Adaxa Home (NMLS #2380533). Help: 805-415-0275 or Cdill@adaxahome.com.
> Msg & data rates may apply. Reply STOP to opt out.

## Toggles / yes-no flags

| Field | Value |
|---|---|
| Subscriber opt-in | Yes |
| Subscriber opt-out | Yes |
| Subscriber help | Yes |
| Embedded link | Yes (links to smartr8.com / scheduling) |
| Embedded phone number | Yes |
| Age-gated content | No |
| Direct lending or loan arrangement | Yes (mortgage — answer honestly) |
| Affiliate marketing | No |
| Number pooling | No (unless using 50+ numbers) |

---

## What decides approval more than the copy

1. **Standard Brand Vetting** — financial vertical. Request it under
   Telnyx → Brand. Raises the trust score and is often required for financial
   campaigns to clear T-Mobile / AT&T.
2. **CTA / opt-in URL** must point at a page where the consent box + Privacy §5
   are visible (`smartr8.com/privacy`). Reviewers click it.
3. If it bounces again, open a **Telnyx support ticket** referencing reason 709
   and ask which use case they'll accept for a licensed-mortgage first-party
   campaign.
