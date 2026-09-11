# AI Command Center

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** pages (AI)  
**Repo module:** `aiCommandCenter`  
**Component type:** React page  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Full AI chat workspace with idle state, conversation thread, and response patterns. The complete AI Led command surface for agentic tasks and conversational flows.

AICommandCenter is the full-page AI workspace. In the idle state it shows the avatar, a welcome heading, quick chips, and a centered input card. Once a message is sent, it transitions to a scroll-pinned chat thread with user bubbles, loading indicators, AI response patterns (analytical, Q&A, actionable, contextual, awaiting-approval), and a feedback bar per response. Background transitions via gradient surface tokens.

**Export:** `AICommandCenter`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/pages/ai-command-center/AICommandCenter.tsx` | Canonical React source (external / Make) |
| `components/ai/pages/ai-command-center/ai-command-center.md` | This mirror spec |
| `components/ai/pages/ai-command-center/ai-command-center.agent.json` | Agent manifest |
| `components/ai/pages/ai-command-center/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Generate · Guide · Execute |
| Accountability | Audit trail · Confidence · Rationale |

## When to use

- Use as the full AI workspace for any task requiring multi-turn conversation
- Use in gray variant as the default; aqua variant for teal-themed product surfaces

## When not to use

- Do not use for simple one-shot queries — use a simpler input + result pattern
- Do not nest inside another scrollable container — it manages its own scroll internally

## Anatomy

1. **Idle hero** _(Unique)_ — Centered column: AIAvatar → welcome heading → sub-heading → AIQuickChips → AIInputCard.
2. **Chat scroll area** _(Shared)_ — Flex column with an auto-scroll anchor div. Messages in chronological order (oldest first).
3. **User bubble** _(Shared)_ — Right-aligned via AIUserBubble component.
4. **Loading state** _(Shared)_ — AIWorkingIndicator / AIThinkingIndicator / AIGettingInfoIndicator depending on phase.
5. **AI response** _(Shared)_ — AIPatternMessage with pattern type selection (analytical/Q&A/actionable/contextual/awaiting-approval).
6. **Feedback bar** _(Shared)_ — AIFeedbackBar rendered below each AI message.
7. **Pinned input** _(Unique)_ — AIInputCard pinned to bottom in chatMode=true, with a gradient fade above it.
8. **Keyframe styles** _(Unique)_ — ai-in / ai-spin / ai-pulse CSS keyframes injected once into document.head.

## State variations

- **Idle** _(Empty)_ — No messages. Shows centered hero with avatar, heading, chips, and input card.
- **Loading** _(Thinking)_ — A message was sent. Loading indicator visible, input is disabled.
- **Active** _(Thread)_ — Conversation in progress. Thread visible, input pinned at bottom.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `theme` | `"default" \| "aqua"?` | `"default"` | Selects the surface gradient theme (AI_THEME variant). |

## Tokens

### Page Surface
| Token | Value | Usage |
| --- | --- | --- |
| `ai-cc.surface.idle` | `AI.gradient.surface.idle` | Page background in idle state |
| `ai-cc.surface.active` | `AI.gradient.surface.active` | Page background in active conversation |

### Idle Hero Typography
| Token | Value | Usage |
| --- | --- | --- |
| `ai-cc.idle.heading.color` | `DS.textDefault #2f2c3c` | Welcome heading color |
| `ai-cc.idle.sub.color` | `DS.textHelper #5b5864` | Sub-heading color |

### Pinned Input Gradient
| Token | Value | Usage |
| --- | --- | --- |
| `ai-cc.input-fade.gradient` | `linear-gradient(to bottom, transparent, var(--background))` | Gradient fade above pinned input card |

## Flows

### Idle → Active transition
The page transitions from the centered idle hero to a full conversation thread when the first message is sent.
- User types in AIInputCard and clicks Send (or presses Enter)
- handleSend() is called — hasConversation = true
- The idle hero (avatar + chips) is hidden
- The user message is pushed to the thread array
- AIWorkingIndicator is shown while awaiting the response
- After the response, AIPatternMessage + AIFeedbackBar are rendered
- Thread auto-scrolls to the latest message via scrollAnchor.scrollIntoView()

### Response pattern selection
Each AI response is classified into a pattern type that determines its visual rendering.
- Response arrives with a pattern property (e.g. "analytical")
- AIPatternMessage reads the pattern type
- Renders the appropriate template: table, Q&A list, action items, or approval block
- AIFeedbackBar is always rendered below regardless of pattern

## Canonical implementation

```tsx
// AICommandCenter is a full-page pattern component (~400 lines).
// It composes: AIAvatar, AIQuickChips, AIInputCard,
// AIUserBubble, AIWorkingIndicator, AIThinkingIndicator,
// AIPatternMessage, and AIFeedbackBar.
//
// See: src/app/components/ai/pages/ai-command-center/AICommandCenter.tsx

import React, { useState, useRef, useEffect } from 'react';
import { AIAvatar }              from '../../atomic/avatar/AIAvatar';
import { AIInputCard }           from '../../organisms/ai-dialog/AIDialog';
import { AIUserBubble }          from '../../molecules/ai-user-bubble/AIUserBubble';
import { AIWorkingIndicator }    from '../../atomic/loading-indicator/AILoadingIndicators';
import { AIFeedbackBar }         from '../../atomic/feedback-bar/AIFeedbackBar';

// Idle state renders:
//   <AIAvatar size={48} />
//   <h1>What can I help you with?</h1>
//   <AIQuickChips onChipClick={handleChipClick} />
//   <AIInputCard onSend={handleSend} />

// Active state renders a thread:
//   messages.map(msg =>
//     msg.role === 'user'
//       ? <AIUserBubble text={msg.text} />
//       : <AIPatternMessage response={msg} />
//   )
//   <AIInputCard onSend={handleSend} chatMode />
```

## Agent rules

1. Read this mirror spec and `ai-command-center.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/pages/ai-command-center/ai-command-center.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
