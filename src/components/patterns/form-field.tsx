import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/**
 * A labelled control with its description and error, wired together correctly.
 *
 * This is the composition design-system/rules/composition.json requires for the
 * form-submit pattern. It exists because the three relationships that make a
 * field usable — label to control, control to description, control to error —
 * are the three that get forgotten.
 *
 * Inside react-hook-form, prefer ui:form, which derives the same wiring from
 * form state. Use this for a standalone field with no form library.
 */

export interface FormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label: string
  /** Rendered as the control. Receives id, aria-describedby and aria-invalid. */
  children: React.ReactElement
  description?: string
  error?: string
  required?: boolean
  /** Supply a stable id when the field must be linked from elsewhere. */
  id?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, children, description, error, required = false, id, ...props }, ref) => {
    const generated = React.useId()
    const fieldId = id ?? generated
    const descriptionId = `${fieldId}-description`
    const errorId = `${fieldId}-error`

    // aria-describedby must name every element describing the control, in the
    // order they should be read. Error last, because it is the newest news.
    const describedBy = [description && descriptionId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <Label htmlFor={fieldId} className={cn(error && "text-destructive")}>
          {label}
          {required && (
            <>
              <span aria-hidden className="ml-0.5 text-destructive">*</span>
              <span className="sr-only"> (required)</span>
            </>
          )}
        </Label>

        {React.cloneElement(children, {
          id: fieldId,
          "aria-describedby": describedBy,
          "aria-invalid": error ? true : undefined,
          required: required || undefined,
          ...children.props,
        } as Partial<React.HTMLAttributes<HTMLElement>>)}

        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {error && (
          // role="alert" so a validation failure arriving after render is announced.
          <p id={errorId} role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }
