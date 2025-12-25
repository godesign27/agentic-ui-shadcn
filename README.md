# Agentic UI - shadcn/ui Implementation

This repository is a **shadcn/ui implementation** of the Agentic AI UI Control System. It provides a React + Vite + Tailwind environment with shadcn/ui components, governance rules, and a built-in Prompt Library.

## What This Repository Is

This repository combines:
- **shadcn/ui components** - Copy-pasteable React components built on Radix UI
- **Governance model** - Rules, constraints, and design principles for agentic AI UI generation
- **Prompt Library** - Built-in drawer with curated prompts for common workflows
- **UI Kit** - Visual preview of available shadcn/ui components
- **Brand Preview** - Color scale visualization and theming tools

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open: http://localhost:5173/

**Available Routes:**
- **Home** (`/`) - Hello World page with Prompt Library and navigation CTAs
- **UI Kit** (`/ui-kit`) - Browse available shadcn/ui components
- **Brand Preview** (`/brand-preview`) - Preview brand color scales and usage examples

### Prompt Library

The Prompt Library is built-in and accessible via:
- **Hotkeys**: Press `Cmd+L` or `Ctrl+L` (or `Cmd/Ctrl+K`) to open the drawer
- **Button**: Click "Open Prompt Library" button on any page
- **Navigation**: Use the drawer to browse and copy prompts for agentic AI workflows

**Shortcuts:**
- `Cmd/Ctrl+L` or `Cmd/Ctrl+K` - Open/close Prompt Library drawer
- `ESC` - Close drawer or return to list view

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **React Router** - Client-side routing

## Governance Model

This repository follows the Agentic AI UI Control System governance model:

### Required Reading Order

Agents must read documentation in this order:

1. **README.md** (this file) - Overview and navigation
2. **AGENT_RULES.md** - Mandatory behavioral constraints
3. **COMPONENTS_INDEX.md** - Closed inventory of available components
4. **DESIGN_PRINCIPLES.md** - Decision framework for UI generation
5. **ACCESSIBILITY.md** - WCAG compliance requirements
6. **TOKENS_REFERENCE.md** - Token system contract
7. **BRAND_THEMING.md** - Theming and brand integration rules

### Key Constraints

- **Composition over invention**: Use only components listed in `COMPONENTS_INDEX.md`
- **No hallucinated components**: Do not create components outside shadcn/ui + allowed patterns
- **Token compliance**: Use CSS variables and Tailwind tokens, not hard-coded values
- **Accessibility first**: All code must meet WCAG 2.1 AA minimum

## Authorized UI Fragments

The following directories contain authorized UI components:

- `src/components/ui/*` - shadcn/ui base components
- `src/components/patterns/*` - Curated composition patterns (if present)
- `src/components/layout/*` - Layout components (if present)

See `COMPONENTS_INDEX.md` for the complete list of available components.

## Project Structure

```
agentic-ui-shadcn/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui base components
│   │   └── prompt-library/  # Prompt Library drawer
│   ├── pages/               # Route pages
│   ├── lib/                 # Utilities (cn helper, etc.)
│   ├── App.tsx              # Router setup
│   └── main.tsx             # Entry point
├── public/
│   └── prompts/             # Prompt files and index
├── components.json          # shadcn/ui configuration
├── tailwind.config.js       # Tailwind + shadcn theme config
└── [governance docs]        # AGENT_RULES.md, etc.
```

## Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

Or manually copy from [shadcn/ui docs](https://ui.shadcn.com/docs/components) and update `COMPONENTS_INDEX.md`.

## Brand Setup

Use the "Brand Setup" prompt from the Prompt Library to:
1. Generate color scales (50-900) from base brand colors
2. Update CSS variables in `src/index.css`
3. Configure Tailwind color mappings
4. Preview colors in the Brand Preview page

## Development Guidelines

- **Prefer composition**: Build features by composing existing shadcn/ui components
- **Follow governance**: Read and follow all governance docs before generating code
- **Use tokens**: Always use CSS variables and Tailwind tokens, never hard-coded values
- **Accessibility**: Ensure WCAG 2.1 AA compliance for all generated code
- **TypeScript**: Maintain type safety throughout

## Licensing

- **Non-commercial use**: Allowed under the terms of LICENSE
- **Commercial use**: Requires a paid license as defined in COMMERCIAL_LICENSE.md
- **Hosted/managed offerings**: Require a commercial license

See LICENSE and COMMERCIAL_LICENSE.md for full terms.
