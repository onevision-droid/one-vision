import { type ComponentPropsWithoutRef } from"react"
import { cn } from"@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
  duration?: number
  gap?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
  gap ="2rem",
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={
        {
         "--duration": `${duration}s`,
         "--gap": gap,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
       "group flex overflow-hidden p-2 gap-(--gap)",
        {
         "flex-row": !vertical,
         "flex-col": vertical,
         "mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]": !vertical,
         "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around gap-(--gap)", {
             "animate-marquee flex-row": !vertical,
             "animate-marquee-vertical flex-col": vertical,
             "[animation-direction:reverse]": reverse,
             "group-hover:[animation-play-state:paused]": pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
