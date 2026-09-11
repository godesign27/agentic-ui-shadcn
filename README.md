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
8. **[`design-system/components/agent-instructions.md`](design-system/components/agent-instructions.md)** - How to read a component spec, and what wins on conflict

The machine-readable mirror of all of the above lives in [`design-system/`](design-system/). Start an automated read flow at [`design-system/agents/context-loading.json`](design-system/agents/context-loading.json), which names everything to load and in what order.

### Every component has a contract

Each of the 69 components has a four-file spec folder under `design-system/components/{namespace}/{name}/`:

| File | What it answers | When to read it |
|---|---|---|
| `agentic-prompt.md` | What is this, and what must I not get wrong? | First, or paste it into a fresh agent session |
| `{name}.agent.json` | What exactly may I type? | **Before writing markup** |
| `{name}.md` | How do I use it well? | Before styling |
| `{name}.preview.html` | What does it actually look like? | When verifying |

Browse them all at [`design-system/components/preview/index.html`](design-system/components/preview/index.html).

### Two namespaces

| Namespace | Import | Use for |
|---|---|---|
| `ui:*` | `@/components/ui/{name}` | All standard product UI (45 components) |
| `ai:*` | `@/components/ai/{name}` | **Only** AI-generated or agent-driven surfaces (24 components) |

`ai:*` components carry signals — the AI accent, the soft surface, the attribution header — that tell a user *a machine produced this*. Using them on human-authored UI is a lie told in CSS; using `ui:*` for AI output hides authorship. Both are violations.

Every `ai:*` component declares, and the schema requires, how much autonomy it grants the machine and what accountability it therefore owes:

```json
"experienceMetadata": {
  "experienceMode": ["AI Assisted", "AI Led"],
  "aiBehavior": ["Suggest", "Confirm", "Apply", "Approve"],
  "accountability": ["Attribution", "Approval", "Audit trail"],
  "humanGestureRequired": true,
  "reversible": "conditional"
}
```

Start AI work at [`design-system/components/ai/llms.txt`](design-system/components/ai/llms.txt).

### Keeping it honest

```bash
npm run ds:build      # regenerate every spec from source + curated metadata
npm run ds:check      # fail if specs have drifted from the code (CI)
npm run ds:validate   # check the contract's own invariants (CI)
```

`ds:validate` enforces that autonomy and accountability escalate together: a component declaring `Apply` or `Approve` must require a human gesture and carry the `Approval` obligation, and an irreversible `Apply` must carry an audit trail.

### Key Constraints

- **Composition over invention**: Use only components listed in `COMPONENTS_INDEX.md`
- **No hallucinated components**: Do not create components outside shadcn/ui + allowed patterns
- **Token compliance**: Use CSS variables and Tailwind tokens, not hard-coded values
- **Accessibility first**: All code must meet WCAG 2.1 AA minimum

## Authorized UI Fragments

The following directories contain authorized UI components:

- `src/components/ui/*` - shadcn/ui base components (45)
- `src/components/ai/*` - AI-native components (24) — AI surfaces only
- `src/components/patterns/*` - Curated composition patterns (if present)
- `src/components/layout/*` - Layout components (if present)

See [`COMPONENTS_INDEX.md`](components/COMPONENTS_INDEX.md) for the complete list, generated from source.

## Project Structure

```
agentic-ui-shadcn/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui base components (45)
│   │   ├── ai/              # AI-native components (24)
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
