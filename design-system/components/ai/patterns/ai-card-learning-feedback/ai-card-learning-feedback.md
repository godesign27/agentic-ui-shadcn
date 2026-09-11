# AI Card Learning Feedback

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiCardLearningFeedback`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Closes the feedback loop between user signals and AI adaptation. Shows what was learned, the preference inferred, and where it has been applied — with undo.

The AI Card Learning Feedback closes the feedback loop between user signals and AI adaptation. It surfaces what feedback was received, the preference inferred from it, and where that preference has been applied — giving users visibility and control over how the AI learns from them.

**Export:** `AICardLearningFeedback`

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `zds-ai/src/` today.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-card-learning-feedback/AICardLearningFeedback.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-card-learning-feedback/ai-card-learning-feedback.md` | This mirror spec |
| `components/ai/organisms/ai-card-learning-feedback/ai-card-learning-feedback.agent.json` | Agent manifest |
| `components/ai/organisms/ai-card-learning-feedback/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Learn · Evaluate |
| Accountability | User feedback · Memory control |

## Anatomy

1. **Feedback Header** _(Shared)_ — Emoji icon + sentiment label + timestamp
2. **Inferred Preference** _(Unique)_ — Chip showing the learned preference
3. **Applied Areas** _(Unique)_ — RiPriceTag3Line chips showing where preference applies
4. **Action Row** _(Shared)_ — Undo / View History / Edit Preferences

## State variations

- **Positive Feedback** _(feedback=positive)_ — Green header — thumbs up
- **Negative Feedback** _(feedback=negative)_ — Red header — thumbs down
- **Neutral** _(feedback=neutral)_ — Gray header — neutral signal
- **Undone** _(undone=true)_ — Faded card — feedback reversed

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `feedback` | `FeedbackSentiment` | `required` | positive \| negative \| neutral |
| `preference` | `string` | `required` | Inferred preference label |
| `appliedAreas` | `string[]` | `required` | Areas where preference is applied |
| `timestamp` | `string` | `required` | When feedback was received |
| `onUndo` | `() => void` | `undefined` | Undo feedback handler |
| `onViewHistory` | `() => void` | `undefined` | View feedback history handler |
| `onEditPreferences` | `() => void` | `undefined` | Edit preferences handler |

## Tokens

### Brand
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-brand` | `#4D60E6` | Inferred preference chip |

### Signal
| Token | Value | Usage |
| --- | --- | --- |
| `--signal-default` | `#EC7200` | Negative feedback emphasis |

## Flows

### Feedback undo
User reverses a feedback signal
- Card shows received feedback
- User clicks Undo
- Card fades to undone state
- Preference chip disappears
- Applied areas hidden

## Canonical implementation

```tsx
import { AICardLearningFeedback } from '@/components/ai/organisms/ai-card-learning-feedback/AICardLearningFeedback';

<AICardLearningFeedback
  feedback="positive"
  preference="Prefers executive summaries"
  appliedAreas={['Report generation', 'Email drafts', 'Meeting notes']}
  timestamp="Jun 7, 2026 at 10:24 AM"
  onUndo={() => console.log('Undo')}
  onViewHistory={() => console.log('RiHistoryLine')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-card-learning-feedback.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `ZS_DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-card-learning-feedback/ai-card-learning-feedback.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
