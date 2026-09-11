import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The ghost toolbar control inside the AI composer.
 *
 * Icon-only, icon + label, or label + trailing icon. Icon-only collapses to a
 * 34px circle and therefore REQUIRES an accessible name — the shape carries
 * no meaning on its own.
 */

export interface AIDialogButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label?: string
  trailingIcon?: React.ReactNode
  /** Active when the control owns an open popover or menu. */
  isOpen?: boolean
}

const AIDialogButton = React.forwardRef<HTMLButtonElement, AIDialogButtonProps>(
  ({ className, icon, label, trailingIcon, isOpen = false, disabled, ...props }, ref) => {
    const iconOnly = Boolean(icon) && !label

    if (import.meta.env.DEV && iconOnly && !props["aria-label"]) {
      console.warn(
        "[ai:ai-dialog-button] Icon-only button with no aria-label. It has no accessible name."
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-expanded={trailingIcon ? isOpen : undefined}
        className={cn(
          "inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[0.42] [&_svg]:size-4 [&_svg]:shrink-0",
          iconOnly ? "size-[34px] justify-center rounded-full" : "h-[34px] rounded-full px-3",
          isOpen && "bg-accent",
          className
        )}
        {...props}
      >
        {icon}
        {label && <span>{label}</span>}
        {trailingIcon}
      </button>
    )
  }
)
AIDialogButton.displayName = "AIDialogButton"

export { AIDialogButton }
