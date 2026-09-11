# AI Suggestion Compare

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiSuggestionCompare`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Compare AI-generated options — benefit, tradeoff, confidence, risk — and choose, ask for another, or send for approval.

AISuggestionCompare is the broader canonical pattern for AI-generated comparisons. It supersedes the v1 `ai-card-recommendation-compare` (kept in the registry for legacy surfaces) and is what new product surfaces should reach for when the AI presents multiple options, scenarios, or next-best actions.

**Export:** `AISuggestionCompare`

Three density levels: Simple (chat, narrow drawers) renders title + benefit + risk + Why this?; Rich (split view, product page) adds tradeoff, confidence, source/freshness, and an Ask-for-another action; Robust (review, approval, AI-led workspaces) adds a per-option metrics row, view-rationale / view-sources / view-assumptions, and an approval state.

Higher-density-only props are ignored at lower densities with a dev warning — a Simple compare card cannot accidentally grow a Robust approval footer.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/organisms/ai-suggestion-compare/AISuggestionCompare.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-suggestion-compare/ai-suggestion-compare.md` | This mirror spec |
| `components/ai/organisms/ai-suggestion-compare/ai-suggestion-compare.agent.json` | Agent manifest |
| `components/ai/organisms/ai-suggestion-compare/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Recommend · Compare · Simulate · Prioritize · Explain · Review · Escalate · Generate |
| Accountability | Confidence · Risk · Rationale · Sources · Assumptions · Tradeoffs · Human review · Approval · Audit trail |

## When to use

- AI generates multiple options the user must choose between
- User needs to compare benefits and tradeoffs
- Recommendation needs human choice or human review
- Scenario planning needs side-by-side comparison
- Decision requires approval or escalation
- User may ask for another option

## When not to use

- There is only one simple recommendation — use `ai-notification`
- A full data table is needed
- The AI is not actually comparing options
- The decision is final — use `ai-change-summary`
- Long-form rationale is needed before comparing — use `ai-rationale-panel`

## Anatomy

1. **Title** _(Shared)_ — Optional H3 comparison title ("Coverage recommendations").
2. **Summary** _(Shared)_ — Optional 1-line summary above the options.
3. **AI attribution** _(Unique)_ — Optional uppercase generated-by label ("ZAIDYN AI") and timestamp in the header.
4. **Status badge** _(Unique)_ — Header tag for `needsApproval` and `sentForApproval` states.
5. **Option card — title** _(Unique)_ — Action-oriented title ("Expand NE-02 by 5 accounts").
6. **Option card — benefit** _(Unique)_ — Specific, quantified benefit value.
7. **Option card — tradeoff** _(Unique)_ — Rich+. Honest tradeoff text.
8. **Confidence + risk pills** _(Shared)_ — Rich+. Pill-style confidence + risk labels on each option.
9. **Per-option metrics** _(Unique)_ — Robust only. Auto-fit grid of quantified metrics inside the option.
10. **Source + freshness** _(Shared)_ — Rich+. `AIChipBrief` pills for source/freshness on each option.
11. **Why this? link** _(Shared)_ — Per-option link opening the rationale panel for that option.
12. **Recommended marker** _(Unique)_ — Brand-color tag at the top of the recommended option (also drawn as a brand outline ring).
13. **Choose action** _(Shared)_ — Per-option `AIButton`. Primary when selected, secondary otherwise. Disabled state respects `disabled` prop.
14. **Footer — links** _(Shared)_ — Rich+. View-rationale / view-sources / view-assumptions links anchored to the right.
15. **Footer — actions** _(Shared)_ — Ask-for-another (left) + Send-for-approval (right) action row.
16. **Reviewer line** _(Unique)_ — Robust. Footer label showing the assigned reviewer.

## State variations

- **Simple — chat / narrow drawer** _(density="simple")_ — Two options. Title + benefit + risk pill + Why this? + Choose. No tradeoff, no source, no approval footer.
- **Rich — split view / product page** _(density="rich")_ — Adds tradeoff + confidence + source/freshness on every option, and a view-rationale link in the footer.
- **Robust — three options + per-option metrics + governance footer** _(density="robust")_ — Per-option metrics row, view-rationale + view-sources + view-assumptions links, reviewer line, and Send-for-approval action.
- **Selected option** _(suggestion.selected = true)_ — Brand-surface fill + brand border on the chosen option; Choose button switches to "Selected ✓" in primary tone.
- **Needs approval** _(status="needsApproval")_ — Header status tag indicates the comparison cannot be applied directly without review; footer surfaces Send-for-approval.
- **Sent for approval** _(status="sentForApproval")_ — Approval has been requested. Status tag flips to "Sent for approval". Use alongside an audit trail in the host page.
- **Loading — generating options** _(status="loading")_ — Skeleton option cards + calm copy ("Generating options…"). Respects `prefers-reduced-motion`.
- **No viable option** _(status="noViableOption")_ — Empty state. Tells the user to adjust assumptions or ask for another option. No option cards rendered.
- **Disabled option** _(suggestion.disabled = true)_ — One option is greyed out + marked Unavailable. Choose button is disabled. Other options stay actionable.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `"simple" \| "rich" \| "robust"` | `required` | Controls which fields render on each option and which links surface in the footer. Higher-density-only props are ignored at lower densities with a dev warning. |
| `title` | `string` | `—` | Comparison title (H3). |
| `summary` | `string` | `—` | 1-line summary under the title. |
| `generatedBy` | `string` | `—` | Rich+. Uppercase brand-color attribution label ("ZAIDYN AI"). |
| `timestamp` | `string` | `—` | Rich+. Freshness or "Generated" timestamp. |
| `suggestions` | `AISuggestionItem[]` | `required` | 2–4 option objects. See suggestion shape below. |
| `layout` | `"sideBySide" \| "stacked" \| "grid" \| "compact"` | `density-driven` | Overrides the auto-layout. Simple defaults to sideBySide for 1–2 options and stacked for more; Rich/Robust default to sideBySide for 1–3 and grid for 4. |
| `status` | `"default" \| "loading" \| "updating" \| "selected" \| "needsApproval" \| "sentForApproval" \| "noViableOption" \| "error"` | `"default"` | Overall comparison status. |
| `approvalRequired` | `boolean` | `false` | Robust. Surfaces the needs-approval treatment in the footer. |
| `reviewer` | `string` | `—` | Robust. Reviewer name shown in the footer ("Reviewer: Maya Chen"). |
| `onSelectSuggestion` | `(id: string) => void` | `—` | Fires when the user clicks Choose on an option. |
| `onAskForAnother` | `() => void` | `—` | Footer action: requests another option. |
| `onSendForApproval` | `() => void` | `—` | Footer action: routes the comparison into the approval flow. |
| `onViewRationale` | `() => void` | `—` | Rich+. Renders the View rationale link. |
| `onViewSources` | `() => void` | `—` | Robust. Renders the View sources link. |
| `onViewAssumptions` | `() => void` | `—` | Robust. Renders the View assumptions link. |
| `loadingLabel` | `string` | `"Generating options…"` | Calm copy displayed above the skeleton during the loading state. |

## Flows

### Compare and choose
AI presents two suggestions. User chooses one. System moves to review or change summary.
- AI renders `<AISuggestionCompare density="simple" />` with 2 options + recommended marker on option 1
- RiUserLine clicks Choose option 1 → `onSelectSuggestion("opt-1")` fires
- Host routes to `ai-change-summary` or review flow with the chosen suggestion ID

### Ask for another option
User selects Ask for another option. AI generates another suggestion and updates the compare set.
- User clicks Ask for another option → `onAskForAnother()` fires
- Host swaps `status` to `"updating"` while the model returns a new suggestion
- New suggestion is appended; status reverts to `"default"`

### Send for approval
Robust governance flow — user selects an option and routes it for human review.
- User selects an option → `selected: true` on that suggestion
- User clicks Send for approval → `onSendForApproval()` fires
- Host sets `status="sentForApproval"`; header status tag flips; audit trail picks up the event

### Inspect rationale
User opens the per-option rationale or the comparison-level rationale.
- User clicks the per-option Why this? link → opens `ai-rationale-panel` scoped to that option
- Or user clicks footer View rationale → opens `ai-rationale-panel` scoped to the whole comparison

### No viable option
Constraints rule out all options. Empty state nudges the user to adjust assumptions or ask for another option.
- Host sets `status="noViableOption"` and clears `suggestions`
- Card renders the empty-state message + Ask-for-another action in the footer

## Canonical implementation

```tsx
import { AISuggestionCompare } from 'ai/organisms/ai-suggestion-compare/AISuggestionCompare';

// Simple — chat / narrow drawer
<AISuggestionCompare
  density="simple"
  title="Coverage recommendations"
  suggestions={[
    { id: 'opt-1', title: 'Expand NE-02 by 5 accounts',  benefit: '+$1.4M incremental revenue', riskLevel: 'low',    confidenceLevel: 'high',   recommended: true, onWhyThis: () => {} },
    { id: 'opt-2', title: 'Realign 3 accounts to NE-02', benefit: '+$820K repositioned revenue', riskLevel: 'medium', confidenceLevel: 'medium', onWhyThis: () => {} },
  ]}
  onSelectSuggestion={(id) => {}}
  onAskForAnother={() => {}}
/>

// Robust — review / approval flow
<AISuggestionCompare
  density="robust"
  generatedBy="ZAIDYN AI"
  timestamp="Generated 1h ago"
  title="Coverage recommendations"
  summary="Three options ranked by expected incremental revenue."
  suggestions={[ /* …with per-option metrics, source, freshness, riskLevel, confidenceLevel */ ]}
  approvalRequired
  reviewer="Maya Chen"
  onSelectSuggestion={(id) => {}}
  onAskForAnother={() => {}}
  onSendForApproval={() => {}}
  onViewRationale={() => {}}
  onViewSources={() => {}}
  onViewAssumptions={() => {}}
/>
```

## Agent rules

1. Read this mirror spec and `ai-suggestion-compare.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-suggestion-compare/ai-suggestion-compare.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
