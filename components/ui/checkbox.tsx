"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Use project tokens — no shadcn CSS variables
      "peer h-4 w-4 min-h-4 min-w-4 shrink-0 border border-border-input",
      "transition-colors duration-base",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-action-primary data-[state=checked]:border-action-primary data-[state=checked]:text-paper",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <CheckIcon className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
