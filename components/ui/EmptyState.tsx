import { cn } from "@/lib/utils";
import { FolderXIcon } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
}

export function EmptyState({ title, description, action, icon: Icon = FolderXIcon, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-ink/10 rounded-none bg-mist/30", className)}>
      <div className="bg-mist p-4 rounded-none mb-4 text-ink/40">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-fraunces font-bold text-ink mb-2">{title}</h3>
      {description && <p className="text-sm text-ink/60 max-w-md mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
