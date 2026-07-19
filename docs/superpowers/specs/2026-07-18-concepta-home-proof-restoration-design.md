# Concepta Home Content and Proof Design

**Date:** 2026-07-18

**Status:** Implemented and verified

**Page:** `/`

## 1. Decision

Restore the complete marketing substance that existed on `origin/main`, then
apply only narrow improvements that preserve the same positioning, offer,
proof, and product meaning.

The homepage remains a delivery-company page. Its primary conversion is a
Delivery Readiness Assessment, and its open-source work is the evidence that
Concepta turns recurring delivery problems into reusable foundations.

Missing public provenance is not evidence that an approved company claim is
false. Tests and documentation must not classify a claim as false or
misattributed unless contradictory evidence exists. The linked Production Gap
report already publishes the Truist, FEMA, and AdventHealth outcomes, so the
homepage and report must not contradict one another merely because the source
trail is incomplete.

This is the final decision record for the homepage's marketing content,
proof categories, accessibility, contact, root SEO, metadata, and motion
behavior.

## 2. Marketing Constraints

- Preserve the original core thesis: Concepta owns the gap between written
  code and a safely live system.
- Preserve the defined offer name: **Delivery Readiness Assessment**.
- Preserve concrete proof instead of replacing it with generic process labels.
- Keep Concepta clients separate from organizations using Concepta's
  open-source work.
- Keep all six approved client logos: Truist, AdventHealth, FEMA, Red Lobster,
  Warner Music Group, and Google.
- Keep Universal, Disney, BMW, Toyota, LG, and Nubank as user-confirmed
  open-source adoption proof, not client proof.
- Do not remove or rewrite a factual company claim merely because it lacks a
  public URL. Capture provenance as follow-up work instead.
- Make wording changes only when they are more precise, more durable, or more
  defensible without weakening the original meaning.

## 3. Approved Surgical Copy

### Hero and proof

Keep the original stance and headline.

Use the original lead:

> Between code that's written and a system that's safely live, there's a gap.
> We own it — the decisions, the release, the outcome. And we build our own
> tools to do it.

Use **Get a Delivery Readiness Assessment** for both primary buttons.

Use this durable proof ticker:

- `Since 2006`
- `600+ projects delivered`
- `98% delivery satisfaction`

Keep the label **Selected Concepta clients** and the complete six-logo band.
Restore the outcome row with the approved results:

- `27% more loan applications at Truist`
- `Up to $3M saved in a two-day FEMA activation`
- `4.7★ across 16k reviews at AdventHealth`

The FEMA wording is the only factual correction to the old row. Concepta's
public FEMA case study says savings reached **up to $3 million in two days**;
`$3M+` reverses that bound.

### Delivery model

Restore the original heading and lead:

> We don't advise from the sideline. We own the outcome.

> One owner, from the first readiness call to the live release. We make the
> hard technical decisions, stabilize or build, and stand behind what ships.
> Advice doesn't ship. We do.

Restore the three original evidence cards:

1. `35+` — **Small by design.** A 35-person firm — small enough that our
   leadership stays in the actual work: in the decisions, through the release,
   not just the pitch.
2. `+27%` — **We ship what a business depends on.** Truist: 27% more loan
   applications. AdventHealth: 4.7 stars across 16,000 reviews. Proven in
   fintech, healthcare, and government.
3. `20yr` — **We don't start from scratch.** Two decades of building our own
   delivery foundation — the tools below — so every release starts from proven
   blocks, not a blank page.

Do not retain the new vendor-handoff promise; it was introduced by the rewrite
and is not part of the established positioning.

### Research

Restore:

> The evidence behind governed delivery.

> Building is accelerating. The controls around review, release, and
> production are not. Our latest report maps the gap — and the operating model
> that closes it.

This keeps the research applicable beyond a single implementation technology.

### Delivery foundation

Preserve the original three-part explanation while using the confirmed,
better-separated adoption proof:

> Every project here started inside real delivery work — then got extracted,
> hardened, and shipped. Our open-source work is used by teams at Universal,
> Disney, BMW, Toyota, LG, Nubank, and others. Open source where the community
> builds with us, product where the problem demands more.

Restore the eight original product descriptions. They contain useful benefits
and scope that the shorter rewrite removed, including FVM's no-reinstall
benefit, Stargate's approved-capability boundary, and Code Analysis support for
any repository.

### Closing assessment

Restore:

> Know whether it's safe to ship.

> Start with a Delivery Readiness Assessment — in two to three weeks you'll
> know exactly where your release stands, and what to do next.

Use **Get a Delivery Readiness Assessment** as the primary action.

### Metadata

Restore the original descriptive sentence in both metadata locations:

> Concepta ships the systems your business runs on — and builds the open-source
> delivery foundation behind them: Mix, Remix, Naked UI, Ack, FVM, Rockets,
> Stargate, and Code Analysis.

Keep the verified `concepta.dev` metadata base, root-only canonical, and
Organization structured data.

## 4. Technical Improvements to Preserve

- Reduced-motion behavior and immediately visible reveal content
- Accessible hero-video motion control and listener cleanup
- Semantic `h3` project headings
- AA-safe Ack accent and primary-button hover colors
- Verified contact card and centralized identity/contact constants
- Root-scoped Organization JSON-LD
- `concepta.dev` metadata base and root-only canonical
- Six/three/two-column responsive client grid

These changes improve accessibility, trust, or discoverability without
changing the marketing narrative.

## 5. Test and Documentation Policy

Homepage tests should protect structure and approved content, not adjudicate
marketing truth from public-search availability.

- Require the complete client list and its separation from open-source users.
- Require the restored ticker, outcome row, delivery cards, CTA, project
  benefits, and metadata description.
- Do not label the approved outcomes `unsupported` or ban them in source
  tests.
- Preserve tests for contact, canonical metadata, structured data, semantics,
  contrast, and reduced motion.
- Record the AdventHealth provenance accurately: no durable historical source
  was captured during the review, and that absence did not disprove the
  company-approved claim.

## 6. Verification

- Focused homepage source tests pass.
- All site tests and TypeScript checks pass.
- Production build passes.
- Desktop and mobile inspection confirms the restored outcome row, six client
  logos, complete adoption sentence, working CTAs, readable contact details,
  and no horizontal overflow.
- The final diff contains no unrelated product-page or infrastructure changes.
