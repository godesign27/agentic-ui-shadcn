import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * AI response prose.
 *
 * Deliberately plain. Headings and bold inside a response make the model
 * sound more authoritative than it is; keep emphasis for the surrounding UI.
 */

const aiMessageBodyVariants = cva("text-foreground [&_p+p]:mt-3", {
  variants: {
    size: {
      sm: "text-sm leading-6",
      md: "text-base leading-7",
      lg: "text-lg leading-8",
    },
  },
  defaultVariants: { size: "md" },
})

export interface AIMessageBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiMessageBodyVariants> {
  /** Set while the response is still arriving so assistive tech announces the update. */
  streaming?: boolean
}

const AIMessageBody = React.forwardRef<HTMLDivElement, AIMessageBodyProps>(
  ({ className, size, streaming = false, children, ...props }, ref) => (
    <div
      ref={ref}
      aria-live={streaming ? "polite" : undefined}
      aria-busy={streaming || undefined}
      className={cn(aiMessageBodyVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
AIMessageBody.displayName = "AIMessageBody"

export { AIMessageBody, aiMessageBodyVariants }
