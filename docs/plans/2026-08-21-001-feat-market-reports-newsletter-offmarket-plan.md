---
title: Suburb Market Reports, Segmented Newsletter & Off-Market Section - Plan
type: feat
date: 2026-08-21
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

# Suburb Market Reports, Segmented Newsletter & Off-Market Section - Plan

## Goal Capsule

Add the three highest-value features surfaced from the Jellis Craig competitive review: per-suburb market report lead magnets, a suburb-segmented newsletter sign-up, and a gated "Off Market & Coming Soon" section. All three feed the existing CLAUDE.md strategy (Priority 1 lead capture, weekly market email, buyer database).

Authority: the no-mock-data policy overrides everything — every market figure comes from real VaultRE data; no placeholder stats, no fabricated medians, ever. Report sections with insufficient data are omitted, not faked.

Stop conditions: stop and surface if VaultRE sold/comparable-sales endpoints prove unavailable to our credentials (blocks U2), or if there is no email platform decision for newsletter storage (U3 falls back to lead-email delivery, but flag it).

Context: the site already has 20 suburb guide pages (`/suburbs/{slug}`), a suburbs index (`/suburbs-guide`), a lead API (`/api/lead`) with a `market-report` type validating against the canonical `SUBURBS` list in `src/lib/jsonLd.ts`, auth via `AuthContext`, and a `/buy/coming-soon` page. Competitive analogues: Jellis Craig "Suburb Reports", their market-area-segmented sign-up, and "Only on Jellis Craig".

---

## Product Contract

### Requirements

- R1. Each of the 20 suburb pages offers a "Free {Suburb} market report" capture: name + email in exchange for a report, delivered via the existing `/api/lead` `market-report` flow.
- R2. The report content is a server-rendered page (`/suburbs/{slug}/market-report`) built exclusively from real VaultRE data: recent sales (address, price, date), current listing count, and median price where ≥ a minimum sample size; any section without real data is omitted.
- R3. A newsletter sign-up (footer, site-wide) lets the subscriber pick one or more suburbs of interest plus buy/sell/rent intent; submissions carry the segmentation data into the lead pipeline.
- R4. An "Off Market & Coming Soon" page lists pre-market properties from VaultRE; full details visible only to signed-in users, with a sign-up prompt for anonymous visitors (address suppressed, teaser only).
- R5. All forms include the honeypot pattern and consent language consistent with the contact form.
- R6. No mock data anywhere; API unavailability renders honest empty/fallback states.

### Success Criteria

- Submitting the report form on a suburb page produces a lead email tagged with the suburb and links the user to a real-data report page.
- Newsletter submissions arrive with suburb + intent segmentation visible in the lead email.
- `/buy/off-market` (or equivalent) shows real coming-soon/off-market stock to a signed-in user and a gated teaser to an anonymous one.

### Scope Boundaries

- Out of scope: PDF generation (report is a web page; print stylesheet is enough), email-platform automation (Mailchimp/Resend audiences — deferred until platform decision), price-trend charts (needs historical data accumulation first), the annual flagship report (separate project).

### Open Questions

- Which email platform will hold the segmented newsletter list? Until decided, U3 delivers subscriptions as lead emails (same as other forms) — non-blocking.
- Does VaultRE expose off-market/pre-market listings distinctly from `coming-soon` statuses? U4's first step verifies against the live API.

---

## Units of Work

### U1. Market-report capture on suburb pages

**Goal:** Every suburb page has a working "free market report" lead magnet.
**Requirements:** R1, R5.
**Dependencies:** none.
**Files:** `src/components/MarketReportCapture.tsx` (new), suburb page client components (one shared insertion point — check `src/app/suburbs/[suburb]/` template vs per-suburb pages), `src/app/api/lead/route.ts` (no change expected — `market-report` type exists).
**Approach:** small client component (name, email, hidden suburb, honeypot, consent line) posting `type: 'market-report'` to `/api/lead`; on success, link/redirect to `/suburbs/{slug}/market-report`. Place after the market/lifestyle section on suburb pages.
**Verification:** submit on two suburbs; lead email arrives suburb-tagged; typecheck/build pass.

### U2. Server-rendered suburb market report page

**Goal:** `/suburbs/{slug}/market-report` shows real recent sales and market stats.
**Requirements:** R2, R6.
**Dependencies:** none (parallel with U1).
**Files:** `src/app/suburbs/[suburb]/market-report/page.tsx` (new, server component with ISR `revalidate = 86400`), `src/services/marketData.ts` (new fetch/aggregate layer over VaultRE sold listings), reuse `SUBURBS` for slug validation (unknown slug → 404).
**Approach:** fetch sold properties for the suburb from VaultRE (the sold/comparable endpoints — verify availability first; this is the stop condition), compute count/median/range in plain code with a minimum sample size (e.g. ≥ 5 sales before showing a median), render sales list + stats + appraisal CTA. Sections with insufficient data are omitted. Print stylesheet for "download".
**Verification:** curl of a built report page contains a real sold address; a suburb with no sales renders the honest empty state; no mock numbers anywhere in the diff.

### U3. Suburb-segmented newsletter sign-up

**Goal:** Site-wide footer sign-up capturing suburb interests and intent.
**Requirements:** R3, R5.
**Dependencies:** none.
**Files:** `src/components/NewsletterSignup.tsx` (new), `src/components/OncomFooter.tsx` (render it above the acknowledgement), `src/app/api/lead/route.ts` (add `newsletter` type: allowed fields `suburbs`, `interest`; validate suburbs against `SUBURBS`).
**Approach:** email + suburb multi-select (checkbox chips from `SUBURBS`) + buy/sell/rent radio + honeypot + consent. Posts `type: 'newsletter'`; delivered as a lead email until an email platform is chosen (flagged in plan Open Questions).
**Verification:** submission arrives with suburbs and intent listed; invalid suburb values rejected server-side.

### U4. Gated Off Market & Coming Soon section

**Goal:** Exclusive-stock page that builds the buyer database.
**Requirements:** R4, R5, R6.
**Dependencies:** verify VaultRE off-market/pre-market status support first (open question).
**Files:** `src/app/buy/off-market/page.tsx` (new), reuse `/buy/coming-soon` data fetching, `AuthContext` for the gate, `OncomHeader` Buy dropdown (add link).
**Approach:** fetch coming-soon/off-market stock via the existing properties API filtered by status; signed-in users see full cards; anonymous users see suburb + beds/baths teaser cards with blurred/omitted address and an inline sign-up prompt (existing `AuthModal`). Empty state is honest ("No off-market properties right now — register to be first to know" wired to alerts).
**Verification:** signed-out vs signed-in render difference confirmed in browser; no property data leaked in anonymous HTML payload.

## Sequencing

U1 + U2 together are the lead-magnet slice (highest value, matches CLAUDE.md Priority 1 quick win). U3 is independent and small. U4 last — it depends on a VaultRE status-field check. No unit blocks another across slices.
