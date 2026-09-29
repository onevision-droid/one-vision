"use client";

import * as React from"react";
import { cn } from"@/lib/utils";

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
       "border border-border/70 bg-muted/70 text-ink-700 shadow-2xs backdrop-blur-xs",
       "hover:border-foreground/40 hover:bg-muted hover:text-foreground hover:-translate-y-0.5",
       "dark:border-border  text-muted-foreground dark:hover:border-white/30 dark:hover:bg-foreground/10 dark:hover:text-background",
        active &&"border-safety-orange/50 bg-destructive/10 text-destructive font-medium dark:bg-destructive/15",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
