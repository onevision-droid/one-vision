import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface StoryCardProps {
  title: string;
  summary: string;
  author?: string;
  date?: string;
  href: string;
  image?: string;
  badge?: string;
}

export function StoryCard({
  title,
  summary,
  author,
  date,
  href,
  image = "/community_voices.jpg",
  badge = "Story",
}: StoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full bg-card border border-border hover:border-primary/40 transition-all duration-300 rounded-none overflow-hidden hover:shadow-md"
    >
      <div className="relative w-full aspect-16/10 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-95"
        />
        {/* Overlay badges and action circle at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between pointer-events-none bg-linear-to-t from-black/40 via-black/10 to-transparent">
          <Badge variant="story" className="rounded-none shadow-xs pointer-events-auto">
            {badge}
          </Badge>
          <div
            className="size-8 rounded-none bg-white text-slate-800 shadow-xs flex items-center justify-center transition-all duration-200 group-hover:bg-primary group-hover:text-white pointer-events-auto"
            aria-hidden="true"
          >
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-2.5">
        {(date || author) && (
          <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
            {date && <time dateTime={date}>{date}</time>}
            {date && author && <span aria-hidden="true">·</span>}
            {author && <span className="truncate">{author}</span>}
          </div>
        )}

        <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="font-sans text-sm text-muted-foreground font-normal leading-relaxed flex-1 line-clamp-3">
          {summary}
        </p>

        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary group-hover:text-primary-hover transition-colors">
            <span>Read Story</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
