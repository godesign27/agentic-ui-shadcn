import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A suggested prompt, offered so the user does not have to start from nothing.
 *
 * Suggest-level only: tapping one composes a message, it never executes.
 * A quick chip that performs an action is a different component.
 */

export interface AIChipQuickProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  /** The "All prompts" call to action. One per group at most. */
  isSpecial?: boolean
}

const AIChipQuick = React.forwardRef<HTMLButtonElement, AIChipQuickProps>(
  ({ className, icon: Icon, label, isSpecial = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSpecial
          ? "border-transparent bg-gradient-to-br from-ai-accent to-ai-accent-strong text-ai-accent-foreground hover:from-ai-accent-active hover:to-ai-accent-active"
          : "border-ai-surface-border bg-card text-foreground hover:bg-ai-surface",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-3.5" aria-hidden />}
      {label}
    </button>
  )
)
AIChipQuick.displayName = "AIChipQuick"

export { AIChipQuick }
