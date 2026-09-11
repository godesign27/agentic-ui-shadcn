import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Not an icon set — a treatment layer over whatever icon you pass.
 *
 * The 60-30-10 rule governs it: about 60% of icons on a surface should be
 * neutral, 30% semantic, and only 10% carry the AI identity colour. Treat
 * `treatment="ai"` as a scarce resource; if every icon is an AI icon, none is.
 */

const aiIconVariants = cva("inline-flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      xs: "[&_svg]:size-3",
      sm: "[&_svg]:size-4",
      md: "[&_svg]:size-5",
      lg: "[&_svg]:size-6",
      xl: "[&_svg]:size-8",
    },
    treatment: {
      neutral: "text-muted-foreground",
      ai: "text-ai-accent",
      "ai-contained": "rounded-lg bg-ai-surface text-ai-accent",
      semantic: "",
      "orange-signal": "text-ai-signal",
    },
    tone: {
      default: "",
      success: "text-ai-confidence-high",
      warning: "text-ai-signal",
      error: "text-destructive",
      blocked: "text-destructive",
      escalated: "text-ai-signal",
    },
    container: {
      true: "p-1.5",
      false: "",
    },
    motion: {
      none: "",
      spin: "[&_svg]:animate-spin motion-reduce:[&_svg]:animate-none",
      pulse: "[&_svg]:animate-pulse motion-reduce:[&_svg]:animate-none",
    },
  },
  defaultVariants: {
    size: "md",
    treatment: "neutral",
    tone: "default",
    container: false,
    motion: "none",
  },
})

export interface AIIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof aiIconVariants> {
  icon: React.ComponentType<{ className?: string }>
  /** Required unless decorative. An icon with meaning and no name is invisible. */
  label?: string
  decorative?: boolean
}

const AIIcon = React.forwardRef<HTMLSpanElement, AIIconProps>(
  ({ className, icon: Icon, label, decorative = false, size, treatment, tone, container, motion, ...props }, ref) => {
    if (import.meta.env.DEV && !decorative && !label) {
      console.warn("[ai:ai-icon] Neither decorative nor labelled. Set one or the other.")
    }
    return (
      <span
        ref={ref}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : label}
        aria-hidden={decorative || undefined}
        className={cn(aiIconVariants({ size, treatment, tone, container, motion }), className)}
        {...props}
      >
        <Icon />
      </span>
    )
  }
)
AIIcon.displayName = "AIIcon"

export { AIIcon, aiIconVariants }
