import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <Link href={href} className="group relative flex flex-col h-full border border-border-default hover:border-ink-900 transition-colors bg-surface hover:bg-ink-900 overflow-hidden">
      {image && (
        <div className="relative w-full aspect-16/10 overflow-hidden bg-ink-900 border-b border-border-default group-hover:border-ink-900">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-ink-900/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 lg:p-6 gap-4">
        <div className="flex flex-col gap-2 border-b border-border-default group-hover:border-paper/20 transition-colors pb-4">
          <time className="font-mono text-[10px] font-bold tracking-widest uppercase text-safety-orange">{date}</time>
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-ink-500 group-hover:text-paper/60 transition-colors">{author}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-ink-900 group-hover:text-paper transition-colors leading-tight">
          {title}
        </h3>
        <p className="font-sans text-role-body-sm text-ink-500 group-hover:text-paper/70 transition-colors leading-relaxed flex-1 line-clamp-4">
          {summary}
        </p>
        <div className="mt-auto pt-4 border-t border-border-default group-hover:border-paper/20 transition-colors">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 group-hover:text-safety-orange transition-colors">
            Read more <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
