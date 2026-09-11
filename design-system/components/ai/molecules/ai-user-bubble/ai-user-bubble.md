# AI User Bubble

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiUserBubble`  
**Component type:** React molecule  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Message container for the human user's input in a conversational AI interface. Visually distinct from AI-generated responses — positioned right-aligned with a light fill.

AIUserBubble renders a right-aligned message pill representing the user's sent text. Two surface variants: light (default) uses a gray (#E8E6ED) surface for chat threads on dark or brand backgrounds; dark uses a deep indigo (#1F2A66 / ZSAI[100]) fill with white text for use on white or light-gray surfaces. Both achieve WCAG AAA contrast ratios. The bubble uses Open Sans at 16px (default) or 14px (medium) with 1.55–1.4 line-height and max-width of 82%.

**Export:** `AIUserBubble`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `ai/molecules/ai-user-bubble/AIUserBubble.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-user-bubble/ai-user-bubble.md` | This mirror spec |
| `components/ai/molecules/ai-user-bubble/ai-user-bubble.agent.json` | Agent manifest |
| `components/ai/molecules/ai-user-bubble/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Gather context · Guide |
| Accountability | Audit trail |

## When to use

- Use to represent every user-sent message in the AI chat thread
- Use in AICommandCenter's message thread mapped over role:"user" entries

## When not to use

- Do not use for AI responses — those use AIResponsePatterns
- Do not customize the background or border-radius outside the token specification

## Anatomy

1. **Bubble surface** _(Unique)_ — Two variants — light: gray (#E8E6ED) for use on dark/brand backgrounds; dark: deep indigo (#1F2A66) for use on light/white backgrounds. max-width: 82%.
2. **Message text** _(Shared)_ — Open Sans 16px (default) or 14px (medium) / dark: white (#FFFFFF); light: ZDS darkest (#1A1628).
3. **Alignment rail** _(Unique)_ — flex row with justify-content: flex-end pushes the bubble to the right.

## State variations

- **Default** _(size="default")_ — Standard user message bubble — right aligned, gray bg, dark text. Uses @zsai-bubble-body (16px / 1.55).
- **Medium** _(size="medium")_ — Same bubble, one level smaller — uses @zsai-body-small (14px / 1.4). For dense surfaces like the side-rail Agent Drawer where the larger bubble dominates.
- **Dark variant** _(variant="dark")_ — Deep indigo (#1F2A66 / ZSAI[100]) fill with white text. Use on white or light-gray page surfaces — the indigo provides visual separation without the flat gray-on-white that the light variant produces on white backgrounds.
- **Dark medium** _(variant="dark" size="medium")_ — Dark variant at medium (14px) size — for dense light-background surfaces.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `""` | The user's message text to display in the bubble. |
| `size` | `"default" \| "medium"` | `"default"` | Typography scale. "default" = @zsai-bubble-body (16px). "medium" = one level down, @zsai-body-small (14px) — for dense conversation surfaces. |

## Tokens

### Bubble Surface
| Token | Value | Usage |
| --- | --- | --- |
| `ai-bubble.surface` | `#F4F3F3` | Bubble background |
| `ai-bubble.text.color` | `#1A1628` | Message text — ZDS darkest |
| `ai-bubble.border.radius` | `AI.radius.lg 20px` | Pill shape |
| `ai-bubble.padding` | `10px 16px` | Internal bubble padding |
| `ai-bubble.max-width` | `72%` | Prevents full-width on wide viewports |

## Flows

### Chat thread rendering
AIUserBubble is rendered by AICommandCenter in the conversation thread.
- User submits a message via AIInputCard
- AICommandCenter appends a message object to the thread array
- The thread maps over messages, rendering AIUserBubble for role:"user" messages
- Thread auto-scrolls to bottom after each new message

## Canonical implementation

```tsx
import React from 'react';

const ZDS = { textDefault: '#2f2c3c' };

interface AIUserBubbleProps { text: string }

export function AIUserBubble({ text }: AIUserBubbleProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <div style={{
        background: '#F4F3F3',
        borderRadius: '20px',
        padding: '10px 16px',
        maxWidth: '72%',
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '14px',
        lineHeight: 1.6,
        color: '#1A1628',
        wordBreak: 'break-word',
      }}>
        {text}
      </div>
    </div>
  );
}
```

## Agent rules

1. Read this mirror spec and `ai-user-bubble.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-user-bubble/ai-user-bubble.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
