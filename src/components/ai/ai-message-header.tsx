import * as React from "react"

import { cn } from "@/lib/utils"
import { BotAvatar } from "@/components/ai/ai-avatar"

/**
 * Attribution. Renders before the body, never after.
 *
 * This is the component that satisfies the "Attribution" obligation for a
 * conversational surface. An AI response without it is unattributed output.
 */

export interface AIMessageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  agentLabel: string
  /** Pass undefined to hide. Use a machine-readable dateTime on the caller side where possible. */
  timestamp?: string
  size?: "sm" | "md"
}

const AIMessageHeader = React.forwardRef<HTMLDivElement, AIMessageHeaderProps>(
  ({ className, agentLabel, timestamp = "Just now", size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    >
      <span className="flex items-center gap-2">
        <BotAvatar size={size === "sm" ? 16 : 20} />
        <span className={cn("font-semibold text-foreground", size === "sm" ? "text-xs" : "text-sm")}>
          {agentLabel}
        </span>
      </span>
      {timestamp && (
        <span className={cn("text-ai-muted", size === "sm" ? "text-[11px]" : "text-xs")}>
          {timestamp}
        </span>
      )}
    </div>
  )
)
AIMessageHeader.displayName = "AIMessageHeader"

export { AIMessageHeader }
