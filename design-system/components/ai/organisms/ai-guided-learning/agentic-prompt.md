# Agentic Prompt — AI Guided Learning

You are implementing the **AI Guided Learning** (`ai-guided-learning`) from the Guild AI Design System mirror.

| | |
|---|---|
| **Component** | AI Guided Learning (`ai-guided-learning`) |
| **Status** | Beta |
| **Category** | AI organisms |
| **Source** | Make export 2026-08-06 |

> Inverse-surface guided learning — feature announcements, product tours, coach marks, and step-by-step workflows.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/organisms/ai-guided-learning/ai-guided-learning.agent.json`
4. `components/ai/organisms/ai-guided-learning/ai-guided-learning.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIGuidedLearning` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `variant` (`'announcement' \) default `'guided-step' \` — 'guided-step-media' \
- `density` (`'Basic' \) default `'Simple' \` — 'Rich' \
- `title` (`string`) default ``—`` — Required heading — one clear idea, no marketing language
- `body` (`string`) default ``undefined`` — Short body copy — 1–2 sentences max
- `step` (`number`) default ``undefined`` — Current step index (1-based)
- `totalSteps` (`number`) default ``undefined`` — Total steps in the guided flow
- `primaryActionLabel` (`string`) default ``'Got it'`` — Label for the primary action button
- `secondaryActionLabel` (`string`) default ``undefined`` — Label for the secondary ghost button
- `showClose` (`boolean`) default ``true`` — Show the close/dismiss button
- `showSkip` (`boolean`) default ``false`` — Show the Skip ghost button
- `showCaret` (`boolean`) default ``false`` — Render the pointer/caret arrow
- `caretSide` (`'top' \) default `'right' \` — 'bottom' \
- `caretAlign` (`'start' \) default `'center' \` — 'end'`
- `caretOffset` (`number`) default ``0`` — Pixel offset from the start or end alignment anchor
- `mediaType` (`'image' \) default `'video' \` — 'none'`
- `mediaSrc` (`string`) default ``undefined`` — URL of the image or video source
- `mediaAlt` (`string`) default ``undefined`` — Alt text or accessible description for the media
- `mediaCaption` (`string`) default ``undefined`` — Optional visible caption below the media region
- `showDoNotShow` (`boolean`) default ``false`` — Show "Don't show this again" checkbox (Robust only)
- `status` (`'default' \) default `'completed' \` — 'loading-media' \
- `maxWidth` (`number`) default ``360`` — Max width of the container in pixels
- `onClose` (`() => void`) default ``undefined`` — Called when the close button is clicked
- `onSkip` (`() => void`) default ``undefined`` — Called when Skip is clicked
- `onNext` (`() => void`) default ``undefined`` — Called when Next is clicked in guided-step flow
- `onBack` (`() => void`) default ``undefined`` — Called when Back is clicked in guided-step flow
- `onPrimaryAction` (`() => void`) default ``undefined`` — Called when the primary action button is clicked
- `onSecondaryAction` (`() => void`) default ``undefined`` — Called when the secondary action button is clicked

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
