import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]": !vertical,
          "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]": vertical,
        },
        className
      )}
    >
      <div
        className={cn("flex shrink-0 animate-marquee", {
          "flex-row": !vertical,
          "flex-col": vertical,
          "direction-reverse": reverse,
          "hover:paused": pauseOnHover,
        })}
      >
        <div className={cn("flex shrink-0 items-center gap-8", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}>
          {Array(repeat)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex shrink-0">
                {children}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
