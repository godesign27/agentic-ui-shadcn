import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The outermost wrapper of a page: one max-width, one gutter, one place to
 * change either.
 *
 * design-system/agents/page-generation.json names this as the layout root, so
 * generated pages share a horizontal rhythm instead of each inventing a
 * max-width. Renders <main> by default, which gives the page its main landmark
 * — set `as` to something else only when another element already owns it.
 */

const pageContainerVariants = cva("mx-auto w-full", {
  variants: {
    width: {
      prose: "max-w-2xl",
      narrow: "max-w-3xl",
      default: "max-w-5xl",
      wide: "max-w-7xl",
      full: "max-w-none",
    },
    gutter: {
      // Side padding never collapses to zero: 16px is the floor at every width.
      none: "px-4",
      default: "px-4 sm:px-6 lg:px-8",
      loose: "px-4 sm:px-8 lg:px-12",
    },
    spacing: {
      none: "",
      tight: "py-6",
      default: "py-8 sm:py-12",
      loose: "py-12 sm:py-16",
    },
  },
  defaultVariants: { width: "default", gutter: "default", spacing: "default" },
})

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageContainerVariants> {
  as?: "main" | "div" | "section" | "article"
}

const PageContainer = React.forwardRef<HTMLElement, PageContainerProps>(
  ({ className, width, gutter, spacing, as: Comp = "main", ...props }, ref) => (
    <Comp
      ref={ref as React.Ref<never>}
      className={cn(pageContainerVariants({ width, gutter, spacing }), className)}
      {...props}
    />
  )
)
PageContainer.displayName = "PageContainer"

export { PageContainer, pageContainerVariants }
