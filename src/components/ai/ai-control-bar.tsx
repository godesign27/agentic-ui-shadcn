import * as React from "react"

import { cn } from "@/lib/utils"
import { AIButton } from "@/components/ai/ai-button"

/**
 * Execution controls for a running agent workstream.
 *
 * The presence of a pause and a cancel is what makes AI Led mode acceptable:
 * the human can always stop the machine. Cancel is two-step by design.
 */

type ControlBarState = "running" | "paused" | "redirect-available" | "cancel-confirm" | "saved-progress"

export interface AIControlBarProps extends React.HTMLAttributes<HTMLDivElement> {
  state: ControlBarState
  label?: string
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
  onRedirect?: () => void
  onCancelConfirm?: () => void
}

const AIControlBar = React.forwardRef<HTMLDivElement, AIControlBarProps>(
  ({ className, state, label, onPause, onResume, onCancel, onRedirect, onCancelConfirm, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-label="Workstream controls"
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-lg border border-ai-surface-border bg-ai-surface px-3 py-2",
        className
      )}
      {...props}
    >
      {label && <span className="mr-auto text-xs font-medium text-ai-muted">{label}</span>}

      {state === "running" && (
        <>
          <AIButton variant="secondary" size="sm" label="Pause" onClick={onPause} />
          <AIButton variant="tertiary" size="sm" label="Cancel" onClick={onCancel} />
        </>
      )}

      {state === "paused" && (
        <>
          <AIButton variant="primary" size="sm" label="Resume" onClick={onResume} />
          <AIButton variant="tertiary" size="sm" label="Cancel" onClick={onCancel} />
        </>
      )}

      {state === "redirect-available" && (
        <>
          <AIButton variant="secondary" size="sm" label="Redirect" onClick={onRedirect} />
          <AIButton variant="tertiary" size="sm" label="Keep running" onClick={onResume} />
        </>
      )}

      {state === "cancel-confirm" && (
        <>
          <span role="status" className="mr-auto text-xs font-semibold text-ai-signal">
            Cancel this workstream? Progress so far is kept.
          </span>
          <AIButton variant="secondary" size="sm" label="Yes, cancel" onClick={onCancelConfirm} />
          <AIButton variant="tertiary" size="sm" label="Keep running" onClick={onResume} />
        </>
      )}

      {state === "saved-progress" && (
        <>
          <span role="status" className="mr-auto text-xs font-medium text-ai-muted">
            Progress saved.
          </span>
          <AIButton variant="secondary" size="sm" label="Resume" onClick={onResume} />
        </>
      )}
    </div>
  )
)
AIControlBar.displayName = "AIControlBar"

export { AIControlBar }
export type { ControlBarState }
