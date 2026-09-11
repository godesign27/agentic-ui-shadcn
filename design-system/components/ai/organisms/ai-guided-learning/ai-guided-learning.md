# AI Guided Learning

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** organisms (AI)  
**Repo module:** `aiGuidedLearning`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Inverse-surface guided learning — feature announcements, product tours, coach marks, and step-by-step workflows.

AI Guided Learning is a contextual learning component that introduces new AI features, teaches workflows, and guides users through product changes step by step. It uses an inverse/reverse color treatment to visually stand apart from the surrounding UI — dark on light, light on dark. The component supports five variants (announcement, guided-step, guided-step-media, coach-mark, completion) and four density levels (Basic, Simple, Rich, Robust).

**Export:** `AIGuidedLearning`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `src/app/components/ai/organisms/ai-guided-learning/AIGuidedLearning.tsx` | Canonical React source (external / Make) |
| `components/ai/organisms/ai-guided-learning/ai-guided-learning.md` | This mirror spec |
| `components/ai/organisms/ai-guided-learning/ai-guided-learning.agent.json` | Agent manifest |
| `components/ai/organisms/ai-guided-learning/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Learn · Discover · Guide |
| Accountability | Onboarding · Feature adoption · Tour |

## Anatomy

1. **Inverse Surface** _(Unique)_ — Deep navy (light UI) or lavender-white (dark UI) gradient container
2. **Caret / Pointer** _(Optional)_ — Arrow connecting the message to a target UI element; any side + alignment
3. **New Badge** _(Optional)_ — Pill badge for announcement variant
4. **Title** _(Required)_ — One clear idea — no marketing language
5. **Body Copy** _(Optional)_ — One to two sentences explaining what changed or what to do
6. **Media Region** _(Optional)_ — Image, video, or demo (Rich/Robust only)
7. **Progress Dots** _(Optional)_ — Step N of M — visual and textual
8. **Action Row** _(Unique)_ — Primary + secondary actions, skip, back/next
9. **Dismiss Control** _(Shared)_ — Close button with accessible name

## State variations

- **Announcement** _(variant=announcement)_ — Feature announcement with New badge and close control.
- **Guided Step** _(variant=guided-step)_ — Single step with step count, skip, and next.
- **Step + Media** _(variant=guided-step-media)_ — Guided step with image or video media region.
- **Coach Mark** _(variant=coach-mark)_ — Caret pointing to a specific UI element.
- **Completion** _(variant=completion)_ — Tour complete — success title and primary CTA.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'announcement' \| 'guided-step' \| 'guided-step-media' \| 'coach-mark' \| 'completion'` | `'announcement'` | Visual variant — controls layout, badge, media, and caret treatment |
| `density` | `'Basic' \| 'Simple' \| 'Rich' \| 'Robust'` | `'Simple'` | Complexity level — controls which anatomy regions appear |
| `title` | `string` | `—` | Required heading — one clear idea, no marketing language |
| `body` | `string` | `undefined` | Short body copy — 1–2 sentences max |
| `step` | `number` | `undefined` | Current step index (1-based) |
| `totalSteps` | `number` | `undefined` | Total steps in the guided flow |
| `primaryActionLabel` | `string` | `'Got it'` | Label for the primary action button |
| `secondaryActionLabel` | `string` | `undefined` | Label for the secondary ghost button |
| `showClose` | `boolean` | `true` | Show the close/dismiss button |
| `showSkip` | `boolean` | `false` | Show the Skip ghost button |
| `showCaret` | `boolean` | `false` | Render the pointer/caret arrow |
| `caretSide` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Which side of the container the caret appears on |
| `caretAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment of the caret along the chosen side |
| `caretOffset` | `number` | `0` | Pixel offset from the start or end alignment anchor |
| `mediaType` | `'image' \| 'video' \| 'none'` | `'none'` | RiFontSize2 of media to display in the media region |
| `mediaSrc` | `string` | `undefined` | URL of the image or video source |
| `mediaAlt` | `string` | `undefined` | Alt text or accessible description for the media |
| `mediaCaption` | `string` | `undefined` | Optional visible caption below the media region |
| `showDoNotShow` | `boolean` | `false` | Show "Don't show this again" checkbox (Robust only) |
| `status` | `'default' \| 'completed' \| 'loading-media' \| 'media-unavailable'` | `'default'` | Component state — affects media region and completion layout |
| `maxWidth` | `number` | `360` | Max width of the container in pixels |
| `onClose` | `() => void` | `undefined` | Called when the close button is clicked |
| `onSkip` | `() => void` | `undefined` | Called when Skip is clicked |
| `onNext` | `() => void` | `undefined` | Called when Next is clicked in guided-step flow |
| `onBack` | `() => void` | `undefined` | Called when Back is clicked in guided-step flow |
| `onPrimaryAction` | `() => void` | `undefined` | Called when the primary action button is clicked |
| `onSecondaryAction` | `() => void` | `undefined` | Called when the secondary action button is clicked |

## Tokens

### Inverse Surface (Light Mode)
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-gl-surface` | `linear-gradient(135deg,#1A1628,#22203A,#1E1B2F)` | Container background on light UI |
| `--ai-gl-text` | `#F0EEF8` | Primary text on inverse surface |
| `--ai-gl-text-muted` | `rgba(240,238,248,0.65)` | Body copy, helper text |
| `--ai-gl-border` | `rgba(255,255,255,0.10)` | Container border |

### Inverse Surface (Dark Mode)
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-gl-surface-dark` | `linear-gradient(135deg,#F5F6FF,#EEF0FF,#FFFFFF)` | Container background on dark UI |
| `--ai-gl-text-dark` | `#1A1628` | Primary text on light inverse surface |
| `--ai-gl-border-dark` | `rgba(26,22,40,0.12)` | Container border on light inverse surface |

### Actions
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-gl-btn-bg` | `rgba(255,255,255,0.14)` | Primary button fill |
| `--ai-gl-btn-border` | `rgba(255,255,255,0.22)` | Primary button border |
| `--ai-gl-focus-ring` | `#4D60E6` | Keyboard focus ring |

## Canonical implementation

```tsx
import { AIGuidedLearning } from '@/components/ai/organisms/ai-guided-learning/AIGuidedLearning';

// Feature announcement
<AIGuidedLearning
  variant="announcement"
  density="Simple"
  title="AI-assisted scenario comparison is here"
  body="Compare current and proposed territory changes side by side with confidence scores and rationale."
  primaryActionLabel="Try it"
  showClose
  onClose={() => setVisible(false)}
  onPrimaryAction={() => navigate('/scenarios')}
/>

// Multi-step guided tour
<AIGuidedLearning
  variant="guided-step"
  density="Robust"
  title="Choose your computation type"
  body="Select the method that best fits your data. You can switch at any time from the settings panel."
  step={2}
  totalSteps={5}
  showSkip
  showClose
  onNext={() => setStep(s => s + 1)}
  onBack={() => setStep(s => s - 1)}
  onSkip={() => endTour()}
/>

// Coach mark with caret
<AIGuidedLearning
  variant="coach-mark"
  density="Basic"
  title="Review confidence and source details"
  body="Before applying, check the source list and confidence score here."
  showCaret
  caretSide="bottom"
  caretAlign="center"
  primaryActionLabel="Got it"
  showClose
  onClose={() => dismiss()}
/>

// Completion
<AIGuidedLearning
  variant="completion"
  density="Simple"
  title="Tour complete"
  body="You're ready to use AI-assisted scenario comparison. Reach out if you have questions."
  primaryActionLabel="Start comparing"
  onPrimaryAction={() => navigate('/scenarios')}
/>
```

## Agent rules

1. Read this mirror spec and `ai-guided-learning.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/organisms/ai-guided-learning/ai-guided-learning.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
