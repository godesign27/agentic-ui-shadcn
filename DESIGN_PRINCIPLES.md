# Design Principles

This document defines the decision framework that agents must follow when generating UI code in this shadcn/ui implementation repository.

## Composition from shadcn/ui Primitives

**Primary Rule**: Prefer composing solutions from shadcn/ui components over creating custom implementations.

- **Use indexed components**: Only use components listed in `components/COMPONENTS_INDEX.json`
- **Compose, don't invent**: Build features by combining shadcn/ui components
- **Keep components thin**: Components should be compositions, not new primitives
- **Pattern directory**: Check `src/components/patterns/*` for reusable compositions before creating new markup

Example composition:
```tsx
// ✅ Good: Composing from indexed components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function FeatureCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Action</Button>
      </CardContent>
    </Card>
  )
}
```

## Clarity Over Density

Prioritize clear, readable interfaces over information density. This means:
- Generous spacing between elements (use Tailwind spacing utilities)
- Clear visual hierarchy through typography and spacing
- Sufficient contrast between text and backgrounds (use CSS variables)
- Readable font sizes (minimum 14px for body text, preferably 16px)
- Adequate touch targets (minimum 44x44px for interactive elements)

Avoid cramming too much information into small spaces, even if it means additional scrolling or pagination.

## Page-First UX

Prefer full-page experiences over modal overlays when possible. Use Sheet/Dialog components only when:
- The task requires immediate user attention and cannot be deferred
- The content is truly secondary or supplementary to the main page
- The interaction is brief and self-contained (e.g., confirmation dialogs)

Do **not** use modals for:
- Primary content or workflows
- Forms that could be presented on a dedicated page
- Content that benefits from more space
- Multi-step processes that would be better as a dedicated page flow

When modals are necessary, use the indexed `ui:sheet` component and ensure they are accessible (see ACCESSIBILITY.md).

## Consistency & Reuse Over Novelty

Prioritize consistency with existing patterns and components over creating new, novel solutions. This means:
- Reuse components from `components/COMPONENTS_INDEX.json`
- Follow established patterns from `src/components/patterns/*` (if indexed)
- Maintain visual consistency with existing examples
- Use consistent spacing (Tailwind utilities), typography, and color application (CSS variables)

Avoid:
- Creating new component variations when existing shadcn/ui components can be composed
- Introducing new interaction patterns without justification
- Deviating from established visual patterns without clear benefit
- Creating custom components that duplicate shadcn/ui functionality

## Tailwind Utility-First Approach

Use Tailwind CSS utility classes for styling:
- Margin and padding: `m-4`, `p-6`, `gap-4`, etc.
- Layout: `flex`, `grid`, `container`, etc.
- Responsive: `md:`, `lg:`, etc.
- Colors: Use CSS variables via Tailwind (e.g., `bg-primary`, `text-foreground`)

However, avoid:
- Hard-coding pixel values (use Tailwind spacing scale)
- Hard-coding colors (use CSS variables)
- Over-reliance on utility classes for complex styling that should be component-scoped
- Creating custom utility classes that duplicate Tailwind functionality

The goal is consistent, token-based styling using Tailwind utilities and CSS variables.

## shadcn/ui Component Variants

Use shadcn/ui component variants appropriately:
- **Button**: default, destructive, outline, secondary, ghost, link
- **Card**: Use CardHeader, CardTitle, CardDescription, CardContent, CardFooter composition
- **Input**: Standard input with shadcn styling, supports all native input props
- **Sheet**: Use for slide-out panels with proper focus management

Do not create custom variants when existing variants suffice. Compose from existing components instead.

## Pattern Restrictions

The following patterns should be used sparingly or avoided:

### Carousels

Avoid carousels unless:
- The content is truly time-sensitive or promotional
- Space constraints make a carousel the only viable option
- The carousel is accessible (keyboard navigable, screen reader friendly, pause controls)

Prefer alternatives:
- Grid layouts with pagination (compose from Card components)
- Tabbed interfaces for categorized content
- Accordion or expandable sections (if indexed)

### Tooltips and Popovers

Use tooltips and popovers only for:
- Supplementary information that enhances understanding
- Non-critical help text or definitions
- Contextual information that doesn't need to be always visible

Do **not** use for:
- Critical information that users must see
- Primary actions or navigation
- Content that should be part of the main interface

Ensure all tooltips and popovers are keyboard accessible and screen reader friendly. Only use if indexed in `components/COMPONENTS_INDEX.json`.

### Scrollspy

Avoid scrollspy navigation patterns unless:
- The page has clear, distinct sections
- The navigation provides genuine value for long-form content
- The implementation is accessible and doesn't interfere with normal scrolling

Prefer standard navigation patterns that don't rely on scroll position detection.

## Responsive Design

All generated interfaces must be responsive and work across:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop screens (1024px and up)
- Large desktop screens (1440px and up)

Use:
- Tailwind responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Flexible layouts that adapt to available space
- Responsive typography using Tailwind text size utilities
- Touch-friendly targets on mobile devices (minimum 44x44px)

## Performance Considerations

Consider performance implications:
- Minimize DOM complexity where possible
- Use semantic HTML that browsers can optimize
- Avoid unnecessary JavaScript for styling-only concerns
- Prefer CSS solutions over JavaScript for animations and interactions
- Use React best practices (memoization, lazy loading when appropriate)

## React Best Practices

Follow React and TypeScript best practices:
- Use TypeScript for type safety
- Use functional components with hooks
- Proper prop typing
- Avoid unnecessary re-renders
- Use React Router for navigation (already configured)
- Follow shadcn/ui component patterns and conventions

## CSS Variables and Theming

All styling must use CSS variables for theming:
- Colors: `hsl(var(--primary))`, `hsl(var(--background))`, etc.
- Spacing: Tailwind utilities (which use consistent spacing scale)
- Typography: Tailwind text utilities
- Radius: `var(--radius)` or Tailwind rounded utilities

Never hard-code:
- Hex colors (use CSS variables)
- Pixel values for spacing (use Tailwind utilities)
- Font sizes (use Tailwind text utilities)

See TOKENS_REFERENCE.md for complete token system.
