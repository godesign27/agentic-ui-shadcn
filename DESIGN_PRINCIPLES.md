# Design Principles

This document defines the framework-agnostic decision framework that agents must follow when generating UI code.

## Clarity Over Density

Prioritize clear, readable interfaces over information density. This means:
- Generous spacing between elements
- Clear visual hierarchy through typography and spacing
- Sufficient contrast between text and backgrounds
- Readable font sizes (minimum 14px for body text, preferably 16px)
- Adequate touch targets (minimum 44x44px for interactive elements)

Avoid cramming too much information into small spaces, even if it means additional scrolling or pagination.

## Page-First UX

Prefer full-page experiences over modal overlays when possible. Use modals only when:
- The task requires immediate user attention and cannot be deferred
- The content is truly secondary or supplementary to the main page
- The interaction is brief and self-contained (e.g., confirmation dialogs)

Do **not** use modals for:
- Primary content or workflows
- Forms that could be presented on a dedicated page
- Content that benefits from more space
- Multi-step processes that would be better as a dedicated page flow

When modals are necessary, ensure they are accessible (see ACCESSIBILITY.md) and can be dismissed via keyboard.

## Consistency & Reuse Over Novelty

Prioritize consistency with existing patterns and components over creating new, novel solutions. This means:
- Reuse components from the implementation repository's component index
- Follow established patterns from the implementation repository's patterns directory
- Maintain visual consistency with existing examples
- Use consistent spacing, typography, and color application

Avoid:
- Creating new component variations when existing components can be composed
- Introducing new interaction patterns without justification
- Deviating from established visual patterns without clear benefit

## Utility-First Spacing

Where the implementation framework supports utility-first spacing classes, prefer them for:
- Margin and padding adjustments
- Component composition and layout
- Responsive spacing adjustments

However, avoid:
- Framework-specific class naming in documentation (describe conceptually)
- Over-reliance on utility classes for complex styling that should be component-scoped
- Utility classes that would violate token system requirements

The goal is consistent, token-based spacing that can be applied efficiently, not framework-specific class naming.

## Pattern Restrictions

The following patterns should be used sparingly or avoided:

### Carousels

Avoid carousels unless:
- The content is truly time-sensitive or promotional
- Space constraints make a carousel the only viable option
- The carousel is accessible (keyboard navigable, screen reader friendly, pause controls)

Prefer alternatives:
- Grid layouts with pagination
- Tabbed interfaces for categorized content
- Accordion or expandable sections

### Tooltips and Popovers

Use tooltips and popovers only for:
- Supplementary information that enhances understanding
- Non-critical help text or definitions
- Contextual information that doesn't need to be always visible

Do **not** use for:
- Critical information that users must see
- Primary actions or navigation
- Content that should be part of the main interface

Ensure all tooltips and popovers are keyboard accessible and screen reader friendly.

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
- Flexible layouts that adapt to available space
- Responsive typography that scales appropriately
- Touch-friendly targets on mobile devices
- Appropriate breakpoints for the implementation framework

## Performance Considerations

Consider performance implications:
- Minimize DOM complexity where possible
- Use semantic HTML that browsers can optimize
- Avoid unnecessary JavaScript for styling-only concerns
- Prefer CSS solutions over JavaScript for animations and interactions

## Progressive Enhancement

Build interfaces that work without JavaScript, then enhance with JavaScript where appropriate:
- Forms should submit and validate without JavaScript
- Navigation should work via standard links
- Content should be accessible without client-side rendering

Add JavaScript enhancements for:
- Improved user experience
- Dynamic interactions
- Real-time updates

