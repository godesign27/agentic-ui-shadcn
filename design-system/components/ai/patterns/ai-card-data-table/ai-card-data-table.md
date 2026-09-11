# AI Card Data Table

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardDataTable`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

One reusable table block — compact in chat, contextual in a drawer, governed in a review flow. Density picks how much trust + action context comes along.

AICardDataTable is the canonical pattern for AI-generated tables across Guild. It supersedes ad-hoc table compositions inside chat bubbles, side drawers, dashboard modules, and review flows.

**Export:** `AICardDataTable`

Three density levels follow the same paradigm used by `ai-card-metric`, `ai-card-analysis`, and `ai-suggestion-compare`: Simple (chat, narrow drawer) renders title + rows + source names + optional confidence; Rich (split view, product page, dashboard module) adds tradeoff/threshold cell highlighting, source + freshness, view-rationale, and a light action footer; Robust (review, approval, AI-led workspaces) adds row-level governance (loading, applied, pending approval), cell-level AI provenance (estimated, projected, suggested), progressive validation, reviewer line, audit trail, change summary, and an approval-aware action footer.

Higher-density-only props are ignored at lower densities with a dev warning — a Simple chat table cannot accidentally grow a Robust approval footer.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/organisms/ai-card-data-table/AICardDataTable.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-data-table/ai-card-data-table.md` | This mirror spec |
| `components/ai/organisms/ai-card-data-table/ai-card-data-table.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-data-table/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Summarize · Compare · Detect · Review · Validate · Apply · Approve · Escalate |
| Accountability | Sources · Freshness · Confidence · Risk · Rationale · Assumptions · Audit trail · Change summary · Human review · Approval |

## When to use

- AI returns a tabular answer the user wants to scan quickly
- A side drawer or dashboard module needs a compact, source-backed table
- A review flow needs row- and cell-level provenance (applied / pending / suggested / estimated)
- The user must approve, escalate, or apply table-level changes
- Some cells need threshold, freshness, or AI-provenance treatment

## When not to use

- A single value answer is enough — use `ai-card-metric`
- A full enterprise data grid with sorting / filtering / paging is needed — use the Standard Library table
- No tabular structure is required — use `ai-response-bubble` text
- Long-form rationale is needed — open `ai-rationale-panel` instead of expanding the table card
- The decision is final and the data will not change — use `ai-change-summary`

## Anatomy

1. **Conversational intro** _(Shared)_ — Optional 1-line lead-in sentence above the card ("Here is the Q2 coverage breakdown by region.").
2. **Header row** _(Shared)_ — Uppercase generatedBy + timestamp on the left; confidence + risk pills + approval-status tag on the right. Tinted header surface for Rich+.
3. **Title + subtitle** _(Shared)_ — H3 table title + optional 1-line subtitle (Rich+ only).
4. **Flagged-rows callout** _(Unique)_ — Rich+. Single-line summary of flagged values on a pale warning surface above the table.
5. **Column header row** _(Shared)_ — Uppercase micro-eyebrow column labels on the tinted surface. Numerics right-aligned; tabular numerals throughout.
6. **Table body — cell states** _(Unique)_ — Per-cell state: flagged / belowThreshold (red tint), aboveThreshold (green tint), aiGenerated / estimated / projected / simulated (italic + brand dot), stale (muted + clock glyph), missing / notApplicable (em-dash), loading (shimmer), changed (brand-surface tint), error (red glyph), permissionRestricted (lock).
7. **Table body — row states** _(Unique)_ — Per-row leading marker + optional left rail: applied (green dot), pendingApproval (orange dot + amber rail), needsReview (amber rail), flagged (red rail), updating (animated dot), permissionRestricted (lock glyph).
8. **Trust footer** _(Shared)_ — Rich+. Row count · source chip · freshness chip · reviewer line (Robust). View-rationale / view-sources / view-assumptions / view-audit-trail / view-change-summary links anchored right.
9. **Action footer** _(Shared)_ — Primary + secondary action buttons on the right; optional tertiary action on the left. Top divider. Approval-aware: when approvalRequired the primary swaps to "Send for approval"; sentForApproval locks the action.
10. **Expand Full Table** _(Unique)_ — Robust. Top-right icon button (zs-icon-frame-expand) with a hover tooltip ("Expand Full Table") wired to `onExpand`. Replaces a footer-anchored "Open full table" action so it stays out of the way until the user reaches for it.
11. **Body callouts** _(Shared)_ — Error / sourceUnavailable / empty / permissionRestricted replace the table with a tone-coded message + optional Retry button.

## State variations

- **Simple density — chat-ready** _(density="simple")_ — Intro + 5-row table + row count + source name in the footer. No actions, no flagged callout, no trust footer.
- **Rich density — split view / drawer** _(density="rich")_ — Adds flagged-rows callout, source + freshness chips, view-rationale link, and one primary action.
- **Robust density — review / approval** _(density="robust")_ — Per-row governance markers (applied, pendingApproval, updating), changed-cell tint, reviewer line, view-rationale / sources / audit-trail links, top-right Expand Full Table icon, and an action footer with Apply suggestions + Compare regions.
- **Loading — skeleton rows** _(state="loading")_ — Calm copy + a full skeleton table while the model is generating rows. Respects prefers-reduced-motion.
- **Progressive loading** _(state="progressiveLoading")_ — Robust. Real rows render first; trailing skeleton rows fill in while validation runs. A "Validating remaining rows…" caption sits below the table.
- **Partial data** _(cell.state="missing|notApplicable|stale")_ — Cells with missing / notApplicable values render an em-dash with an accessible label. Stale values mute the color and prepend a clock glyph.
- **Source unavailable** _(state="sourceUnavailable")_ — Body replaced with a tone-warned callout. Retry button restores the table when the user resolves the source.
- **Empty** _(state="empty")_ — No rows match the current filters. Calm empty-state copy + nudge to adjust assumptions.
- **Error** _(state="error")_ — Body replaced with an error callout. Retry button fires `onRetry`.
- **Flagged values** _(cell.state="flagged|belowThreshold|aboveThreshold")_ — Cell-level highlighting tour — red tint for flagged / belowThreshold, green tint for aboveThreshold, with row-level marker dots and left rails.
- **AI-generated cells** _(cell.state="aiGenerated|estimated|projected|simulated")_ — Italic value + brand dot prefix on AI-generated cells. Used for projections, estimates, simulated values, or model-suggested fills.
- **Sent for approval** _(state="sentForApproval")_ — Header status tag flips to "Sent for approval". Primary action locks; reviewer line is visible. Use alongside an audit trail in the host page.
- **Permission restricted** _(row.state="permissionRestricted")_ — Locked rows render at 0.55 opacity with a leading lock glyph and em-dashes in restricted cells. aria-disabled and the glyph carry the meaning — color is never the sole signal.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `density` | `"simple" \| "rich" \| "robust"` | `required` | Controls which fields render. Higher-density-only props are ignored at lower densities with a dev warning. |
| `state` | `"default" \| "loading" \| "progressiveLoading" \| "updating" \| "partialData" \| "empty" \| "sourceUnavailable" \| "permissionRestricted" \| "error" \| "reviewNeeded" \| "actionable" \| "applied" \| "sentForApproval"` | `"default"` | Overall table state. Drives skeletons, callouts, approval tags, and locked actions. |
| `title` | `string` | `—` | Table title (H3). |
| `subtitle` | `string` | `—` | Rich+. Sub-line under the title. |
| `intro` | `string` | `—` | Conversational lead-in sentence rendered above the card shell. |
| `generatedBy` | `string` | `—` | Robust. Uppercase brand-color attribution label ("Guild AI"). |
| `timestamp` | `string` | `—` | Robust. Freshness or "Generated" timestamp. |
| `confidence` | `"low" \| "medium" \| "high" \| "unknown"` | `—` | Header trust pill. Hidden when "unknown" or omitted. |
| `risk` | `"low" \| "medium" \| "high" \| "critical" \| "unknown"` | `—` | Header risk pill. Hidden when "unknown" or omitted. |
| `columns` | `AIDataTableColumn[]` | `required` | Column definitions — id, label, align, width, type. RiFontSize2 drives alignment and tabular numerals. |
| `rows` | `AIDataTableRow[]` | `required` | Row objects with cells array (must match columns length), optional row state, optional note. |
| `rowCount` | `number` | `—` | Footer row count when truncating ("5 rows"). |
| `flaggedSummary` | `string` | `—` | Rich+. Single-line callout above the table for flagged-row context. |
| `source` | `{ label: string; icon?: string }` | `—` | Footer source chip (Rich+). |
| `freshness` | `string` | `—` | Footer freshness chip (Rich+). |
| `reviewer` | `string` | `—` | Robust. Reviewer name shown in the footer trust line. |
| `approvalRequired` | `boolean` | `false` | Robust. When true, primary action swaps to "Send for approval". |
| `onViewRationale` | `() => void` | `—` | Rich+. Renders the View rationale link. |
| `onViewSources` | `() => void` | `—` | Robust. Renders the View sources link. |
| `onViewAssumptions` | `() => void` | `—` | Robust. Renders the View assumptions link. |
| `onViewAuditTrail` | `() => void` | `—` | Robust. Renders the View audit trail link. |
| `onViewChangeSummary` | `() => void` | `—` | Robust. Renders the View change summary link. |
| `primaryAction` | `{ label, onClick?, disabled? }` | `—` | Rich+. Primary action button in the footer. |
| `secondaryAction` | `{ label, onClick?, disabled? }` | `—` | Rich+. Secondary action button. |
| `tertiaryAction` | `{ label, onClick? }` | `—` | Robust. Tertiary action (left-anchored). |
| `onExpand` | `() => void` | `—` | Robust. Renders a small expand-icon button in the top-right of the header with a hover tooltip. Use this for the "Expand Full Table" affordance instead of a footer-anchored action. |
| `expandTooltip` | `string` | `"Expand Full Table"` | Hover-tooltip label for the top-right expand icon. |
| `onRetry` | `() => void` | `—` | When the state is error or sourceUnavailable, renders a Retry button inside the body callout. |
| `loadingLabel` | `string` | `"Generating table…"` | Calm copy displayed above the skeleton during the loading state. |

## Flows

### Chat answer
User asks for a regional coverage breakdown; AI returns a Simple table inside the chat response.
- RiUserLine: "Show me Q2 coverage by region"
- AI returns `<AICardDataTable density="simple" />` with intro + 5 rows + source line
- User scans, asks a follow-up; the chat thread continues

### Side drawer interpretation
User opens the AI Assisted Side Drawer on a territory page; AI shows a Rich table with flagged rows.
- Drawer mounts with a Rich card — flagged-rows callout + threshold cells
- User clicks Review flagged rows → opens a filtered detail view

### Dashboard module
A generated dashboard embeds the Rich card as a module among metric cards.
- Module renders with confidence + risk pills + flagged callout
- User clicks Generate scenario → opens scenario flow with the table seed

### AI-led review
Robust card supports progressive validation, suggested values, and an approval-aware action footer.
- Card mounts in `state="progressiveLoading"` with real + skeleton rows
- On completion, the state flips to `actionable` and Apply suggestions enables
- User clicks Apply suggestions → host opens `ai-change-summary`

### Send for approval
Robust card with approvalRequired routes the table into an approval flow.
- User selects rows and clicks Send for approval → `onSendForApproval` (host wiring) fires
- Host sets `state="sentForApproval"`; header status tag flips; primary action locks; audit trail picks up the event

## Canonical implementation

```tsx
import { AICardDataTable } from 'ai/organisms/ai-card-data-table/AICardDataTable';

// Simple — chat / narrow drawer
<AICardDataTable
  density="simple"
  intro="Here is the Q2 coverage breakdown by region."
  title="Q2 Coverage by Region"
  confidence="high" risk="low"
  columns={[
    { id: 'region',   label: 'Region',     type: 'text' },
    { id: 'coverage', label: 'Coverage',   type: 'percent' },
    { id: 'reps',     label: 'Active reps', type: 'number' },
  ]}
  rows={[
    { id: 'r1', cells: [{ value: 'Northeast' }, { value: '72%', state: 'belowThreshold' }, { value: '14' }] },
    { id: 'r2', cells: [{ value: 'Southeast' }, { value: '88%', state: 'aboveThreshold' }, { value: '17' }] },
  ]}
  rowCount={5}
  source={{ label: 'CRM + Territory Rules' }}
/>

// Robust — review / approval flow
<AICardDataTable
  density="robust"
  generatedBy="Guild AI"
  timestamp="Generated 2h ago"
  title="Q2 Coverage — approval review"
  confidence="medium" risk="medium"
  columns={[ /* … */ ]}
  rows={[ /* …with row + cell states */ ]}
  rowCount={5}
  source={{ label: 'CRM + Territory Rules' }}
  freshness="Updated 2h ago"
  reviewer="Maya Chen"
  approvalRequired
  onViewRationale={() => {}}
  onViewSources={() => {}}
  onViewAuditTrail={() => {}}
  primaryAction={{ label: 'Apply suggestions' }}
  secondaryAction={{ label: 'Compare regions' }}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-data-table.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-data-table/ai-card-data-table.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
