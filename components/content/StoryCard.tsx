import Link from"next/link";
import Image from"next/image";
import { ArrowRight } from"lucide-react";

interface StoryCardProps {
 title: string;
 summary: string;
 author: string;
 date: string;
 href: string;
 image?: string;
}

export function StoryCard({ title, summary, author, date, href, image }: StoryCardProps) {
  return (
    <Link href={href} className="group relative flex flex-col h-full border border-border hover:border-foreground transition-colors bg-muted hover:bg-foreground overflow-hidden">
      {image && (
        <div className="relative w-full aspect-16/10 overflow-hidden bg-foreground border-b border-border group-hover:border-foreground">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 lg:p-6 gap-4">
        <div className="flex flex-col gap-2 border-b border-border group-hover:border-paper/20 transition-colors pb-4">
          <time className="font-mono text-[10px] font-bold tracking-widest uppercase text-destructive">{date}</time>
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-background/60 transition-colors">{author}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground group-hover:text-background transition-colors leading-tight">
          {title}
        </h3>
        <p className="font-sans text-base-sm text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed flex-1 line-clamp-4">
          {summary}
        </p>
        <div className="mt-auto pt-4 border-t border-border group-hover:border-paper/20 transition-colors">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors">
            Read more <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
