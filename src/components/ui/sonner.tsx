"use client"

import {
  CheckCircle2,
  Info,
  Loader2,
  XOctagon,
  AlertTriangle,
} from "lucide-react"
import * as React from "react"
import { Toaster as Sonner } from "sonner"

/**
 * The Sonner-based toast system — an ALTERNATIVE to ui:toast + ui:toaster,
 * never a companion. Mounting both gives you two independent queues and two
 * viewports, so every toast appears twice.
 *
 * Exported as SonnerToaster rather than Toaster so the collision with
 * ui:toaster cannot happen by accident at an import site.
 *
 * Theme is read from the `dark` class on <html>, which is what this app
 * actually toggles (tailwind.config.js sets darkMode: ["class"]). The upstream
 * shadcn snippet reads it from next-themes, which no provider in this project
 * mounts — so it would report "system" regardless of the real theme and render
 * light toasts on a dark page.
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

function useDocumentTheme(): "light" | "dark" {
  const [theme, setTheme] = React.useState<"light" | "dark">(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  )

  React.useEffect(() => {
    const root = document.documentElement
    const read = () => setTheme(root.classList.contains("dark") ? "dark" : "light")
    read()
    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return theme
}

const SonnerToaster = ({ ...props }: ToasterProps) => {
  const theme = useDocumentTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <AlertTriangle className="h-4 w-4" />,
        error: <XOctagon className="h-4 w-4" />,
        loading: <Loader2 className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { SonnerToaster }
