import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export interface BreadcrumbLinkProps {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbLinkProps[];
  className?: string;
  variant?: "default" | "container";
}

export function Breadcrumbs({ items = [], className, variant = "container" }: BreadcrumbsProps) {
  const isContainer = variant === "container";

  return (
    <Breadcrumb
      className={cn(
        "mb-6",
        isContainer && "inline-flex items-center px-3.5 py-1.5 bg-card border border-border rounded-none shadow-2xs",
        className
      )}
    >
      <BreadcrumbList className="gap-1.5 text-xs font-sans">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="[&>svg]:size-3 text-muted-foreground/60" />
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="font-medium text-primary">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
