import * as React from "react"

import { cn } from "@/lib/utils"
import { BotAvatar } from "@/components/ai/ai-avatar"

/**
 * Several agents working in parallel, with their execution state on the ring.
 *
 * The ring colour is a summary, not the record — the accessible name of each
 * avatar carries the agent name and its status as text.
 */

type AgentStatus = "running" | "waiting" | "blocked" | "complete" | "idle"

const RING: Record<AgentStatus, string> = {
  running: "ring-ai-accent",
  waiting: "ring-ai-signal",
  blocked: "ring-destructive",
  complete: "ring-ai-confidence-high",
  idle: "ring-border",
}

const STATUS_TEXT: Record<AgentStatus, string> = {
  running: "running",
  waiting: "waiting for approval",
  blocked: "blocked",
  complete: "complete",
  idle: "idle",
}

export interface Agent {
  id: string
  label: string
  status: AgentStatus
}

export interface AIAgentStackProps extends React.HTMLAttributes<HTMLDivElement> {
  agents: Agent[]
  maxVisible?: number
  size?: number
}

const AIAgentStack = React.forwardRef<HTMLDivElement, AIAgentStackProps>(
  ({ className, agents, maxVisible = 3, size = 28, ...props }, ref) => {
    const visible = agents.slice(0, maxVisible)
    const overflow = agents.length - visible.length
    return (
      <div
        ref={ref}
        role="group"
        aria-label={`${agents.length} agents`}
        className={cn("flex items-center", className)}
        {...props}
      >
        {visible.map((a, i) => (
          <span
            key={a.id}
            className={cn(
              "inline-flex rounded-full bg-background ring-2 ring-offset-2 ring-offset-background",
              RING[a.status]
            )}
            style={{ marginLeft: i === 0 ? 0 : -size / 3 }}
          >
            <BotAvatar size={size} label={`${a.label} — ${STATUS_TEXT[a.status]}`} />
          </span>
        ))}
        {overflow > 0 && (
          <span
            className="inline-flex items-center justify-center rounded-full border border-border bg-muted text-[11px] font-semibold text-muted-foreground"
            style={{ width: size, height: size, marginLeft: -size / 3 }}
          >
            +{overflow}
          </span>
        )}
      </div>
    )
  }
)
AIAgentStack.displayName = "AIAgentStack"

export { AIAgentStack }
export type { AgentStatus }
