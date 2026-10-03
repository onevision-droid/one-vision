"use client";

import * as React from"react";
import { useState, useRef, useEffect } from"react";
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from"@/components/prompt-kit/prompt-input";
import { Loader } from"@/components/prompt-kit/loader";

import {
  ArrowUpIcon,
  Sparkles,
  User,
  RotateCcw,
  Copy,
  Check,
  Cpu,
  X,
} from "lucide-react";
import { cn } from"@/lib/utils";

let messageCounter = 0;
function createMessageId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}


export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  modelUsed?: string;
  fallbackAttempted?: boolean;
  executionTimeMs?: number;
}

const MINIMAL_SUGGESTIONS = [
  { label:"Health Nodes", query:"How does One Vision maintain decentralized health nodes?" },
  { label:"Open Ledger", query:"What is the Open Ledger and how are funds audited?" },
  { label:"Volunteer", query:"How can I volunteer or mentor in Imphal?" },
];

export interface AgentChatProps {
  className?: string;
  isDialog?: boolean;
  onClose?: () => void;
  initialMessages?: ChatMessage[];
  initialLoading?: boolean;
}

export function AgentChat({
  className,
  isDialog = false,
  onClose,
  initialMessages,
  initialLoading = false,
}: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages || []);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;
    if (text.length > 4000) {
      alert("Message is too long. Please keep it under 4000 characters.");
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId("user"),
      role:"user",
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setInputValue("");
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter((m) => !m.id.startsWith("error-"))
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      const assistantMessage: ChatMessage = {
        id: createMessageId("assistant"),
        role:"assistant",
        content: data.content,
        modelUsed: data.modelUsed,
        fallbackAttempted: data.fallbackAttempted,
        executionTimeMs: data.executionTimeMs,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message :"Timeout or network failure";
      const errorMessage: ChatMessage = {
        id: createMessageId("error"),
        role:"assistant",
        content: `⚠️ **Notice:** Unable to reach AI models at this moment (${errorText}). Please retry or contact our frontline office.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div
      className={cn(
       "flex flex-col h-full w-full",
        isDialog
          ?"rounded-none border-none bg-transparent shadow-none"
          :"max-w-2xl mx-auto rounded-none border border-border/80 bg-background/60 backdrop-blur-md shadow-xs overflow-hidden dark:border-border dark:bg-foreground/60",
        className
      )}
    >
      {/* Minimal Header */}
      <div className="shrink-0 flex items-center justify-between px-3.5 py-2.5 border-b border-border/60 bg-muted/90 dark:border-border dark:bg-foreground/90">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Sparkles className="size-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-sans text-xs font-medium text-foreground tracking-tight">
              Community Guide
            </h3>
            <span className="size-1.5 rounded-none bg-emerald-500 animate-pulse" aria-hidden="true" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              style={{ minHeight:"28px" }}
              className="size-7 flex items-center justify-center text-muted-foreground hover:text-foreground dark:hover:text-background hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer"
              aria-label="Clear conversation"
            >
              <RotateCcw className="size-3.5" />
            </button>
          )}

          {isDialog && onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{ minHeight:"28px" }}
              className="size-7 flex items-center justify-center text-muted-foreground hover:text-foreground dark:hover:text-background hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer"
              aria-label="Close Assistant Dialog"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto scroll-fade-y p-3.5 sm:p-4 space-y-3.5 scrollbar-thin [scrollbar-color:var(--border)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
        {/* Minimalist Empty State */}
        {messages.length === 0 && (
          <div className="h-full min-h-65 flex flex-col items-center justify-center text-center px-4 py-8 space-y-4 my-auto">
            <div className="size-10 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xs">
              <Sparkles className="size-5" />
            </div>

            <div className="space-y-1.5 max-w-72">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                Community Guide
              </h4>
              <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed">
                Frontline assistance, clinic services, emergency relief, and verified open ledger records.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-1.5 pt-1 w-full max-w-sm">
              {MINIMAL_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  disabled={isLoading}
                  style={{ minHeight: "28px" }}
                  className="group flex items-center justify-between sm:justify-center gap-2 px-3 py-1 text-[11px] font-sans text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 border border-border/80 hover:border-foreground/40 dark:hover:border-white/30 rounded-none transition-all cursor-pointer shadow-2xs text-left sm:text-center"
                >
                  <span>{item.label}</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
             "flex gap-2.5 max-w-2xl",
              msg.role ==="user" ?"ml-auto flex-row-reverse" :"mr-auto"
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "size-6 rounded-none shrink-0 flex items-center justify-center font-mono text-[10px] border transition-colors mt-0.5",
                msg.role === "user"
                  ? "bg-foreground text-background border-foreground dark:bg-background dark:text-foreground"
                  : "bg-primary/10 text-primary border-primary/20"
              )}
            >
              {msg.role === "user" ? <User className="size-3" /> : <Sparkles className="size-3" />}
            </div>

            {/* Bubble */}
            <div
              className={cn(
               "flex flex-col space-y-1.5 rounded-none px-3 py-2 text-xs sm:text-body-sm transition-all max-w-[88%]",
                msg.role ==="user"
                  ?"bg-foreground text-background rounded-none dark:bg-background dark:text-foreground"
                  :"bg-muted/80 text-foreground rounded-none border border-border/60 shadow-2xs dark:border-border"
              )}
            >

              {/* Message Content */}
              <div className="whitespace-pre-wrap leading-relaxed font-sans font-light">
                {msg.content}
              </div>

              {/* Assistant Message Meta */}
              {msg.role === "assistant" && (
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/30 text-[9px] font-mono text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {msg.modelUsed && (
                      <span className="inline-flex items-center gap-0.5">
                        <Cpu className="size-2.5 text-destructive" />
                        <span>{msg.modelUsed.split("/").pop()?.replace(":free","")}</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="inline-flex items-center gap-0.5 hover:text-foreground dark:hover:text-background transition-colors cursor-pointer"
                    aria-label="Copy message content"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="size-2.5 text-status-active" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-2.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-2 max-w-2xl mr-auto">
            <div className="size-6 rounded-none shrink-0 flex items-center justify-center bg-primary/10 text-primary border border-primary/20 mt-0.5">
              <Sparkles className="size-3" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-none bg-muted/80 border border-border/60 shadow-2xs dark:border-border">
              <Loader variant="dots" size="sm" />
              <span className="font-mono text-[11px] text-muted-foreground shimmer">
                Thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sleek, Minimalist Input Footer */}
      <div className="shrink-0 p-2 sm:p-2.5 border-t border-border/60 bg-background/95 dark:border-border dark:bg-foreground/95 backdrop-blur-md">
        <PromptInput
          value={inputValue}
          onValueChange={setInputValue}
          onSubmit={() => handleSend()}
          disabled={isLoading}
          className="flex-row items-center gap-2 pl-3 pr-1.5 py-1 border border-border/80 bg-muted dark:bg-foreground/60 focus-within:border-foreground/40 dark:focus-within:border-white/30 focus-within:shadow-2xs transition-all"
        >
          <PromptInputTextarea
            id="agent-chat-prompt-input"
            aria-label="Ask Community Guide"
            placeholder="Ask Community Guide... (Enter to send)"
            minHeight={22}
            maxHeight={80}
            className="py-1 text-xs sm:text-[13px] leading-snug"
          />
          <PromptInputActions>
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send Message"
              style={{ minHeight: "28px", height: "28px", width: "28px" }}
              className={cn(
                "size-7 shrink-0 flex items-center justify-center transition-all duration-150 border rounded-none",
                inputValue.trim() && !isLoading
                  ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90 active:scale-95 cursor-pointer shadow-2xs"
                  : "bg-muted border-border/50 text-muted-foreground dark:border-border dark:text-foreground cursor-not-allowed opacity-50"
              )}
            >
              <ArrowUpIcon className="size-3.5" />
            </button>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}
