import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden text-xs font-semibold tracking-[0.05em] font-ui whitespace-nowrap transition-all rounded-none px-3 py-1 [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary-light text-primary hover:bg-primary/20",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        destructive: "bg-destructive/15 text-destructive hover:bg-destructive/25 font-badge",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        ghost: "hover:bg-muted text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        /* ═══ Nordic Purposeful Category Pills (Section 06) ═══ */
        programme: "bg-primary-light text-primary",
        story: "bg-muted text-foreground",
        impact: "bg-ov-moss-light text-ov-moss",
        volunteer: "bg-badge-volunteer-bg text-badge-volunteer",
        community: "bg-badge-community-bg text-badge-community",
        urgent: "bg-destructive/15 text-destructive font-badge tracking-[0.06em]",

        /* ═══ Status Dots (Section 06) ═══ */
        active: "bg-transparent text-status-active px-1 py-0.5 font-sans font-medium gap-1.5 [&>span]:size-1.5 [&>span]:rounded-none [&>span]:bg-status-active",
        pending: "bg-transparent text-status-pending px-1 py-0.5 font-sans font-medium gap-1.5 [&>span]:size-1.5 [&>span]:rounded-none [&>span]:bg-status-pending",
        completed: "bg-transparent text-status-completed px-1 py-0.5 font-sans font-medium gap-1.5 [&>span]:size-1.5 [&>span]:rounded-none [&>span]:bg-status-completed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  children,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  // Automatically prepend status dot if status variant
  const isStatus = variant === "active" || variant === "pending" || variant === "completed"

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: (
          <>
            {isStatus && <span aria-hidden="true" />}
            {children}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
