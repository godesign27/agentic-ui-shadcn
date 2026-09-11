import * as React from "react"
import { ThumbsUp, ThumbsDown, Copy, Share2, Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * How the human corrects the record.
 *
 * Every control is icon-only, so every control carries an accessible name.
 * Feedback must actually go somewhere — a bar that discards input is a lie
 * about listening.
 */

type Sentiment = "up" | "down" | null

export interface AIFeedbackBarProps extends React.HTMLAttributes<HTMLDivElement> {
  showDivider?: boolean
  sentiment?: Sentiment
  onSentiment?: (value: Exclude<Sentiment, null>) => void
  onCopy?: () => void
  onShare?: () => void
}

const AIFeedbackBar = React.forwardRef<HTMLDivElement, AIFeedbackBarProps>(
  ({ className, showDivider = true, sentiment = null, onSentiment, onCopy, onShare, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      onCopy?.()
      setCopied(true)
    }

    React.useEffect(() => {
      if (!copied) return
      const t = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(t)
    }, [copied])

    const btn =
      "inline-flex size-8 items-center justify-center rounded-md text-ai-muted transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 [&_svg]:size-4"

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1 pt-2", showDivider && "border-t border-border", className)}
        {...props}
      >
        <button
          type="button"
          className={cn(btn, sentiment === "up" && "text-ai-accent")}
          aria-label="Good response"
          aria-pressed={sentiment === "up"}
          onClick={() => onSentiment?.("up")}
        >
          <ThumbsUp aria-hidden />
        </button>
        <button
          type="button"
          className={cn(btn, sentiment === "down" && "text-destructive")}
          aria-label="Poor response"
          aria-pressed={sentiment === "down"}
          onClick={() => onSentiment?.("down")}
        >
          <ThumbsDown aria-hidden />
        </button>
        <button type="button" className={btn} aria-label="Copy response" onClick={handleCopy}>
          {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        </button>
        {onShare && (
          <button type="button" className={btn} aria-label="Share response" onClick={onShare}>
            <Share2 aria-hidden />
          </button>
        )}
        <span className="sr-only" role="status">
          {copied ? "Response copied" : ""}
        </span>
      </div>
    )
  }
)
AIFeedbackBar.displayName = "AIFeedbackBar"

export { AIFeedbackBar }
