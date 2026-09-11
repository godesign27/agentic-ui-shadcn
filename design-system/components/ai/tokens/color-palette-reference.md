# AI Color Palette Reference

**Last Updated:** 2026-07-06  
**Source:** Guild AI Design System token bundle (`ai-tokens.bundle.md`)

---

# Color Palette Reference

Full palette dump. Two systems live side-by-side:

- **AI namespace** (`AI.*`, `AI_RAMP`, `SIGNAL_ORANGE`, `COMPANION_TAN`, `DS.*`) — used by every AI component in this project. Consumed via `import` from `ai-tokens.ts`.
- **DS color system** (`--zs-*` / `@zs-*`) — the standard-library color foundation. Consumed via CSS custom properties inside `zs-master-style`-scoped surfaces. Source of truth: `/src/imports/Guild.tokens.json`.

Semantic roles below always reference the DS palette — warning is Dark Yellow, error is Red, success is Green, info is Indigo. Brand/Orange is an accent color and must NOT be used for semantic warning.

---

## 1. AI namespace (this project)

### AI Tier 1 palettes

### AI_RAMP (Indigo brand — `AI.color.brand` family)

_The primary AI brand ramp. Consumed via `AI.color.brand`, `AI.color.brandStrong`, `AI.color.brandSurface`. Access at Tier 1 as `AI_RAMP[step]`._

| Variable | Step | Hex |
|----------|------|-----|
| `AI_RAMP-00` | 00 | `#F5F6FF` |
| `AI_RAMP-10` | 10 | `#D6DEFD` |
| `AI_RAMP-20` | 20 | `#B8C6FB` |
| `AI_RAMP-30` | 30 | `#9BAEF7` |
| `AI_RAMP-40` | 40 | `#7F95F2` |
| `AI_RAMP-50` | 50 | `#657CEC` |
| `AI_RAMP-60` | 60 | `#4D60E6` |
| `AI_RAMP-70` | 70 | `#4152C4` |
| `AI_RAMP-80` | 80 | `#3544A4` |
| `AI_RAMP-90` | 90 | `#2A3784` |
| `AI_RAMP-100` | 100 | `#1F2A66` |

### SIGNAL_ORANGE (Brand accent — attention / escalation, NOT warning)

_Reserved for brand accents such as launcher pulses. Do not use for semantic warning — use Dark Yellow. Access as `SIGNAL_ORANGE[step]`._

| Variable | Step | Hex |
|----------|------|-----|
| `SIGNAL_ORANGE-00` | 00 | `#FEFBF4` |
| `SIGNAL_ORANGE-10` | 10 | `#FFF1D6` |
| `SIGNAL_ORANGE-20` | 20 | `#FFD68F` |
| `SIGNAL_ORANGE-30` | 30 | `#FFC657` |
| `SIGNAL_ORANGE-40` | 40 | `#FFB234` |
| `SIGNAL_ORANGE-50` | 50 | `#FF9900` |
| `SIGNAL_ORANGE-60` | 60 | `#EC7200` |
| `SIGNAL_ORANGE-70` | 70 | `#CB6100` |
| `SIGNAL_ORANGE-80` | 80 | `#A54F00` |
| `SIGNAL_ORANGE-90` | 90 | `#663000` |
| `SIGNAL_ORANGE-100` | 100 | `#481A00` |

### COMPANION_TAN (Companion warm neutral surface)

_Warm neutral surface for background regions that want more warmth than Gray. Used by containers and companion surfaces (10% accent role). Access as `COMPANION_TAN[step]`._

| Variable | Step | Hex |
|----------|------|-----|
| `COMPANION_TAN-00` | 00 | `#F6F2EB` |
| `COMPANION_TAN-10` | 10 | `#ECE6DD` |
| `COMPANION_TAN-20` | 20 | `#F1E4D0` |
| `COMPANION_TAN-30` | 30 | `#E8D6BF` |
| `COMPANION_TAN-40` | 40 | `#DCC6B0` |
| `COMPANION_TAN-50` | 50 | `#CDB39C` |
| `COMPANION_TAN-60` | 60 | `#B89580` |
| `COMPANION_TAN-70` | 70 | `#9A7560` |
| `COMPANION_TAN-80` | 80 | `#7A5944` |
| `COMPANION_TAN-90` | 90 | `#5A3E2C` |
| `COMPANION_TAN-100` | 100 | `#3C2A1D` |

### DS (namespaced neutrals available inside `ai-tokens.ts`)

_Access as `DS.{name}` from `ai-tokens.ts` — this is the AI-library projection of DS neutrals for use inside `AI.*` semantic aliases._

| Step | Hex |
|------|-----|
| border | `#B2B0B6` |
| borderFunc | `#5b5864` |
| font | `"Open Sans", sans-serif` |
| iconDefault | `#5b5864` |
| iconHover | `#2f2c3c` |
| menuHoverBg | `rgba(178,176,182,0.4)` |
| textDefault | `#2f2c3c` |
| textDisabled | `#716e79` |
| textHelper | `#5b5864` |

### AI Tier 2 — semantic aliases (`AI.color.*`)

| Token | Value |
|-------|-------|
| `AI.color.action.primary` | `#4D60E6` |
| `AI.color.action.primaryHover` | `#4152C4` |
| `AI.color.action.primaryActive` | `#3544A4` |
| `AI.color.surface.default` | `#F5F6FF` |
| `AI.color.surface.subtle` | `#D6DEFD` |
| `AI.color.surface.emphasis` | `#B8C6FB` |
| `AI.color.border.default` | `#B8C6FB` |
| `AI.color.border.strong` | `#7F95F2` |
| `AI.color.border.focus` | `#657CEC` |
| `AI.color.text.primary` | `#2A3784` |
| `AI.color.text.secondary` | `#4152C4` |
| `AI.color.text.onAction` | `#FFFFFF` |
| `AI.color.brand` | `#4D60E6` |
| `AI.color.brandSubtle` | `#D6DEFD` |
| `AI.color.brandSurface` | `#F5F6FF` |
| `AI.color.brandBorder` | `#B8C6FB` |
| `AI.color.brandStrong` | `#2A3784` |
| `AI.color.brandInk` | `#1F2A66` |
| `AI.color.signal.default` | `#EC7200` |
| `AI.color.signal.hover` | `#CB6100` |
| `AI.color.signal.strong` | `#A54F00` |
| `AI.color.signal.subtle` | `#FFF1D6` |
| `AI.color.signal.surface` | `#FEFBF4` |
| `AI.color.companion.paper` | `#F6F2EB` |
| `AI.color.companion.surface` | `#ECE6DD` |
| `AI.color.companion.highlight` | `#F1E4D0` |
| `AI.color.companion.border` | `#E8D6BF` |
| `AI.color.companion.ink` | `#3C2A1D` |

---

## 2. DS color system (from `Guild.tokens.json`)

### Brand palettes

### Brand / Teal

_Primary DS brand color — used for selection accents, navigation chrome, brand marks._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-brand-teal-0` | 0 | `#F3FCFE` |
| `@zs-brand-teal-10` | 10 | `#D6F7FF` |
| `@zs-brand-teal-20` | 20 | `#A5ECF3` |
| `@zs-brand-teal-30` | 30 | `#82DFE2` |
| `@zs-brand-teal-40` | 40 | `#62D2D1` |
| `@zs-brand-teal-50` | 50 | `#43BEBE` |
| `@zs-brand-teal-60` | 60 | `#27A6A4` |
| `@zs-brand-teal-70` | 70 | `#2D8B93` |
| `@zs-brand-teal-80` | 80 | `#2F6F7B` |
| `@zs-brand-teal-90` | 90 | `#2D535F` |
| `@zs-brand-teal-100` | 100 | `#022D42` |

### Brand / Orange

_Brand accent — used for callouts, spot highlights. NOT the semantic warning color._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-brand-orange-0` | 0 | `#FEFBF4` |
| `@zs-brand-orange-10` | 10 | `#FFF1D6` |
| `@zs-brand-orange-20` | 20 | `#FFD680` |
| `@zs-brand-orange-30` | 30 | `#FFC657` |
| `@zs-brand-orange-40` | 40 | `#FFB234` |
| `@zs-brand-orange-50` | 50 | `#FF9900` |
| `@zs-brand-orange-60` | 60 | `#EC7200` |
| `@zs-brand-orange-70` | 70 | `#CB6100` |
| `@zs-brand-orange-80` | 80 | `#A54F00` |
| `@zs-brand-orange-90` | 90 | `#663000` |
| `@zs-brand-orange-100` | 100 | `#481A00` |

### Brand / Gray

_Neutral ramp — text, helper text, dividers, backgrounds. Includes a dedicated `White` step._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-brand-gray-0` | 0 | `#FAFAFA` |
| `@zs-brand-gray-10` | 10 | `#F4F3F3` |
| `@zs-brand-gray-20` | 20 | `#DEDCDE` |
| `@zs-brand-gray-30` | 30 | `#B2B0B6` |
| `@zs-brand-gray-40` | 40 | `#9C9AA1` |
| `@zs-brand-gray-50` | 50 | `#87848D` |
| `@zs-brand-gray-60` | 60 | `#716E79` |
| `@zs-brand-gray-70` | 70 | `#5B5864` |
| `@zs-brand-gray-80` | 80 | `#454250` |
| `@zs-brand-gray-90` | 90 | `#2F2C3C` |
| `@zs-brand-gray-100` | 100 | `#1A1628` |
| `@zs-brand-gray-white` | White | `#FFFFFF` |

### Semantic palettes

### Semantic / Indigo

_Info state — used for `--zs-border-info-default` (Indigo 70)._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-semantic-indigo-0` | 0 | `#EEEEFF` |
| `@zs-semantic-indigo-10` | 10 | `#DFE0FE` |
| `@zs-semantic-indigo-20` | 20 | `#C7CCFA` |
| `@zs-semantic-indigo-30` | 30 | `#A6B2F3` |
| `@zs-semantic-indigo-40` | 40 | `#7E92E9` |
| `@zs-semantic-indigo-50` | 50 | `#5369DA` |
| `@zs-semantic-indigo-60` | 60 | `#2B44C7` |
| `@zs-semantic-indigo-70` | 70 | `#1B24AA` |
| `@zs-semantic-indigo-80` | 80 | `#141187` |
| `@zs-semantic-indigo-90` | 90 | `#160C60` |
| `@zs-semantic-indigo-100` | 100 | `#120938` |

### Semantic / Green

_Success state — used for `--zs-border-success-default` (Green 80)._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-semantic-green-0` | 0 | `#F1FEFF` |
| `@zs-semantic-green-10` | 10 | `#D2FAF7` |
| `@zs-semantic-green-20` | 20 | `#ADF2E7` |
| `@zs-semantic-green-30` | 30 | `#82E6CF` |
| `@zs-semantic-green-40` | 40 | `#54D7AF` |
| `@zs-semantic-green-50` | 50 | `#26C38D` |
| `@zs-semantic-green-60` | 60 | `#00AA67` |
| `@zs-semantic-green-70` | 70 | `#058F69` |
| `@zs-semantic-green-80` | 80 | `#0A6E5E` |
| `@zs-semantic-green-90` | 90 | `#0C4846` |
| `@zs-semantic-green-100` | 100 | `#091F21` |

### Semantic / Red

_Error state — used for `--zs-border-error-default` (Red 60)._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-semantic-red-0` | 0 | `#FFEDE9` |
| `@zs-semantic-red-10` | 10 | `#FFCDC2` |
| `@zs-semantic-red-20` | 20 | `#FFB6A5` |
| `@zs-semantic-red-30` | 30 | `#FA9980` |
| `@zs-semantic-red-40` | 40 | `#F27755` |
| `@zs-semantic-red-50` | 50 | `#E65428` |
| `@zs-semantic-red-60` | 60 | `#B21111` |
| `@zs-semantic-red-70` | 70 | `#9F0000` |
| `@zs-semantic-red-80` | 80 | `#892208` |
| `@zs-semantic-red-90` | 90 | `#5C1A0B` |
| `@zs-semantic-red-100` | 100 | `#3F211B` |

### Semantic / Dark Yellow

_Warning state — used for `--zs-border-warning-default` (Dark Yellow 80). This is the semantic warning color; Brand/Orange is not._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-semantic-dark-yellow-0` | 0 | `#FFF9F1` |
| `@zs-semantic-dark-yellow-10` | 10 | `#FFF4DB` |
| `@zs-semantic-dark-yellow-20` | 20 | `#FFEABB` |
| `@zs-semantic-dark-yellow-30` | 30 | `#FFDB93` |
| `@zs-semantic-dark-yellow-40` | 40 | `#FDCA63` |
| `@zs-semantic-dark-yellow-50` | 50 | `#F3BA2F` |
| `@zs-semantic-dark-yellow-60` | 60 | `#E3A900` |
| `@zs-semantic-dark-yellow-70` | 70 | `#BA8805` |
| `@zs-semantic-dark-yellow-80` | 80 | `#8A640C` |
| `@zs-semantic-dark-yellow-90` | 90 | `#563F0E` |
| `@zs-semantic-dark-yellow-100` | 100 | `#211909` |

### Semantic / Blue

_Focus / active — used for `--zs-border-focus` (Blue 60)._

| Variable | Step | Hex |
|----------|------|-----|
| `@zs-semantic-blue-00` | 00 | `#F8FCFF` |
| `@zs-semantic-blue-10` | 10 | `#ECF8FF` |
| `@zs-semantic-blue-20` | 20 | `#DAEFFE` |
| `@zs-semantic-blue-30` | 30 | `#C4E3FF` |
| `@zs-semantic-blue-40` | 40 | `#7CC0FF` |
| `@zs-semantic-blue-50` | 50 | `#2F9BFF` |
| `@zs-semantic-blue-60` | 60 | `#027AFF` |
| `@zs-semantic-blue-70` | 70 | `#0952CA` |
| `@zs-semantic-blue-80` | 80 | `#0524A4` |
| `@zs-semantic-blue-90` | 90 | `#000077` |
| `@zs-semantic-blue-100` | 100 | `#000051` |

### Canonical semantic role → token mapping

| Role | Token | Value |
|------|-------|-------|
| error border | `--zs-border-error-default` | `#B21111` — Semantic/Red/60 |
| warning border | `--zs-border-warning-default` | `#8A640C` — Semantic/Dark Yellow/80 |
| success border | `--zs-border-success-default` | `#0A6E5E` — Semantic/Green/80 |
| info border | `--zs-border-info-default` | `#1B24AA` — Semantic/Indigo/70 |
| focus ring | `--zs-border-focus` | `#027AFF` — Semantic/Blue/60 |
| selection | `--zs-selection-primary-default` | `#2F6F7B` — Brand/Teal/80 |
| text default | `--zs-text-default` | `#2F2C3C` — Brand/Gray/90 |
| text helper | `--zs-text-helper` | `#5B5864` — Brand/Gray/70 |
| bg default | `--zs-background-default` | `#FFFFFF` — Brand/Gray/White |
| bg faint | `--zs-background-faint` | `#F4F3F3` — Brand/Gray/10 |

---

## 3. Source-of-truth files

| Namespace | File |
|-----------|------|
| AI namespace (`AI.*` / `AI_RAMP` / `SIGNAL_ORANGE` / `COMPANION_TAN` / `DS`) | `components/ai/tokens/ai-tokens.ts` |
| DS palette (`Brand/*`, `Semantic/*`, `Dataviz/*`, `Opacity/*`)   | `src/imports/Guild.tokens.json` |
| CSS custom properties (`--ai-*`, `--ai-type-*-*`)                 | Generated from Downloads → global.css |

_Regenerate any of these bundles from Downloads → Design Tokens whenever the source-of-truth files change._