import * as React from "react"
import { Brain, History, BookmarkCheck, EyeOff, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Marks that the AI is drawing on remembered context.
 *
 * Users are entitled to know when a system is using something it learned
 * earlier. The "ignored" and "removed" variants exist so that forgetting is
 * as visible as remembering.
 */

type MemoryVariant = "using-memory" | "previous-context" | "memory-available" | "memory-ignored" | "memory-removed"

const VARIANT: Record<MemoryVariant, {
  Icon: React.ComponentType<{ className?: string }>
  prefix: string
  className: string
}> = {
  "using-memory": { Icon: Brain, prefix: "Using memory", className: "border-ai-signal-border bg-ai-signal-surface text-ai-signal" },
  "previous-context": { Icon: History, prefix: "From earlier", className: "border-border bg-muted text-muted-foreground" },
  "memory-available": { Icon: BookmarkCheck, prefix: "Memory available", className: "border-ai-surface-border bg-ai-surface text-ai-accent-active" },
  "memory-ignored": { Icon: EyeOff, prefix: "Memory ignored", className: "border-border bg-transparent text-muted-foreground" },
  "memory-removed": { Icon: Trash2, prefix: "Memory removed", className: "border-border bg-transparent text-muted-foreground line-through" },
}

export interface AIChipMemoryProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: MemoryVariant
  label: string
  size?: "sm" | "md"
}

const AIChipMemory = React.forwardRef<HTMLSpanElement, AIChipMemoryProps>(
  ({ className, variant, label, size = "md", ...props }, ref) => {
    const v = VARIANT[variant]
    const Icon = v.Icon
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-medium",
          v.className,
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
          className
        )}
        {...props}
      >
        <Icon className="size-3" aria-hidden />
        <span className="sr-only">{v.prefix}: </span>
        {label}
      </span>
    )
  }
)
AIChipMemory.displayName = "AIChipMemory"

export { AIChipMemory }
export type { MemoryVariant }
