# AI Message Footer

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiMessageFooter`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** Actionable AI message stacks — see `components/ai/llms.txt`  

## Purpose

The decision point at the end of every actionable AI response. When the AI can do something, the footer is where the user says yes.

**Export:** `AIMessageFooter`

AIMessageFooter is the conditional action bar that closes any AI message requiring a user decision. It renders 1–3 actions (primary, secondary, ghost) using the AI button token set. Returns `null` when `visible=false` or `actions` is empty — safe to include in every message template.

## Source (canonical implementation)

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/message-footer/AIMessageFooter.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-message-footer/ai-message-footer.md` | This mirror spec |
| `components/ai/atomic/ai-message-footer/ai-message-footer.agent.json` | Agent manifest |
| `components/ai/atomic/ai-message-footer/ai-message-footer.preview.html` | Vanilla JS preview |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Act · Approve · Suggest |
| Accountability | Call to action · Approval · Governance |

## When to use

- When the AI response requires user action (approve, apply, confirm)
- Below any AI output with a clear next step — even if the step is just "Edit"
- Awaiting-approval patterns requiring explicit consent

## When not to use

- Informational-only responses — omit footer (empty actions)
- When `AIFeedbackBar` is the only follow-up

## Anatomy

| Part | Variant | Notes |
|------|---------|-------|
| Primary Action | `primary` | `flex:1`, `minWidth:140px`, gradient fill, action shadow |
| Secondary Action | `secondary` | Outline via `var(--ai-btn-outline-border)` |
| Ghost Action | `ghost` | Text-only, `NEUTRAL.textDisabled` |

## State variations

| Pattern | Actions | Usage |
|---------|---------|-------|
| **Primary only** | `[primary]` | Single CTA |
| **Primary + Secondary** | `[primary, secondary]` | Confirm + Edit (most common) |
| **Full set** | `[primary, secondary, ghost]` | Approve + Edit First + Cancel |

## Props API

### `AIMessageFooter`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `actions` | `FooterAction[]` | `required` | Label, variant, onClick per action |
| `visible` | `boolean` | `true` | When false, renders nothing |

### `FooterAction`

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` | Button text |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | Emphasis level |
| `onClick` | `() => void` | Click handler |
| `disabled` | `boolean` | Optional — lowers opacity |

## Tokens

### Primary (`PrimaryButton`)

| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `linear-gradient(135deg, #7A8CFF 0%, #5A6DFF 100%)` | Resting background |
| `AI.color.action.primaryActive` | `#3F50C7` | Hover background |
| `AI.color.text.onAction` | `#FFFFFF` | Label color |
| `AI.shadow.action.default` | `rgba(90,109,255,0.18)` | Resting shadow |
| `AI.radius.md` | `16px` | Corner radius |
| `@brand-agent-name` | 11px / 600 | Label typography |

### Secondary (`SecondaryButton`)

| Token | Value | Usage |
| --- | --- | --- |
| `var(--ai-btn-outline-border)` | `NEUTRAL.border` | Outline stroke |
| `var(--ai-neutral-text)` | `NEUTRAL.textDefault` | Label color |
| `@brand-agent-name` | 11px / **500** | Weight override |

### Ghost (`GhostButton`)

| Token | Value | Usage |
| --- | --- | --- |
| `NEUTRAL.textDisabled` | `#716e79` | Label color |
| `@brand-agent-name` | 11px / **400** | Weight override |

### Container

| Property | Value |
|----------|-------|
| Layout | `display:flex`, `gap:8px`, `flexWrap:wrap` |
| Padding | `0 0 10px` |

## JavaScript / React API

```tsx
import { AIMessageFooter } from '@/components/ai/atomic/message-footer/AIMessageFooter';

<AIMessageFooter actions={[
  { label: 'Confirm & Apply Assignment', variant: 'primary', onClick: handleConfirm },
  { label: 'Edit', variant: 'secondary', onClick: handleEdit },
]} />

<AIMessageFooter actions={[
  { label: 'Primary CTA', variant: 'primary', onClick: handlePrimary },
  { label: 'Secondary', variant: 'secondary', onClick: handleSecondary },
  { label: 'Cancel', variant: 'ghost', onClick: handleCancel },
]} />

<AIMessageFooter actions={actions} visible={hasActions} />
```

## Agent rules

1. Primary uses `flex:1` + `minWidth:140px` — grows in row layouts.
2. Do not use raw `<button>` styling — copy `PrimaryButton` / `SecondaryButton` / `GhostButton` from canonical TSX.
3. Returns `null` when invisible or no actions.
4. Ghost variant is `ghost` (not `tertiary` — that's `AIButton`).

Full agent contract: `components/ai/atomic/ai-message-footer/ai-message-footer.agent.json`.

## Related Components

- `components/ai/atomic/ai-button/ai-button.md` — standalone CTA buttons with status
- `components/ai/atomic/ai-feedback-bar/ai-feedback-bar.md` — post-action feedback row
- `components/ai/atomic/ai-message-body/ai-message-body.md` — prose above footer
