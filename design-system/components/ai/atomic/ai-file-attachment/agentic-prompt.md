# Agentic Prompt — AI File Attachment

You are implementing the **AI File Attachment** (`ai-file-attachment`) from the ZAIDYN AI Design System mirror.

| | |
|---|---|
| **Component** | AI File Attachment (`ai-file-attachment`) |
| **Status** | Beta |
| **Category** | AI atomic |
| **Source** | Make export 2026-08-06 |

> Selected-file chip for AI composers — name, type, status, remove. Does NOT own the picker, upload API, or validation.

## Mandatory read order (before writing code)

1. `components/agent-instructions.md` — AI-native UI section
2. `components/ai/llms.txt`
3. `components/ai/atomic/ai-file-attachment/ai-file-attachment.agent.json`
4. `components/ai/atomic/ai-file-attachment/ai-file-attachment.md` — **read anatomy, tokens, and canonical implementation**
5. `components/ai/tokens/ai-tokens.ts` and `components/ai/tokens/ai-typography.ts`

## Task

Implement `AIFileAttachment` exactly as specified in the mirror. Match props, tokens, and states. Prefer `AI.color.*` / CSS custom properties over literal hex unless the mirror mandates fixed fills.

## Props (summary)

- `fileName` (`string`) default ``—`` — REQUIRED. Visible name (include extension where possible). Surfaces as title + aria-label when truncated.
- `fileType` (`string`) default ``—`` — Explicit type label (e.g. "DOCX"). Wins over extension inference.
- `fileCategory` (`AIFileCategory`) default ``inferred`` — Explicit category override. Inferred from fileType/extension when omitted.
- `fileSize` (`string`) default ``—`` — Pre-formatted size string. Atom does not format byte values.
- `status` (`AIFileAttachmentStatus`) default ``'default'`` — default · uploading · processing · unsupported · error · disabled · removing · fileTooLarge · permissionRestricted · virusScanPending · virusScanFailed.
- `size` (`'compact' \) default `'standard'`` — `'standard'`
- `progress` (`number (0–100)`) default ``—`` — Renders a thin progress bar when status is uploading / processing / virus-scan-pending.
- `errorMessage` (`string`) default ``—`` — Overrides the default status text when status="error".
- `helperText` (`string`) default ``—`` — Optional helper line under status (e.g. supported formats in unsupported state).
- `disabledReason` (`string`) default ``—`` — Surfaces as the remove-button title attribute when status="disabled".
- `showFileType` (`boolean`) default ``true`` — Show the uppercase type badge.
- `showFileSize` (`boolean`) default ``auto`` — Defaults to true when fileSize is provided.
- `onRemove` (`() => void`) default ``—`` — Click handler for the remove control. Button only renders when provided.
- `onRetry` (`() => void`) default ``—`` — Click handler for Retry. Button only renders when status="error".

## Rules

- Do not invent variants or props beyond the mirror.
- Do not hardcode brand hex — use documented tokens.
- Preserve accessibility notes from the mirror / agent.json.
