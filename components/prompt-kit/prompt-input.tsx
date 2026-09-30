"use client";

import * as React from"react";
import { cn } from"@/lib/utils";

interface PromptInputContextType {
  value: string;
  onValueChange: (val: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

const PromptInputContext = React.createContext<PromptInputContextType | null>(null);

export interface PromptInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

export function PromptInput({
  value,
  onValueChange,
  onSubmit,
  disabled = false,
  className,
  children,
  ...props
}: PromptInputProps) {
  return (
    <PromptInputContext.Provider value={{ value, onValueChange, onSubmit, disabled }}>
      <div
        className={cn(
         "relative flex rounded-xl border border-border/80 bg-muted/90 shadow-2xs backdrop-blur-xs transition-all duration-200",
         "focus-within:border-foreground/40 focus-within:shadow-xs dark:focus-within:border-white/30",
          disabled &&"opacity-60 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </PromptInputContext.Provider>
  );
}

export interface PromptInputTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,"value" |"onChange"> {
  maxHeight?: number;
  minHeight?: number;
}

export function PromptInputTextarea({
  className,
  placeholder ="Type a message...",
  maxHeight = 120,
  minHeight = 22,
  onKeyDown,
  style,
  ...props
}: PromptInputTextareaProps) {
  const context = React.useContext(PromptInputContext);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const value = context?.value ??"";
  const onValueChange = context?.onValueChange;
  const onSubmit = context?.onSubmit;
  const disabled = context?.disabled;

  // Auto-resize textarea height
  React.useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height ="auto";
      const targetHeight = Math.max(minHeight, Math.min(el.scrollHeight, maxHeight));
      el.style.height = `${targetHeight}px`;
    }
  }, [value, maxHeight, minHeight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(e);
    if (e.key ==="Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (value.trim() && onSubmit && !disabled) {
        onSubmit();
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      disabled={disabled}
      onChange={(e) => onValueChange?.(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      style={{
        minHeight: `${minHeight}px`,
        ...style,
      }}
      className={cn(
       "w-full resize-none bg-transparent font-sans text-xs sm:text-[13px] text-foreground placeholder:text-muted-foreground outline-none leading-relaxed",
       " dark:placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function PromptInputActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-1.5 shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
