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
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-terra/20 rounded-none bg-terra/5", className)}>
      <div className="bg-terra/10 p-4 rounded-none mb-4 text-terra">
        <AlertTriangleIcon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-fraunces font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink/70 max-w-md mb-6">{description}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
