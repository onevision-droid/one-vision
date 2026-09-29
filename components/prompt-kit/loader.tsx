"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type LoaderVariant =
  | "circular"
  | "classic"
  | "pulse"
  | "pulse-dot"
  | "dots"
  | "typing"
  | "wave"
  | "bars"
  | "terminal"
  | "text-blink"
  | "text-shimmer"
  | "loading-dots";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoaderVariant;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loader({
  variant = "typing",
  size = "md",
  text = "Thinking...",
  className,
  ...props
}: LoaderProps) {
  const sizeMap = {
    sm: "size-4 text-xs",
    md: "size-5 text-sm",
    lg: "size-6 text-base",
  };

  switch (variant) {
    case "circular":
      return (
        <div className={cn("inline-flex items-center gap-2", className)} {...props}>
          <svg
            className={cn("animate-spin text-destructive", sizeMap[size].split(" ")[0])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      );

    case "dots":
    case "typing":
      return (
        <div
          className={cn("inline-flex items-center gap-1 py-1 px-2 text-muted-foreground", className)}
          {...props}
        >
          <span className="size-1.5 rounded-full bg-destructive animate-bounce [animation-delay:-0.3s]" />
          <span className="size-1.5 rounded-full bg-destructive animate-bounce [animation-delay:-0.15s]" />
          <span className="size-1.5 rounded-full bg-destructive animate-bounce" />
        </div>
      );

    case "pulse-dot":
      return (
        <div className={cn("relative flex items-center justify-center size-3", className)} {...props}>
          <span className="absolute inline-flex size-full rounded-full bg-destructive/40 animate-ping" />
          <span className="relative inline-flex size-1.5 rounded-full bg-destructive" />
        </div>
      );

    case "pulse":
      return (
        <div
          className={cn(
            "rounded-md bg-foreground/10 dark:bg-white/10 animate-pulse h-4 w-24",
            className
          )}
          {...props}
        />
      );

    case "bars":
    case "wave":
      return (
        <div className={cn("inline-flex items-end gap-1 h-4", className)} {...props}>
          <span className="w-1 bg-destructive animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
          <span className="w-1 bg-destructive animate-[pulse_0.6s_ease-in-out_0.2s_infinite] h-4" />
          <span className="w-1 bg-destructive animate-[pulse_0.6s_ease-in-out_0.4s_infinite] h-3" />
        </div>
      );

    case "terminal":
      return (
        <div className={cn("inline-flex items-center font-mono text-xs text-ink-700 dark:text-background/80", className)} {...props}>
          <span className="text-destructive mr-1">&gt;</span>
          <span>{text}</span>
          <span className="ml-1 inline-block w-1.5 h-3.5 bg-destructive animate-pulse" />
        </div>
      );

    case "text-blink":
      return (
        <span className={cn("font-mono text-xs text-muted-foreground animate-pulse", className)} {...props}>
          {text}
        </span>
      );

    case "text-shimmer":
      return (
        <span
          className={cn(
            "font-sans text-xs font-medium bg-linear-to-r from-ink-400 via-safety-orange to-ink-400 bg-size-[200%_auto] bg-clip-text text-transparent animate-[shimmer_2s_linear_infinite]",
            className
          )}
          {...props}
        >
          {text}
        </span>
      );

    case "classic":
    case "loading-dots":
    default:
      return (
        <div className={cn("inline-flex items-center gap-2", className)} {...props}>
          <div className="flex items-center gap-1">
            <span className="size-1 rounded-full bg-ink-500 animate-pulse" />
            <span className="size-1 rounded-full bg-ink-500 animate-pulse [animation-delay:200ms]" />
            <span className="size-1 rounded-full bg-ink-500 animate-pulse [animation-delay:400ms]" />
          </div>
          {text && <span className="font-sans text-xs text-muted-foreground">{text}</span>}
        </div>
      );
  }
}
