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

| ID | Name | Import Path | Category | Files |
|---|---|---|---|---|
| `ui:button` | Button | `@/components/ui/button` | Forms | `src/components/ui/button.tsx` |
| `ui:card` | Card | `@/components/ui/card` | Layout | `src/components/ui/card.tsx` |
| `ui:input` | Input | `@/components/ui/input` | Forms | `src/components/ui/input.tsx` |
| `ui:scroll-area` | Scroll Area | `@/components/ui/scroll-area` | Layout | `src/components/ui/scroll-area.tsx` |
| `ui:separator` | Separator | `@/components/ui/separator` | Layout | `src/components/ui/separator.tsx` |
| `ui:sheet` | Sheet | `@/components/ui/sheet` | Overlay | `src/components/ui/sheet.tsx` |

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
