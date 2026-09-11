import * as React from "react"
import { ChevronRight, ExternalLink, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * An inline explainability link inside AI prose.
 *
 * Two rules do the work here. The label must stand alone — an icon is never
 * the only signal of purpose. And a disabled link must say why: disabling
 * without disabledReason removes the affordance and explains nothing.
 */

type AITextLinkTone = "ai" | "neutral" | "attention"
type AITextLinkVariant = "text" | "icon-leading" | "chevron" | "icon-chevron" | "external"

const TONE: Record<AITextLinkTone, string> = {
  ai: "text-ai-accent hover:text-ai-accent-active",
  neutral: "text-muted-foreground hover:text-foreground",
  // Reserve attention for escalation, approval and staleness — not emphasis.
  attention: "text-ai-signal hover:text-ai-signal/80",
}

export interface AITextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  variant?: AITextLinkVariant
  tone?: AITextLinkTone
  size?: "sm" | "md"
  expanded?: boolean
  loading?: boolean
  disabled?: boolean
  disabledReason?: string
}

const AITextLink = React.forwardRef<HTMLAnchorElement, AITextLinkProps>(
  (
    { className, label, icon: Icon, variant = "text", tone = "ai", size = "md",
      expanded, loading = false, disabled = false, disabledReason, href, onClick, ...props },
    ref
  ) => {
    const showChevron = variant === "chevron" || variant === "icon-chevron"
    const showIcon = Boolean(Icon) && (variant === "icon-leading" || variant === "icon-chevron")
    const isExternal = variant === "external"

    if (import.meta.env.DEV && disabled && !disabledReason) {
      console.warn("[ai:ai-text-link] Disabled with no disabledReason. Say why it is unavailable.")
    }

    const classes = cn(
      "inline-flex items-center gap-1 rounded font-semibold underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2",
      TONE[tone],
      size === "sm" ? "text-[11px]" : "text-[13px]",
      disabled && "pointer-events-none opacity-50 no-underline",
      className
    )

    const content = (
      <>
        {loading ? (
          <Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden />
        ) : (
          showIcon && Icon && <Icon className="size-3.5" aria-hidden />
        )}
        <span>{label}</span>
        {showChevron && (
          <ChevronRight
            className={cn("size-3.5 transition-transform", expanded && "rotate-90")}
            aria-hidden
          />
        )}
        {isExternal && (
          <>
            <ExternalLink className="size-3" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </>
    )

    // No href means this is a disclosure action, not navigation — render a button
    // so it is announced and operated correctly.
    if (!href) {
      return (
        <button
          type="button"
          disabled={disabled}
          title={disabled ? disabledReason : undefined}
          aria-label={disabled ? `${label} — ${disabledReason ?? "unavailable"}` : undefined}
          aria-expanded={showChevron ? expanded : undefined}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
          className={classes}
        >
          {content}
        </button>
      )
    }

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        title={disabled ? disabledReason : undefined}
        aria-label={disabled ? `${label} — ${disabledReason ?? "unavailable"}` : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {content}
      </a>
    )
  }
)
AITextLink.displayName = "AITextLink"

export { AITextLink }
export type { AITextLinkTone, AITextLinkVariant }
