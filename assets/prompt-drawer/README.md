# Prompt Drawer

A right-side drawer UI for browsing and copying prompts from the Agentic AI UI Control System.

## How to Add to Your Project

Add these two lines to your HTML page:

```html
<link rel="stylesheet" href="/assets/prompt-drawer/prompt-drawer.css">
<script type="module" src="/assets/prompt-drawer/prompt-drawer.js"></script>
```

## Usage

**Hotkey**: Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux) to open/close the drawer.

**Manual opening**: Call `openPromptDrawer()` from JavaScript, or add a button:

```html
<button onclick="openPromptDrawer()">Open Prompt Library</button>
```

The drawer will automatically load prompts from `/prompts/PROMPTS_INDEX.json` and display them grouped by category.

## Features

- Right-side drawer overlay
- Keyboard shortcuts (Cmd/Ctrl+L to toggle, ESC to close)
- Focus trap when open
- Grouped prompt list by category
- Prompt content viewer with copy button
- Accessible (ARIA labels, keyboard navigation, focus management)

## Requirements

- Must be served via a web server (file:// protocol will not work due to fetch restrictions)
- Requires `/prompts/PROMPTS_INDEX.json` to exist
- No external dependencies

