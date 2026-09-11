# AI Message Header

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiMessageHeader`  
**Component type:** React control  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/atomic/ai-avatar/ai-avatar.md` (BotAvatar)  
**Used By:** AI message stacks, chat cards — see `components/ai/llms.txt`  

## Purpose

The opening line of every AI message. Establishes authorship, agent identity, and recency at a glance — before the user reads a word of the response.

**Export:** `AIMessageHeader`

AIMessageHeader is the universal attribution row that anchors every AI-generated message. It renders a `BotAvatar` dot, an agent label (e.g. "AI Analysis", "AI Response", "Territory Agent"), and an optional right-aligned timestamp. It is the first thing a user sees and immediately establishes that the content is AI-authored.

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/atomic/message-header/AIMessageHeader.tsx` | Canonical React source (external repo) |
| `src/app/components/ai/atomic/avatar/AIAvatar.tsx` | `BotAvatar` dependency |
| `components/ai/atomic/ai-message-header/ai-message-header.md` | This mirror spec |
| `components/ai/atomic/ai-message-header/ai-message-header.agent.json` | Agent manifest |
| `components/ai/atomic/ai-message-header/ai-message-header.preview.html` | Vanilla JS preview |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Attribute · Identify |
| Accountability | Agent identity · Timestamp · Attribution |

## When to use

- At the top of every AI-generated message, card, or panel output
- Wherever agent identity must be declared before the response body
- When source attribution is required by the Guild accountability layer

## When not to use

- Streaming inline completions inside a text field — skip the header to reduce visual noise
- System notifications not attributed to a specific AI agent

## Anatomy

1. **Bot Avatar Dot** _(Shared)_ — `BotAvatar` from `AIAvatar.tsx` — three BRAND blue circles + white cross-star. **No orange gradient ring.**
2. **Agent Label** _(Unique)_ — `@brand-agent-name` (11px / 600) or sm override (10px / 600). Color: `var(--ai-neutral-helper)`.
3. **Timestamp** _(Shared)_ — Right-aligned via `marginLeft: auto`. 10px (md) or 9px (sm). Same helper color. Optional.

## State variations

| Size | Avatar | Label | Timestamp | Usage |
|------|--------|-------|-----------|-------|
| **md** (default) | 16px | 11px / 600 | 10px | Chat and card contexts |
| **sm** (compact) | 14px | 10px / 600 | 9px | Dense panel layouts |

Example labels from design reference: AI Analysis · AI Response · AI Assistant · Territory Agent

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `agentLabel` | `string` | `required` | Agent name displayed next to the avatar |
| `timestamp` | `string` | `"Just now"` | Right-aligned timestamp — pass `undefined` to hide |
| `size` | `"sm" \| "md"` | `"md"` | Controls avatar, label, and timestamp scale |

## Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `var(--ai-neutral-helper)` | `NEUTRAL.textHelper` `#5b5864` | Agent label and timestamp color |
| `AI_TYPOGRAPHY['@brand-agent-name']` | 11px / 600 / 1.0 | md label typography |
| `F` | `"Open Sans", sans-serif` | Font family |
| BotAvatar fills | `#B4BDFF` / `#5A6DFF` / `#1F2A66` | Fixed BRAND blue rings — never orange |

## Flows

### Message attribution

1. AI generates response
2. `AIMessageHeader` mounts with `agentLabel` + `timestamp`
3. Message body (e.g. `AIMessageBody`) renders beneath

## JavaScript / React API

```tsx
import { AIMessageHeader } from '@/components/ai/atomic/message-header/AIMessageHeader';

<AIMessageHeader agentLabel="AI Analysis" />
<AIMessageHeader agentLabel="AI Response" timestamp="2 min ago" />
<AIMessageHeader agentLabel="Territory Agent" size="sm" timestamp="2 min ago" />
```

## Agent rules

1. Import `BotAvatar` from `../avatar/AIAvatar` — do not invent avatar SVG.
2. BotAvatar = three blue circles + white cross-star. **No orange ring. No "Z" letterform.**
3. Layout gap is **7px**; timestamp uses `marginLeft: 'auto'`.
4. Label and timestamp both use `var(--ai-neutral-helper)` in canonical TSX.
5. Copy canonical implementation verbatim.

Full agent contract: `components/ai/atomic/ai-message-header/ai-message-header.agent.json`.

## Related Components

- `components/ai/atomic/ai-avatar/ai-avatar.md` — `BotAvatar` source
- `components/ai/atomic/ai-message-body/ai-message-body.md` — prose body below header
- `components/ai/llms.txt` — AI component index
