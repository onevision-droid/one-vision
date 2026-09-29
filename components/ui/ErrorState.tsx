import { cn } from"@/lib/utils";
import { AlertTriangleIcon } from"lucide-react";
import React from"react";
import { Button } from"./button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title ="Something went wrong", 
  description ="We couldn't load this content. Please try again later.", 
  onRetry, 
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-destructive/20 bg-muted rounded-sm", className)}>
      <div className="bg-destructive/10 p-3.5 mb-4 text-destructive rounded-xs">
        <AlertTriangleIcon className="h-6 w-6" />
      </div>
      <h3 className="font-sans text-heading-md font-semibold text-foreground mb-2">{title}</h3>
      <p className="font-sans text-body-sm text-muted-foreground max-w-md mb-6">{description}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
