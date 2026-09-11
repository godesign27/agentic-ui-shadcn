import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Whether an agent task brief is ready to run.
 *
 * "waiting-approval" is the state that matters: it is where a human still
 * has to say yes. It is styled with the signal colour for that reason.
 */

const aiChipBriefVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-semibold",
  {
    variants: {
      status: {
        default: "border-border bg-muted text-muted-foreground",
        ready: "border-ai-confidence-high/40 bg-ai-confidence-high/10 text-ai-confidence-high",
        missing: "border-destructive/40 bg-destructive/10 text-destructive",
        edited: "border-ai-accent/40 bg-ai-surface text-ai-accent-active",
        "waiting-approval": "border-ai-signal-border bg-ai-signal-surface text-ai-signal",
        running: "border-ai-accent/40 bg-ai-surface text-ai-accent-active",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { status: "default", size: "md" },
  }
)

const STATUS_TEXT: Record<string, string> = {
  default: "Draft",
  ready: "Ready",
  missing: "Missing information",
  edited: "Edited",
  "waiting-approval": "Waiting for approval",
  running: "Running",
}

export interface AIChipBriefProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof aiChipBriefVariants> {
  label: string
}

const AIChipBrief = React.forwardRef<HTMLSpanElement, AIChipBriefProps>(
  ({ className, status = "default", size, label, ...props }, ref) => (
    <span ref={ref} className={cn(aiChipBriefVariants({ status, size }), className)} {...props}>
      {label}
      {/* The status word is never conveyed by colour alone. */}
      <span className="sr-only"> — {STATUS_TEXT[status ?? "default"]}</span>
      <span aria-hidden className="opacity-70">
        · {STATUS_TEXT[status ?? "default"]}
      </span>
    </span>
  )
)
AIChipBrief.displayName = "AIChipBrief"

export { AIChipBrief, aiChipBriefVariants }
