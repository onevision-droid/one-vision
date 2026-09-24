"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isHovered?: boolean;
}

export function Logo({ className, isHovered = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.svg 
        viewBox="0 0 40 40" 
        className="w-8 h-8 text-ink dark:text-paper overflow-visible"
        initial="hidden"
        animate={isHovered ? "hover" : "visible"}
      >
        {/* Left Circle (Community) */}
        <motion.circle
          cx="16"
          cy="20"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{
            hidden: { pathLength: 0, opacity: 0, cx: 16 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              cx: [16, 15, 16],
              transition: { 
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 1.5, ease: "easeInOut" },
                cx: { repeat: Infinity, duration: 6, ease: "easeInOut" }
              }
            },
            hover: {
              cx: 18,
              pathLength: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 25 }
            }
          }}
        />
        {/* Right Circle (Organization) */}
        <motion.circle
          cx="24"
          cy="20"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{
            hidden: { pathLength: 0, opacity: 0, cx: 24 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              cx: [24, 25, 24],
              transition: { 
                pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.2 },
                opacity: { duration: 1.5, ease: "easeInOut", delay: 0.2 },
                cx: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }
              }
            },
            hover: {
              cx: 22,
              pathLength: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 25 }
            }
          }}
        />
        {/* Subtle center intersection glow/dot that appears on hover */}
        <motion.circle
          cx="20"
          cy="20"
          r="4"
          fill="currentColor"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 0, scale: 0.5 },
            hover: { 
              opacity: 0.3, 
              scale: 1,
              transition: { duration: 0.3 }
            }
          }}
        />
      </motion.svg>
      <span className="font-fraunces text-2xl font-medium tracking-wide text-ink dark:text-paper">
        One Vision.
      </span>
    </div>
  );
}
