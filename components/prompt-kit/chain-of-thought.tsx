"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Brain, CheckCircle2 } from "lucide-react";

interface ChainOfThoughtContextType {
  openSteps: Record<string, boolean>;
  toggleStep: (id: string) => void;
}

const ChainOfThoughtContext = React.createContext<ChainOfThoughtContextType | null>(null);

export function ChainOfThought({
  className,
  children,
  defaultOpenAll = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { defaultOpenAll?: boolean }) {
  const [openSteps, setOpenSteps] = React.useState<Record<string, boolean>>({});

  const toggleStep = React.useCallback((id: string) => {
    setOpenSteps((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? !defaultOpenAll : !prev[id],
    }));
  }, [defaultOpenAll]);

  return (
    <ChainOfThoughtContext.Provider value={{ openSteps, toggleStep }}>
      <div
        className={cn(
          "w-full my-3 space-y-2 rounded-md border border-border/60 bg-muted/40 p-3 shadow-2xs backdrop-blur-xs",
          "dark:border-white/10 dark:bg-white/3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 pb-1 text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground dark:text-background/60 border-b border-border/40 dark:border-white/5">
          <Brain className="size-3.5 text-destructive" />
          <span>Reasoning Protocol</span>
        </div>
        <div className="space-y-1.5 pt-1">{children}</div>
      </div>
    </ChainOfThoughtContext.Provider>
  );
}

interface StepContextType {
  id: string;
  isOpen: boolean;
  toggle: () => void;
}

const StepContext = React.createContext<StepContextType | null>(null);

export function ChainOfThoughtStep({
  className,
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { id?: string }) {
  const generatedId = React.useId();
  const stepId = id || generatedId;
  const parent = React.useContext(ChainOfThoughtContext);

  const isOpen = parent?.openSteps[stepId] ?? true;
  const toggle = () => parent?.toggleStep(stepId);

  return (
    <StepContext.Provider value={{ id: stepId, isOpen, toggle }}>
      <div
        className={cn(
          "rounded-sm border border-border/40 bg-muted/60 overflow-hidden transition-all duration-200",
          "dark:border-white/5 dark:bg-white/2",
          isOpen && "border-border/70 dark:border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </StepContext.Provider>
  );
}

export function ChainOfThoughtTrigger({
  className,
  children,
  status = "done",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  status?: "done" | "active" | "idle";
}) {
  const step = React.useContext(StepContext);

  return (
    <button
      type="button"
      onClick={step?.toggle}
      className={cn(
        "flex w-full items-center justify-between gap-3 px-3 py-2 text-left font-sans text-xs font-medium text-foreground transition-colors",
        "hover:bg-black/2 dark:text-background dark:hover:bg-white/4 cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 truncate">
        {status === "done" && (
          <CheckCircle2 className="size-3.5 text-status-active shrink-0" />
        )}
        {status === "active" && (
          <span className="size-2 rounded-full bg-destructive animate-pulse shrink-0" />
        )}
        <span className="truncate">{children}</span>
      </div>
      <ChevronDown
        className={cn(
          "size-3.5 text-ink-400 transition-transform duration-200 shrink-0",
          step?.isOpen && "rotate-180 text-foreground dark:text-background"
        )}
      />
    </button>
  );
}

export function ChainOfThoughtContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const step = React.useContext(StepContext);

  if (!step?.isOpen) return null;

  return (
    <div
      className={cn(
        "px-3 pb-2.5 pt-1 space-y-1 text-xs text-muted-foreground font-sans border-t border-border/30 dark:border-white/5",
        "dark:text-background/70 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ChainOfThoughtItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start gap-2 py-0.5", className)}
      {...props}
    >
      <span className="text-destructive/70 select-none mt-0.5">•</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}
