import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Use project's actual tokens. min-h-touch-target (44px) is applied globally,
          // so we don't fight it — we use px-3 py-2 for comfortable padding instead.
          "w-full rounded-sm border border-border-default/80 bg-surface/50 p-4",
          "font-sans text-body-sm text-ink-900",
          "placeholder:text-ink-300",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-1.5 focus:ring-safety-orange focus:border-safety-orange",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
