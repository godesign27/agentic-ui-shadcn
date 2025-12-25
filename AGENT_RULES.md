# Agent Rules

This document defines mandatory behavioral constraints for agents generating UI code in this shadcn/ui implementation repository.

## Mandatory Read Order

Agents must read documentation in the following order before generating any code:

1. Core repository documentation (in order):
   - README.md
   - AGENT_RULES.md (this file)
   - COMPONENTS_INDEX.md
   - DESIGN_PRINCIPLES.md
   - ACCESSIBILITY.md
   - TOKENS_REFERENCE.md
   - BRAND_THEMING.md

2. Implementation repository documentation:
   - `components/COMPONENTS_INDEX.json` (machine-readable inventory)
   - Component source files in `src/components/ui/*`
   - Pattern documentation in `src/components/patterns/*`
   - Layout documentation in `src/components/layout/*`

Agents must not generate code until all required documentation has been read and understood.

## Closed-World Inventory Rule

**CRITICAL ENFORCEMENT**: This repository uses a **closed-world inventory** system. Agents must ONLY use components, patterns, and layouts explicitly listed in `components/COMPONENTS_INDEX.json`.

### Pre-Generation Validation

Before generating any code, agents must:

1. **Verify component availability**: Check `components/COMPONENTS_INDEX.json` for the requested component ID (e.g., `ui:button`, `pattern:form-field`, `layout:page-container`)
2. **Verify import paths**: Only import from approved paths:
   - `@/components/ui/*` (shadcn/ui base components)
   - `@/components/patterns/*` (indexed patterns)
   - `@/components/layout/*` (indexed layouts)
3. **Reject unknown components**: If a component is not in the index, the agent MUST reject the request

### Hard Failure States

Agents must **reject and refuse** to generate code in the following conditions (these are hard failures, not warnings):

1. **Unknown component requested**: Component ID not found in `components/COMPONENTS_INDEX.json`
   - Action: Reject request, propose alternative using indexed components
   - Message: "Component [id] is not in the closed inventory. Available alternatives: [list]"

2. **Non-approved import path**: Attempt to import from paths outside `@/components/ui/*`, `@/components/patterns/*`, `@/components/layout/*`
   - Action: Reject request, correct to approved path
   - Message: "Import path [path] is not approved. Use [approved-path] instead"

3. **Third-party UI library**: Attempt to install or reference external UI libraries (Material UI, Ant Design, Chakra UI, etc.) without explicit approval and indexing
   - Action: Reject request
   - Message: "External UI libraries are forbidden unless explicitly approved and added to COMPONENTS_INDEX.json"

4. **Bespoke UI when component exists**: Attempt to generate raw custom UI markup when an equivalent shadcn/ui component exists in the index
   - Action: Reject request, propose using indexed component
   - Message: "Component [name] exists in inventory. Use [component-id] instead of custom markup"

5. **Modifying base components**: Attempt to modify base component implementations in `src/components/ui/*` without explicit requirement
   - Action: Reject request or request explicit permission
   - Message: "Base component modifications require explicit task requirement"

### Enforcement Timing

- **Pre-generation**: Verify all components exist in index before writing code
- **During generation**: Use only approved import paths and indexed components
- **Post-generation**: Validate generated code against inventory (if automated validation exists)

## Composition Over Invention

Agents must:
- Use only components and patterns listed in `components/COMPONENTS_INDEX.json`
- Compose solutions from existing shadcn/ui components
- Reuse established patterns from `src/components/patterns/*` (if indexed)
- Use layout fragments from `src/components/layout/*` (if indexed)
- Compose solutions from existing building blocks rather than inventing new components

Agents must **not**:
- Create new components not listed in the component index
- Invent new patterns without first checking existing pattern documentation
- Modify core component implementations in `src/components/ui/*` unless explicitly required by the task
- Create duplicate components that replicate shadcn/ui functionality

## React + Vite + Tailwind Environment

This repository uses:
- **React 18** with TypeScript
- **Vite** as build tool
- **Tailwind CSS** for styling
- **shadcn/ui** components (Radix UI primitives + Tailwind)

Agents must:
- Generate React/TypeScript code (`.tsx` files)
- Use Tailwind utility classes for styling
- Import components using `@/components/ui/*` alias
- Follow shadcn/ui component patterns and conventions
- Use CSS variables for theming (see TOKENS_REFERENCE.md)

Agents must **not**:
- Generate static HTML markup
- Use CDN-based solutions
- Add framework-specific build configurations unless required
- Modify Vite or Tailwind configuration without explicit requirement

## Dependency and Build Tooling Prohibition

Agents must **not**:
- Add npm packages, dependencies, or package.json entries without explicit approval
- Add build tooling, bundlers, or compilation steps
- Add framework-specific build configurations
- Modify existing build configurations unless explicitly required

The repository handles all dependency and build concerns. Agents generate only React components, styles, and configuration that work within the existing Vite + Tailwind setup.

## Component Index Compliance

Agents must verify that any component they intend to use exists in `components/COMPONENTS_INDEX.json`. The inventory is machine-readable and must be checked before code generation.

If a component is not listed:
- The agent must reject the request or propose an alternative using existing components
- The agent must not invent a new component to fulfill the request
- The agent must inform the user that the requested component is not available in the current implementation
- The agent must reference `COMPONENTS_INDEX.md` for available alternatives

## Output Rejection Conditions

Agents must reject or refuse to generate code in the following conditions:

1. **Missing documentation**: Required documentation has not been read
2. **Component not in index**: Requested component does not exist in `components/COMPONENTS_INDEX.json`
3. **Non-approved import path**: Attempt to import from non-indexed paths
4. **Accessibility violations**: Generated code would violate requirements in ACCESSIBILITY.md
5. **Token violations**: Code uses hard-coded color/spacing values instead of tokens (see TOKENS_REFERENCE.md)
6. **Framework-specific violations**: Code imports or uses framework features not available in React/Vite/Tailwind
7. **Build tooling requests**: Request requires adding dependencies or build tooling
8. **Third-party UI libraries**: Attempt to use external UI libraries without approval

When rejecting, agents must clearly state which rule is being violated and reference the relevant documentation.

## Accessibility Compliance

All generated code must comply with the requirements defined in **ACCESSIBILITY.md**. This includes:
- WCAG 2.1 AA minimum compliance
- Semantic HTML and ARIA usage
- Keyboard navigation support
- Visible focus indicators (do not remove focus rings)
- Proper form labeling
- Accessible modal/dialog patterns (Sheet, Dialog, etc.)
- Focus management for overlays (focus trap, return focus)

Agents must verify accessibility compliance before outputting code.

## Token System Compliance

All generated code must use tokens as defined in **TOKENS_REFERENCE.md** instead of hard-coded values. Agents must:
- Use CSS variables for colors (e.g., `hsl(var(--primary))`)
- Use Tailwind spacing utilities instead of hard-coded pixel values
- Use typography tokens for font sizes, weights, and line heights
- Use radius and shadow tokens where applicable
- Never hard-code hex colors, pixel values, or other design tokens

## Theming Compliance

All generated code must respect theming rules defined in **BRAND_THEMING.md**, including:
- Support for light/dark theme modes via CSS variables
- Use of canonical brand token names when available
- Agent Detection Rule: prefer brand tokens when available, otherwise use default shadcn/ui colors (primary, secondary, muted, destructive, etc.)
- Use of `hsl(var(--token))` format for all color values

## Design Principles Adherence

All generated code must follow the decision framework defined in **DESIGN_PRINCIPLES.md**, including:
- Clarity over density
- Page-first UX (avoiding unnecessary modals)
- Consistency and reuse over novelty
- Composition from shadcn/ui primitives
- Appropriate use of Tailwind utility classes

## shadcn/ui Specific Rules

- **Component variants**: Use shadcn/ui component variants (e.g., Button variants: default, destructive, outline, secondary, ghost, link)
- **Composition**: Prefer composing from shadcn/ui components over creating custom solutions
- **Radix UI primitives**: shadcn/ui components are built on Radix UI - respect their accessibility features
- **CSS variables**: All theming uses CSS variables defined in `src/index.css`
- **Import convention**: Always use `@/components/ui/[name]` import paths
