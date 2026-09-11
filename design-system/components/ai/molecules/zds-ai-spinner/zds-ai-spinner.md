# AI Spinner

**Version:** 1.1  
**Last Updated:** 2026-08-25  
**Owner:** Zaidyn Design System — AI  
**Tier:** molecules  
**Repo module:** `zdsAiSpinner`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`  
**Used By:** AI groups and patterns — see `components/ai/llms.txt`  

## Purpose

The standard ZDS spinner, wearing the AI brand. Same engineering — indigo arc on a soft light-indigo ring.

ZdsAiSpinner does not fork the ZDS spinner — it wraps the canonical <ZdsSpinner /> and re-anchors the CSS variables it reads (`--primary` for the rotating arc, the track var for the ring) to AI token values. Geometry, the ZDS size contract (48/32/24/20/16/14/12/8px), a11y (role="status"), the spin keyframes and the reduced-motion guard are all inherited from the base, so the spinner stays in lockstep with ZDS while carrying the AI surface. It is a reusable spinner molecule meant to be composed inside other AI molecules and organisms, and it is separate from — it does NOT replace — the AI loading indicator.

**Export:** `AISpinner`

## When to use

- Indeterminate loading inside an AI-generated region, card, or drawer
- Composed inside other AI molecules / organisms that need a brand-consistent spinner
- On dark or filled AI surfaces — use the dark / inverse variants

## When not to use

- To show multi-step agent progress — use the AI loading indicator or reasoning trace
- For determinate progress — use AI Progress
- It does not replace the AI loading indicator; both exist for different jobs

## Anatomy

1. **Track ring** _(Shared)_ — Static full ring. Light mode: soft light-indigo (AI.color.surface.emphasis). Dark mode: subtle light ring.
2. **Rotating arc** _(Unique)_ — The animated segment. Light mode: AI indigo (AI.color.action.primary). Dark/inverse: light-indigo / white.

## State variations

- **Light** _(default)_ — Indigo arc on a soft light-indigo ring — default AI surface.
- **Dark** _(dark)_ — Light ring + light-indigo arc for dark surfaces.
- **Inverse** _(inverse)_ — White-based ring + white arc for filled AI surfaces (e.g. a primary button).

## Props API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"48px" \| "32px" \| "24px" \| "20px" \| "16px" \| "14px" \| "12px" \| "8px"` | `"24px"` | ZDS size contract, inherited from ZdsSpinner. |
| `dark` | `boolean` | `false` | Render for dark surfaces (light ring + light-indigo arc). |
| `inverse` | `boolean` | `false` | Render on a filled AI surface (white-based ring + white arc). |
| `label` | `string` | `"Loading"` | Accessible name for the status role. |

## Tokens

### ZDS AI Spinner
| Token | Value | Usage |
| --- | --- | --- |
| `AI.color.action.primary` | `#4D60E6` | Rotating arc (light mode) |
| `AI.color.surface.emphasis` | `#BECAFE` | Track ring (light mode) / arc (dark mode) |

## Agent rules

1. Read this mirror spec and `zds-ai-spinner.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/ZDS tokens from `ai-tokens.ts`.
3. Do not invent dependency atoms — fetch canonical implementations from mirror specs.

Full agent contract: `components/ai/molecules/zds-ai-spinner/zds-ai-spinner.agent.json`.
