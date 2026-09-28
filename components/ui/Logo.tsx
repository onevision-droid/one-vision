"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "orange" | "blue";
}

// Precision SVG path of the Ocular Visor Housing from the reference design
const HOUSING_PATH = `
M 50 17
C 64 17 73 24 77 32
C 80 32 86 31 92 31.5
C 94 31.7 94.5 35 92 37
C 86 38.5 80 38 75 40
C 70 42.5 70 57.5 75 60
C 80 62 86 61.5 92 63
C 94.5 65 94 68.3 92 68.5
C 86 69 80 68 77 68
C 73 76 64 83 50 83
C 36 83 27 76 23 68
C 20 68 14 69 8 68.5
C 6 68.3 5.5 65 8 63
C 14 61.5 20 62 25 60
C 30 57.5 30 42.5 25 40
C 20 38 14 38.5 8 37
C 5.5 35 6 31.7 8 31.5
C 14 31 20 32 23 32
C 27 24 36 17 50 17
Z
M 50 26
A 24 24 0 0 0 50 74
A 24 24 0 0 0 50 26
Z
`.trim().replace(/\s+/g, " ");

export function Logo({
  className,
  showText = true,
  size = "md",
  variant = "default",
}: LogoProps) {
  const sizeMap = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };

  const colorMap = {
    default: "text-ink-900 dark:text-paper",
    orange: "text-safety-orange",
    blue: "text-[#1060C4]",
  };

  return (
    <div className={cn("group flex items-center gap-3 select-none", className)}>
      {/* Precision Ocular Visor Mark (Continuous Loop Animation) */}
      <motion.div
        className={cn("relative shrink-0 flex items-center justify-center", sizeMap[size])}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-full h-full overflow-visible", colorMap[variant])}
          aria-hidden="true"
        >
          {/* Subtle Background Glow/Shadow to match the ocular depth */}
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="currentColor"
            opacity="0.04"
          />

          {/* Ocular Visor Housing (Micro-Pulse Calibration Loop) */}
          <motion.path
            d={HOUSING_PATH}
            fill="currentColor"
            fillRule="evenodd"
            animate={{
              scale: [1, 1.018, 1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "50px 50px" }}
          />

          {/* Contrast Spacer Ring (White / Paper Sclera) */}
          <circle
            cx="50"
            cy="50"
            r="23.5"
            className="fill-paper dark:fill-surface"
          />

          {/* Sentinel Eye Pupil & Specular Glint (Continuous Scanning Loop) */}
          <motion.g
            animate={{
              x: [0, 3.2, 3.2, 0, -3.2, -3.2, 0],
              y: [0, -1.2, -1.2, 0, -1, -1, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.22, 0.35, 0.5, 0.72, 0.85, 1],
            }}
          >
            {/* Pupil */}
            <circle
              cx="50"
              cy="50"
              r="14.5"
              fill="currentColor"
            />

            {/* Specular Highlight Glint (Twinkle Loop) */}
            <motion.circle
              cx="56.5"
              cy="43.5"
              r="4.2"
              fill="#FFFFFF"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 2.75,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "56.5px 43.5px" }}
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Brand Typographic Lockup */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-sans text-[15px] font-extrabold tracking-widest uppercase text-ink-900 leading-none">
            One Vision
          </span>
          <span className="font-mono text-[9px] font-medium tracking-[0.16em] uppercase text-ink-500 leading-tight mt-1">
            Humanitarian Vanguard
          </span>
        </div>
      )}
    </div>
  );
}
