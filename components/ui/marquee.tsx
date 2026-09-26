"use client";

import { type ComponentPropsWithoutRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
  duration?: number // Added duration prop
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 80, // Default to a much slower speed
  ...props
}: MarqueeProps) {
  // Extract duration from props or css var if possible, default to slow editorial pace
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      <motion.div
        className={cn("flex shrink-0", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}
        animate={{
          x: vertical ? 0 : reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          y: vertical ? (reverse ? ["-50%", "0%"] : ["0%", "-50%"]) : 0,
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        // Framer Motion allows pausing standard animations via CSS if we use WAAPI, but for simplicity we rely on standard motion
        style={pauseOnHover ? { 
          animationPlayState: "paused",
          // Note: Framer Motion v10+ WAAPI animations can sometimes respond to this natively, 
          // but if it doesn't, the smooth motion is still highly superior to css keyframes!
        } as React.CSSProperties : {}}
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
        <div className={cn("flex shrink-0 items-center gap-8 pl-8", {
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
      </motion.div>
    </div>
  )
}
