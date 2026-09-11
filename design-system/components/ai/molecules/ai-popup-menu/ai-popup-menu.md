# AI Popup Menu

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiPopupMenu`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

A trigger + hidden AIMenu overlay — AI dialog chrome, opens on click, closes on outside-click / Escape.

AIPopupMenu is the AI skin of the standard DS Popup Menu. A hidden AIMenu is revealed on a trigger action (click / keyboard). The trigger carries role="button", aria-haspopup="menu", aria-expanded (toggling with open state), and aria-controls pointing at the menu id. The overlay is position:absolute in the AI dialog chrome (--ai-card-bg, brand border, 12px radius, soft-blue shadow) and closes on outside-click or Escape. Single-select popups close after a pick (closeOnSelect); multi-select popups stay open so several items can be toggled. It reuses the AICommandCenterDialog PlusMenu and AIPicker PopoverShell styling rather than forking, so it reads as part of the same AI system as the dialog.

**Export:** `AIMenu`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/molecules/ai-menu/AIMenu.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-popup-menu/ai-popup-menu.md` | This mirror spec |
| `components/ai/molecules/ai-popup-menu/ai-popup-menu.agent.json` | Agent manifest |
| `components/ai/molecules/ai-popup-menu/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Overlay · Navigation |
| Accountability | Popup · Menu |

## When to use

- AI actions should be hidden until a trigger reveals them
- A kebab / header trigger needs an AI-styled overlay menu
- The popup should read as a sibling of the AI Command Center dialog

## When not to use

- The menu is always visible — use `ai-menu`
- You need the neutral standard styling — use `ds-popup-menu`
- It is a form select control — use `ds-dropdown`

## Anatomy

1. **Trigger** _(Unique)_ — role="button" with aria-haspopup="menu", aria-expanded, aria-controls.
2. **Overlay** _(Shared)_ — position:absolute container — --ai-card-bg, brand border, 12px radius, soft-blue shadow.
3. **Menu** _(Shared)_ — Embedded AIMenu (role="menu") — see AI Menu anatomy.
4. **Dismiss** _(Behavior)_ — Outside-click and Escape close the overlay.

## State variations

- **Closed** _(aria-expanded=false)_ — Only the trigger is visible — click to open (default, interactive).
- **Open** _(aria-expanded=true)_ — Overlay revealed below the trigger.
- **Kebab trigger** _(icon trigger)_ — Icon-only (⋮) trigger revealing an AI action menu.
- **Multi-select** _(closeOnSelect=false)_ — Filter-style popup that stays open across selections.
- **With submenu** _(aria-haspopup)_ — Revealed menu contains a cascading submenu item.
- **Animated** _(motion)_ — Overlay fades/slides in on reveal.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `trigger` | `ReactNode \| (open: boolean) => ReactNode` | `—` | Trigger content. Function form receives open state to react to it. |
| `triggerLabel` | `string` | `'Open menu'` | Accessible label for the trigger button. |
| `items` | `AIMenuItem[]` | `[]` | Passed through to the embedded AIMenu. |
| `align` | `'left' \| 'right'` | `'left'` | Horizontal alignment of the overlay against the trigger. |
| `multiSelect` | `boolean` | `false` | Multi-select menu mode (checkmarks). |
| `closeOnSelect` | `boolean` | `true` | Close after a pick — ignored in multiSelect. |
| `onSelect` | `(item: AIMenuItem) => void` | `—` | Fires when a non-disabled item is activated. |

## Tokens

### Surface & borders
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg` | `#FFFFFF` | Overlay surface (fallback) |
| `ai.color.brandBorder` | `#BECAFE` | Overlay border |
| `ai.radius.sm` | `12px` | Corner radius |
| `ai.color.border.focus` | `#4D60E6` | Focus ring |

### Text & icons
| Token | Value | Usage |
| --- | --- | --- |
| `DS.textDefault` | `#2f2c3c` | Item text |
| `DS.textHelper` | `#5b5864` | Group title |
| `ai.color.brand` | `#4D60E6` | Leading icon / checkmark |
| `@ai-menu-item` | `14 / 400 / 1.4` | Item typography |

### Selection & active
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.action.primary` | `#4D60E6` | Active item fill |
| `ai.color.surface.default` | `#F5F6FF` | Multi-select selected bg |
| `DS.menuHoverBg` | `rgba(178,176,182,0.4)` | Hover background |

## Flows

### Kebab action overlay
Reveal AI row actions from an icon trigger.
- Render <AIPopupMenu trigger={kebab} align="right" items={actions} />
- Click (or Enter/Space/ArrowDown) toggles the overlay; aria-expanded flips
- Outside-click or Escape dismisses; the picked item fires onSelect and closes

### Filter popup
A popup that stays open across selections.
- Pass multiSelect and closeOnSelect={false}
- Toggle several options; the overlay stays open
- Dismiss with outside-click or Escape when done

## Canonical implementation

```tsx
import { AIPopupMenu } from 'ai/molecules/ai-menu/AIMenu';

<AIPopupMenu
  triggerLabel="More actions"
  align="right"
  trigger={(open) => <KebabIcon aria-hidden data-open={open} />}
  items={[
    { label: 'Edit with AI' },
    { label: 'Duplicate' },
    { type: 'separator' },
    { label: 'Delete' },
  ]}
  onSelect={(it) => run(it.label)}
/>

// Multi-select filter — stays open on select
<AIPopupMenu
  trigger={<button>Filter</button>}
  multiSelect
  closeOnSelect={false}
  items={[{ label: 'High confidence', selected: true }, { label: 'Low confidence' }]}
/>
```

## Agent rules

1. Read this mirror spec and `ai-popup-menu.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-popup-menu/ai-popup-menu.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
