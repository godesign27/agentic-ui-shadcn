# Accessibility Requirements

This document defines framework-agnostic accessibility requirements that all generated UI code must meet.

## WCAG 2.1 AA Minimum Compliance

All generated code must meet or exceed WCAG 2.1 Level AA standards. Key requirements include:

### Perceivable
- **Text alternatives**: All images, icons, and non-text content must have appropriate alt text or ARIA labels
- **Color contrast**: Text must meet contrast ratios (4.5:1 for normal text, 3:1 for large text)
- **Resizable text**: Text must be resizable up to 200% without loss of functionality
- **Audio/video**: Provide captions, transcripts, or audio descriptions where applicable

### Operable
- **Keyboard accessible**: All functionality must be operable via keyboard without requiring specific timings
- **No seizure**: Content must not flash more than 3 times per second
- **Navigation**: Provide ways to help users navigate, find content, and determine their location
- **Input modalities**: Support multiple input methods beyond mouse/touch

### Understandable
- **Readable**: Text content must be readable and understandable
- **Predictable**: Web pages must operate in predictable ways
- **Input assistance**: Help users avoid and correct mistakes

### Robust
- **Compatible**: Content must be compatible with assistive technologies

## Semantic HTML

Use semantic HTML elements that convey meaning:

- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` for page structure
- `<h1>` through `<h6>` for headings in proper hierarchy
- `<button>` for interactive buttons, not `<div>` or `<span>` with click handlers
- `<a>` for links, not elements styled to look like links
- `<form>`, `<fieldset>`, `<legend>`, `<label>` for form structure
- `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` for tabular data
- `<ul>`, `<ol>`, `<li>` for lists

Avoid:
- Using `<div>` or `<span>` for semantic elements
- Using heading tags for styling purposes
- Nesting interactive elements

## Landmarks and Regions

Use ARIA landmarks to identify page regions:
- `role="banner"` or `<header>` for site header
- `role="navigation"` or `<nav>` for navigation regions
- `role="main"` or `<main>` for main content
- `role="complementary"` or `<aside>` for complementary content
- `role="contentinfo"` or `<footer>` for site footer
- `role="search"` for search regions

## Keyboard Navigation

All interactive elements must be keyboard accessible:

- **Tab order**: Logical tab order that follows visual flow
- **Focus indicators**: Visible focus indicators for all focusable elements
- **Keyboard shortcuts**: Standard keyboard shortcuts (Enter to activate, Escape to close, Arrow keys for navigation where appropriate)
- **Skip links**: Provide skip links to bypass repetitive navigation
- **Focus management**: Manage focus appropriately in dynamic content (modals, dropdowns, etc.)

Focus indicators must:
- Be clearly visible (minimum 2px outline or equivalent)
- Have sufficient contrast with background
- Not rely solely on color changes

## Form Accessibility

Forms must include:

- **Labels**: All form inputs must have associated `<label>` elements or `aria-label` attributes
- **Fieldset/legend**: Group related fields using `<fieldset>` and `<legend>`
- **Error messages**: Associate error messages with inputs using `aria-describedby`
- **Required fields**: Indicate required fields with `aria-required="true"` and visual indicators
- **Input types**: Use appropriate `type` attributes (`email`, `tel`, `url`, etc.)
- **Autocomplete**: Use `autocomplete` attributes where appropriate

Example structure:
```html
<label for="email">Email address</label>
<input type="email" id="email" name="email" required aria-required="true" aria-describedby="email-error">
<span id="email-error" role="alert" aria-live="polite">Error message here</span>
```

## Table Semantics

Tables must use proper semantic structure:

- `<table>` with `<caption>` for table title/description
- `<thead>`, `<tbody>`, `<tfoot>` for table sections
- `<th>` with `scope` attribute (`col`, `row`, `colgroup`, `rowgroup`) for headers
- `<td>` for data cells
- `headers` attribute on `<td>` when headers are complex

For data tables:
- Provide a caption or `aria-label` describing the table
- Use `scope` attributes on header cells
- Ensure header cells are properly associated with data cells

## Modal and Dialog Accessibility

Modals and dialogs must:

- **Focus trap**: Trap focus within the modal when open
- **Initial focus**: Set focus to the first focusable element or the modal container
- **Return focus**: Return focus to the triggering element when closed
- **Escape key**: Close modal with Escape key
- **Backdrop**: Provide a backdrop that can be clicked to close (if appropriate)
- **ARIA attributes**: Use `role="dialog"` or `<dialog>` element, `aria-modal="true"`, `aria-labelledby` or `aria-label`
- **Screen reader announcement**: Announce modal opening to screen readers

Example structure:
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
  <!-- Modal content -->
  <button>Close</button>
</div>
```

## ARIA Usage Guidelines

Use ARIA attributes appropriately:

- **aria-label**: When text label is not visible or sufficient
- **aria-labelledby**: Reference visible text that serves as label
- **aria-describedby**: Reference additional descriptive text
- **aria-live**: For dynamic content updates (use `polite` or `assertive` appropriately)
- **aria-hidden**: Hide decorative elements from screen readers
- **aria-expanded**: Indicate expandable/collapsible state
- **aria-current**: Indicate current item in navigation or list
- **aria-disabled**: Indicate disabled state (use native `disabled` attribute when possible)

Avoid:
- Redundant ARIA (e.g., `role="button"` on `<button>`)
- Overuse of ARIA when semantic HTML is sufficient
- ARIA attributes that contradict native element semantics

## Pre-flight Checklist for Agents

Before outputting any code, verify:

- [ ] All images have appropriate `alt` attributes
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible and have sufficient contrast
- [ ] Form inputs have associated labels
- [ ] Headings are in proper hierarchy (h1 → h2 → h3, no skipping levels)
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Semantic HTML elements are used appropriately
- [ ] ARIA attributes are used correctly and not redundantly
- [ ] Tables use proper semantic structure with headers
- [ ] Modals/dialogs trap focus and can be closed with Escape
- [ ] Dynamic content updates are announced to screen readers where appropriate
- [ ] Skip links are provided for pages with repetitive navigation

