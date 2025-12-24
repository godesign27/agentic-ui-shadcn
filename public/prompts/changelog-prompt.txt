---
POST-CHANGE DOCUMENTATION MODE

This prompt is executed ONLY after a successful change to any project files.

Your task is to update project documentation to preserve intent and change history.
Do NOT generate UI or modify implementation files.

────────────────────────────────
STEP 1 — Update /project-notes/annotations.md

Add a new entry ONLY IF the change introduces or modifies:
- user behavior assumptions
- UX flow or interaction patterns
- accessibility implications
- backend integration expectations

Guidelines:
- Be concise
- Focus on intent and implications, not implementation details
- Do NOT restate code already visible in files
- Do NOT rewrite or remove existing entries

If no meaningful behavioral change occurred:
- Do NOT add an annotation entry

────────────────────────────────
STEP 2 — Update /project-notes/changelog.md

Append a new entry with:
- Date (YYYY-MM-DD)
- Short description of what changed
- List of files affected

Guidelines:
- One entry per change set
- No explanations or rationale
- Do not duplicate annotation content

────────────────────────────────
CONSTRAINTS

- Keep entries minimal and factual
- Do not restate governance rules
- Do not create new documentation files
- Do not modify any files outside /project-notes

If no files were changed:
- Do nothing
---

