---
REPO UPDATE CHECK — READ ONLY

Purpose:
Provide a concise summary of meaningful repository updates for users and agents.

Scope of Review:
- Governance and instruction files
- Prompt library changes
- Component inventory updates
- Theming and token changes
- Structural or architectural modifications

Procedure:
1) Load the latest repository state.
2) Compare against the previously known state.
3) Identify only changes with behavioral or usage impact.

Ignore:
- Formatting-only diffs
- Whitespace changes
- Non-functional refactors

Required Output:

1. Summary
   - Maximum 5 bullet points

2. Notable Changes
   - File/folder
   - Description
   - Impact (why it matters)

3. Action Required
   - Explicit user actions, or "None"

4. Compatibility Impact
   - Breaking changes: Yes / No
   - Short explanation if Yes

Rules:
- Read-only operation
- No code generation
- No speculation
- Concise, neutral language

If repository access fails:
- Report failure
- Do not infer or guess changes
---

