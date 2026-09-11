import * as React from "react"

import { cn } from "@/lib/utils"
import { AISoftSurface } from "@/components/ai/ai-soft-surface"
import { AIMessageHeader } from "@/components/ai/ai-message-header"
import { AIMessageBody } from "@/components/ai/ai-message-body"
import { AIMessageFooter, type FooterAction } from "@/components/ai/ai-message-footer"
import { AIFeedbackBar } from "@/components/ai/ai-feedback-bar"
import { AILoadingIndicator } from "@/components/ai/ai-loading-indicators"
import { AIAgentWorkNote } from "@/components/ai/ai-agent-work-note"

/**
 * One AI turn, assembled so that authorship, progress and recourse are all
 * present by construction.
 *
 * This is design-system/patterns/ai-response.json as a component: it renders
 * the required parts in the required order, so the pattern cannot be composed
 * wrongly. The header always precedes the body; the loading indicator
 * announces; feedback is available unless explicitly suppressed.
 */

export interface AIResponseProps extends React.HTMLAttributes<HTMLDivElement> {
  agentLabel: string
  timestamp?: string
  /** While true, the loading indicator replaces the body and announces politely. */
  loading?: boolean
  loadingVariant?: "thinking" | "working" | "retrieving"
  /** While true, the body is a polite live region so arriving text is announced. */
  streaming?: boolean
  /** Optional disclosure of what the agent did to produce this. */
  workNote?: { content?: string; items?: string[] }
  actions?: FooterAction[]
  /** Set false only where feedback genuinely has nowhere to go. */
  showFeedback?: boolean
  onSentiment?: (value: "up" | "down") => void
  onCopy?: () => void
  /** Renders without the AI surface wash — for a thread that is already marked. */
  bare?: boolean
}

const AIResponse = React.forwardRef<HTMLDivElement, AIResponseProps>(
  (
    { className, agentLabel, timestamp, loading = false, loadingVariant = "thinking",
      streaming = false, workNote, actions, showFeedback = true, onSentiment, onCopy,
      bare = false, children, ...props },
    ref
  ) => {
    const content = (
      <div className="space-y-3">
        {/* Attribution first, always — the pattern requires it before the body. */}
        <AIMessageHeader agentLabel={agentLabel} timestamp={timestamp} />

        {workNote && (
          <AIAgentWorkNote
            status={loading ? "active" : "complete"}
            content={workNote.content}
            items={workNote.items}
          />
        )}

        {loading ? (
          <AILoadingIndicator variant={loadingVariant} />
        ) : (
          <AIMessageBody streaming={streaming}>{children}</AIMessageBody>
        )}

        {!loading && actions?.length ? <AIMessageFooter actions={actions} /> : null}

        {!loading && showFeedback && (
          <AIFeedbackBar onSentiment={onSentiment} onCopy={onCopy} />
        )}
      </div>
    )

    if (bare) {
      return (
        <div ref={ref} className={cn(className)} {...props}>
          {content}
        </div>
      )
    }

    return (
      <AISoftSurface
        ref={ref}
        role="region"
        aria-label={`Response from ${agentLabel}`}
        className={cn("p-4", className)}
        {...props}
      >
        {content}
      </AISoftSurface>
    )
  }
)
AIResponse.displayName = "AIResponse"

export { AIResponse }
