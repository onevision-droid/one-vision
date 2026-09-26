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
    <section className={cn("w-full py-12 md:py-16", className)} aria-label={heading || "Image gallery"}>
      {(heading || subheading) && (
        <div className="mb-10 lg:mb-12 max-w-2xl">
          {heading && (
            <h2 className="font-serif text-display-md font-light tracking-tight text-ink-900 mb-3">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="font-sans text-body-lg text-ink-500 font-light leading-relaxed">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start",
          reversed && "lg:[direction:rtl] lg:*:[direction:ltr]"
        )}
      >
        {/* Lead Image: spans 7 columns */}
        <figure className="lg:col-span-7 flex flex-col bg-surface border border-border-default overflow-hidden group">
          <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-surface-alt">
            <Image
              src={leadImage.src}
              alt={leadImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          {(leadImage.caption || leadImage.location) && (
            <figcaption className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border-default/80 text-body-sm">
              {leadImage.caption && (
                <span className="text-ink-700 font-light leading-relaxed">
                  {leadImage.caption}
                </span>
              )}
              {leadImage.location && (
                <span className="text-caption font-mono text-ink-400 uppercase tracking-wider shrink-0">
                  {leadImage.location}
                </span>
              )}
            </figcaption>
          )}
        </figure>

        {/* Satellites: span 5 columns */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {satellites.slice(0, 3).map((satellite, idx) => (
            <figure
              key={`${satellite.src}-${idx}`}
              className="flex flex-col bg-surface border border-border-default overflow-hidden group"
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-surface-alt",
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
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              {(satellite.caption || satellite.location) && (
                <figcaption className="p-3.5 sm:p-4 flex items-center justify-between gap-2 border-t border-border-default/80 text-caption">
                  {satellite.caption && (
                    <span className="text-ink-700 font-light truncate">
                      {satellite.caption}
                    </span>
                  )}
                  {satellite.location && (
                    <span className="font-mono text-ink-400 uppercase tracking-wider shrink-0">
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