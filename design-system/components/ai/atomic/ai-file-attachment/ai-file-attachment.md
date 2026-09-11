# AI File Attachment

**Version:** 1.2  
**Last Updated:** 2026-08-06  
**Owner:** Guild Design System — AI  
**Tier:** atomic (AI)  
**Repo module:** `aiFileAttachment`  
**Component type:** React atomic  
**Status:** Beta  
**Depends On:** `components/ai/tokens/ai-tokens.ts`, `components/ai/tokens/ai-typography.ts`, `components/ai/tokens/color.md`  
**Used By:** AI molecules / organisms / pages — see `components/ai/llms.txt`  

## Purpose

Selected-file chip for AI composers — name, type, status, remove. Does NOT own the picker, upload API, or validation.

AIFileAttachment is a compact atom for representing an already-selected file inside an AI input surface (ai-dialog, AI Command Center composer, AI Side Drawer composer, AI prompt input). It shows file name, file type, file-type icon, upload/loading state, processing state, unsupported/error state, and a remove control so the user can clear the attachment before sending the prompt. The atom does NOT own the file picker, drag-and-drop, upload API, max-file rules, or submit behavior — the parent composer owns those. File-type icons resolve in priority order: Guild/Guild icon first (when one exists in AIIcon's registry), then Lucide React fallback, then a generic file icon. Status drives visible text + color tone: progress (AI brand surface), warning (Guild orange), error (semantic error). Border-radius is 0 across all states per the DS atom flat-corner rule.

**Export:** `AIFileAttachment`

## Source (canonical implementation)

> Implementation lives in the **Guild AI Design System** package — co-located in this tree.

| Path | Role |
|------|------|
| `ai/atomic/file-attachment/AIFileAttachment.tsx` | Canonical React source (external / Make) |
| `components/ai/atomic/ai-file-attachment/ai-file-attachment.md` | This mirror spec |
| `components/ai/atomic/ai-file-attachment/ai-file-attachment.agent.json` | Agent manifest |
| `components/ai/atomic/ai-file-attachment/agentic-prompt.md` | Copy-paste prompt for doc site |

**Experience metadata:**

| Tier | Value |
|------|--------|
| Experience mode | AI Assisted · Adaptive · AI Led |
| AI behavior | Retrieve · Analyze · Summarize · Generate · Explain · Validate · Compare |
| Accountability | Source · Context · Permission state · File status · Error state · User control |

## When to use

- A user attaches a file to an AI prompt
- A composer needs to show one or more selected files
- A file is uploading, processing, unsupported, or failed
- The user needs to remove a file before submitting
- A file provides context for AI analysis, summarization, validation, comparison, or generation

## When not to use

- For full document preview — use or create a document-preview Group
- For file library browsing
- For source citations in AI output — use source chips or source-list patterns
- For generated artifacts after AI output — use artifact / output-card patterns
- For the upload picker itself — parent composer owns that
- For task attachments inside a detailed workflow if a richer attachment Group is needed

## Anatomy

1. **Container** _(Unique)_ — Inline-flex group — flat border, neutral surface; tone shifts to brand (progress), Guild orange (warning), or semantic error (failure).
2. **File type icon** _(Shared)_ — Lucide File / File / FileSpreadsheet / FileImage / RiFileCodeLine / RiFileZipLine / Presentation / Alert — replaced by a spinner when status drives one.
3. **File name** _(Unique)_ — Bold name with mid-string truncation that preserves the extension; full name surfaces via title + aria-label.
4. **RiFontSize2 badge** _(Shared)_ — Uppercase chip of the explicit fileType or inferred extension.
5. **Status line** _(Shared)_ — Optional text + thin progress bar (role="progressbar") + optional helper copy.
6. **Retry action** _(Shared)_ — Brand-outlined button — renders only when status="error" and onRetry is provided.
7. **Remove button** _(Unique)_ — 28×28 icon button with accessible label "Remove [fileName]" (or Cancel upload/processing while in-flight).

## State variations

- **Default** _(status="default")_ — Neutral container, icon + name + type badge + remove.
- **Compact** _(size="compact")_ — Tighter padding, 20px icon, shorter truncation — for narrow composers / multi-file rows.
- **Loading / Uploading** _(status="uploading")_ — Spinner replaces icon, brand surface tone, optional progress bar, Remove behaves as Cancel upload.
- **Processing** _(status="processing")_ — Spinner + brand surface; AI is extracting / reading file context.
- **Unsupported** _(status="unsupported")_ — Guild orange tone, warning icon, status text "File type not supported" — never relies on color alone.
- **Error** _(status="error")_ — Semantic error tone, warning icon, status text "Upload failed". Optional Retry button.
- **Selected / Focused** _(:focus-visible)_ — Native focus ring on the remove button — keyboard reachable.
- **Disabled** _(status="disabled")_ — Muted container, remove disabled; disabledReason surfaces as the button title for accessibility.
- **Removing** _(status="removing")_ — Spinner replaces icon, "Removing…" status; remove control disabled.
- **File too large** _(status="fileTooLarge")_ — Guild orange tone, status "File is too large"; remove remains visible.
- **Permission restricted** _(status="permissionRestricted")_ — Guild orange tone, status "File access restricted".
- **Virus scan pending** _(status="virusScanPending")_ — Brand surface, spinner, "Scanning…".
- **Virus scan failed** _(status="virusScanFailed")_ — Semantic error tone, "File failed security scan".
- **Icon Types — Documents** _(PDF · DOCX · TXT)_ — Documents group — Lucide File icon mapping.
- **Icon Types — Spreadsheets** _(XLSX · CSV)_ — Spreadsheets — Lucide FileSpreadsheet.
- **Icon Types — Presentations** _(PPTX)_ — Presentations — Lucide Presentation.
- **Icon Types — Images** _(PNG · JPG · SVG)_ — Images — Lucide FileImage.
- **Icon Types — Code** _(HTML · JSON · MD)_ — Web / code — Lucide RiFileCodeLine.
- **Icon Types — Archives** _(ZIP)_ — Archives — Lucide RiFileZipLine.
- **Icon Types — Generic** _(unknown / unsupported)_ — Generic Lucide File icon; unsupported swaps to Alert.

## Props API

| Prop | RiFontSize2 | Default | Description |
| --- | --- | --- | --- |
| `fileName` | `string` | `—` | REQUIRED. Visible name (include extension where possible). Surfaces as title + aria-label when truncated. |
| `fileType` | `string` | `—` | Explicit type label (e.g. "DOCX"). Wins over extension inference. |
| `fileCategory` | `AIFileCategory` | `inferred` | Explicit category override. Inferred from fileType/extension when omitted. |
| `fileSize` | `string` | `—` | Pre-formatted size string. Atom does not format byte values. |
| `status` | `AIFileAttachmentStatus` | `'default'` | default · uploading · processing · unsupported · error · disabled · removing · fileTooLarge · permissionRestricted · virusScanPending · virusScanFailed. |
| `size` | `'compact' \| 'standard'` | `'standard'` | Compact = 20px icon + tighter padding; standard = 24px icon, roomy. |
| `progress` | `number (0–100)` | `—` | Renders a thin progress bar when status is uploading / processing / virus-scan-pending. |
| `errorMessage` | `string` | `—` | Overrides the default status text when status="error". |
| `helperText` | `string` | `—` | Optional helper line under status (e.g. supported formats in unsupported state). |
| `disabledReason` | `string` | `—` | Surfaces as the remove-button title attribute when status="disabled". |
| `showFileType` | `boolean` | `true` | Show the uppercase type badge. |
| `showFileSize` | `boolean` | `auto` | Defaults to true when fileSize is provided. |
| `onRemove` | `() => void` | `—` | Click handler for the remove control. Button only renders when provided. |
| `onRetry` | `() => void` | `—` | Click handler for Retry. Button only renders when status="error". |

## Tokens

### Container — tone by status
| Token | Value | Usage |
| --- | --- | --- |
| `ai-file-attachment.container.bg.neutral` | `var(--ai-card-bg)` | Default / disabled / removing surface |
| `ai-file-attachment.container.border.neutral` | `var(--ai-card-border)` | Default / disabled / removing border |
| `ai-file-attachment.container.bg.progress` | `var(--ai-brand-surface)` | uploading / processing / virusScanPending |
| `ai-file-attachment.container.border.progress` | `var(--ai-brand-border)` | uploading / processing / virusScanPending |
| `ai-file-attachment.container.bg.warning` | `SIGNAL_ORANGE[00] #FFF5E1` | unsupported / fileTooLarge / permissionRestricted |
| `ai-file-attachment.container.border.warning` | `SIGNAL_ORANGE[30] #F5C56C` | warning border |
| `ai-file-attachment.container.bg.error` | `var(--ai-status-error-bg, #FFEDE9)` | error / virusScanFailed |
| `ai-file-attachment.container.border.error` | `var(--ai-status-error-border, #F5C6C6)` | error border |

### Text & icon
| Token | Value | Usage |
| --- | --- | --- |
| `ai-file-attachment.text.name` | `DS.textDefault #2F2C3C` | File name — 13px (standard) / 12px (compact), weight 600 |
| `ai-file-attachment.text.meta` | `DS.textHelper #5B5864` | RiFontSize2 badge label, file size, helper text |
| `ai-file-attachment.text.progress` | `AI.color.action.primary #4D60E6` | Status text during uploading / processing |
| `ai-file-attachment.text.warning` | `SIGNAL_ORANGE[80] #A54F00` | Status text for unsupported / file-too-large / permission |
| `ai-file-attachment.text.error` | `var(--ai-status-error-text, #B21111)` | Status text for error / virus-scan-failed |
| `ai-file-attachment.icon.default` | `DS.textDefault #2F2C3C` | File-type icon color in neutral / progress states |
| `ai-file-attachment.icon.warning` | `SIGNAL_ORANGE[80]` | Alert icon in warning + error tones |

### RiFontSize2 badge
| Token | Value | Usage |
| --- | --- | --- |
| `ai-file-attachment.badge.bg` | `var(--ai-track-bg)` | RiFontSize2-badge surface |
| `ai-file-attachment.badge.border` | `var(--ai-card-border)` | RiFontSize2-badge border |
| `ai-file-attachment.badge.text` | `DS.textHelper #5B5864` | RiFontSize2-badge label — uppercase |

### Actions
| Token | Value | Usage |
| --- | --- | --- |
| `ai-file-attachment.retry.border` | `AI.color.action.primary #4D60E6` | Brand-outlined Retry button — only on status="error" |
| `ai-file-attachment.retry.bg.hover` | `var(--ai-brand-surface)` | Retry hover fill |
| `ai-file-attachment.remove.size` | `28×28 px` | Touch target for the remove icon button |
| `ai-file-attachment.remove.bg.hover` | `var(--ai-track-bg)` | Remove hover fill |

### Geometry
| Token | Value | Usage |
| --- | --- | --- |
| `ai-file-attachment.icon.compact` | `20px` | Icon size in size="compact" |
| `ai-file-attachment.icon.standard` | `24px` | Icon size in size="standard" |
| `ai-file-attachment.radius` | `AI.radius.xs (6px)` | Container, badge, retry button, remove button, progress bar — AI-brand xs corner radius |
| `ai-file-attachment.progress.height` | `3px` | Thin progress bar; max-width 140px |

## Flows

### Attach + send happy path
User picks a file, sees it uploading, then ready, then sends the prompt.
- Parent composer selects file → renders <AIFileAttachment fileName=… status="uploading" progress={n} onRemove={cancel} />
- Atom shows spinner + brand surface tone + progress bar + "Uploading…"
- Upload finishes → parent re-renders with status="default" (icon swaps from spinner back to category icon)
- User submits the prompt; parent composer reads the attached file id

### Reject unsupported
Parent validates type and surfaces unsupported state.
- Parent rejects file extension against its allowlist
- Render <AIFileAttachment status="unsupported" helperText="Try PDF, DOCX, XLSX, CSV, TXT, PNG, or JPG." />
- Atom switches to Guild orange tone + warning icon + status text "File type not supported"
- Submit button on parent composer stays disabled until user removes the attachment

### Upload fails → retry
Atom surfaces an error and exposes Retry only when the parent supports it.
- Upload API errors
- Render <AIFileAttachment status="error" onRetry={retryUpload} onRemove={removeAttachment} />
- Atom shows error tone + Alert + "Upload failed" + brand-outlined Retry + remove
- RiUserLine clicks Retry → parent re-attempts upload, swaps status back to "uploading"

## Canonical implementation

```tsx
import { AIFileAttachment } from '@/components/ai/atomic/file-attachment/AIFileAttachment';

// Default — ready to send
<AIFileAttachment
  fileName="AI_Agent_Task_Tracker_Formal_Claims_1.docx"
  onRemove={() => removeAttachment(id)}
/>

// Compact in a multi-file row
<AIFileAttachment
  fileName="ai-agent-task-tracker2.html"
  size="compact"
  onRemove={() => removeAttachment(id)}
/>

// Uploading with progress
<AIFileAttachment
  fileName="AI_Agent_Task_Tracker_Formal_Claims_1.docx"
  status="uploading"
  progress={62}
  onRemove={() => cancelUpload(id)}
/>

// Processing (post-upload extraction)
<AIFileAttachment
  fileName="territory_alignment_q2.xlsx"
  status="processing"
  progress={40}
  onRemove={() => removeAttachment(id)}
/>

// Unsupported
<AIFileAttachment
  fileName="archive.exe"
  fileType="EXE"
  status="unsupported"
  helperText="Try PDF, DOCX, XLSX, CSV, TXT, PNG, or JPG."
  onRemove={() => removeAttachment(id)}
/>

// Error with retry
<AIFileAttachment
  fileName="large_roster_export.csv"
  status="error"
  onRetry={() => retryUpload(id)}
  onRemove={() => removeAttachment(id)}
/>

// File too large
<AIFileAttachment
  fileName="call_plan_history.xlsx"
  status="fileTooLarge"
  onRemove={() => removeAttachment(id)}
/>

// Disabled (with accessible reason)
<AIFileAttachment
  fileName="restricted_roster.xlsx"
  status="disabled"
  disabledReason="Locked by another reviewer"
  onRemove={() => removeAttachment(id)}
/>
```

## Agent rules

1. Read this mirror spec and `ai-file-attachment.agent.json` before implementing.
2. Do not hardcode brand hex — use documented AI/DS tokens from `ai-tokens.ts`.
3. Do not invent dependency atomics — fetch canonical implementations from mirror specs.
4. Prefer token references (`AI.color.*`, `DATAVIZ`, CSS vars) over literal hex unless the spec mandates fixed fills (e.g. AI Avatar).

Full agent contract: `components/ai/atomic/ai-file-attachment/ai-file-attachment.agent.json`.

## Related Components

- `components/ai/llms.txt` — AI component index
- `components/ai/registry.v1.2.json` — Make registry V1.2
- `components/agent-instructions.md` — agent reading order
