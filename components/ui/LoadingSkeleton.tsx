import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export function LoadingSkeleton({ className, type = "card" }: { className?: string, type?: "card" | "list" | "detail" }) {
  if (type === "list") {
    return (
      <div className={cn("space-y-6", className)}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4 items-start">
            <Skeleton className="h-20 w-20 rounded-none shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className={cn("space-y-8", className)}>
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <Skeleton className="h-100 w-full rounded-none" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  // Default: card
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
