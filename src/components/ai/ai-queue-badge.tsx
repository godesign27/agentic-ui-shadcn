import * as React from "react"
import { Clock, Loader2, Ban, ShieldQuestion, Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The state of one item in an agent's execution queue.
 *
 * Colour plus icon plus text, always all three — a queue a user cannot read
 * at a glance is not a queue, it is a list.
 */

type QueueStatus = "queued" | "running" | "blocked" | "needs-approval" | "complete"

const STATUS: Record<QueueStatus, { label: string; className: string; Icon: React.ComponentType<{ className?: string }> }> = {
  queued: { label: "Queued", className: "border-border bg-muted text-muted-foreground", Icon: Clock },
  running: { label: "Running", className: "border-ai-accent/40 bg-ai-surface text-ai-accent-active", Icon: Loader2 },
  blocked: { label: "Blocked", className: "border-destructive/40 bg-destructive/10 text-destructive", Icon: Ban },
  "needs-approval": { label: "Needs approval", className: "border-ai-signal-border bg-ai-signal-surface text-ai-signal", Icon: ShieldQuestion },
  complete: { label: "Complete", className: "border-ai-confidence-high/40 bg-ai-confidence-high/10 text-ai-confidence-high", Icon: Check },
}

export interface AIQueueBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: QueueStatus
  count?: number
  label?: string
}

const AIQueueBadge = React.forwardRef<HTMLSpanElement, AIQueueBadgeProps>(
  ({ className, status, count, label, ...props }, ref) => {
    const s = STATUS[status]
    const Icon = s.Icon
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
          s.className,
          className
        )}
        {...props}
      >
        <Icon className={cn("size-3", status === "running" && "animate-spin motion-reduce:animate-none")} aria-hidden />
        {label ?? s.label}
        {count !== undefined && (
          <span className="rounded-full bg-current/15 px-1.5 text-[10px] tabular-nums">{count}</span>
        )}
      </span>
    )
  }
)
AIQueueBadge.displayName = "AIQueueBadge"

export { AIQueueBadge }
export type { QueueStatus }
