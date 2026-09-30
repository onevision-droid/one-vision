"use client";

import * as React from"react";
import { useState, useEffect, useRef } from"react";
import { motion, AnimatePresence } from"framer-motion";
import { Sparkles } from "lucide-react";
import { AgentChat } from "@/components/ai/agent-chat";
import { cn } from "@/lib/utils";

export const AGENT_CHAT_OPEN_EVENT = "open-agent-chat";

/**
 * Programmatically open the floating AI assistant dialog from any component.
 */
export function openAgentChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AGENT_CHAT_OPEN_EVENT));
  }
}

export function FloatingAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Listen for global open triggers
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(AGENT_CHAT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(AGENT_CHAT_OPEN_EVENT, handleOpen);
  }, []);

  // Listen for Escape key to close dialog and handle Focus Trapping
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      // Focus the textarea when opened
      const timer = setTimeout(() => {
        const input = dialogRef.current?.querySelector('textarea') as HTMLTextAreaElement;
        if (input) input.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        } else if (e.key === "Tab" && dialogRef.current) {
          const focusableElements = dialogRef.current.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };
      
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
        if (prevFocusRef.current) {
          prevFocusRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Beacon Button - hidden when dialog is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 print:hidden"
          >
            <motion.button
              ref={triggerRef}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open Community Guide Assistant"
              aria-expanded={false}
              className="group relative flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-card/95 hover:bg-card text-foreground border border-border/80 hover:border-primary/50 shadow-md hover:shadow-lg backdrop-blur-md rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
            >
              <div className="relative flex items-center justify-center size-6 rounded-sm bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <Sparkles className="size-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-medium text-foreground tracking-normal hidden sm:inline">
                  Community Guide
                </span>
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" title="Active" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dialog Type UI */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing on click-outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-2xs z-40"
              aria-hidden="true"
            />

            {/* Anchored Dialog Container */}
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type:"spring", stiffness: 420, damping: 32 }}
              role="dialog"
              aria-modal="true"
              aria-label="One Vision AI Assistant"
              className={cn(
                "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50",
                "w-[calc(100vw-2rem)] sm:w-105 md:w-110",
                "h-125 sm:h-135 max-h-[calc(100dvh-3rem)]",
                "border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl rounded-md",
                "flex flex-col overflow-hidden dark:border-border dark:bg-foreground/95"
              )}
            >
              <AgentChat isDialog={true} onClose={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
