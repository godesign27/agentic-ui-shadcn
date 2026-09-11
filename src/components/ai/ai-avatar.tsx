import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The attribution affordance for the entire AI namespace.
 *
 * The palette is FIXED and identical in light and dark. Do not recolor it,
 * do not use currentColor, do not add a dark: variant, and do not add a
 * gradient ring. A user learns this mark means "a machine produced this";
 * if it changes with theme or context it stops being recognisable.
 */

const RINGS = ["#B4BDFF", "#5A6DFF", "#1F2A66"] as const

interface AvatarMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  monogram?: string
  /** Hero treatment. Only AIAvatar uses it. */
  glow?: boolean
  label?: string
}

const AvatarMark = React.forwardRef<SVGSVGElement, AvatarMarkProps>(
  ({ size = 34, monogram = "A", glow = false, label, className, style, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 34 34"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("shrink-0", className)}
      style={{
        filter: glow ? "drop-shadow(0 4px 14px rgba(90,109,255,0.45))" : undefined,
        ...style,
      }}
      {...props}
    >
      <circle cx="17" cy="17" r="17" fill={RINGS[0]} />
      <circle cx="17" cy="17" r="13" fill={RINGS[1]} />
      <circle cx="17" cy="17" r="9" fill={RINGS[2]} />
      <text
        x="17"
        y="17"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="9"
        fontWeight="600"
        fontFamily="inherit"
      >
        {monogram}
      </text>
    </svg>
  )
)
AvatarMark.displayName = "AvatarMark"

/** 34px hero mark. Use for agent identity at the top of a surface. */
const AIAvatar = React.forwardRef<SVGSVGElement, AvatarMarkProps>(
  ({ size = 34, glow = true, ...props }, ref) => (
    <AvatarMark ref={ref} size={size} glow={glow} {...props} />
  )
)
AIAvatar.displayName = "AIAvatar"

/** 18px inline mark. Same artwork, no glow. Use in message headers and launchers. */
const BotAvatar = React.forwardRef<SVGSVGElement, AvatarMarkProps>(
  ({ size = 18, ...props }, ref) => <AvatarMark ref={ref} size={size} glow={false} {...props} />
)
BotAvatar.displayName = "BotAvatar"

export { AIAvatar, BotAvatar }
