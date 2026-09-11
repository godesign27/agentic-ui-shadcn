import * as React from "react"
import { Send } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The composer. Where the human writes to the machine.
 *
 * Two shapes: AIInputCard, the full card with a toolbar slot, and AIDialogSlim,
 * a single-line pill for constrained surfaces. ai:ai-dialog-button is built to
 * sit in the toolbar slot.
 *
 * The submit control is always present and always labelled. Enter submits;
 * Shift+Enter inserts a newline — the convention users already expect, and
 * getting it backwards traps people mid-sentence.
 */

interface ComposerBase {
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** Set while a response is generating. Suppresses submit without hiding it. */
  busy?: boolean
  submitLabel?: string
}

function useComposer({ value, onValueChange, onSubmit, busy, disabled }: ComposerBase) {
  const [internal, setInternal] = React.useState("")
  const current = value ?? internal

  const set = (next: string) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  const canSubmit = current.trim().length > 0 && !busy && !disabled

  const submit = () => {
    if (!canSubmit) return
    onSubmit?.(current.trim())
    if (value === undefined) setInternal("")
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Shift+Enter is a newline. Plain Enter sends.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return { current, set, submit, canSubmit, onKeyDown }
}

export interface AIInputCardProps
  extends ComposerBase,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Toolbar controls. Use ai:ai-dialog-button for each. */
  toolbar?: React.ReactNode
  /** Suggested prompts shown above the field. Use ai:ai-chip-quick. */
  suggestions?: React.ReactNode
  rows?: number
  label?: string
}

const AIInputCard = React.forwardRef<HTMLDivElement, AIInputCardProps>(
  (
    { className, toolbar, suggestions, rows = 3, label = "Message the assistant",
      placeholder = "Ask anything…", submitLabel = "Send message",
      value, onValueChange, onSubmit, disabled, busy, ...props },
    ref
  ) => {
    const c = useComposer({ value, onValueChange, onSubmit, busy, disabled })
    const fieldId = React.useId()

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-ai-surface-border bg-card shadow-sm focus-within:ring-2 focus-within:ring-ai-accent focus-within:ring-offset-2",
          className
        )}
        {...props}
      >
        {suggestions && <div className="flex flex-wrap gap-2 px-4 pt-4">{suggestions}</div>}

        <label htmlFor={fieldId} className="sr-only">{label}</label>
        <textarea
          id={fieldId}
          rows={rows}
          value={c.current}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => c.set(e.target.value)}
          onKeyDown={c.onKeyDown}
          className="w-full resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-ai-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex items-center justify-between gap-2 px-3 pb-3">
          <div className="flex items-center gap-1">{toolbar}</div>
          <button
            type="button"
            onClick={c.submit}
            disabled={!c.canSubmit}
            aria-label={submitLabel}
            className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-ai-accent to-ai-accent-strong text-ai-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:opacity-40"
          >
            <Send className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    )
  }
)
AIInputCard.displayName = "AIInputCard"

export interface AIDialogSlimProps
  extends ComposerBase,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  label?: string
}

const AIDialogSlim = React.forwardRef<HTMLDivElement, AIDialogSlimProps>(
  (
    { className, label = "Message the assistant", placeholder = "Ask anything…",
      submitLabel = "Send message", value, onValueChange, onSubmit, disabled, busy, ...props },
    ref
  ) => {
    const c = useComposer({ value, onValueChange, onSubmit, busy, disabled })
    const fieldId = React.useId()

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-full border border-ai-surface-border bg-card py-1 pl-4 pr-1 shadow-sm focus-within:ring-2 focus-within:ring-ai-accent focus-within:ring-offset-2",
          className
        )}
        {...props}
      >
        <label htmlFor={fieldId} className="sr-only">{label}</label>
        <input
          id={fieldId}
          type="text"
          value={c.current}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => c.set(e.target.value)}
          onKeyDown={c.onKeyDown}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-ai-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="button"
          onClick={c.submit}
          disabled={!c.canSubmit}
          aria-label={submitLabel}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ai-accent to-ai-accent-strong text-ai-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:opacity-40"
        >
          <Send className="size-4" aria-hidden />
        </button>
      </div>
    )
  }
)
AIDialogSlim.displayName = "AIDialogSlim"

export { AIInputCard, AIDialogSlim }
