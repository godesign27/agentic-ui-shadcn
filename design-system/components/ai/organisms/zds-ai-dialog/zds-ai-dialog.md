# AI Dialog

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Zaidyn Design System — AI  
**Tier:** organisms  
**Repo module:** `zdsAiDialog`  
**Component type:** React organism  
**Status:** Stable  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

ZDS Dialog, AI surface theme — AI-blue actions, navy header, rounded corners, frosted indigo backdrop.

Themed wrapper over the real ZdsDialog. ZdsDialog reads every color from `--zs-*` custom properties and merges a `style` prop last; ZdsAiDialog sets those variables in that merged style, so the AI values cascade into the header, footer button, close icon, dividers, focus ring, and the ZdsButton in the Modal-With-Button variant. Re-anchors: --zs-background-button-default → AI.color.action.primary (#4D60E6); --zs-background-extra-bold → ZSAI[100] navy for the Dark Header Modal; --zs-separator-default → #BECAFE; --zs-icon-neutral-default → #4D60E6; --zs-text-helper → #3544A4; --zs-border-focus → #4D60E6. Shape: borderRadius AI.radius.lg (20px) + overflow:hidden to clip the header to the rounded top, and an AI-tinted elevation. The backdrop is overridden via a scoped ::backdrop rule to a frosted indigo (light brand frost by default, deep navy for inverse) with a blur. Body copy stays on the neutral ink for AA legibility. All native <dialog> behavior — showModal()/close(), ESC → onClose, focus trap + return-focus — is inherited unchanged from the base.

**Export:** `ZDSAIDialog`

## When to use

- AI confirmations, action acknowledgements, and assistant prompts on AI surfaces
- Focused AI tasks that must block other interactions (auth, review-before-run)
- header="dark" + footerButtons for a high-emphasis AI decision moment

## When not to use

- Don't use on a standard (non-AI) surface — use <ZdsDialog> instead
- Don't fork zds-dialog.tsx to restyle — theme via the CSS-variable re-anchors
- Don't stack multiple modals or nest interactive dialogs without an explicit pattern

## Anatomy

1. **Host** _(Unique)_ — ZdsAiDialog — wraps ZdsDialog and sets --zs-* AI vars via the merged style.
2. **Header** _(Shared)_ — <h4> title + close affordance; navy bar (ZSAI[100]) in the Dark Header variant.
3. **Close** _(Shared)_ — Top-right close — AI close icon (#4D60E6), AI focus ring.
4. **Body** _(Unique)_ — <section> — neutral ink for AA legibility.
5. **Footer** _(Shared)_ — "Optional footer text" + external-link icon, or centered AI action button(s).
6. **Backdrop** _(Shared)_ — ::backdrop — frosted indigo (brand frost / navy inverse) with blur.
7. **Shape** _(Shared)_ — AI.radius.lg rounded corners + AI-tinted elevation; header clipped to the radius.

## State variations

- **Dialog** _(default)_ — Header + close, "Optional footer text" + external-link icon, AI shape.
- **Modal** _(showModal())_ — Modal on the frosted indigo backdrop; focus trap + ESC inherited.
- **Dark Header Modal** _(header="dark")_ — Header bar only is AI navy (ZSAI[100]) with white title + close icon; body/footer light.
- **Text Aligned (L)** _(alignment="left")_ — Left-aligned title + body, no footer.
- **Text Aligned (C)** _(alignment="center")_ — Center-aligned title + body, no footer.
- **Modal With Button (1)** _(footerButtons="one")_ — Centered single AI action button (#4D60E6).
- **Modal With Button (2)** _(footerButtons="two")_ — Centered outline + solid AI action buttons.
- **Overlay Frost** _(overlayColor="default")_ — Light indigo frost backdrop (ZSAI[20]) with blur.
- **Overlay Inverse** _(overlayColor="inverse")_ — Deep navy (ZSAI[100]) frosted backdrop.
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
| `--zs-background-extra-bold` | `ZSAI[100] #1F2A66` | Dark Header Modal header bar |
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
The standard ZDS Dialog behavior with the AI surface theme.
- Import { ZdsAiDialog } from components/zds/zds-ai-dialog
- Hold isOpen in state; set true from the trigger
- Provide title + body (and optional header="dark", footerButtons, overlayColor)
- On close/ESC, onClose fires — reset isOpen; focus returns to the trigger

## Agent rules

1. Read this mirror spec and `zds-ai-dialog.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/organisms/zds-ai-dialog/zds-ai-dialog.agent.json`.
