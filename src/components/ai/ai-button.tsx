import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Loader2, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The AI call to action.
 *
 * Visually distinct from ui:button because the distinction carries meaning:
 * this button commits to something a machine proposed. Status is part of the
 * contract, not decoration — loading must track real in-flight work.
 */

const aiButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-ai-accent to-ai-accent-strong text-ai-accent-foreground hover:from-ai-accent-active hover:to-ai-accent-active",
        secondary:
          "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        tertiary: "bg-transparent text-ai-muted hover:text-foreground",
      },
      size: {
        sm: "h-8 rounded-xl px-3.5 text-[13px]",
        md: "h-10 rounded-2xl px-4 text-sm",
        lg: "h-12 rounded-2xl px-5 text-[15px]",
      },
      status: {
        default: "",
        loading: "",
        complete: "",
        error: "",
      },
    },
    compoundVariants: [
      { variant: "primary", status: "loading", class: "from-ai-accent-active to-ai-accent-active" },
      { variant: "primary", status: "complete", class: "from-ai-accent-active to-ai-accent-active" },
      {
        variant: "primary",
        status: "error",
        class: "from-destructive to-destructive text-destructive-foreground",
      },
      { variant: "secondary", status: "error", class: "border-destructive text-destructive" },
    ],
    defaultVariants: { variant: "primary", size: "md", status: "default" },
  }
)

export interface AIButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof aiButtonVariants> {
  label: string
}

const AIButton = React.forwardRef<HTMLButtonElement, AIButtonProps>(
  ({ className, variant, size, status = "default", label, disabled, ...props }, ref) => {
    const busy = status === "loading"
    return (
      <button
        ref={ref}
        type="button"
        // Suppressed while in flight so a double-click cannot fire the action twice.
        disabled={disabled || busy}
        aria-busy={busy || undefined}
        aria-live={busy ? "polite" : undefined}
        className={cn(aiButtonVariants({ variant, size, status }), className)}
        {...props}
      >
        {busy && <Loader2 className="animate-spin" aria-hidden />}
        {status === "complete" && <Check aria-hidden />}
        {status === "error" && <AlertCircle aria-hidden />}
        <span>{label}</span>
      </button>
    )
  }
)
AIButton.displayName = "AIButton"

export { AIButton, aiButtonVariants }
