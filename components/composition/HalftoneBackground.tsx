import { cn } from '@/lib/utils'

interface HalftoneBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number // Provide a convenient prop to adjust opacity from 10 to 100
}

export function HalftoneBackground({ opacity = 10, className, ...props }: HalftoneBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-[url('/new-illustrations/halftone-texture.png')] mix-blend-overlay -z-10 pointer-events-none",
        className
      )}
      style={{ opacity: opacity / 100 }}
      {...props}
    />
  )
}
