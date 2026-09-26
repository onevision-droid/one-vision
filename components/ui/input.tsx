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
          "w-full border border-border-input bg-transparent px-3 py-2",
          "rounded-sm text-body-sm text-ink-900",
          "placeholder:text-ink-300",
          "transition-colors duration-base",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:border-clay-500",
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
