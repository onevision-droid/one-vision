import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-sans font-medium rounded-sm transition-all duration-200 ease-out outline-none focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 select-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:ml-2 active:scale-[0.99]",
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-paper hover:bg-action-hover shadow-xs",
        secondary: "border border-border-default/80 text-ink-900 hover:border-ink-900/60 hover:bg-black/2 dark:hover:bg-white/4 bg-transparent",
        ghost: "bg-transparent text-action-primary hover:bg-section-alt",
        link: "text-action-primary hover:underline underline-offset-4 hover:text-action-hover p-0 h-auto [&_svg]:ml-1",
      },
 size: {
 sm: "h-btn-sm px-4 text-body-sm",
 md: "h-btn-md px-6 text-body",
 lg: "h-btn-lg px-8 text-body-lg",
 icon: "size-11",
 "icon-sm": "size-9",
 },
 },
 defaultVariants: {
 variant: "primary",
 size: "md",
 },
 }
)

export interface ButtonProps
 extends Omit<React.ComponentPropsWithoutRef<typeof ButtonPrimitive>, "variant" | "size">,
 VariantProps<typeof buttonVariants> {
 render?: React.ReactElement;
 nativeButton?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant, size, render, ...props }, ref) => {
 // If render is provided, base-ui Button will inject props into it
 return (
 <ButtonPrimitive
 ref={ref}
 render={render}
 className={cn(buttonVariants({ variant, size, className }))}
 {...props}
 />
 )
 }
)
Button.displayName = "Button"

export { Button, buttonVariants }
