# Agentic Prompt — AI Dialog

# AI Dialog — Agentic Prompt

_Hand-off prompt for an agent that **can** fetch `github.com/upstream AI component source`. For an agent that can't, use the **Copy Component** action instead — it inlines every dependency file._

---

## Hard rules — read before generating any code

1. **Do NOT invent atoms.** Fetch every atom this component imports from the canonical mirror (read order below). Use each one verbatim. If a render comes back wrong, you almost certainly fabricated one instead of fetching it.
2. **AI Avatar = three AI_RAMP blue circles + white cross-star.** Fixed fills `#A6B4FC` / `#4D60E6` / `#1F2A66`, white star. **No orange gradient ring. No "Z" letterform. No emoji. No theme inversion.**
3. **Tokens come from `ai-tokens.ts` and `ai-typography.ts`** — use `AI.color.brand`, `var(--ai-card-bg)`, `AI_TYPOGRAPHY['@ai-section-subtitle']`, etc. Never hardcode brand hex.
4. **Icons** come from `lucide-react` for non-Guild glyphs and from the Guild icon font (`<i class="zs-icon zs-icon-{name}" />` inside `.zs-master-style`) when a Guild equivalent exists. Do not invent icon names.
5. **Toolbar buttons inside `AIInputCard` are `AIDialogButton` instances** — 34px pill/circle, transparent fill, subtle border. Not raw `<button>` elements.
6. **Quick chips are `AIChipQuick`** — pill, periwinkle border, brand-blue label. Not generic neutral buttons.
7. **File layout matters.** Keep the relative imports the source files use.

---

## Component metadata

- **Display name:** AI Dialog
- **Component id:** `ai-modal-dialog`
- **Category:** organisms
- **Status:** Stable
- **File path:** `src/app/components/ds/ai-modal-dialog.tsx`

---

## Source of truth

Do NOT reference Figma design files — GitHub is the only source of truth.

- **Repository:** `github.com/upstream AI component source`
- **File path:** `src/app/components/ds/ai-modal-dialog.tsx`

## Mandatory read order

Before writing any code, read these files in order:

1. `components/agent-instructions.md` — root rules + AI-native UI reading order
2. `components/ai/atomic/ai-avatar/ai-avatar.md` — canonical brand mark (no orange ring)
3. `components/atoms/iconography.md` + `src/core/icons.md` — icon cascade (Guild first, Lucide fallback)
4. `components/tokens/color.md` and `components/ai/tokens/color.md` — semantic + AI brand tokens
5. `components/tokens/spacing.md` — `@ds-space-unit` ramp (0 / 0.5 / 1 / 1.5 / 2)

---

# AI Dialog
_ai-modal-dialog_

> DS Dialog, AI surface theme — AI-blue actions, navy header, rounded corners, frosted indigo backdrop.

## Metadata
- **Category:** organisms
- **Status:** Stable
- **Source path:** `src/app/components/ds/ai-modal-dialog.tsx`
- **Tier 1 · Experience Mode:** AI Assisted
- **Tier 2 · AI Behavior:** Overlay · Container
- **Tier 3 · Accountability:** Custom element
- **Metrics:** 10 states · 7 shared · ~5KB context · 5 behaviors

## Overview

Themed wrapper over the real DSDialog. DSDialog reads every color from `--zs-*` custom properties and merges a `style` prop last; AIModalDialog sets those variables in that merged style, so the AI values cascade into the header, footer button, close icon, dividers, focus ring, and the DSButton in the Modal-With-Button variant. Re-anchors: --zs-background-button-default → AI.color.action.primary (#4D60E6); --zs-background-extra-bold → AI_RAMP[100] navy for the Dark Header Modal; --zs-separator-default → #BECAFE; --zs-icon-neutral-default → #4D60E6; --zs-text-helper → #3544A4; --zs-border-focus → #4D60E6. Shape: borderRadius AI.radius.lg (20px) + overflow:hidden to clip the header to the rounded top, and an AI-tinted elevation. The backdrop is overridden via a scoped ::backdrop rule to a frosted indigo (light brand frost by default, deep navy for inverse) with a blur. Body copy stays on the neutral ink for AA legibility. All native <dialog> behavior — showModal()/close(), ESC → onClose, focus trap + return-focus — is inherited unchanged from the base.

## When to use
- AI confirmations, action acknowledgements, and assistant prompts on AI surfaces
- Focused AI tasks that must block other interactions (auth, review-before-run)
- header="dark" + footerButtons for a high-emphasis AI decision moment

## When not to use
- Don't use on a standard (non-AI) surface — use <DSDialog> instead
- Don't fork ds-dialog.tsx to restyle — theme via the CSS-variable re-anchors
- Don't stack multiple modals or nest interactive dialogs without an explicit pattern

## Anatomy
1. **Host** _(Unique)_ — AIModalDialog — wraps DSDialog and sets --zs-* AI vars via the merged style.
2. **Header** _(Shared)_ — <h4> title + close affordance; navy bar (AI_RAMP[100]) in the Dark Header variant.
3. **Close** _(Shared)_ — Top-right close — AI close icon (#4D60E6), AI focus ring.
4. **Body** _(Unique)_ — <section> — neutral ink for AA legibility.
5. **Footer** _(Shared)_ — "Optional footer text" + external-link icon, or centered AI action button(s).
6. **Backdrop** _(Shared)_ — ::backdrop — frosted indigo (brand frost / navy inverse) with blur.
7. **Shape** _(Shared)_ — AI.radius.lg rounded corners + AI-tinted elevation; header clipped to the radius.

## State variations
- **Dialog** _(default)_ — Header + close, "Optional footer text" + external-link icon, AI shape.
- **Modal** _(showModal())_ — Modal on the frosted indigo backdrop; focus trap + ESC inherited.
- **Dark Header Modal** _(header="dark")_ — Header bar only is AI navy (AI_RAMP[100]) with white title + close icon; body/footer light.
- **Text Aligned (L)** _(alignment="left")_ — Left-aligned title + body, no footer.
- **Text Aligned (C)** _(alignment="center")_ — Center-aligned title + body, no footer.
- **Modal With Button (1)** _(footerButtons="one")_ — Centered single AI action button (#4D60E6).
- **Modal With Button (2)** _(footerButtons="two")_ — Centered outline + solid AI action buttons.
- **Overlay Frost** _(overlayColor="default")_ — Light indigo frost backdrop (AI_RAMP[20]) with blur.
- **Overlay Inverse** _(overlayColor="inverse")_ — Deep navy (AI_RAMP[100]) frosted backdrop.
- **Overlay Opacity** _(90/60/40/20%)_ — Backdrop opacity variants.
- **Small / Medium / Large** _(size)_ — 384 (483 w/footer) / 576 / 1084 px (inherited contract).
- **With helper** _(hasHelperText)_ — Helper line under body in AI text secondary (#3544A4).
- **No footer** _(hasFooter={false})_ — Body-only dialog.

## Props API
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | Modal state — showModal() when true, close() when false (inherited). |
| `header` | `'default' \| 'dark'` | `'default'` | Dark = AI navy header bar only (Dark Header Modal). |
| `size` | `'small' \| 'medium' \| 'large'` | `'small'` | 384 (483 with footer) / 576 / 1084 px. |
| `alignment` | `'left' \| 'center'` | `'left'` | Title + body alignment. |
| `overlayColor` | `'default' \| 'inverse'` | `'default'` | Frosted backdrop: indigo frost (default) or deep navy (inverse). |
| `overlayOpacity` | `90 \| 60 \| 40 \| 20` | `90` | Backdrop opacity variant. |
| `footerButtons` | `'one' \| 'two'` | `undefined` | Centered AI action-button footer (Modal With Button). |
| `hasFooter` | `boolean` | `true` | Render the footer (default = text + external-link icon). |
| `hasHelperText` | `boolean` | `false` | Helper line under body. |
| `radius` | `keyof AI.radius` | `'lg'` | AI corner radius scale (lg = 20px). |
| `actions` | `React.ReactNode` | `undefined` | Custom footer content; overrides default footer + footerButtons. |

## Tokens

### AI brand re-anchors (--zs-* → AI)
| Token | Value | Usage |
| --- | --- | --- |
| `--zs-background-button-default` | `AI.color.action.primary #4D60E6` | Action button + external-link icon |
| `--zs-background-extra-bold` | `AI_RAMP[100] #1F2A66` | Dark Header Modal header bar |
| `--zs-separator-default` | `AI.color.brandBorder #BECAFE` | Header / footer dividers |
| `--zs-icon-neutral-default` | `AI.color.brand #4D60E6` | Close icon |
| `--zs-text-helper` | `AI.color.text.secondary #3544A4` | Helper / "Optional footer text" |
| `--zs-border-focus` | `AI.color.border.focus #4D60E6` | Close-button focus ring |

### AI shape & overlay
| Token | Value | Usage |
| --- | --- | --- |
| `borderRadius` | `AI.radius.lg (20px)` | Rounded panel corners (base is 0) |
| `box-shadow` | `brand ring + navy depth` | AI-tinted elevation |
| `overlay frost` | `rgba(213,222,253,α) + blur` | Default frosted indigo backdrop |
| `overlay inverse` | `rgba(31,42,102,α) + blur` | Inverse (deep navy) backdrop |

## Flows

### Open an AI-branded modal dialog
The standard DS Dialog behavior with the AI surface theme.
- Import { AIModalDialog } from components/ds/ai-modal-dialog
- Hold isOpen in state; set true from the trigger
- Provide title + body (and optional header="dark", footerButtons, overlayColor)
- On close/ESC, onClose fires — reset isOpen; focus returns to the trigger

## Code example
```tsx
import { AIModalDialog } from './components/ds/ai-modal-dialog';

function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open AI dialog</button>
      <AIModalDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="AI Assistant"
        body="Ask the assistant to draft, summarize, or take an action."
      />
    </>
  );
}

// Dark Header Modal (AI navy header, light body):
<AIModalDialog isOpen={open} onClose={close} header="dark" title="AI Assistant" body="…" />

// Modal With Button (centered AI action button) on an inverse frosted overlay:
<AIModalDialog isOpen={open} onClose={close} alignment="center"
  footerButtons="one" overlayColor="inverse" title="Confirm" body="…" />

// AIModalDialog forwards ALL DSDialogProps to the real DSDialog, applying the AI
// brand via CSS-variable re-anchors + AI shape. Same behavior — AI look.
// For the un-themed standard dialog, use <DSDialog> directly.
```
