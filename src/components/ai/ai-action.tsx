import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { AIButton } from "@/components/ai/ai-button"

/**
 * The decision point at the end of an AI recommendation.
 *
 * Primary confirms, secondary reviews, tertiary dismisses. At most three,
 * because a fourth turns a decision into a menu.
 *
 * ACCOUNTABILITY: nothing here fires without a human gesture. When
 * requiresReview is set, the review signal renders before the action row so
 * the user sees the warning before the button. Auto-applying on mount is a
 * critical violation — see design-system/rules/ai-interaction.json.
 */

const aiActionVariants = cva("flex gap-2", {
  variants: {
    layout: {
      inline: "flex-row flex-wrap items-center",
      stacked: "flex-col items-stretch",
    },
  },
  defaultVariants: { layout: "inline" },
})

type AIActionStatus = "default" | "loading" | "complete" | "disabled" | "error"

export interface AIActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError">,
    VariantProps<typeof aiActionVariants> {
  primaryLabel: string
  secondaryLabel?: string
  tertiaryLabel?: string
  size?: "sm" | "md" | "lg"
  status?: AIActionStatus
  /** Renders the review signal above the row. Use when the action needs scrutiny before it fires. */
  requiresReview?: boolean
  reviewLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  onTertiary?: () => void
}

const AIAction = React.forwardRef<HTMLDivElement, AIActionProps>(
  (
    {
      className,
      layout,
      primaryLabel,
      secondaryLabel,
      tertiaryLabel,
      size = "md",
      status = "default",
      requiresReview = false,
      reviewLabel = "Requires review",
      onPrimary,
      onSecondary,
      onTertiary,
      ...props
    },
    ref
  ) => {
    const disabled = status === "disabled"
    const buttonStatus = status === "disabled" ? "default" : status

    return (
      <div ref={ref} className={cn("flex flex-col items-start gap-2.5", className)} {...props}>
        {requiresReview && (
          <span
            // role="status" rather than "alert": this is a standing condition the
            // user is about to act on, not an interruption.
            role="status"
            className="inline-flex items-center gap-1.5 rounded-full border border-ai-signal-border bg-ai-signal-surface px-2.5 py-1 text-xs font-semibold text-ai-signal"
          >
            <AlertTriangle className="size-3" aria-hidden />
            {reviewLabel}
          </span>
        )}

        <div className={cn(aiActionVariants({ layout }), layout === "stacked" && "w-full")}>
          <AIButton
            variant="primary"
            size={size}
            status={buttonStatus}
            label={primaryLabel}
            disabled={disabled}
            onClick={onPrimary}
            className={layout === "stacked" ? "w-full" : undefined}
          />
          {secondaryLabel && (
            <AIButton
              variant="secondary"
              size={size}
              label={secondaryLabel}
              disabled={disabled || status === "loading"}
              onClick={onSecondary}
              className={layout === "stacked" ? "w-full" : undefined}
            />
          )}
          {tertiaryLabel && (
            <AIButton
              variant="tertiary"
              size={size}
              label={tertiaryLabel}
              disabled={disabled || status === "loading"}
              onClick={onTertiary}
              className={layout === "stacked" ? "w-full" : undefined}
            />
          )}
        </div>
      </div>
    )
  }
)
AIAction.displayName = "AIAction"

export { AIAction, aiActionVariants }
