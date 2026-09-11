import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { BotAvatar } from "@/components/ai/ai-avatar"

/**
 * The entry point to the assistant.
 *
 * Recognisable, never instructional. It says what it is, not what to do with it.
 * When AI is unavailable, say why — a dead button teaches nothing.
 */

export interface AILauncherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "avatar-chat" | "avatar-only"
  label?: string
  active?: boolean
  unread?: boolean
  unreadCount?: number
  loading?: boolean
  disabledReason?: string
}

const AILauncher = React.forwardRef<HTMLButtonElement, AILauncherProps>(
  (
    { className, variant = "avatar-chat", label = "Chat", active = false, unread = false,
      unreadCount, loading = false, disabled, disabledReason, ...props },
    ref
  ) => {
    const iconOnly = variant === "avatar-only"
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-expanded={active}
        aria-label={iconOnly ? (disabledReason ?? "Open AI assistant") : undefined}
        title={disabled ? disabledReason : undefined}
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          active
            ? "border-ai-accent bg-ai-surface"
            : "border-ai-surface-border bg-card hover:bg-ai-surface",
          iconOnly ? "size-10 justify-center" : "h-10 pl-2 pr-4",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-[18px] animate-spin text-ai-accent motion-reduce:animate-none" aria-hidden />
        ) : (
          <BotAvatar size={22} />
        )}
        {!iconOnly && <span className="text-sm font-semibold text-foreground">{label}</span>}
        {unread && (
          <span
            className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-ai-signal px-1 text-[10px] font-bold leading-4 text-white"
            aria-label={unreadCount ? `${unreadCount} unread messages` : "Unread messages"}
          >
            {unreadCount ?? ""}
          </span>
        )}
      </button>
    )
  }
)
AILauncher.displayName = "AILauncher"

export { AILauncher }
