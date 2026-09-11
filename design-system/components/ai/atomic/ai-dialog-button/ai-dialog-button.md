# AI Dialog Button

**Version:** 1.0  
**Last Updated:** 2026-06-16  
**Owner:** Design System — AI  
**Tier:** atoms (AI)  
**Repo module:** `aiDialogButton`  
**Component type:** React control (AI Dialog toolbar action)  
**Status:** Stable  
**Depends On:** `components/ai/tokens/color.md`, `components/ai/tokens/radius.md`, `components/ai/tokens/ai-tokens.ts`  
**Used By:** `components/ai/organisms/ai-dialog/ai-dialog.md`, AI command bar patterns  

## Purpose

Ghost toolbar button for the AI Dialog composer — icon-only, icon + label, and label + trailing-icon shapes. The primary affordance for Add, Skills, Agent mode, and Mic controls in the input card toolbar.

**Export:** `AIDialogButton` — single primitive covering all AI Dialog toolbar button shapes with a unified **Ghost** surface treatment.

**Intent:** Use for toolbar actions in AI Dialog and command bars. Do not use for gradient primary CTAs (Send) or navigation links.

## Source (canonical implementation)

> Implementation lives in the **ZAIDYN AI Design System** package — not under `src/` today.

| Path | Role |
|------|------|
| `src/components/ai/atomic/dialog-button/AIDialogButton.tsx` | Canonical React source (external repo) |
| `@ai-design-system` | Published import path |
| `components/ai/atomic/ai-dialog-button/ai-dialog-button.md` | This mirror spec |
| `components/ai/atomic/ai-dialog-button/ai-dialog-button.agent.json` | Agent manifest |
| `components/ai/atomic/ai-dialog-button/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Suggest · Confirm |
| Accountability | User control |

## When to use

- Any toolbar action in the AI input card (Add, Skills, Mode, Mic)
- Mode selectors, skill pickers, or add-content triggers
- Anywhere an AI Dialog action needs a consistent pill or circular touch target with Ghost styling

## When not to use

- Primary CTA that needs gradient fill — use `AIButton` variant primary or the send button pattern in `ai-dialog`
- Navigation links — use anchors or router links
- Standard `Button` for non-AI product actions

## Surface styles

| Style | Description | Usage |
|-------|-------------|-------|
| **Ghost** (default) | Transparent fill, 1px subtle neutral border, 34px pill/circle | All AI Dialog toolbar controls except Send |

Ghost is the only surface style in Stable v1.0. All three button shapes share identical Ghost resting, hover, open, and disabled treatments.

## Anatomy

| Part | Shared | Notes |
|------|--------|-------|
| Container | Shared | 34px tall, `AI.radius.full` (100px). Fixed 34×34 for icon-only; auto width + horizontal padding for labeled variants. |
| Icon slot | Unique | Optional leading icon. Color: `NEUTRAL.iconDefault` `#5b5864`. Lucide icons use `currentColor`. |
| Label | Shared | Optional text. Open Sans 13px / 500, `NEUTRAL.textDefault` `#2f2c3c`, letter-spacing −0.1px. |
| Trailing icon | Unique | Optional trailing node — typically chevron. Rotates when `isOpen=true`. |

## Shapes (Ghost surface)

| Shape | Props | Visual |
|-------|-------|--------|
| Icon-only | `icon` only | 34×34 circle — e.g. Add (`+`), Mic |
| Icon + label | `icon` + `label` | Pill — e.g. `/` + **Skills** |
| Label + trailing | `label` + `trailingIcon` | Pill — e.g. **Agent** + chevron |

## States (Ghost)

| State | Visual | Behavior |
|-------|--------|----------|
| default | Transparent fill, border `rgba(26,22,40,0.14)` | Resting |
| hover | Border `#D2D6FF`, background `#F5F6FF` | `:hover`, 0.14s ease |
| open | Border `#96A4FF`, background `#E6E9FF` | `isOpen=true` while dropdown visible |
| disabled | Opacity 0.42, `cursor: not-allowed` | `onClick` suppressed |

## Color Tokens

### Container

| Token | Value | Usage |
|-------|-------|-------|
| `ai-dialog-button.height` | `34px` | Fixed height all variants |
| `ai-dialog-button.border.radius` | `AI.radius.full` `100px` | Circle + pill |
| `ai-dialog-button.border.color.default` | `rgba(26,22,40,0.14)` | Ghost resting border |
| `ai-dialog-button.border.color.hover` | `AI.color.border.default` `#D2D6FF` | Ghost hover border |
| `ai-dialog-button.border.color.open` | `AI.color.border.strong` `#96A4FF` | Ghost open border |

### Surface

| Token | Value | Usage |
|-------|-------|-------|
| `ai-dialog-button.surface.default` | `transparent` | Ghost resting fill |
| `ai-dialog-button.surface.hover` | `AI.color.surface.default` `#F5F6FF` | Ghost hover fill |
| `ai-dialog-button.surface.open` | `AI.color.surface.subtle` `#E6E9FF` | Ghost open fill |
| `ai-dialog-button.opacity.disabled` | `0.42` | Disabled state |

### Typography & icons

| Token | Value | Usage |
|-------|-------|-------|
| `ai-dialog-button.label.color` | `NEUTRAL.textDefault` `#2f2c3c` | Label text |
| `ai-dialog-button.icon.color` | `NEUTRAL.iconDefault` `#5b5864` | Icon color |
| `ai-dialog-button.font.size` | `13px` | Label size |
| `ai-dialog-button.font.weight` | `500` | Medium weight |

## AI-Specific Behavior

### Dropdown trigger flow

1. Parent holds open state: `const [open, setOpen] = useState(false)`
2. Pass `open` as `isOpen` to `AIDialogButton` — active visual while open
3. Pass `trailingIcon` with rotation transform driven by `open`
4. Wrap button + popover in `position: relative` container
5. Popover: `position: absolute`, `bottom: calc(100% + 8px)` above toolbar
6. Outside-click handler closes dropdown

## Accessibility Requirements

- Native `<button>` element
- `aria-label` **required** for icon-only buttons
- `disabled` attribute when `disabled=true`
- Focus ring per product shell (do not remove `:focus-visible`)

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | — | Leading icon. Icon-only when sole content → 34×34 circle. |
| `label` | `string` | — | Visible label. 13px / 500. |
| `trailingIcon` | `React.ReactNode` | — | Trailing icon, typically chevron for dropdowns. |
| `isOpen` | `boolean` | `false` | Activates open/active Ghost visual. |
| `disabled` | `boolean` | `false` | Opacity 0.42, suppresses interaction. |
| `onClick` | `() => void` | — | Click handler. Suppressed when disabled. |
| `aria-label` | `string` | — | Accessible name — required for icon-only. |

## JavaScript / React API

```tsx
import { AIDialogButton } from '@ai/atomic/dialog-button/AIDialogButton';
import { Plus, Mic, ChevronDown } from 'lucide-react';

// Ghost · icon-only (circular)
<AIDialogButton
  icon={<Plus size={16} strokeWidth={2} />}
  aria-label="Add content"
/>

// Ghost · icon + label (pill)
<AIDialogButton
  icon={<span style={{ fontFamily: 'monospace', fontWeight: 700 }}>/</span>}
  label="Skills"
  isOpen={skillMenuOpen}
  onClick={() => setSkillMenuOpen(v => !v)}
/>

// Ghost · label + trailing icon (dropdown)
<AIDialogButton
  label="Agent"
  trailingIcon={
    <ChevronDown
      size={12}
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
    />
  }
  isOpen={open}
  onClick={() => setOpen(v => !v)}
/>

// Ghost · disabled
<AIDialogButton icon={<Mic size={16} strokeWidth={2} />} disabled aria-label="Voice input" />
```

## Canonical implementation (copy exactly)

```tsx
import React, { useState } from 'react';

const BTN = {
  height: '34px',
  radius: '100px',
  border: { default: 'rgba(26,22,40,0.14)', hover: '#D2D6FF', open: '#96A4FF' },
  surface: { default: 'transparent', hover: '#F5F6FF', open: '#E6E9FF' },
  label: { color: '#2f2c3c', size: '13px', weight: 500 },
  icon: { color: '#5b5864' },
  disabledOpacity: 0.42,
};

export interface AIDialogButtonProps {
  icon?: React.ReactNode;
  label?: string;
  trailingIcon?: React.ReactNode;
  isOpen?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

export function AIDialogButton({
  icon,
  label,
  trailingIcon,
  isOpen = false,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
}: AIDialogButtonProps) {
  const [hover, setHover] = useState(false);
  const iconOnly = Boolean(icon && !label && !trailingIcon);

  const borderColor = isOpen
    ? BTN.border.open
    : hover && !disabled
      ? BTN.border.hover
      : BTN.border.default;

  const background = isOpen
    ? BTN.surface.open
    : hover && !disabled
      ? BTN.surface.hover
      : BTN.surface.default;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        height: BTN.height,
        width: iconOnly ? BTN.height : 'auto',
        padding: iconOnly ? 0 : '0 12px',
        borderRadius: BTN.radius,
        border: `1px solid ${borderColor}`,
        background,
        color: BTN.icon.color,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: BTN.label.size,
        fontWeight: BTN.label.weight,
        letterSpacing: '-0.1px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? BTN.disabledOpacity : 1,
        transition: 'border-color 0.14s ease, background 0.14s ease',
        flexShrink: 0,
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center', color: BTN.icon.color }}>{icon}</span>}
      {label && <span style={{ color: BTN.label.color }}>{label}</span>}
      {trailingIcon && <span style={{ display: 'flex', alignItems: 'center', color: BTN.icon.color }}>{trailingIcon}</span>}
    </button>
  );
}
```

## Agent rules

1. **Ghost is the default** — transparent fill + subtle border for all AI Dialog toolbar actions.
2. **Do not use AIDialogButton for Send** — Send uses gradient fill per `ai-dialog` send pattern.
3. **Icon-only requires `aria-label`** — Add and Mic buttons.
4. **Pass `isOpen`** when pairing with dropdowns — Agent and Skills menus.
5. **34px height everywhere** — do not resize without design review.
6. Copy canonical implementation — do not recreate Ghost tokens from memory.

Full agent contract: `components/ai/atomic/ai-dialog-button/ai-dialog-button.agent.json`.

## Do's and Don'ts

- Do use Ghost `AIDialogButton` for Add, Skills, Agent mode, and Mic in AI Dialog toolbar.
- Do pass `isOpen` to dropdown triggers while popover is visible.
- Do use monospace `/` leading icon for Skills picker.
- Don't use AIDialogButton for gradient Send CTA.
- Don't use plain unstyled icon buttons in AI Dialog toolbar.
- Don't use for navigation links.

## Related Components

- `components/ai/atomic/ai-button/ai-button.md` — primary/secondary/tertiary CTA for AI action rows
- `components/ai/organisms/ai-dialog/ai-dialog.md` — primary consumer of Ghost toolbar buttons
- `components/atoms/button/button.md` — standard button (non-AI contexts)
