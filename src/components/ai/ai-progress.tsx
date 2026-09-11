import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Progress for agentic work — which can be blocked or escalated, not just slow.
 *
 * The status vocabulary is the point. A generic progress bar cannot say
 * "this stopped and needs a human"; this one can, and must when that is true.
 */

type AIProgressStatus =
  | "idle" | "running" | "indeterminate" | "paused"
  | "complete" | "blocked" | "error" | "escalated"

const STATUS: Record<AIProgressStatus, { bar: string; label: string }> = {
  idle: { bar: "bg-muted-foreground/40", label: "Not started" },
  running: { bar: "bg-ai-accent", label: "Running" },
  indeterminate: { bar: "bg-ai-accent", label: "Working" },
  paused: { bar: "bg-muted-foreground", label: "Paused" },
  complete: { bar: "bg-ai-confidence-high", label: "Complete" },
  blocked: { bar: "bg-ai-signal", label: "Blocked" },
  error: { bar: "bg-destructive", label: "Failed" },
  escalated: { bar: "bg-ai-signal", label: "Escalated to a person" },
}

const trackVariants = cva("w-full overflow-hidden rounded-full bg-muted", {
  variants: {
    size: { thin: "h-0.5", sm: "h-1", md: "h-1.5", lg: "h-2.5" },
  },
  defaultVariants: { size: "md" },
})

export interface AIProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trackVariants> {
  /** 0–100. Omit for an indeterminate bar — never invent a number to fill the slot. */
  value?: number
  status?: AIProgressStatus
  label?: string
  currentStep?: string
  percentLabel?: boolean
}

const AIProgress = React.forwardRef<HTMLDivElement, AIProgressProps>(
  ({ className, size, value, status = "running", label, currentStep, percentLabel = false, ...props }, ref) => {
    const s = STATUS[status]
    const indeterminate = value === undefined || status === "indeterminate"
    const pct = indeterminate ? undefined : Math.min(100, Math.max(0, value))

    return (
      <div ref={ref} className={cn("w-full space-y-1.5", className)} {...props}>
        {(label || percentLabel || currentStep) && (
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="font-medium text-foreground">{label ?? s.label}</span>
            {percentLabel && pct !== undefined && (
              <span className="tabular-nums text-ai-muted">{pct}%</span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          // The status word is the accessible value when there is no number.
          aria-valuetext={pct === undefined ? s.label : `${pct}% — ${s.label}`}
          aria-label={label ?? s.label}
          className={cn(trackVariants({ size }))}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all",
              s.bar,
              indeterminate && "w-1/3 animate-pulse motion-reduce:animate-none"
            )}
            style={pct !== undefined ? { width: `${pct}%` } : undefined}
          />
        </div>
        {currentStep && <p className="text-xs text-ai-muted">{currentStep}</p>}
      </div>
    )
  }
)
AIProgress.displayName = "AIProgress"

export { AIProgress }
export type { AIProgressStatus }
