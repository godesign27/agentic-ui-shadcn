import * as React from "react"
import { Clock, Info } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * States how sure the model is, and how much is at stake.
 *
 * HONESTY RULE: never render a confidence level the model did not produce.
 * If confidence is unknown, omit the component — do not default to "high".
 * The bar is decorative; the text label is the accessible value.
 */

type ConfidenceLevel = "high" | "medium" | "low"
type RiskLevel = "none" | "low" | "medium" | "high"

const CONFIDENCE: Record<ConfidenceLevel, { label: string; width: string; bar: string; text: string }> = {
  high: { label: "High confidence", width: "90%", bar: "bg-ai-confidence-high", text: "text-ai-confidence-high" },
  medium: { label: "Medium confidence", width: "55%", bar: "bg-ai-confidence-medium", text: "text-ai-confidence-medium" },
  low: { label: "Low confidence", width: "20%", bar: "bg-ai-confidence-low", text: "text-ai-confidence-low" },
}

const RISK: Record<Exclude<RiskLevel, "none">, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
}

export interface AIConfidenceRiskBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  confidence: ConfidenceLevel
  risk?: RiskLevel
  staleData?: boolean
  missingSource?: boolean
  compact?: boolean
}

const AIConfidenceRiskBadge = React.forwardRef<HTMLDivElement, AIConfidenceRiskBadgeProps>(
  (
    { className, confidence, risk = "none", staleData = false, missingSource = false, compact = false, ...props },
    ref
  ) => {
    const c = CONFIDENCE[confidence]
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card",
          compact ? "px-2 py-1" : "px-3 py-2",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {/* Decorative: the meaning is carried by the text beside it. */}
          <span className="h-1.5 w-12 overflow-hidden rounded-full bg-muted" aria-hidden>
            <span className={cn("block h-full rounded-full", c.bar)} style={{ width: c.width }} />
          </span>
          <span className={cn("text-xs font-semibold", c.text)}>{c.label}</span>
        </div>

        {risk !== "none" && (
          <span className="text-xs font-medium text-muted-foreground">· {RISK[risk]}</span>
        )}

        {staleData && (
          <span className="inline-flex items-center gap-1 rounded-full border border-ai-signal-border bg-ai-signal-surface px-2 py-0.5 text-[11px] font-semibold text-ai-signal">
            <Clock className="size-3" aria-hidden />
            Stale data
          </span>
        )}

        {missingSource && (
          <span className="inline-flex items-center gap-1 rounded-full border border-destructive/40 px-2 py-0.5 text-[11px] font-semibold text-destructive">
            <Info className="size-3" aria-hidden />
            No source
          </span>
        )}
      </div>
    )
  }
)
AIConfidenceRiskBadge.displayName = "AIConfidenceRiskBadge"

export { AIConfidenceRiskBadge }
export type { ConfidenceLevel, RiskLevel }
