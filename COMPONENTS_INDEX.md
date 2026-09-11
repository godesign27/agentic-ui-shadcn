# Components Index

This document provides a **CLOSED-WORLD inventory** of available UI components in this shadcn/ui implementation repository. This is the authoritative source for what components agents are allowed to use.

## Closed-World Rule

**CRITICAL**: Agents must ONLY use components, patterns, and layouts listed in this index. If a component is not listed here, it is **FORBIDDEN** and the agent must:

1. Reject the request
2. Propose an alternative using existing components
3. Inform the user that the requested component is not available

The machine-readable inventory is located at: `components/COMPONENTS_INDEX.json`

## Authorized UI Fragments

The following directories contain authorized UI components and patterns:

- `src/components/ui/*` - shadcn/ui base components (indexed below)
- `src/components/patterns/*` - Curated composition patterns (must be indexed)
- `src/components/layout/*` - Layout components (must be indexed)

**Any component, pattern, or layout not explicitly listed in this index is FORBIDDEN.**

## shadcn/ui Base Components

Components with Category `—` have not been categorized or documented yet.

| ID | Name | Import Path | Category | Files |
|---|---|---|---|---|
| `ui:accordion` | Accordion | `@/components/ui/accordion` | — | `src/components/ui/accordion.tsx` |
| `ui:alert` | Alert | `@/components/ui/alert` | — | `src/components/ui/alert.tsx` |
| `ui:alert-dialog` | Alert Dialog | `@/components/ui/alert-dialog` | — | `src/components/ui/alert-dialog.tsx` |
| `ui:aspect-ratio` | Aspect Ratio | `@/components/ui/aspect-ratio` | — | `src/components/ui/aspect-ratio.tsx` |
| `ui:avatar` | Avatar | `@/components/ui/avatar` | — | `src/components/ui/avatar.tsx` |
| `ui:badge` | Badge | `@/components/ui/badge` | — | `src/components/ui/badge.tsx` |
| `ui:breadcrumb` | Breadcrumb | `@/components/ui/breadcrumb` | — | `src/components/ui/breadcrumb.tsx` |
| `ui:button` | Button | `@/components/ui/button` | Forms | `src/components/ui/button.tsx` |
| `ui:button-group` | Button Group | `@/components/ui/button-group` | — | `src/components/ui/button-group.tsx` |
| `ui:calendar` | Calendar | `@/components/ui/calendar` | — | `src/components/ui/calendar.tsx` |
| `ui:card` | Card | `@/components/ui/card` | Layout | `src/components/ui/card.tsx` |
| `ui:carousel` | Carousel | `@/components/ui/carousel` | — | `src/components/ui/carousel.tsx` |
| `ui:chart` | Chart | `@/components/ui/chart` | — | `src/components/ui/chart.tsx` |
| `ui:checkbox` | Checkbox | `@/components/ui/checkbox` | — | `src/components/ui/checkbox.tsx` |
| `ui:collapsible` | Collapsible | `@/components/ui/collapsible` | — | `src/components/ui/collapsible.tsx` |
| `ui:command` | Command | `@/components/ui/command` | — | `src/components/ui/command.tsx` |
| `ui:context-menu` | Context Menu | `@/components/ui/context-menu` | — | `src/components/ui/context-menu.tsx` |
| `ui:dialog` | Dialog | `@/components/ui/dialog` | — | `src/components/ui/dialog.tsx` |
| `ui:drawer` | Drawer | `@/components/ui/drawer` | — | `src/components/ui/drawer.tsx` |
| `ui:dropdown-menu` | Dropdown Menu | `@/components/ui/dropdown-menu` | — | `src/components/ui/dropdown-menu.tsx` |
| `ui:empty` | Empty | `@/components/ui/empty` | — | `src/components/ui/empty.tsx` |
| `ui:field` | Field | `@/components/ui/field` | — | `src/components/ui/field.tsx` |
| `ui:form` | Form | `@/components/ui/form` | — | `src/components/ui/form.tsx` |
| `ui:hover-card` | Hover Card | `@/components/ui/hover-card` | — | `src/components/ui/hover-card.tsx` |
| `ui:input` | Input | `@/components/ui/input` | Forms | `src/components/ui/input.tsx` |
| `ui:input-group` | Input Group | `@/components/ui/input-group` | — | `src/components/ui/input-group.tsx` |
| `ui:input-otp` | Input OTP | `@/components/ui/input-otp` | — | `src/components/ui/input-otp.tsx` |
| `ui:item` | Item | `@/components/ui/item` | — | `src/components/ui/item.tsx` |
| `ui:kbd` | Kbd | `@/components/ui/kbd` | — | `src/components/ui/kbd.tsx` |
| `ui:label` | Label | `@/components/ui/label` | — | `src/components/ui/label.tsx` |
| `ui:menubar` | Menubar | `@/components/ui/menubar` | — | `src/components/ui/menubar.tsx` |
| `ui:navigation-menu` | Navigation Menu | `@/components/ui/navigation-menu` | — | `src/components/ui/navigation-menu.tsx` |
| `ui:pagination` | Pagination | `@/components/ui/pagination` | — | `src/components/ui/pagination.tsx` |
| `ui:popover` | Popover | `@/components/ui/popover` | — | `src/components/ui/popover.tsx` |
| `ui:progress` | Progress | `@/components/ui/progress` | — | `src/components/ui/progress.tsx` |
| `ui:radio-group` | Radio Group | `@/components/ui/radio-group` | — | `src/components/ui/radio-group.tsx` |
| `ui:resizable` | Resizable | `@/components/ui/resizable` | — | `src/components/ui/resizable.tsx` |
| `ui:scroll-area` | Scroll Area | `@/components/ui/scroll-area` | Layout | `src/components/ui/scroll-area.tsx` |
| `ui:select` | Select | `@/components/ui/select` | — | `src/components/ui/select.tsx` |
| `ui:separator` | Separator | `@/components/ui/separator` | Layout | `src/components/ui/separator.tsx` |
| `ui:sheet` | Sheet | `@/components/ui/sheet` | Overlay | `src/components/ui/sheet.tsx` |
| `ui:sidebar` | Sidebar | `@/components/ui/sidebar` | — | `src/components/ui/sidebar.tsx` |
| `ui:skeleton` | Skeleton | `@/components/ui/skeleton` | — | `src/components/ui/skeleton.tsx` |
| `ui:slider` | Slider | `@/components/ui/slider` | — | `src/components/ui/slider.tsx` |
| `ui:sonner` | Sonner | `@/components/ui/sonner` | — | `src/components/ui/sonner.tsx` |
| `ui:spinner` | Spinner | `@/components/ui/spinner` | — | `src/components/ui/spinner.tsx` |
| `ui:switch` | Switch | `@/components/ui/switch` | — | `src/components/ui/switch.tsx` |
| `ui:table` | Table | `@/components/ui/table` | — | `src/components/ui/table.tsx` |
| `ui:tabs` | Tabs | `@/components/ui/tabs` | — | `src/components/ui/tabs.tsx` |
| `ui:textarea` | Textarea | `@/components/ui/textarea` | — | `src/components/ui/textarea.tsx` |
| `ui:toast` | Toast | `@/components/ui/toast` | — | `src/components/ui/toast.tsx` |
| `ui:toaster` | Toaster | `@/components/ui/toaster` | — | `src/components/ui/toaster.tsx` |
| `ui:toggle` | Toggle | `@/components/ui/toggle` | — | `src/components/ui/toggle.tsx` |
| `ui:toggle-group` | Toggle Group | `@/components/ui/toggle-group` | — | `src/components/ui/toggle-group.tsx` |
| `ui:tooltip` | Tooltip | `@/components/ui/tooltip` | — | `src/components/ui/tooltip.tsx` |

### Component Details

#### ui:button
- **Variants**: default, destructive, outline, secondary, ghost, link
- **Sizes**: default, sm, lg, icon
- **Accessibility**: Native button with focus-visible ring, keyboard accessible

#### ui:card
- **Composition**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Accessibility**: Ensure proper heading hierarchy with CardTitle

#### ui:input
- **Usage**: Standard HTML input with shadcn styling
- **Accessibility**: Requires associated label, supports aria-describedby

#### ui:scroll-area
- **Composition**: ScrollArea and ScrollBar components
- **Accessibility**: Keyboard scrollable, maintains focus management

#### ui:separator
- **Orientations**: horizontal (default), vertical
- **Accessibility**: Decorative by default

#### ui:sheet
- **Composition**: Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter
- **Sides**: top, bottom, left, right
- **Accessibility**: Focus trap, ESC closes, returns focus to trigger

## Patterns

Currently no patterns are indexed. Patterns must be added to `src/components/patterns/` and indexed before use.

## Layouts

Currently no layout fragments are indexed. Layouts must be added to `src/components/layout/` and indexed before use.

## Component Usage Rules

1. **Import Path**: All components use the `@/components/ui/*` import alias
   ```tsx
   import { Button } from '@/components/ui/button'
   ```

2. **Composition Only**: Agents must compose solutions from existing components. Do not modify base component implementations unless explicitly required.

3. **No Custom Components**: Do not create new components outside this index. Use existing components and compose patterns instead.

4. **Pattern Directory**: Check `src/components/patterns/*` for reusable composition patterns before creating new markup.

5. **Verification Required**: Before using any component, verify it exists in `components/COMPONENTS_INDEX.json`.

## How to Add a New Allowed Component

To add a new shadcn/ui component to this repository:

1. **Install the component**:
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```
   Or manually copy from [shadcn/ui docs](https://ui.shadcn.com/docs/components) to `src/components/ui/`

2. **Rebuild the index**:
   ```bash
   npm run build:index
   ```
   This will automatically scan `src/components/ui/` and update `components/COMPONENTS_INDEX.json`

3. **Update this markdown file**:
   - Add the component to the table above
   - Add component details section if needed
   - Document any special usage notes

4. **Verify**:
   - Component appears in `components/COMPONENTS_INDEX.json`
   - Component is listed in this markdown file
   - Import path follows `@/components/ui/[name]` convention

## Forbidden Actions

The following actions are explicitly forbidden:

- ❌ Installing external UI libraries (Material UI, Ant Design, Chakra UI, etc.) without approval and indexing
- ❌ Creating new UI components outside `src/components/ui/` and `src/components/patterns/`
- ❌ Modifying base component implementations in `src/components/ui/` unless explicitly required
- ❌ Importing from non-approved paths (only `@/components/ui/*`, `@/components/patterns/*`, `@/components/layout/*`)
- ❌ Generating raw bespoke UI markup when an equivalent shadcn/ui component exists
- ❌ Using third-party component libraries without adding to this index first
- ❌ Creating duplicate components that replicate shadcn/ui functionality

## Rejection Conditions

Agents must reject requests for:
- Components not listed in this index
- Custom components that duplicate shadcn/ui functionality
- Modifications to base component implementations without explicit requirement
- Components that violate accessibility requirements (see ACCESSIBILITY.md)
- Importing from non-indexed paths

When rejecting, agents must:
1. State which rule is being violated
2. Reference this document
3. Propose an alternative using existing components if possible

## Component Documentation

For detailed component documentation, refer to:
- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components)
- Component source files in `src/components/ui/*`
- Machine-readable index: `components/COMPONENTS_INDEX.json`
- Pattern examples in `src/components/patterns/*` (if present)
