import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * What the agent is doing, disclosed without exposing raw reasoning.
 *
 * Collapsed by default on purpose: the user opts into detail rather than
 * having a monologue pushed at them. What is shown must be true — this is a
 * disclosure surface, not a progress theatre.
 */

type WorkNoteStatus =
  | "idle" | "active" | "planning" | "checkingContext"
  | "searching" | "routing" | "validating" | "complete"

const STATUS_LABEL: Record<WorkNoteStatus, string> = {
  idle: "Waiting",
  active: "Working",
  planning: "Planning the approach",
  checkingContext: "Checking context",
  searching: "Searching",
  routing: "Routing to a specialist",
  validating: "Validating the result",
  complete: "Done",
}

export interface AIAgentWorkNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: WorkNoteStatus
  label?: string
  content?: string
  items?: string[]
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (value: boolean) => void
}

const AIAgentWorkNote = React.forwardRef<HTMLDivElement, AIAgentWorkNoteProps>(
  (
    { className, status = "idle", label, content, items, defaultExpanded = false, expanded, onExpandedChange, ...props },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultExpanded)
    const isOpen = expanded ?? internal
    const contentId = React.useId()
    const hasBody = Boolean(content || items?.length)

    const toggle = () => {
      const next = !isOpen
      if (expanded === undefined) setInternal(next)
      onExpandedChange?.(next)
    }

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-ai-surface-border bg-ai-surface px-3 py-2", className)}
        {...props}
      >
        <button
          type="button"
          onClick={toggle}
          disabled={!hasBody}
          aria-expanded={hasBody ? isOpen : undefined}
          aria-controls={hasBody ? contentId : undefined}
          className="flex w-full items-center gap-1.5 text-left text-xs font-medium text-ai-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:cursor-default disabled:hover:text-ai-muted"
        >
          {hasBody && (
            <ChevronRight
              className={cn("size-3.5 transition-transform", isOpen && "rotate-90")}
              aria-hidden
            />
          )}
          <span>{label ?? STATUS_LABEL[status]}</span>
        </button>

        {hasBody && isOpen && (
          <div id={contentId} className="mt-2 space-y-2 text-xs leading-5 text-ai-muted">
            {content && <p>{content}</p>}
            {items?.length ? (
              <ol className="list-decimal space-y-1 pl-4">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)
AIAgentWorkNote.displayName = "AIAgentWorkNote"

export { AIAgentWorkNote }
export type { WorkNoteStatus }
