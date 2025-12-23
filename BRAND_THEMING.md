# Brand Theming

This document defines the framework-agnostic theming contract for integrating brand colors and theme modes into generated UI code.

## Consumer Brand Integration

Consumers of implementation repositories can provide brand values through a brand configuration mechanism (e.g., a `brand.css` file, configuration object, or design token overrides). The exact mechanism varies by implementation repository, but the contract remains consistent.

## Theme Mode Support

All generated code must support light and dark theme modes via a theme mode attribute. The implementation repository defines the specific attribute name (e.g., `data-bs-theme`, `data-theme`, `class="dark"`), but the concept is framework-agnostic.

Generated code must:
- Work correctly in both light and dark modes
- Use tokens that adapt to the current theme mode
- Not hard-code colors that would break in either mode

## Canonical Brand Token Names

When brand tokens are provided by the consumer, the following canonical token names must be supported:

### Primary Brand Colors
- **brand**: Primary brand color (main brand identity)
- **brand-2**: Secondary brand color (complementary to primary)
- **brand-3**: Tertiary brand color (additional brand variation)
- **brand-4**: Quaternary brand color (additional brand variation)

### Brand Text Color
- **brand-text-on**: Text color that provides sufficient contrast when placed on brand-colored backgrounds

Implementation repositories map these canonical names to their specific token systems. For example:
- Bootstrap might map to `--bs-brand`, `--bs-brand-2`, etc.
- shadcn might map to `--brand`, `--brand-2`, etc.
- Material might map to Material Design brand tokens

## Agent Detection Rule

Agents must follow this rule when generating code:

**If the consumer provides brand tokens (brand, brand-2, brand-3, brand-4, brand-text-on), prefer brand utilities over default framework colors. Otherwise, use default framework colors.**

This means:
1. **Check for brand tokens**: Determine if brand tokens are available in the implementation
2. **Prefer brand when available**: Use `bg-brand`, `text-brand`, `border-brand` instead of `bg-primary`, `text-primary`, etc.
3. **Fallback to defaults**: If brand tokens are not available, use the framework's default color system (e.g., `bg-primary`, `text-primary`)

### Example Application

**Scenario 1: Brand tokens available**
```html
<!-- Use brand tokens -->
<button class="bg-brand text-brand-text-on">Primary Action</button>
```

**Scenario 2: Brand tokens not available**
```html
<!-- Use default framework colors -->
<button class="bg-primary text-white">Primary Action</button>
```

## Theme Mode Implementation

Generated code must respect the theme mode attribute. This typically means:

- **Light mode**: Default appearance with light backgrounds and dark text
- **Dark mode**: Inverted appearance with dark backgrounds and light text
- **Token adaptation**: All color tokens automatically adapt based on theme mode

Agents must not:
- Hard-code colors that only work in one theme mode
- Assume a specific theme mode is active
- Create theme-specific code paths unless necessary

## No Framework Rebuild Required

This theming system does **not** require rebuilding the underlying UI framework. Instead:

- Brand tokens override or extend existing framework tokens
- Theme mode support uses the framework's existing theme mechanism
- Implementation repositories handle the mapping between canonical token names and framework-specific implementations

Agents must work within the existing framework's theming capabilities, not request framework modifications.

## Brand Token Usage Guidelines

When using brand tokens:

1. **Primary actions**: Use `brand` for primary CTAs and important actions
2. **Secondary actions**: Use `brand-2` or framework defaults for secondary actions
3. **Accents**: Use `brand-3` and `brand-4` sparingly for accents and highlights
4. **Text on brand**: Always use `brand-text-on` for text placed on brand-colored backgrounds to ensure contrast
5. **Consistency**: Use brand tokens consistently throughout the interface when available

## Implementation Repository Requirements

Implementation repositories must:
- Document how consumers provide brand values
- Map canonical token names to framework-specific tokens
- Support theme mode switching via theme mode attribute
- Provide fallback to default framework colors when brand tokens are not provided

Agents must reference the implementation repository's brand theming documentation for specific usage instructions.

