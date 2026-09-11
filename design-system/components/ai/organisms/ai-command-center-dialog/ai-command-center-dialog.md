# AI Command Center Dialog

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCommandCenterDialog`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

The conversational core of the AI Command Center — independently composable in any surface that needs a first-class AI chat experience without the full page shell.

AICommandCenterDialog is the composable conversation layer extracted from the AI Command Center page pattern. It ships two variants: robust (the full centred greeting → input card → quick action chips experience seen on the Command Center home state) and slim (a compact avatar + greeting row above a pill-shaped input bar). Both variants support full conversation threading, loading indicators, and smart-scroll behaviour via the shared useAIChat hook. Use this component when you need a first-class AI chat experience embedded inside an existing product surface — without pulling in the full-page shell, background gradients, and routing concerns of the page pattern.

**Export:** `AICommandCenterDialog`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-command-center-dialog/AICommandCenterDialog.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-command-center-dialog/ai-command-center-dialog.md` | This mirror spec |
| `components/ai/organisms/ai-command-center-dialog/ai-command-center-dialog.agent.json` | Agent manifest |
| `components/ai/organisms/ai-command-center-dialog/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Generate · Guide · Execute |
| Accountability | Confidence · Audit trail · Rationale |

## When to use

- Embedding a full AI chat experience inside an existing product page without its own route
- Compact surfaces that need slim-variant input without the full Command Center page shell
- Any surface where the AI Command Center greeting + chip pattern is the right interaction model

## When not to use

- When a side-panel drawer form factor is more appropriate — use AIAgentDrawer instead
- When you need a full-page experience with routing — use the ai-command-center page pattern

## Anatomy

1. **Background surface** _(Unique)_ — Optional ambient gradient that crossfades idle ↔ active as conversation starts
2. **Avatar + Greeting** _(Shared)_ — AIAvatar orb + greeting h1 + optional subtitle paragraph
3. **Input area** _(Shared)_ — Robust: AIInputCard with full toolbar. Slim: pill SlimBar with + button, mic/send.
4. **Quick action chips** _(Shared)_ — AIChipQuick row — robust only, hidden once conversation starts
5. **Conversation thread** _(Unique)_ — Scrollable message list: UserBubble + AIPatternMessage + loading indicators

## State variations

- **Robust** _(variant=robust)_ — Centred greeting + optional subtitle + AIInputCard. Ambient background visible.
- **Slim variant** _(variant=slim)_ — Compact avatar + greeting row above pill input bar. No subtitle, no chips.
- **Bottom-docked** _(variant=bottom-docked)_ — Sticky-to-viewport-bottom centered pill input. No greeting, no avatar, no background card — only the input pill on a gradient backdrop. Use inside scrollable AI-led workspaces (e.g. AI Agent Task Tracker).

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"robust" \| "slim" \| "bottom-docked"` | `"robust"` | Robust = full greeting + input card + chips. Slim = compact greeting + pill input. Bottom-docked = sticky-to-viewport-bottom centered pill input only (no greeting / avatar / background card). |
| `maxWidth` | `number \| string` | `680` | Bottom-docked only. Max content width for the centered input column. Pixels when number, raw CSS when string. |
| `backdropColor` | `string` | `"#F7F8FC"` | Bottom-docked only. Color the gradient backdrop fades into (should match the page background so content reads cleanly behind the pill). |
| `theme` | `"gray" \| "aqua"` | `"gray"` | Color theme for the ambient background gradient. |
| `greeting` | `string` | `auto` | Override the time-of-day greeting (e.g. "Good morning, Theo!"). |
| `subtitle` | `string` | `"Ask me anything..."` | Subtitle shown below the greeting in robust variant. |
| `showBackground` | `boolean` | `true` | Enable or disable the ambient gradient background. |
| `onSubmit` | `(text: string) => void` | `undefined` | Optional external submit handler (in addition to useAIChat internal handling). |

## Tokens

### Background
| Token | Value | Usage |
| --- | --- | --- |
| `gradient.surface.idle` | `AI_THEME.default` | Idle background gradient |
| `gradient.surface.active` | `AI_THEME.default` | Active conversation background |

### Input border
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.action.primary` | `#4D60E6` | Input border when text is present |

## Flows

### Idle → Conversation
User types and sends a message
- User focuses input
- Types message
- Clicks send or presses Enter
- Loading indicator appears
- AIPatternMessage renders
- Background crossfades to active

## Canonical implementation

```tsx
import { AICommandCenterDialog } from '@/components/ai/organisms/ai-command-center-dialog/AICommandCenterDialog';

// Robust (default) — greeting, input card, chips
<AICommandCenterDialog variant="robust" theme="gray" showBackground />

// Slim — compact greeting + pill input
<AICommandCenterDialog variant="slim" theme="gray" showBackground />

// Bottom-docked — sticky to bottom of scroll container, centered,
// no greeting/avatar/background card. Drop into any scrollable AI page.
<AICommandCenterDialog
  variant="bottom-docked"
  maxWidth={680}
  backdropColor="#F7F8FC"
/>
```

## Agent rules

1. Read this mirror spec and `ai-command-center-dialog.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-command-center-dialog/ai-command-center-dialog.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
