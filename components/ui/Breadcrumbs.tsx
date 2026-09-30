import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from"@/components/ui/breadcrumb";
import React from"react";
import { cn } from"@/lib/utils";

export interface BreadcrumbLinkProps {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbLinkProps[];
  className?: string;
}

export function Breadcrumbs({ items = [], className }: BreadcrumbsProps) {
  return (
    <Breadcrumb className={cn("mb-6", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
