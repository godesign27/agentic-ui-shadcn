# Layout Directory

This directory contains **layout fragments** - reusable structural components for page layout.

## What Qualifies as a Layout Fragment

A layout fragment is a structural component that defines page or section layout. Layout fragments:

- Are composed from indexed components and standard HTML/CSS
- Define structural relationships (header, sidebar, main content, footer)
- Are reusable across multiple pages
- Do not contain business logic or data fetching
- Must be indexed in `components/COMPONENTS_INDEX.json` before use

## Layout Examples

Examples of valid layout fragments:
- Page container with max-width and padding
- Two-column layout with sidebar
- Header with navigation and user menu
- Footer with links and copyright
- Dashboard grid layout

## Adding a New Layout Fragment

1. **Create the layout file** in `src/components/layout/`:
   ```tsx
   // src/components/layout/page-container.tsx
   export function PageContainer({ children }) {
     return <div className="container mx-auto p-6">{children}</div>
   }
   ```

2. **Update the index**:
   - Run `npm run build:index` (if script supports layouts)
   - Or manually add to `components/COMPONENTS_INDEX.json`:
     ```json
     {
       "id": "layout:page-container",
       "name": "Page Container",
       "importPath": "@/components/layout/page-container",
       "files": ["src/components/layout/page-container.tsx"],
       "status": "allowed"
     }
     ```

3. **Update COMPONENTS_INDEX.md** to document the layout

4. **Verify**: Layout must be listed in `components/COMPONENTS_INDEX.json` before agents can use it

## Layout Rules

- ❌ Do not create layouts that duplicate shadcn/ui component functionality
- ❌ Do not create layouts that require external dependencies
- ✅ Use Tailwind utility classes for styling
- ✅ Keep layouts structural - no business logic
- ✅ Document usage and props in layout file

## Current Status

Currently, no layout fragments are indexed. Layouts must be added to this directory and indexed before use.

