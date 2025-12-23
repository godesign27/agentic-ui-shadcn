# Tokens Reference

This document defines the framework-agnostic token system contract that all generated UI code must follow.

## What Are Tokens?

Tokens are named design values that represent design decisions in a systematic way. Instead of hard-coding values like `#3b82f6` or `16px`, tokens provide semantic names like `brand-primary` or `spacing-md` that can be mapped to specific values by implementation repositories.

Tokens ensure:
- **Consistency**: Same token name produces consistent values across the interface
- **Maintainability**: Changing a token value updates all usages
- **Theming**: Tokens can be remapped for different themes (light/dark, brand variations)
- **Accessibility**: Token values can be adjusted to meet contrast requirements

## Token Categories

Implementation repositories must provide tokens in the following categories:

### Colors

Color tokens must include:
- **Brand colors**: Primary brand colors (see BRAND_THEMING.md for canonical names)
- **Semantic colors**: Success, warning, error, info
- **Neutral colors**: Grays, whites, blacks for text and backgrounds
- **Text colors**: Colors for body text, headings, muted text
- **Background colors**: Colors for page backgrounds, card backgrounds, surface colors
- **Border colors**: Colors for borders and dividers

Color tokens must support light and dark theme variants.

### Typography

Typography tokens must include:
- **Font families**: Primary and secondary font stacks
- **Font sizes**: Scale from smallest to largest (e.g., xs, sm, base, lg, xl, 2xl, etc.)
- **Font weights**: Light, normal, medium, semibold, bold
- **Line heights**: Appropriate line heights for each font size
- **Letter spacing**: Tracking values where applicable

### Spacing

Spacing tokens must include:
- **Scale**: Consistent spacing scale (e.g., 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- **Semantic names**: Names that indicate usage (e.g., `spacing-xs`, `spacing-sm`, `spacing-md`, `spacing-lg`, `spacing-xl`)
- **Component spacing**: Specific spacing for common patterns (e.g., form field spacing, card padding)

### Radius

Border radius tokens must include:
- **Scale**: Consistent radius scale (e.g., none, sm, md, lg, full)
- **Usage-specific**: Tokens for buttons, cards, inputs, modals

### Shadows

Shadow tokens must include:
- **Elevation levels**: Multiple shadow levels for depth (e.g., sm, md, lg, xl)
- **Usage-specific**: Tokens for cards, modals, dropdowns, focus states

## Prohibition of Hard-Coded Values

Agents must **not** use hard-coded values in generated code where tokens should be used:

**Prohibited:**
- Hard-coded hex colors: `#3b82f6`, `#10b981`, `#ef4444`
- Hard-coded pixel values: `16px`, `24px`, `1.5rem` (unless part of token system)
- Hard-coded font sizes: `14px`, `18px` (use typography tokens)
- Hard-coded spacing: `margin: 20px` (use spacing tokens)

**Required:**
- Token references: Use the implementation repository's token naming convention
- Semantic values: Reference tokens by their semantic meaning

## Token Mapping in Implementation Repositories

Implementation repositories map tokens to framework-specific implementations:

- **Bootstrap**: Tokens map to CSS custom properties or Sass variables
- **shadcn**: Tokens map to CSS variables in the design system
- **Material**: Tokens map to Material Design tokens
- **Custom**: Tokens map to the custom design system's token system

Agents must use the token names as defined in the implementation repository's token documentation, not invent new token names.

## Token Usage Examples

### Colors
```html
<!-- Use token names, not hex values -->
<div class="bg-brand-primary text-brand-text-on">
  <!-- Implementation maps bg-brand-primary to actual color -->
</div>
```

### Spacing
```html
<!-- Use spacing tokens, not pixel values -->
<div class="p-spacing-md m-spacing-lg">
  <!-- Implementation maps spacing tokens to actual values -->
</div>
```

### Typography
```html
<!-- Use typography tokens, not hard-coded sizes -->
<h1 class="text-heading-xl font-weight-bold">
  <!-- Implementation maps typography tokens to actual values -->
</h1>
```

## Token Discovery

Agents must:
1. Read the implementation repository's token documentation
2. Use only tokens that are documented and available
3. Not assume token names without verification
4. Reference the implementation's token mapping documentation

If a required token does not exist, agents must either:
- Use the closest available token
- Request token addition (if the task requires it)
- Reject the request if tokens are essential and unavailable

