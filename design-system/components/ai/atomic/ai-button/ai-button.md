# AI Button

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiButton`  
**Component type:** React control (AI CTA)  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/radius.md`, `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AIAction, AINotificationOutput, agent confirmation rows, analysis cards  

## Purpose

Call-to-action button for AI surfaces. Primary carries the brand gradient CTA, secondary the outline alternative, tertiary the dismissive ghost label.

**Export:** `AIButton` — status-aware CTA primitive with three emphasis variants, three sizes, and five radius steps.

**Intent:** Use for confirm/cancel pairs, Apply/Edit/Dismiss action rows, and any AI surface that needs loading/complete/error feedback on the primary action. Do not use for AI Dialog toolbar triggers — use `AIDialogButton` instead.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/button/AIButton.tsx` | Canonical React source (external repo) — also exports `AIAction` |
| `@ai-design-system` | Published import path |
| `components/ai/atomic/ai-button/ai-button.md` | This mirror spec |
| `components/ai/atomic/ai-button/ai-button.agent.json` | Agent manifest |
| `components/ai/atomic/ai-button/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Confirm · Execute |
| Accountability | User control |

## When to use

- Confirm / Cancel pairs in agent confirmations
- Apply / Edit / Dismiss action rows in notifications and analysis cards
- Any AI surface that needs a status-aware CTA (loading, complete, error)

## When not to use

- Toolbar triggers, mode pickers, or dropdown affordances in AI Dialog — use `AIDialogButton`
- Navigation links — use anchors or router links
- Standard `Button` for non-AI product actions

## Variants (emphasis)

| Variant | Description | Usage |
|-------|-------------|-------|
| **primary** (default) | Brand gradient fill, white label, action shadow | Affirmative CTA — Apply, Confirm, Run |
| **secondary** | 1px outline on transparent, dark label | Alternative action — Edit First, Review Details |
| **tertiary** | Ghost text label, no border | Dismissive action — Dismiss, Cancel (low emphasis) |

## Anatomy

| Part | Shared | Notes |
|------|--------|-------|
| Container | Shared | Height set by `size` (sm 32 / md 40 / lg 48 px). Radius set by `radius` prop. |
| Label | Shared | Required visible text. Font weight 600 (sm/md), 700 (lg). Color follows variant. |
| Status glyph | Unique | Spinner (loading) or check (complete) prepended to label on **primary** only. Width preserved via `minWidth` to prevent reflow. |

## State variations

- **Variants** _(Emphasis levels)_ — Primary uses the AI brand gradient. Secondary uses an outline on transparent. Tertiary is a ghost label with no border.
- **Sizes** _(sm · md · lg)_ — Three sizes share the same radius scale. Small is 32 px tall, medium 40 px, large 48 px.
- **Status — loading** _(In-flight)_ — Spinner replaces the label start while AI work is underway. Width is preserved to prevent reflow. Click is suppressed.
- **Status — complete** _(Resolved)_ — Check mark swaps in for ~1.5 s after the action completes before reverting to default.
- **Disabled** _(Inert)_ — Opacity drops; cursor reverts. Hover and click are suppressed across all three variants.

## Sizes

| Size | Height | Padding | Font | Weight | minWidth |
|------|--------|---------|------|--------|----------|
| `sm` | 32px | 5px 14px | 11px | 600 | 80px |
| `md` | 40px | 8px 16px | 12px | 600 | 120px |
| `lg` | 48px | 10px 22px | 13px | 700 | 160px |

## Radius scale

| Token | px | Usage |
|-------|-----|-------|
| `AI.radius.xs` | 6 | Subtle corners |
| `AI.radius.sm` | 12 | Compact controls |
| `AI.radius.md` | 16 | **Default** — standard CTA |
| `AI.radius.lg` | 20 | Softer card actions |
| `AI.radius.full` | 100 | Pill-shaped CTAs |

All variants and sizes share the same radius scale via the `radius` prop.

## States

### Primary status (`status` prop — primary variant only)

| Status | Visual | Behavior |
|--------|--------|----------|
| `default` | Gradient fill + action shadow | Resting CTA |
| `loading` | Solid active fill, spinner + label | Click suppressed; width locked |
| `complete` | Solid active fill, check + label | Click suppressed; auto-reverts to default after ~1.5s |
| `error` | Solid `#C0392B` fill, white label | Retry affordance |

### Disabled (all variants)

| State | Visual | Behavior |
|-------|--------|----------|
| disabled | Primary opacity 0.45 · secondary 0.5 · tertiary 0.4 | Hover and click suppressed |

### Secondary / tertiary hover

| Variant | Hover |
|---------|-------|
| secondary | Subtle AI tint fill `#F5F6FF` on transparent |
| tertiary | Label color darkens from helper to default text |

## Color Tokens

### Primary

| Token | Value | Usage |
|-------|-------|-------|
| `ai-button.primary.bg` | `AI.gradient.action.full` `linear-gradient(135deg, #7A8CFF 0%, #5A6DFF 100%)` | Resting gradient fill |
| `ai-button.primary.bg.active` | `AI.color.action.primaryActive` `#3F50C7` | Hover / loading / complete fill |
| `ai-button.primary.bg.error` | `#C0392B` | Error / retry fill |
| `ai-button.primary.color` | `AI.color.text.onAction` `#fff` | Label on primary fills |
| `ai-button.primary.shadow` | `0 2px 8px AI.shadow.action.default` | Resting drop shadow; removed on hover and status changes |

### Secondary

| Token | Value | Usage |
|-------|-------|-------|
| `ai-button.secondary.border` | `NEUTRAL.border` `#B2B0B6` | Outline at rest and on hover |
| `ai-button.secondary.bg.hover` | `AI.color.surface.default` `#F5F6FF` | Subtle AI tint on hover |
| `ai-button.secondary.color` | `var(--ai-neutral-text)` → `NEUTRAL.textDefault` | Label color |

### Tertiary

| Token | Value | Usage |
|-------|-------|-------|
| `ai-button.tertiary.color` | `var(--ai-neutral-helper)` → `NEUTRAL.textHelper` | Resting label — de-emphasised |
| `ai-button.tertiary.color.hover` | `var(--ai-neutral-text)` → `NEUTRAL.textDefault` | Label darkens on hover |

## AI-Specific Behavior

### Confirm / cancel pair

Standard pattern for agent confirmations — primary on the left, secondary or tertiary on the right.

1. Place `AIButton variant="primary"` with the affirmative label
2. Pair with `AIButton variant="secondary"` (or `"tertiary"`) for cancel/dismiss
3. Wire `status="loading"` on primary while the action is in flight
4. Flip to `status="complete"` for ~1.5 s on success, then reset to `"default"`

### Width preservation

When `status` changes to `loading` or `complete`, the button locks `minWidth` to its resting width so the spinner/check swap does not reflow sibling actions.

## Accessibility Requirements

- Native `<button>` element
- `disabled` attribute when `disabled=true`
- `aria-busy="true"` when `status="loading"`
- `aria-disabled="true"` when click is suppressed (loading/complete)
- Focus ring per product shell (do not remove `:focus-visible`)

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "tertiary"` | `"primary"` | Emphasis level |
| `label` | `string` | — | Visible button text. Required. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height + padding + font scale |
| `radius` | `"xs" \| "sm" \| "md" \| "lg" \| "full"` | `"md"` | Corner radius token |
| `status` | `"default" \| "loading" \| "complete" \| "error"` | `"default"` | Primary only — spinner/check/error treatment |
| `disabled` | `boolean` | `false` | Lowers opacity, suppresses hover/click |
| `onClick` | `() => void` | — | Suppressed when disabled or status is loading/complete |

## JavaScript / React API

```tsx
import { AIButton, AIAction } from 'ai/atomic/button/AIButton';

// Primary — gradient CTA
<AIButton variant="primary" label="Apply Recommendation" onClick={apply} />

// Primary with status feedback
<AIButton variant="primary" label="Applying…" status="loading" />
<AIButton variant="primary" label="Applied" status="complete" />
<AIButton variant="primary" label="Retry" status="error" onClick={retry} />

// Secondary — outline
<AIButton variant="secondary" label="Edit First" onClick={edit} />

// Tertiary — ghost text
<AIButton variant="tertiary" label="Dismiss" onClick={dismiss} />

// Sizes share a single radius scale
<AIButton variant="primary" label="Small" size="sm" />
<AIButton variant="primary" label="Medium" size="md" />
<AIButton variant="primary" label="Large" size="lg" />
```

## AIAction (composed row)

`AIAction` ships in the same module as `AIButton` — a multi-button row for recommendation footers (apply / review / dismiss + optional "Requires review" pill). See `components/ai/atomic/ai-action/ai-action.md` for the dedicated mirror spec.

```tsx
import { AIAction } from 'ai/atomic/button/AIButton';

<AIAction
  primaryLabel="Apply Recommendation"
  secondaryLabel="Review Details"
  tertiaryLabel="Dismiss"
  requiresReview
  onPrimary={apply}
/>
```

## Canonical implementation

Copy verbatim from `ai/atomic/button/AIButton.tsx` in the Guild AI Design System bundle — do not rewrite from this description. Key implementation facts:

- **SIZE_MAP** — sm/md/lg with explicit `minWidth` for status width preservation
- **Spinner / CheckIcon** — 20×20 SVG glyphs; spinner uses `@keyframes aibtn-spin` at 0.7s
- **Error fill** — `#C0392B` (not bootstrap red)
- **Ghost variant removed** — extracted to `AIDialogButton`

## Agent rules

1. **Primary for affirmative actions** — gradient CTA with optional status feedback.
2. **Secondary for alternatives** — outline style for Edit, Review, Cancel (medium emphasis).
3. **Tertiary for dismiss** — ghost text for low-emphasis dismiss actions.
4. **Do not use for AI Dialog toolbar** — use `AIDialogButton` per `ai-dialog-button.md`.
5. **Wire `status="loading"`** while async work runs; flip to `"complete"` briefly on success.
6. **Preserve width** on status transitions — do not let spinner/check cause layout shift.
7. Copy canonical implementation — do not recreate gradient or radius tokens from memory.

Full agent contract: `components/ai/atomic/ai-button/ai-button.agent.json`.

## Do's and Don'ts

- Do pair primary + secondary/tertiary for confirm/cancel rows.
- Do use `radius="md"` (16px) as the default corner treatment.
- Do use `status="error"` with a Retry label for failed actions.
- Don't use AIButton for AI Dialog toolbar Add/Skills/Agent/Mic — use AIDialogButton.
- Don't use navigation-style links styled as buttons.
- Don't omit `label` — all variants require visible text.

## Related Components

- `components/ai/atomic/ai-dialog-button/ai-dialog-button.md` — Ghost toolbar buttons in AI Dialog
- `components/ai/organisms/ai-dialog/ai-dialog.md` — message composer (Send uses separate gradient control, not AIButton)
- `components/atoms/button/button.md` — standard button (non-AI contexts)
