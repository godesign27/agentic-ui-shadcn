import * as React from "react"
import { ArrowRight, UserRound, Bot, Cpu, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Who just took ownership of the work.
 *
 * Handoffs are the moments accountability changes hands. Showing them is how
 * a user knows whether a person or a machine is currently responsible.
 */

type HandoffDirection = "agent-to-agent" | "agent-to-human" | "human-to-agent" | "system-to-agent" | "failed"

const DIRECTION: Record<HandoffDirection, {
  From: React.ComponentType<{ className?: string }>
  To: React.ComponentType<{ className?: string }>
  className: string
}> = {
  "agent-to-agent": { From: Bot, To: Bot, className: "border-ai-surface-border bg-ai-surface text-ai-accent-active" },
  "agent-to-human": { From: Bot, To: UserRound, className: "border-ai-signal-border bg-ai-signal-surface text-ai-signal" },
  "human-to-agent": { From: UserRound, To: Bot, className: "border-ai-surface-border bg-ai-surface text-ai-accent-active" },
  "system-to-agent": { From: Cpu, To: Bot, className: "border-border bg-muted text-muted-foreground" },
  failed: { From: Bot, To: AlertTriangle, className: "border-destructive/40 bg-destructive/10 text-destructive" },
}

export interface AIChipHandoffProps extends React.HTMLAttributes<HTMLSpanElement> {
  direction: HandoffDirection
  fromLabel: string
  toLabel: string
  size?: "sm" | "md"
}

const AIChipHandoff = React.forwardRef<HTMLSpanElement, AIChipHandoffProps>(
  ({ className, direction, fromLabel, toLabel, size = "md", ...props }, ref) => {
    const d = DIRECTION[direction]
    const { From, To } = d
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-semibold",
          d.className,
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
          className
        )}
        {...props}
      >
        <From className="size-3" aria-hidden />
        {fromLabel}
        <ArrowRight className="size-3 opacity-60" aria-hidden />
        <To className="size-3" aria-hidden />
        {toLabel}
        <span className="sr-only">
          {direction === "failed" ? " — handoff failed" : " — handed off"}
        </span>
      </span>
    )
  }
)
AIChipHandoff.displayName = "AIChipHandoff"

export { AIChipHandoff }
export type { HandoffDirection }
