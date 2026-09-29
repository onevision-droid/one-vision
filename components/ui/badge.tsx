import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
 "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 px-2.5 py-0.5 text-label font-sans rounded-full transition-all",
 {
 variants: {
 variant: {
 default: "border border-border-default/70 bg-surface/80 text-ink-700 shadow-2xs",
 inverted: "border border-white/12 bg-paper/10 text-paper backdrop-blur-xs",
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
        <span className="size-1.5 bg-safety-orange shrink-0" aria-hidden="true" />
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
