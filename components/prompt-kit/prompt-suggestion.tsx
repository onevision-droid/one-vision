"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PromptSuggestionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function PromptSuggestion({
  className,
  active = false,
  children,
  ...props
}: PromptSuggestionProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-normal transition-all duration-200 cursor-pointer select-none",
        "border border-border-default/70 bg-surface/70 text-ink-700 shadow-2xs backdrop-blur-xs",
        "hover:border-ink-900/40 hover:bg-surface hover:text-ink-900 hover:-translate-y-0.5",
        "dark:border-white/10 dark:bg-white/5 dark:text-paper/80 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-paper",
        active && "border-safety-orange/50 bg-safety-orange/10 text-safety-orange font-medium dark:bg-safety-orange/15",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
