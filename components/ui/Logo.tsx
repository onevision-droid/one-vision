"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isHovered?: boolean;
}

export function Logo({ className, isHovered = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <motion.svg 
        viewBox="0 0 32 32" 
        className="w-5 h-5 text-ink-900 overflow-visible"
        initial="hidden"
        animate={isHovered ? "hover" : "visible"}
      >
        {/* Left Block (Community) */}
        <motion.rect
          x="4"
          y="8"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            hidden: { pathLength: 0, opacity: 0, x: 4 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              x: [4, 2, 4],
              transition: { 
                pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.2, ease: "easeOut" },
                x: { repeat: Infinity, duration: 8, ease: "easeInOut" }
              }
            },
            hover: {
              x: 6,
              pathLength: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 400, damping: 30 }
            }
          }}
        />
        {/* Right Block (Organization) */}
        <motion.rect
          x="14"
          y="10"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            hidden: { pathLength: 0, opacity: 0, x: 14 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              x: [14, 16, 14],
              transition: { 
                pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
                opacity: { duration: 1.2, ease: "easeOut", delay: 0.15 },
                x: { repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.15 }
              }
            },
            hover: {
              x: 12,
              pathLength: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 400, damping: 30 }
            }
          }}
        />
        {/* Center intersection block */}
        <motion.rect
          x="12"
          y="13"
          width="8"
          height="8"
          fill="currentColor"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 0, scale: 0.5 },
            hover: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.2, ease: "easeOut" }
            }
          }}
        />
      </motion.svg>
      <span className="font-sans text-body-sm font-semibold tracking-wide text-ink-900 leading-none">
        One Vision
      </span>
    </div>
  );
}
