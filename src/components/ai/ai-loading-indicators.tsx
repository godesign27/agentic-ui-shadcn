import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Thinking, working, retrieving.
 *
 * HONESTY RULE: these must track real in-flight work. Animating to simulate
 * effort — a deliberate pause to make the model feel thoughtful — is
 * forbidden by AI_RULE_LOADING_HONESTY.
 *
 * Every variant announces its status as text. Animation alone is invisible
 * to assistive technology and to anyone with reduced motion enabled.
 */

type LoaderVariant = "thinking" | "working" | "retrieving"

const LABELS: Record<LoaderVariant, string> = {
  thinking: "Thinking",
  working: "Working",
  retrieving: "Getting information",
}

export interface AILoadingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoaderVariant
  label?: string
  size?: "sm" | "md"
}

const AILoadingIndicator = React.forwardRef<HTMLDivElement, AILoadingIndicatorProps>(
  ({ className, variant = "thinking", label, size = "md", ...props }, ref) => {
    const text = label ?? LABELS[variant]
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-ai-surface-border bg-ai-surface text-ai-muted",
          size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
          className
        )}
        {...props}
      >
        {variant === "thinking" ? (
          <span className="flex gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 animate-pulse rounded-full bg-ai-accent motion-reduce:animate-none"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </span>
        ) : (
          <Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden />
        )}
        <span className="font-medium">{text}</span>
      </div>
    )
  }
)
AILoadingIndicator.displayName = "AILoadingIndicator"

export { AILoadingIndicator }
export type { LoaderVariant }
