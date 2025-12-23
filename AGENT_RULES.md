# Agent Rules

This document defines mandatory behavioral constraints for agents generating UI code under the Agentic AI UI Control System.

## Mandatory Read Order

Agents must read documentation in the following order before generating any code:

1. Core repository documentation (in order):
   - README.md
   - SYSTEM_ARCHITECTURE.md
   - AGENT_RULES.md (this file)
   - DESIGN_PRINCIPLES.md
   - ACCESSIBILITY.md
   - TOKENS_REFERENCE.md
   - BRAND_THEMING.md

2. Implementation repository documentation:
   - COMPONENTS_INDEX.md
   - Component-specific documentation in `/components`
   - Pattern documentation in `/patterns`
   - Example documentation in `/examples`

Agents must not generate code until all required documentation has been read and understood.

## Composition Over Invention

Agents must:
- Use only components and patterns listed in the implementation repository's `COMPONENTS_INDEX.md`
- Reference existing component snippets from the implementation repository's `/components` directory
- Reuse established patterns from the implementation repository's `/patterns` directory
- Compose solutions from existing building blocks rather than inventing new components

Agents must **not**:
- Create new components not listed in the component index
- Invent new patterns without first checking existing pattern documentation
- Modify core component implementations unless explicitly required by the task

## Dependency and Build Tooling Prohibition

Agents must **not**:
- Add npm packages, dependencies, or package.json entries
- Add build tooling, bundlers, or compilation steps
- Add framework-specific build configurations
- Modify existing build configurations unless explicitly required

The implementation repositories handle all dependency and build concerns. Agents generate only markup, styles, and configuration that work within the existing build system.

## Component Index Compliance

Agents must verify that any component they intend to use exists in the implementation repository's `COMPONENTS_INDEX.md`. If a component is not listed:
- The agent must reject the request or propose an alternative using existing components
- The agent must not invent a new component to fulfill the request
- The agent must inform the user that the requested component is not available in the current implementation

## Output Rejection Conditions

Agents must reject or refuse to generate code in the following conditions:

1. **Missing documentation**: Required documentation has not been read
2. **Component not in index**: Requested component does not exist in `COMPONENTS_INDEX.md`
3. **Accessibility violations**: Generated code would violate requirements in ACCESSIBILITY.md
4. **Token violations**: Code uses hard-coded color/spacing values instead of tokens (see TOKENS_REFERENCE.md)
5. **Framework-specific violations**: Code imports or uses framework features not available in the target implementation
6. **Build tooling requests**: Request requires adding dependencies or build tooling

When rejecting, agents must clearly state which rule is being violated and reference the relevant documentation.

## Accessibility Compliance

All generated code must comply with the requirements defined in **ACCESSIBILITY.md**. This includes:
- WCAG 2.1 AA minimum compliance
- Semantic HTML and ARIA usage
- Keyboard navigation support
- Visible focus indicators
- Proper form labeling
- Accessible modal/dialog patterns

Agents must verify accessibility compliance before outputting code.

## Token System Compliance

All generated code must use tokens as defined in **TOKENS_REFERENCE.md** instead of hard-coded values. Agents must:
- Use brand tokens for colors when available (see BRAND_THEMING.md)
- Use spacing tokens instead of hard-coded pixel values
- Use typography tokens for font sizes, weights, and line heights
- Use radius and shadow tokens where applicable

## Theming Compliance

All generated code must respect theming rules defined in **BRAND_THEMING.md**, including:
- Support for light/dark theme modes via theme mode attribute
- Use of canonical brand token names (brand, brand-2, brand-3, brand-4, brand-text-on)
- Agent Detection Rule: prefer brand tokens when available, otherwise use default framework colors

## Design Principles Adherence

All generated code must follow the decision framework defined in **DESIGN_PRINCIPLES.md**, including:
- Clarity over density
- Page-first UX (avoiding unnecessary modals)
- Consistency and reuse over novelty
- Appropriate use of utility-first spacing patterns

