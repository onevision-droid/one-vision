import { cn } from "@/lib/utils";
import { AlertTriangleIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "We couldn't load this content. Please try again later.", 
  onRetry, 
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-danger/20 rounded-md bg-surface", className)}>
      <div className="bg-danger/10 p-3.5 rounded-full mb-4 text-danger">
        <AlertTriangleIcon className="h-6 w-6" />
      </div>
      <h3 className="font-sans text-heading-md font-semibold text-ink-900 mb-2">{title}</h3>
      <p className="font-sans text-body-sm text-ink-500 max-w-md mb-6">{description}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
