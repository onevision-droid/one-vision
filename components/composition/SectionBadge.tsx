import { cn } from '@/lib/utils'

interface SectionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SectionBadge({ children, className, ...props }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
