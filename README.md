# Agentic AI UI Control System

## What This Repository Is

This repository is the core governance and instruction layer for controlling agentic AI UI generation. It defines behavioral contracts, design principles, accessibility requirements, and system architecture that implementation repositories must follow when generating UI components and patterns.

This repository does **not** contain:
- UI components or framework-specific code
- Build tooling, package managers, or dependencies
- Example pages or implementation code
- Framework-specific utilities (Bootstrap, shadcn, Material, etc.)

## How It's Used

Implementation repositories (e.g., `agentic-ui-bootstrap`) reference this system to ensure consistent, accessible, and governed UI generation across different frameworks. Agents generating UI code must read and adhere to the rules and principles defined in this repository before producing any implementation code.

## Read Order

Agents must read documentation in this order:

1. **README.md** (this file) - Overview and navigation
2. **SYSTEM_ARCHITECTURE.md** - System structure and implementation contracts
3. **AGENT_RULES.md** - Mandatory behavioral constraints
4. **DESIGN_PRINCIPLES.md** - Decision framework for UI generation
5. **ACCESSIBILITY.md** - WCAG compliance requirements
6. **TOKENS_REFERENCE.md** - Token system contract
7. **BRAND_THEMING.md** - Theming and brand integration rules

After reading the core documentation, agents must then read the implementation repository's `COMPONENTS_INDEX.md` and component documentation before generating code.

## Implementations

This core system is implemented in the following repositories:

- **agentic-ui-bootstrap** - Bootstrap implementation with component library, patterns, and examples

Future implementations:
- **agentic-ui-shadcn** - shadcn/ui implementation
- **agentic-ui-material** - Material Design implementation
- Custom design system implementations

## Licensing

- **Non-commercial use**: Allowed under the terms of LICENSE
- **Commercial use**: Requires a paid license as defined in COMMERCIAL_LICENSE.md
- **Hosted/managed offerings**: Require a commercial license

See LICENSE and COMMERCIAL_LICENSE.md for full terms.

