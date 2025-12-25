# Tokens Reference

This document defines the token system for this shadcn/ui implementation repository. All generated code must use tokens instead of hard-coded values.

## shadcn/ui Token System

This repository uses **CSS variables** defined in `src/index.css` for theming. Tokens are accessed via Tailwind CSS utilities and CSS variable references.

### Token Location

All design tokens are defined as CSS variables in:
- `src/index.css` - Contains `:root` (light mode) and `.dark` (dark mode) variable definitions

## Token Categories

### Colors

Color tokens use HSL format without the `hsl()` wrapper (e.g., `210 40% 98%`). Colors are accessed via Tailwind utilities or direct CSS variable references.

**Available color tokens** (defined in `src/index.css`):

- **Background**: `--background`, `--foreground`
- **Card**: `--card`, `--card-foreground`
- **Popover**: `--popover`, `--popover-foreground`
- **Primary**: `--primary`, `--primary-foreground`
- **Secondary**: `--secondary`, `--secondary-foreground`
- **Muted**: `--muted`, `--muted-foreground`
- **Accent**: `--accent`, `--accent-foreground`
- **Destructive**: `--destructive`, `--destructive-foreground`
- **Border**: `--border`
- **Input**: `--input`
- **Ring**: `--ring`

**Usage in Tailwind**:
```tsx
// Background colors
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground">

// Border colors
<div className="border border-border">

// Input styling
<input className="border-input" />
```

**Usage in CSS**:
```css
.custom-element {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### Typography

Typography uses Tailwind CSS utilities. Font sizes, weights, and line heights are defined via Tailwind's typography scale.

**Font Sizes** (Tailwind utilities):
- `text-xs` (12px)
- `text-sm` (14px)
- `text-base` (16px)
- `text-lg` (18px)
- `text-xl` (20px)
- `text-2xl` (24px)
- `text-3xl` (30px)
- etc.

**Font Weights**:
- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

**Usage**:
```tsx
<h1 className="text-3xl font-bold">Heading</h1>
<p className="text-base font-normal">Body text</p>
```

### Spacing

Spacing uses Tailwind CSS spacing scale (4px base unit). Never use hard-coded pixel values.

**Spacing Scale**:
- `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px)
- `p-6` (24px), `p-8` (32px), `p-12` (48px), `p-16` (64px)
- Same scale applies to margin (`m-*`), gap (`gap-*`), etc.

**Usage**:
```tsx
<div className="p-4 m-6 gap-4">
  {/* Use Tailwind spacing utilities */}
</div>
```

### Radius

Border radius uses CSS variable `--radius` or Tailwind rounded utilities.

**Available tokens**:
- `--radius` (default radius, typically 0.5rem)
- Tailwind: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full`

**Usage**:
```tsx
<div className="rounded-lg">
<button className="rounded-md">
```

### Shadows

Shadows use Tailwind shadow utilities. No custom shadow tokens are defined (use Tailwind defaults).

**Usage**:
```tsx
<div className="shadow-sm">
<div className="shadow-md">
<div className="shadow-lg">
```

## Prohibition of Hard-Coded Values

Agents must **not** use hard-coded values in generated code where tokens should be used:

**Prohibited:**
- ❌ Hard-coded hex colors: `#3b82f6`, `#10b981`, `#ef4444`
- ❌ Hard-coded pixel values: `16px`, `24px`, `1.5rem` (unless part of Tailwind utility)
- ❌ Hard-coded font sizes: `14px`, `18px` (use Tailwind text utilities)
- ❌ Hard-coded spacing: `margin: 20px` (use Tailwind spacing utilities)
- ❌ Direct HSL values: `hsl(210, 40%, 50%)` (use CSS variables)

**Required:**
- ✅ CSS variables via Tailwind: `bg-primary`, `text-foreground`
- ✅ Tailwind spacing utilities: `p-4`, `m-6`, `gap-4`
- ✅ Tailwind typography utilities: `text-base`, `font-semibold`
- ✅ Tailwind radius utilities: `rounded-lg`, `rounded-md`
- ✅ CSS variable references: `hsl(var(--primary))`

## Token Usage Examples

### Colors
```tsx
// ✅ Good: Using Tailwind utilities with CSS variables
<div className="bg-primary text-primary-foreground">
<button className="bg-destructive text-destructive-foreground">
<div className="border border-border">

// ❌ Bad: Hard-coded colors
<div style={{ backgroundColor: '#3b82f6' }}>
<div className="bg-[#3b82f6]">
```

### Spacing
```tsx
// ✅ Good: Using Tailwind spacing utilities
<div className="p-4 m-6 gap-4">
<Card className="p-6">

// ❌ Bad: Hard-coded spacing
<div style={{ padding: '16px', margin: '24px' }}>
<div className="p-[16px]">
```

### Typography
```tsx
// ✅ Good: Using Tailwind typography utilities
<h1 className="text-3xl font-bold">
<p className="text-base font-normal">

// ❌ Bad: Hard-coded typography
<h1 style={{ fontSize: '30px', fontWeight: 700 }}>
<h1 className="text-[30px]">
```

## Light/Dark Theme Support

All color tokens support light and dark themes via CSS variables:

- **Light mode**: Variables defined in `:root` selector in `src/index.css`
- **Dark mode**: Variables defined in `.dark` selector in `src/index.css`

Theme switching is handled by adding/removing the `dark` class on the root element (typically `<html>` or `<body>`).

**Usage** (automatic via CSS variables):
```tsx
// Colors automatically adapt to theme
<div className="bg-background text-foreground">
  {/* Light: white bg, dark text. Dark: dark bg, light text */}
</div>
```

## Brand Token Integration

When brand tokens are provided (via Brand Setup prompt), they are added to `src/index.css` as CSS variables following the same pattern:

- Brand colors: `--brand-50` through `--brand-900`
- Brand primary: `--brand` (alias for `--brand-500`)
- Brand foreground: `--brand-foreground`

See BRAND_THEMING.md for brand token usage guidelines.

## Token Discovery

Agents must:
1. Read `src/index.css` to see available CSS variables
2. Use Tailwind utilities that map to CSS variables (e.g., `bg-primary` uses `--primary`)
3. Check `tailwind.config.js` for custom token mappings
4. Reference this document for token usage patterns

If a required token does not exist, agents must either:
- Use the closest available token
- Request token addition (if the task requires it)
- Reject the request if tokens are essential and unavailable

## Summary

- **Colors**: Use Tailwind utilities (`bg-primary`, `text-foreground`) or CSS variables (`hsl(var(--primary))`)
- **Spacing**: Use Tailwind spacing utilities (`p-4`, `m-6`, `gap-4`)
- **Typography**: Use Tailwind typography utilities (`text-base`, `font-semibold`)
- **Radius**: Use Tailwind rounded utilities (`rounded-lg`) or CSS variable (`var(--radius)`)
- **Never**: Hard-code hex colors, pixel values, or other design tokens
