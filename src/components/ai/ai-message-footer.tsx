import * as React from "react"

import { cn } from "@/lib/utils"
import { AIButton } from "@/components/ai/ai-button"

/**
 * Actions afforded by a response.
 *
 * Capped at three, same as ai:ai-action. Anything beyond that belongs in an
 * overflow menu — a wall of buttons is not a decision.
 */

export interface FooterAction {
  label: string
  variant?: "primary" | "secondary" | "tertiary"
  onClick?: () => void
  disabled?: boolean
}

export interface AIMessageFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: FooterAction[]
  visible?: boolean
}

const AIMessageFooter = React.forwardRef<HTMLDivElement, AIMessageFooterProps>(
  ({ className, actions, visible = true, ...props }, ref) => {
    if (!visible || actions.length === 0) return null
    if (import.meta.env.DEV && actions.length > 3) {
      console.warn(
        "[ai:ai-message-footer] More than three actions. Move the rest into an overflow menu — see AI_RULE_MAX_THREE_ACTIONS."
      )
    }
    return (
      <div ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
        {actions.slice(0, 3).map((a, i) => (
          <AIButton
            key={`${a.label}-${i}`}
            size="sm"
            variant={a.variant ?? (i === 0 ? "primary" : "secondary")}
            label={a.label}
            disabled={a.disabled}
            onClick={a.onClick}
          />
        ))}
      </div>
    )
  }
)
AIMessageFooter.displayName = "AIMessageFooter"

export { AIMessageFooter }
