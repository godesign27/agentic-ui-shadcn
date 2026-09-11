# AI Quick Chips

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiChipQuick`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AICommandCenter idle state, `components/ai/organisms/ai-dialog/` — see `components/ai/llms.txt`  

## Purpose

Suggested action chips surfaced by the AI agent. Provides quick-access prompts relevant to the current context, reducing the user's need to type from scratch.

**Export:** `AIChipQuick` (single chip) · `QUICK_ACTIONS` (default chip set) · alias `AIQuickChip`

`AIChipQuick` renders one pill-shaped suggested-prompt chip with a Lucide icon and label. Parent layouts (e.g. AICommandCenter) map over `QUICK_ACTIONS` to build the idle-state grid. Clicking a chip calls `onClick`; the parent hides chips after the first message is sent.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `ai/atomic/chip-quick/AIChipQuick.tsx` | Canonical React source (external repo) |
| `components/ai/atomic/ai-chip-quick/ai-chip-quick.md` | This mirror spec |
| `components/ai/atomic/ai-chip-quick/ai-chip-quick.agent.json` | Agent manifest |
| `components/ai/atomic/ai-chip-quick/agentic-prompt.md` | Copy-paste prompt for doc site |
| `components/ai/atomic/ai-chip-quick/ai-chip-quick.preview.html` | Vanilla JS preview |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Suggest · Guide |
| Accountability | Rationale · User feedback |

## When to use

- Use in the idle state of AICommandCenter before any message is sent
- Use to surface 4–8 domain-specific suggested prompts relevant to the user's context
- Use the `isSpecial` "All Prompts" chip as the last item to surface the full prompt library

## When not to use

- Do not show chips after the first message is sent (hide when `hasMessages = true`)
- Do not use more than 8 chips — scanning cost outweighs discoverability benefit
- Do not use generic neutral buttons — chips must use `AIChipQuick` styling

## Anatomy

1. **Chip container** _(Unique)_ — Pill button (`AI.radius.full`). Standard: white fill + subtle border; hover → brand tint border and primary label/icon. Special: periwinkle border; hover → brand gradient CTA.
2. **Icon** _(Shared)_ — Lucide icon at 13px, `strokeWidth={2}`. Color: `var(--ai-neutral-icon)` at rest; `AI.color.action.primary` on hover (standard) or `onAction` white (special hover).
3. **Label text** _(Unique)_ — `@brand-body-small` (14px / 400). Color follows icon hover treatment.

## State variations

- **Idle** _(Chips visible)_ — Full grid of chips shown in the empty/idle state before any message is sent.
- **Active** _(Chips hidden)_ — Chips are hidden once the conversation is active. The component unmounts or is conditionally hidden by the parent.
- **Standard chip** _(default)_ — White background, subtle border; hover elevates to brand periwinkle treatment.
- **Special chip** _(isSpecial)_ — "All Prompts" — brand border/label at rest; gradient fill + shadow on hover.

## Props API — `AIChipQuick`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `React.ElementType` | `required` | Lucide icon component |
| `label` | `string` | `required` | Visible chip label |
| `isSpecial` | `boolean` | `false` | "All Prompts" CTA variant — gradient hover |
| `onClick` | `() => void` | `—` | Click handler |

## QUICK_ACTIONS (default set)

| Label | Icon | Special |
| --- | --- | --- |
| Create a scenario | `Sparkles` | — |
| Territory balance | `BarChart2` | — |
| Generate call plan | `Calendar` | — |
| Vacancy management | `Users` | — |
| Analyze team health | `Activity` | — |
| Roster management | `UserCheck` | — |
| KPI trend | `TrendingUp` | — |
| All Prompts | `Lightbulb` | `isSpecial: true` |

## Tokens

### Standard chip (`ai-chip.*`)

| Token | Value | Usage |
| --- | --- | --- |
| `ai-chip.surface` | `var(--ai-chip-bg)` white | Chip background at rest |
| `ai-chip.surface.hover` | `var(--ai-chip-bg-hover)` → `AI.color.surface.subtle` | Chip hover background |
| `ai-chip.border` | `var(--ai-chip-border)` rgba(0,0,0,0.12) | Chip border at rest |
| `ai-chip.border.hover` | `AI.color.border.strong` | Chip border on hover |
| `ai-chip.border.radius` | `AI.radius.full` | Full-round pill |
| `ai-chip.label.color` | `var(--ai-neutral-text)` | Label at rest |
| `ai-chip.label.color.hover` | `AI.color.action.primary` | Label on hover |
| `ai-chip.icon.color` | `var(--ai-neutral-icon)` | Icon at rest |

### Special chip (`ai-chip.action.*`)

| Token | Value | Usage |
| --- | --- | --- |
| `ai-chip.action.border` | `AI.color.border.default` | Resting border |
| `ai-chip.action.label` | `AI.color.action.primary` | Resting label/icon |
| `ai-chip.action.surface.hover` | `AI.gradient.action.full` | Gradient on hover |
| `ai-chip.action.label.hover` | `AI.color.text.onAction` | White label on hover |
| `ai-chip.action.shadow.hover` | `AI.shadow.action.default` | Hover elevation |

### Typography

| Token | Usage |
| --- | --- |
| `AI_TYPOGRAPHY['@brand-body-small']` | Chip label — 14px / 400 / 1.4 |
| `F` | Open Sans font family |

## Flows

### Idle-to-active transition

The parent (AICommandCenter) controls chip visibility based on whether a conversation is active.

1. User sees chips in idle state (no messages sent)
2. User clicks a chip — `onClick` fires with the label
3. AICommandCenter sets the input value and sends the message
4. Parent sets `hasConversation = true`
5. Chip grid is conditionally hidden (not rendered)

## JavaScript / React API

```tsx
import { AIChipQuick, QUICK_ACTIONS } from 'ai/atomic/chip-quick/AIChipQuick';

// Map default actions in idle state
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
  {QUICK_ACTIONS.map(({ icon: Icon, label, isSpecial }) => (
    <AIChipQuick
      key={label}
      icon={Icon}
      label={label}
      isSpecial={isSpecial}
      onClick={() => onChipClick(label)}
    />
  ))}
</div>

// Single chip
<AIChipQuick icon={Sparkles} label="Create a scenario" onClick={() => send('Create a scenario')} />
<AIChipQuick icon={Lightbulb} label="All Prompts" isSpecial onClick={openPromptLibrary} />
```

## Agent rules

1. Read this mirror spec and `ai-chip-quick.agent.json` before implementing.
2. Do not hardcode colors — use `AI.*`, `NEUTRAL.*`, and CSS vars (`--ai-chip-bg`, etc.).
3. Copy canonical `AIChipQuick.tsx` verbatim — do not use emoji or invented icons.
4. Lucide icons only — match names in `QUICK_ACTIONS`.
5. Hide chips when conversation is active — parent responsibility.

Full agent contract: `components/ai/atomic/ai-chip-quick/ai-chip-quick.agent.json`.

## Related Components

- `components/ai/organisms/ai-dialog/ai-dialog.md` — composer that hosts idle chips
- `components/ai/atomic/ai-chip-brief/ai-chip-brief.md` — task status chips (different atom)
- `components/ai/llms.txt` — AI component index
