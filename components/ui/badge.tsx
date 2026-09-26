import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-pill px-3 py-1 text-label font-sans transition-all",
  {
    variants: {
      variant: {
        default: "border border-border-default bg-surface text-ink-700",
        inverted: "border border-transparent bg-paper/12 text-paper",
      },
      hasDot: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      hasDot: false,
    },
  }
)

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {
  render?: React.ReactElement;
}

function Badge({
  className,
  variant = "default",
  hasDot = false,
  render,
  children,
  ...props
}: BadgeProps) {
  const content = (
    <>
      {hasDot && (
        <span className="size-1.5 rounded-pill bg-clay-500 shrink-0" aria-hidden="true" />
      )}
      {children}
    </>
  );

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, hasDot }), className),
      },
      { ...props, children: content }
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
