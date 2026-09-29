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
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  Cpu,
  X,
} from"lucide-react";
import { cn } from"@/lib/utils";

let messageCounter = 0;
function createMessageId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}


interface ChatMessage {
  id: string;
  role:"user" |"assistant";
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
}

export function AgentChat({ className, isDialog = false, onClose }: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
          :"max-w-2xl mx-auto rounded-lg border border-border/80 bg-background/60 backdrop-blur-md shadow-xs overflow-hidden dark:border-border dark:bg-foreground/60",
        className
      )}
    >
      {/* Minimal Header */}
      <div className="shrink-0 flex items-center justify-between px-3.5 py-2.5 border-b border-border/60 bg-muted/90 dark:border-border dark:bg-foreground/90">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-destructive/10 border border-destructive/30 flex items-center justify-center text-destructive">
            <Bot className="size-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-sans text-xs font-semibold text-foreground  tracking-tight">
              One Vision AI
            </h3>
            <span className="size-1.5 rounded-full bg-status-active animate-pulse" title="Active" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              style={{ minHeight:"28px" }}
              className="size-7 flex items-center justify-center text-muted-foreground hover:text-foreground dark:hover:text-background hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer"
              title="Clear conversation"
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
              title="Close Assistant"
              aria-label="Close Assistant Dialog"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scrollbar-thin [scrollbar-color:var(--border)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border dark:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
        {/* Minimalist Empty State */}
        {messages.length === 0 && (
          <div className="h-full min-h-65 flex flex-col items-center justify-center text-center px-4 py-8 space-y-4 my-auto">
            <div className="size-10 bg-muted border border-border/80 flex items-center justify-center text-destructive shadow-2xs">
              <Bot className="size-5" />
            </div>

            <div className="space-y-1.5 max-w-72">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                One Vision Assistant
              </h4>
              <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed">
                Real-time frontline intelligence, health nodes, solar microgrids, and open ledger records.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-1.5 pt-1 w-full max-w-sm">
              {MINIMAL_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  disabled={isLoading}
                  style={{ minHeight:"28px" }}
                  className="group flex items-center justify-between sm:justify-center gap-2 px-3 py-1 text-[11px] font-sans text-foreground text-muted-foreground bg-muted hover:bg-muted/80 border border-border/80 hover:border-foreground/40 dark:hover:border-white/30 transition-all cursor-pointer shadow-2xs text-left sm:text-center"
                >
                  <span>{item.label}</span>
                  <span className="text-muted-foreground group-hover:text-destructive transition-colors">→</span>
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
               "size-6 rounded-full shrink-0 flex items-center justify-center font-mono text-[10px] border transition-colors mt-0.5",
                msg.role ==="user"
                  ?"bg-foreground text-background border-foreground dark:bg-background dark:text-foreground"
                  :"bg-destructive/10 text-destructive border-destructive/30"
              )}
            >
              {msg.role ==="user" ? <User className="size-3" /> : <Bot className="size-3" />}
            </div>

            {/* Bubble */}
            <div
              className={cn(
               "flex flex-col space-y-1.5 rounded-xl px-3 py-2 text-xs sm:text-body-sm transition-all max-w-[88%]",
                msg.role ==="user"
                  ?"bg-foreground text-background rounded-tr-xs dark:bg-background dark:text-foreground"
                  :"bg-muted/80 text-foreground rounded-tl-xs border border-border/60 shadow-2xs   dark:border-border"
              )}
            >

              {/* Message Content */}
              <div className="whitespace-pre-wrap leading-relaxed font-sans font-light">
                {msg.content}
              </div>

              {/* Assistant Message Meta */}
              {msg.role ==="assistant" && (
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/30  text-[9px] font-mono text-muted-foreground text-muted-foreground">
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
                    title="Copy"
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
            <div className="size-6 rounded-full shrink-0 flex items-center justify-center bg-destructive/10 text-destructive border border-destructive/30 mt-0.5">
              <Bot className="size-3" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/80 border border-border/60 shadow-2xs  dark:border-border">
              <Loader variant="dots" size="sm" />
              <span className="font-mono text-[11px] text-muted-foreground animate-pulse">
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
            placeholder="Ask One Vision AI... (Enter to send)"
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
              style={{ minHeight:"28px", height:"28px", width:"28px" }}
              className={cn(
               "size-7 shrink-0 flex items-center justify-center transition-all duration-150 border",
                inputValue.trim() && !isLoading
                  ?"bg-destructive border-destructive text-background hover:bg-destructive-dim active:scale-95 cursor-pointer shadow-2xs"
                  :"bg-muted border-border/50 text-muted  dark:border-border dark:text-foreground cursor-not-allowed opacity-50"
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
