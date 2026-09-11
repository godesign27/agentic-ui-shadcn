import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The canvas behind AI-generated content.
 *
 * This is the primary non-textual attribution affordance: the wash says
 * "a machine wrote what is inside this". Because it carries that meaning,
 * it must not be used decoratively on human-authored surfaces.
 */

const aiSoftSurfaceVariants = cva("relative isolate", {
  variants: {
    tone: {
      ai: "bg-ai-surface",
      neutral: "bg-muted/60",
      mixed: "bg-gradient-to-br from-ai-surface via-ai-surface to-ai-signal-surface",
    },
    intensity: {
      subtle: "",
      medium: "",
      expressive: "",
    },
    elevation: {
      flat: "",
      soft: "shadow-sm",
    },
    bordered: {
      true: "border border-ai-surface-border",
      false: "",
    },
    radius: {
      none: "rounded-none",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-3xl",
    },
  },
  compoundVariants: [
    { tone: "ai", intensity: "medium", class: "bg-gradient-to-br from-ai-surface to-ai-accent/10" },
    {
      tone: "ai",
      intensity: "expressive",
      class: "bg-gradient-to-br from-ai-surface via-ai-accent/10 to-ai-accent-strong/15",
    },
    { tone: "neutral", intensity: "expressive", class: "bg-gradient-to-br from-muted to-muted/40" },
  ],
  defaultVariants: {
    tone: "ai",
    intensity: "subtle",
    elevation: "flat",
    bordered: true,
    radius: "lg",
  },
})

export interface AISoftSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiSoftSurfaceVariants> {
  asChild?: boolean
}

const AISoftSurface = React.forwardRef<HTMLDivElement, AISoftSurfaceProps>(
  ({ className, tone, intensity, elevation, bordered, radius, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        aiSoftSurfaceVariants({ tone, intensity, elevation, bordered, radius }),
        className
      )}
      {...props}
    />
  )
)
AISoftSurface.displayName = "AISoftSurface"

export { AISoftSurface, aiSoftSurfaceVariants }
