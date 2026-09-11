import * as React from "react"

import { cn } from "@/lib/utils"
import { AISoftSurface } from "@/components/ai/ai-soft-surface"
import { AIMessageHeader } from "@/components/ai/ai-message-header"
import { AIMessageBody } from "@/components/ai/ai-message-body"
import { AIAction } from "@/components/ai/ai-action"
import {
  AIConfidenceRiskBadge,
  type ConfidenceLevel,
  type RiskLevel,
} from "@/components/ai/ai-confidence-risk-badge"
import { AIWhyThisLink, type WhyThisVariant } from "@/components/ai/ai-why-this-link"

/**
 * A consequential proposal, and the human's decision about it.
 *
 * This is design-system/patterns/ai-approval-flow.json as a component. The
 * ordering is the safety property and is not configurable: attribution, then
 * the proposal, then how sure the machine is, then how to see its reasoning,
 * and only then the actions.
 *
 * A user who tabs straight to the primary button has still passed the
 * confidence badge and the rationale link in reading order.
 *
 * Nothing fires without a human gesture. There is no autoApply prop, and
 * adding one would violate AI_RULE_NO_SILENT_APPLY.
 */

export interface AIApprovalCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError"> {
  agentLabel: string
  timestamp?: string
  /** What the agent proposes. Stated plainly, in the agent's own words. */
  proposal: React.ReactNode
  /** Omit when the model produced no confidence value. Never guess one. */
  confidence?: ConfidenceLevel
  risk?: RiskLevel
  staleData?: boolean
  missingSource?: boolean
  /** Wire this to real reasoning, or leave it off entirely. */
  onWhyThis?: () => void
  whyThisVariant?: WhyThisVariant
  primaryLabel: string
  secondaryLabel?: string
  tertiaryLabel?: string
  /** Shows the review signal above the actions. Use for anything consequential. */
  requiresReview?: boolean
  status?: "default" | "loading" | "complete" | "disabled" | "error"
  /** Shown beneath the actions when status is "error". Say what to do next. */
  errorMessage?: string
  onPrimary?: () => void
  onSecondary?: () => void
  onTertiary?: () => void
}

const AIApprovalCard = React.forwardRef<HTMLDivElement, AIApprovalCardProps>(
  (
    { className, agentLabel, timestamp, proposal, confidence, risk, staleData,
      missingSource, onWhyThis, whyThisVariant = "view-rationale", primaryLabel,
      secondaryLabel, tertiaryLabel, requiresReview = false, status = "default",
      errorMessage, onPrimary, onSecondary, onTertiary, ...props },
    ref
  ) => (
    <AISoftSurface
      ref={ref}
      tone={requiresReview ? "mixed" : "ai"}
      role="region"
      aria-label={`Approval requested by ${agentLabel}`}
      className={cn("space-y-4 p-4", className)}
      {...props}
    >
      <AIMessageHeader agentLabel={agentLabel} timestamp={timestamp} />

      <AIMessageBody size="sm">{proposal}</AIMessageBody>

      {(confidence || onWhyThis) && (
        <div className="flex flex-wrap items-center gap-3">
          {confidence && (
            <AIConfidenceRiskBadge
              confidence={confidence}
              risk={risk}
              staleData={staleData}
              missingSource={missingSource}
              compact
            />
          )}
          {onWhyThis && <AIWhyThisLink variant={whyThisVariant} onClick={onWhyThis} />}
        </div>
      )}

      <AIAction
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
        tertiaryLabel={tertiaryLabel}
        requiresReview={requiresReview}
        status={status}
        onPrimary={onPrimary}
        onSecondary={onSecondary}
        onTertiary={onTertiary}
      />

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {errorMessage}
        </p>
      )}
    </AISoftSurface>
  )
)
AIApprovalCard.displayName = "AIApprovalCard"

export { AIApprovalCard }
