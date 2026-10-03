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
        default: "bg-[#EDE9FE] text-[#4338CA] hover:bg-[#DDD6FE]",
        secondary: "bg-[#F1F5F9] text-[#1E293B] hover:bg-[#E2E8F0]",
        destructive: "bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] font-badge",
        outline: "border border-[#E5E7EB] bg-white text-[#0F172A] hover:bg-[#F8FAFC]",
        ghost: "hover:bg-muted text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        /* ═══ Nordic Purposeful Category Pills (Section 06) ═══ */
        programme: "bg-[#EDE9FE] text-[#4338CA]",
        story: "bg-[#F1F5F9] text-[#1E293B]",
        impact: "bg-[#D1FAE5] text-[#065F46]",
        volunteer: "bg-[#FEF3C7] text-[#92400E]",
        community: "bg-[#DBEAFE] text-[#1D4ED8]",
        urgent: "bg-[#FEE2E2] text-[#B91C1C] font-badge tracking-[0.06em]",

        /* ═══ Status Dots (Section 06) ═══ */
        active: "bg-transparent text-[#15803D] px-1 py-0.5 font-sans font-medium gap-1.5 [&>span]:size-1.5 [&>span]:rounded-none [&>span]:bg-[#15803D]",
        pending: "bg-transparent text-[#9A3412] px-1 py-0.5 font-sans font-medium gap-1.5 [&>span]:size-1.5 [&>span]:rounded-none [&>span]:bg-[#9A3412]",
        completed: "bg-transparent text-[#475569] px-1 py-0.5 font-sans font-medium gap-1.5 [&>span]:size-1.5 [&>span]:rounded-none [&>span]:bg-[#475569]",
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
