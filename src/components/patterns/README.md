# Patterns Directory

This directory contains **curated composition patterns** built from shadcn/ui components.

## What Qualifies as a Pattern

A pattern is a reusable composition of shadcn/ui components that solves a common UI problem. Patterns:

- Are composed entirely from indexed components in `COMPONENTS_INDEX.md`
- Do not introduce new UI primitives or components
- Are reusable across multiple pages or features
- Solve a specific, well-defined UI problem
- Must be indexed in `components/COMPONENTS_INDEX.json` before use

## Pattern Examples

Examples of valid patterns:
- Form field with label, input, error message, and helper text
- Card with header, content, and action footer
- Search bar with input and filter dropdown
- Data table with sorting and pagination controls
- Navigation menu with active state management

## Adding a New Pattern

1. **Create the pattern file** in `src/components/patterns/`:
   ```tsx
   // src/components/patterns/form-field.tsx
   import { Input } from '@/components/ui/input'
   import { Label } from '@/components/ui/label' // if available
   // ... compose from indexed components
   ```

2. **Update the index**:
   - Run `npm run build:index` (if script supports patterns)
   - Or manually add to `components/COMPONENTS_INDEX.json`:
     ```json
     {
       "id": "pattern:form-field",
       "name": "Form Field",
       "importPath": "@/components/patterns/form-field",
       "files": ["src/components/patterns/form-field.tsx"],
       "status": "allowed"
     }
     ```

3. **Update COMPONENTS_INDEX.md** to document the pattern

4. **Verify**: Pattern must be listed in `components/COMPONENTS_INDEX.json` before agents can use it

## Pattern Rules

- ❌ Do not create patterns that duplicate shadcn/ui component functionality
- ❌ Do not create patterns that require external dependencies
- ✅ Compose from indexed components only
- ✅ Keep patterns "thin" - they should be compositions, not new primitives
- ✅ Document usage and props in pattern file

## Current Status

Currently, no patterns are indexed. Patterns must be added to this directory and indexed before use.

