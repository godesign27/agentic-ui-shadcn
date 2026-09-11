import * as React from "react"
import { HelpCircle, BookOpen, Link2, Lightbulb, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The rationale disclosure affordance.
 *
 * Its presence is what satisfies the "Rationale disclosure" accountability
 * obligation. Rendering it without wiring onClick to an actual explanation
 * is worse than omitting it — it promises transparency and does not deliver.
 */

type WhyThisVariant = "why-this" | "view-rationale" | "view-sources" | "view-assumptions" | "explain-risk"

const VARIANTS: Record<WhyThisVariant, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  "why-this": { label: "Why this?", Icon: HelpCircle },
  "view-rationale": { label: "View rationale", Icon: BookOpen },
  "view-sources": { label: "View sources", Icon: Link2 },
  "view-assumptions": { label: "View assumptions", Icon: Lightbulb },
  "explain-risk": { label: "Explain risk", Icon: AlertTriangle },
}

export interface AIWhyThisLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: WhyThisVariant
  label?: string
}

const AIWhyThisLink = React.forwardRef<HTMLButtonElement, AIWhyThisLinkProps>(
  ({ className, variant = "why-this", label, ...props }, ref) => {
    const v = VARIANTS[variant]
    const Icon = v.Icon
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 rounded text-[13px] font-semibold text-ai-accent underline-offset-4 transition-colors hover:text-ai-accent-active hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        <Icon className="size-3.5" aria-hidden />
        {label ?? v.label}
      </button>
    )
  }
)
AIWhyThisLink.displayName = "AIWhyThisLink"

export { AIWhyThisLink }
export type { WhyThisVariant }
