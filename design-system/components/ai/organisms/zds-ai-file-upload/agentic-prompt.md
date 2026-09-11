# Agentic Prompt — AI File Upload

# AI File Upload — Agentic Prompt

_Hand-off prompt for an agent that **can** fetch `github.com/zsainc/9904PD0068_zds-ai-mirror`. For an agent that can't, use the **Copy Component** action instead — it inlines every dependency file._

---

## Hard rules — read before generating any code

1. **Do NOT invent atoms.** Fetch every atom this component imports from the canonical mirror (read order below). Use each one verbatim. If a render comes back wrong, you almost certainly fabricated one instead of fetching it.
2. **AI Avatar = three ZSAI blue circles + white cross-star.** Fixed fills `#A6B4FC` / `#4D60E6` / `#1F2A66`, white star. **No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.**
3. **Tokens come from `ai-tokens.ts` and `ai-typography.ts`** — use `AI.color.brand`, `var(--ai-card-bg)`, `AI_TYPOGRAPHY['@zsai-section-subtitle']`, etc. Never hardcode brand hex.
4. **Icons** come from `lucide-react` for non-ZAIDYN glyphs and from the ZAIDYN icon font (`<i class="zs-icon zs-icon-{name}" />` inside `.zs-master-style`) when a ZAIDYN equivalent exists. Do not invent icon names.
5. **Toolbar buttons inside `AIInputCard` are `AIDialogButton` instances** — 34px pill/circle, transparent fill, subtle border. Not raw `<button>` elements.
6. **Quick chips are `AIChipQuick`** — pill, periwinkle border, brand-blue label. Not generic neutral buttons.
7. **File layout matters.** Keep the relative imports the source files use.

---

## Component metadata

- **Display name:** AI File Upload
- **Component id:** `zds-ai-file-upload`
- **Category:** organisms
- **Status:** Stable
- **File path:** `src/app/components/zds/zds-file-upload.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/zsainc/9904PD0068_zds-ai-mirror`
- **File path:** `src/app/components/zds/zds-file-upload.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (ZAIDYN first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@zs-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI File Upload
_zds-ai-file-upload_

> ZDS File Upload, AI surface theme — brand-blue accent, real AIButton CTA + AIProgress bars, shared icons.

## Metadata
- **Category:** organisms
- **Status:** Stable
- **Source path:** `src/app/components/zds/zds-file-upload.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Form · Upload
- **Tier 3 · Accountability:** Custom element
- **Metrics:** 8 states · 5 shared · ~15KB context · 4 behaviors

## Overview

The AI-themed variant of the standard ZDS File Upload. The single ZdsFileUpload component (zds/zds-file-upload.tsx) accepts theme="standard" (ZDS primary teal, square browse button, teal progress bar) or theme="ai". In the AI theme the only color that changes is the teal primary → AI brand blue (var(--color-ai-brand)): the drag-over border + tint and the CTA re-anchor to brand, while foreground, helper, the neutral progress track, and the success/error semantics are unchanged. The browse trigger renders the real AIButton atom (variant="primary-solid", rounded AI corners) and each uploading row renders the real AIProgress atom — both consumed, never re-implemented. Drop zone, file list, remove actions, validation states, and the inline-SVG icon set are shared with the standard control. All colors, radii, and spacing read design-system CSS variables; all text uses the "Open Sans" face.

## When to use
- File upload on AI surfaces that should read as part of the AI experience
- Any upload flow where the AI brand accent is preferred over the ZDS teal
- Upload with progress feedback via the real AIProgress atom

## When not to use
- Don't use on a standard (non-AI) surface — use the standard <ZdsFileUpload> (default theme) instead
- Don't fork zds-file-upload.tsx to restyle — switch the theme prop
- Don't hard-code the browse button or progress bar — the AI theme renders the real AIButton + AIProgress atoms

## Anatomy
1. **Host** _(Unique)_ — ZdsFileUpload theme="ai" — re-anchors the accent to the AI brand blue.
2. **Drop zone** _(Shared)_ — Dashed region; drag-over border + tint use var(--color-ai-brand).
3. **Browse button** _(Unique)_ — Real AIButton (variant="primary-solid", rounded AI corners) — not hard-coded.
4. **Native input** _(Shared)_ — <input type="file"> — kept in DOM for a11y.
5. **File row** _(Shared)_ — Name, size, remove icon; same inline-SVG iconography as standard.
6. **Progress** _(Unique)_ — Real AIProgress atom per uploading file — not hard-coded.
7. **Helper / error** _(Shared)_ — Validation messaging in the unchanged semantic tokens (aria-live="polite").

## State variations
- **Empty** _(theme="ai")_ — Resting drop zone — neutral border, AIButton browse CTA.
- **Active (drag over)** _(active)_ — Drag-over — border + tint use the AI brand (var(--color-ai-brand)).
- **In progress** _(single)_ — One file uploading with the real AIProgress atom.
- **In progress · multi** _(multiple)_ — Four files uploading, each with its own AIProgress bar.
- **Completed** _(single)_ — Uploaded file row — doc icon in the unchanged neutral tokens.
- **Success · multi** _(multiple)_ — Four files complete — check-circle icon in var(--success-color).
- **Error** _(single)_ — Error row — hexagon icon + message in var(--error-color) (unchanged).
- **Error · multi** _(multiple)_ — Four error rows with a shared error message in var(--error-color).

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | `'standard' \| 'ai'` | `'standard'` | AI File Upload sets theme="ai": brand-blue accent, AIButton CTA, AIProgress bars. |
| `state` | `'in-progress' \| 'completed' \| 'success' \| 'error'` | `—` | Per-file row state driving the demo/list. |
| `single` | `boolean` | `false` | Single vs multi file upload. |
| `containerState` | `'default' \| 'active' \| 'disabled'` | `'default'` | Drop zone state (active = drag-over). |
| `size` | `'normal' \| 'small' \| 'xsmall'` | `'normal'` | Visual sizing; maps the AIButton size (md / sm). |
| `files` | `ZdsUploadedFile[]` | `—` | Uploaded-file list. |
| `width` | `number \| string` | `—` | Control width. |

## Tokens

### AI accent (globals.css vars)
| Token | Value | Usage |
| --- | --- | --- |
| `--color-ai-brand` | `#4D60E6` | Drag-over border + tint and the browse CTA — replaces the standard primary teal |

### Shared neutrals + semantics (unchanged from standard)
| Token | Value | Usage |
| --- | --- | --- |
| `--foreground` | `#2F2C3C` | File name / body text |
| `--helper-text-color` | `#5B5864` | Helper + size text, doc icon |
| `--border-light-color` | `#DEDCDE` | Progress track / dividers |
| `--success-color` | `#0E7C3A` | Completed check-circle icon |
| `--error-color` | `#C0392B` | Error hexagon, filename, delete, message |

## Flows

### Render an AI-themed file upload
Standard ZDS File Upload structure with the AI surface theme.
- Import { ZdsFileUpload } from components/zds/zds-file-upload
- Set theme="ai" — teal primary swaps to var(--color-ai-brand)
- Browse CTA renders the real AIButton; progress renders the real AIProgress
- Neutral + semantic tokens and the inline-SVG icons are unchanged

## Code example
```tsx
import { ZdsFileUpload } from './components/zds/zds-file-upload';

// theme="ai" swaps the standard primary teal for the AI brand blue on the
// drag-over border/tint and re-anchors the browse CTA; the browse button renders
// the real AIButton (primary-solid) and each uploading row renders the real
// AIProgress atom. Neutral + semantic tokens (helper, foreground, success,
// error) stay identical to the standard control.
<ZdsFileUpload theme="ai" width={520} state="in-progress" single />

// For the un-themed ZDS teal control, omit theme (defaults to "standard").
```
