# Brand Theming

This document defines the theming system for integrating brand colors into this shadcn/ui implementation repository.

## shadcn/ui Theme System

This repository uses **CSS variables** defined in `src/index.css` for theming. Brand tokens are added as CSS variables following the same pattern as default shadcn/ui tokens.

### Theme Mode Support

Theme switching is handled via the `dark` class on the root element (typically `<html>` or `<body>`):

- **Light mode**: Variables defined in `:root` selector
- **Dark mode**: Variables defined in `.dark` selector

All color tokens automatically adapt to the current theme mode. Generated code must:
- Work correctly in both light and dark modes
- Use CSS variables that adapt to the current theme mode
- Never hard-code colors that would break in either mode

## Brand Token Integration

Brand tokens are added to `src/index.css` as CSS variables in HSL format (without `hsl()` wrapper, e.g., `210 40% 98%`).

### Canonical Brand Token Names

When brand tokens are provided (via Brand Setup prompt), the following canonical token names are used:

**Primary Brand Colors:**
- `--brand-50` through `--brand-900` (full color scale)
- `--brand` (alias for `--brand-500`, the base brand color)
- `--brand-foreground` (text color with sufficient contrast on `--brand`)

**Secondary Brand Colors** (if provided):
- `--brand-2-50` through `--brand-2-900`
- `--brand-2` (alias for `--brand-2-500`)
- `--brand-2-foreground`

**Tertiary/Quaternary** (if provided):
- Same pattern: `--brand-3-*`, `--brand-4-*`

### Token Location

Brand tokens are added to `src/index.css`:

```css
:root {
  /* Default shadcn/ui tokens */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... */

  /* Brand tokens (added by Brand Setup) */
  --brand-50: 210 40% 98%;
  --brand-100: 210 40% 96%;
  /* ... */
  --brand-500: 210 40% 50%;
  /* ... */
  --brand-900: 210 40% 15%;
  --brand: var(--brand-500);
  --brand-foreground: 0 0% 100%;
}

.dark {
  /* Dark mode brand tokens */
  --brand-50: 210 40% 10%;
  /* ... */
}
```

### Tailwind Integration

Brand tokens are mapped in `tailwind.config.js` to enable Tailwind utilities:

```js
colors: {
  brand: {
    50: 'hsl(var(--brand-50))',
    100: 'hsl(var(--brand-100))',
    // ... etc
    DEFAULT: 'hsl(var(--brand))',
    foreground: 'hsl(var(--brand-foreground))',
  }
}
```

## Agent Detection Rule

Agents must follow this rule when generating code:

**If brand tokens are available in `src/index.css`, prefer brand utilities over default shadcn/ui colors. Otherwise, use default shadcn/ui colors (primary, secondary, etc.).**

This means:
1. **Check for brand tokens**: Look for `--brand` or `--brand-50` variables in `src/index.css`
2. **Prefer brand when available**: Use `bg-brand`, `text-brand-foreground`, `border-brand` instead of `bg-primary`, `text-primary-foreground`, etc.
3. **Fallback to defaults**: If brand tokens are not available, use shadcn/ui default colors (`bg-primary`, `text-primary-foreground`, etc.)

### Example Application

**Scenario 1: Brand tokens available**
```tsx
// ✅ Use brand tokens
<Button className="bg-brand text-brand-foreground">
  Primary Action
</Button>

<div className="border border-brand">
  Brand accent
</div>
```

**Scenario 2: Brand tokens not available**
```tsx
// ✅ Use default shadcn/ui colors
<Button className="bg-primary text-primary-foreground">
  Primary Action
</Button>

<div className="border border-primary">
  Primary accent
</div>
```

## Brand Token Usage Guidelines

When using brand tokens:

1. **Primary actions**: Use `bg-brand text-brand-foreground` for primary CTAs and important actions
2. **Secondary actions**: Use `bg-brand-2 text-brand-2-foreground` (if available) or default `bg-secondary` for secondary actions
3. **Accents**: Use `brand-3` and `brand-4` sparingly for accents and highlights (if available)
4. **Text on brand**: Always use `text-brand-foreground` (or `text-brand-2-foreground`, etc.) for text placed on brand-colored backgrounds to ensure contrast
5. **Consistency**: Use brand tokens consistently throughout the interface when available

### Usage Examples

```tsx
// Primary brand color
<Button className="bg-brand text-brand-foreground hover:bg-brand/90">
  Primary Action
</Button>

// Brand border
<div className="border-2 border-brand rounded-lg p-4">
  Brand accent container
</div>

// Brand background with foreground text
<div className="bg-brand-100 text-brand-900 p-4">
  Light brand background
</div>

// Brand scale usage
<div className="bg-brand-50 text-brand-900">Lightest</div>
<div className="bg-brand-500 text-brand-foreground">Base</div>
<div className="bg-brand-900 text-brand-50">Darkest</div>
```

## Theme Mode Implementation

Brand tokens automatically support light and dark themes:

- **Light mode**: Brand colors defined in `:root` selector
- **Dark mode**: Adjusted brand colors defined in `.dark` selector (typically darker/lighter variants)

Generated code must:
- Use CSS variables that automatically adapt to theme mode
- Never hard-code brand colors
- Test in both light and dark modes

## Brand Setup Process

Brand tokens are added via the "Brand Setup" prompt (see `public/prompts/brand-setup.txt`):

1. User provides base brand color(s) (hex format)
2. System generates full color scales (50-900) using deterministic algorithm
3. CSS variables are written to `src/index.css` in HSL format
4. Tailwind config is updated with brand color mappings
5. Brand Preview page displays generated scales

After brand setup, agents should prefer brand tokens over default colors.

## No Framework Rebuild Required

This theming system does **not** require rebuilding shadcn/ui components. Instead:

- Brand tokens are added as CSS variables alongside default tokens
- Tailwind utilities automatically work with brand tokens once mapped
- Components use CSS variables, so brand tokens work immediately
- Theme mode switching works automatically via `.dark` class

Agents must work within the existing CSS variable system, not request framework modifications.

## Summary

- **Token format**: CSS variables in HSL format (e.g., `--brand: 210 40% 50%`)
- **Usage**: Tailwind utilities (`bg-brand`, `text-brand-foreground`) or CSS (`hsl(var(--brand))`)
- **Theme modes**: Automatic via `:root` and `.dark` selectors
- **Detection**: Check `src/index.css` for `--brand` variables
- **Preference**: Use brand tokens when available, fallback to default shadcn/ui colors
