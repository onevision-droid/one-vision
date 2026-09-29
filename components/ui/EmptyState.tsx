import { cn } from"@/lib/utils";
import { FolderXIcon } from"lucide-react";
import React from"react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}

export function EmptyState({ title, description, action, icon: Icon = FolderXIcon, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed border-border bg-muted", className)}>
      <div className="bg-bg-section-alt p-3.5 mb-4 text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-sans text-heading-md font-semibold text-foreground mb-2">{title}</h3>
      {description && <p className="font-sans text-body-sm text-muted-foreground max-w-md mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
