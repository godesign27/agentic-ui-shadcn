# AI Stepper

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Guild Design System — AI  
**Tier:** organisms  
**Repo module:** `aiStepper`  
**Component type:** React organism  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

DS Compact Stepper, AI surface theme — brand-gradient milestones, brand tracks, glowing current step.

AIStepper is the AI-surface sibling of the standard DS Compact Stepper (src/stepper/, ported in phaseH → CompactStepper). It preserves the stepper contract — evenly-distributed steps, half-tracks that fill up to and including the current step, icon/number milestones, and italic status badges — while replacing the DS neutral/green token layer with the AI system. Completed and current-complete steps fill with AI.gradient.action.full (brand gradient) under a white glyph and a brand drop shadow; the current step is a white number circle with a 2px AI.color.brand (#4D60E6) ring and the same soft glow, its number in AI.color.text.primary (#1F2A66); steps after the current one are muted (soft-brand #BECAFE ring or a filled soft-brand dot, brand-subtle track, disabled text). Connector tracks are rounded and painted AI brand for done segments over AI.color.brandSubtle (#D2DBFF) for pending ones. Status badges keep the DS semantic meaning but recolor to the AI status set (success / warning / error) with the AI brand for info / current. Orientation switches horizontal ↔ vertical; the small size drops milestones to 28px / labels to 14px. Style-driven and stateless — the app owns step transitions. Glyphs render through the icon font (zs-icon-*); the root carries zs-master-style so the icon-font glyph rules resolve.

**Export:** `AIStepper`

## When to use

- AI approval / review workflows on an AI surface (submission → review rounds → approved)
- Multi-step AI agent flows that need progress + status matching the AI look
- A stepper that must sit visually beside the AI Card, AI Tab, and AI Dialog
- Linear sequential progress with a status badge per step

## When not to use

- You need the neutral product stepper — use the standard `ds-stepper`
- Branching (non-linear) flows — a stepper implies a single linear path
- Clickable step navigation without a defined spec — this is style-only, no built-in behavior

## Anatomy

1. **Stepper** _(Shared)_ — Flex container distributing steps evenly (horizontal) or stacking them (vertical). Carries zs-master-style + ai-stepper.
2. **Step** _(Shared)_ — One milestone + track segment + details block; aria-current="step" on the active step.
3. **Milestone** _(Unique)_ — Circle: brand-gradient fill + white glyph (complete), white + 2px brand ring + glow (current), or soft-brand ring / dot (pending).
4. **Track** _(Shared)_ — Rounded connector — AI brand #4D60E6 for done segments, AI.color.brandSubtle #D2DBFF after the current step.
5. **Label** _(Shared)_ — AI.color.text.primary #1F2A66, Bold on the current step, muted (#716e79) after it.
6. **Badge** _(Shared)_ — Italic status pill on a soft tint — AI status set (success/warning/error) + brand for info/current.

## State variations

- **Inline Compact (neutral)** _(layout="inline" size="small" tone="neutral")_ — Small inline pill stepper in the DS neutral tone — grey filled disc and neutral pill outline instead of the brand accent.
- **Horizontal** _(orientation="horizontal")_ — 5-step approval flow — 3 complete (brand gradient), current (Round 3, brand ring + glow), pending Final.
- **Horizontal Compact** _(size="small")_ — Small size — 28px milestones, 14px labels.
- **Vertical** _(orientation="vertical")_ — Vertical rail — brand tracks run top-to-bottom.
- **Vertical Compact** _(orientation="vertical" size="small")_ — Small vertical rail.
- **Stepper Modes** _(pending dot)_ — Pending steps as filled soft-brand dots instead of numbers.
- **Compact Modes** _(small · pending dot)_ — Small size with soft-brand dot pending steps.
- **Inline labels** _(layout="inline")_ — Label rides inside the stepper beside the number; active step wrapped in a rounded brand pill (Countries → Sites → PI).
- **Inline Compact** _(layout="inline" size="small")_ — Small inline pill stepper.

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `AIStepDef[]` | `required` | Steps — { label, sub?, badge?, mode, icon?, num?, dot? }. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout axis. |
| `size` | `'normal' \| 'small'` | `'normal'` | normal = 40px milestone / 16px label; small = 28px / 14px. |
| `layout` | `'stacked' \| 'inline'` | `'stacked'` | stacked = label beneath each milestone; inline = label beside the number, active step wrapped in a rounded pill (horizontal only). |
| `tone` | `'brand' \| 'neutral'` | `'brand'` | Inline-layout color tone. brand = AI accent; neutral = DS neutral greys. |
| `mode (step)` | `'complete' \| 'current-complete' \| 'current' \| 'pending'` | `—` | Per-step state — drives the milestone + track fill. |
| `badge (step)` | `{ text, tone }` | `—` | Italic status pill; tone = success \| info \| warning \| error \| neutral \| disabled. |
| `dot (step)` | `boolean` | `false` | Render a pending step as a filled soft-brand dot instead of a number. |

## Tokens

### AI milestone & track
| Token | Value | Usage |
| --- | --- | --- |
| `AI.gradient.action.full` | `linear-gradient(135deg,#657CEC,#4D60E6)` | Completed / current-complete milestone fill |
| `AI.shadow.action.default` | `rgba(77,96,230,0.18)` | Brand glow under filled + current milestones |
| `AI.color.brand` | `#4D60E6` | Done track + current milestone ring |
| `AI.color.brandSubtle` | `#D2DBFF` | Pending / after-current track + current badge fill |
| `AI.color.brandBorder` | `#BECAFE` | Pending milestone ring + pending dot fill |

### AI text & badges
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.text.primary` | `#1F2A66` | Default label + current number |
| `AI.color.text.secondary` | `#3544A4` | Current (neutral) badge text |
| `AI.color.status.success` | `#0A6E5E` | Approved badge |
| `AI.color.status.warning` | `#8A640C` | Warning badge |
| `AI.color.status.error` | `#C0392B` | Danger badge |
| `DS.textDisabled` | `#716e79` | Muted label + pending number |

## Flows

### Render an AI approval stepper
Style-only — the app owns step transitions.
- Import { AIStepper } from ai/organisms/ai-stepper/AIStepper
- Build a steps array — mark completed steps complete, the active step current, the rest pending
- Add a badge per step for the approval status (Approved / Current Step / Pending Approval)
- Pick orientation + size; on step change, swap each step's mode in app state

## Agent rules

1. Read this mirror spec and `ai-stepper.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/organisms/ai-stepper/ai-stepper.agent.json`.
