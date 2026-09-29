import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MosaicImageItem {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "video";
}

export interface ImageMosaicProps {
  heading?: string;
  subheading?: string;
  leadImage: MosaicImageItem;
  satellites: MosaicImageItem[];
  reversed?: boolean;
  className?: string;
}

export function ImageMosaic({
  heading,
  subheading,
  leadImage,
  satellites,
  reversed = false,
  className,
}: ImageMosaicProps) {
  return (
    <section className={cn("w-full py-8 lg:py-14 border-t border-border", className)} aria-label={heading || "Image gallery"}>
      {(heading || subheading) && (
        <div className="mb-6 lg:mb-8 border-l-4 border-safety-orange pl-6">
          {heading && (
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3 leading-tight">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="font-sans text-lg max-w-prose text-muted-foreground font-light leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-0 border-x border-border",
          reversed && "lg:[direction:rtl] lg:*:[direction:ltr]"
        )}
      >
        {/* Lead Image: spans 7 columns */}
        <figure className="lg:col-span-7 flex flex-col bg-muted border-y lg:border-y-0 lg:border-r border-border overflow-hidden group">
          <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-foreground">
            <Image
              src={leadImage.src}
              alt={leadImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
          </div>
          {(leadImage.caption || leadImage.location) && (
            <figcaption className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border bg-background">
              {leadImage.caption && (
                <span className="font-sans text-base-sm text-ink-700 font-light leading-relaxed max-w-md">
                  {leadImage.caption}
                </span>
              )}
              {leadImage.location && (
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-destructive shrink-0">
                  {leadImage.location}
                </span>
              )}
            </figcaption>
          )}
        </figure>

        {/* Satellites: span 5 columns */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-border-default border-b lg:border-b-0 border-border">
          {satellites.slice(0, 3).map((satellite, idx) => (
            <figure
              key={`${satellite.src}-${idx}`}
              className="flex flex-col sm:flex-row lg:flex-col bg-muted overflow-hidden group h-full"
            >
              <div
                className={cn(
                  "relative overflow-hidden bg-foreground sm:w-1/2 lg:w-full border-b sm:border-b-0 lg:border-b sm:border-r lg:border-r-0 border-border",
                  satellite.aspectRatio === "portrait"
                    ? "aspect-3/4"
                    : satellite.aspectRatio === "square"
                    ? "aspect-square"
                    : "aspect-video"
                )}
              >
                <Image
                  src={satellite.src}
                  alt={satellite.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              </div>
              {(satellite.caption || satellite.location) && (
                <figcaption className="p-4 sm:p-5 flex flex-col justify-between gap-4 bg-background sm:w-1/2 lg:w-full grow">
                  {satellite.caption && (
                    <span className="font-sans text-base-sm text-ink-700 font-light line-clamp-3">
                      {satellite.caption}
                    </span>
                  )}
                  {satellite.location && (
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-destructive shrink-0 mt-auto">
                      {satellite.location}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}