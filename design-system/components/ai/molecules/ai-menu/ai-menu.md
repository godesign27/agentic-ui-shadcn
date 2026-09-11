# AI Menu

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** molecules (AI)  
**Repo module:** `aiMenu`  
**Component type:** React molecule  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

A vertical AI-action list — 12px radius, --ai-card-bg surface, brand border, @ai-menu-item type, AI active/selected accents.

AIMenu is the AI skin of the standard DS Menu. It keeps the same behavior and prop surface (role="menu", role="menuitem" / role="menuitemcheckbox", submenu cascade, group-title, separator, three sizes) but wears the AI dialog chrome instead of the neutral DS one: --ai-card-bg surface, AI.color.brandBorder, 12px (AI.radius.sm) corners, the layered soft-blue elevation shadow, @ai-menu-item item typography, and AI active/selected accents (AI.color.action.primary fill with white text; AI.color.brand checkmark). Chrome is composed from the AICommandCenterDialog PlusMenu and AIPicker PopoverShell rather than forked, so an AIMenu reads as part of the same AI system as the dialog.

**Export:** `AIMenu`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/molecules/ai-menu/AIMenu.tsx` | Canonical React source (external / Make) |
| `components/ai/molecules/ai-menu/ai-menu.md` | This mirror spec |
| `components/ai/molecules/ai-menu/ai-menu.agent.json` | Agent manifest |
| `components/ai/molecules/ai-menu/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive |
| AI behavior | Navigation · Overlay |
| Accountability | Menu · Selection · Submenu |

## When to use

- AI actions need to appear as a list inside an AI surface
- The menu should read as a sibling of the AI Command Center dialog
- You need submenu / multi-select / group-title item types in AI styling

## When not to use

- You need the neutral standard styling — use `ds-menu`
- It should be hidden behind a trigger — use `ai-popup-menu`
- It is a form select control — use `ds-dropdown`

## Anatomy

1. **Menu container** _(Unique)_ — role="menu" surface — --ai-card-bg, brand border, 12px radius, soft-blue shadow.
2. **Menu item** _(Shared)_ — role="menuitem" row — leading icon slot, @ai-menu-item label, optional trailing caret.
3. **Group title** _(Shared)_ — Uppercase section label in DS.textHelper — pointer-events:none.
4. **Separator** _(Shared)_ — 1px DS.border rule between groups.
5. **Submenu caret** _(Shared)_ — RiArrowRightSLine — opens a nested AIMenu panel on hover / ArrowRight.
6. **Checkmark** _(Shared)_ — Leading RiCheckLine in multi-select — AI.color.brand when selected.

## State variations

- **Basic** _(role=menuitem)_ — Text-only rows with a separator and a disabled Discard.
- **With icon** _(icon-left)_ — Leading brand icon + label on every row.
- **Inverse with icon** _(inverse)_ — Light text on a deep-brand surface — for dark AI contexts.
- **Separator & disabled** _(hr / disabled)_ — Grouped rows split by separators, with disabled items.
- **Long text** _(ellipsis)_ — Long labels truncate with an ellipsis at a fixed width.
- **Using list** _(plain list)_ — A simple flat list of AI actions.
- **Submenu** _(aria-haspopup)_ — Cascade item opens a nested AIMenu to the right.
- **Submenu (animated)** _(motion)_ — The menu fades/slides in on reveal.
- **Group title** _(section label)_ — Uppercase, non-interactive section headers.
- **Multi-select** _(menuitemcheckbox)_ — Brand checkmarks; selecting keeps the menu open.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `items` | `AIMenuItem[]` | `[]` | Rows. Each item: { type?, label?, icon?, disabled?, active?, selected?, children?, onClick? }. |
| `size` | `'normal' \| 'small' \| 'x-small'` | `'normal'` | Item height — 40 / 36 / 32. |
| `multiSelect` | `boolean` | `false` | Rows become role="menuitemcheckbox" with a leading checkmark. |
| `onSelect` | `(item: AIMenuItem) => void` | `—` | Fires when a non-disabled item is activated. |
| `embedded` | `boolean` | `false` | Skip the standalone border/shadow (used inside a popup overlay). |
| `'aria-label'` | `string` | `'Menu'` | Accessible name for the menu container. |

## Tokens

### Surface & borders
| Token | Value | Usage |
| --- | --- | --- |
| `--ai-card-bg` | `#FFFFFF` | Menu surface (fallback) |
| `ai.color.brandBorder` | `#BECAFE` | Menu border |
| `ai.radius.sm` | `12px` | Corner radius |
| `ai.color.border.focus` | `#4D60E6` | Focus ring |

### Text & icons
| Token | Value | Usage |
| --- | --- | --- |
| `DS.textDefault` | `#2f2c3c` | Item text |
| `DS.textHelper` | `#5b5864` | Group title |
| `DS.textDisabled` | `#716e79` | Disabled item text |
| `ai.color.brand` | `#4D60E6` | Leading icon / checkmark |
| `@ai-menu-item` | `14 / 400 / 1.4` | Item typography |

### Selection & active
| Token | Value | Usage |
| --- | --- | --- |
| `ai.color.action.primary` | `#4D60E6` | Active item fill |
| `ai.color.text.onAction` | `#FFFFFF` | Active item text |
| `ai.color.surface.default` | `#F5F6FF` | Multi-select selected bg |
| `DS.menuHoverBg` | `rgba(178,176,182,0.4)` | Hover background |

## Flows

### Build an AI action menu
Compose an AI-styled menu from mixed item types.
- Define an AIMenuItem[] with group-title, item, submenu, and separator entries
- Render <AIMenu items={items} /> and pass onSelect to handle activation
- Highlight the current action with active; mark unavailable rows with disabled

### Multi-select filter
Toggle several AI options without closing.
- Set multiSelect so rows become role="menuitemcheckbox"
- Track selected per item; brand checkmarks render for selected rows
- Selecting keeps the menu open so multiple values can be toggled

## Canonical implementation

```tsx
import { AIMenu, type AIMenuItem } from 'ai/molecules/ai-menu/AIMenu';

const items: AIMenuItem[] = [
  { type: 'group-title', label: 'AI actions' },
  { label: 'Edit with AI', icon: <EditIcon /> },
  { label: 'Share', type: 'submenu', children: [
    { label: 'Copy link' },
    { label: 'Email' },
  ] },
  { type: 'separator' },
  { label: 'Delete', icon: <TrashIcon />, disabled: true },
];

<AIMenu size="normal" items={items} onSelect={(it) => run(it.label)} />

// Multi-select — stays open on select
<AIMenu multiSelect items={[
  { label: 'High confidence', selected: true },
  { label: 'Low confidence' },
]} />
```

## Agent rules

1. Read this mirror spec and `ai-menu.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/molecules/ai-menu/ai-menu.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
