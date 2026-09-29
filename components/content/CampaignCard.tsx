import { ArrowRight } from"lucide-react";
import Link from"next/link";
import Image from"next/image";

interface CampaignCardProps {
  title: string;
  summary: string;
  status: string;
  href: string;
  image?: string;
}

export function CampaignCard({ title, summary, status, href, image ="/home-hero-2026.jpg" }: CampaignCardProps) {
  return (
    <Link href={href} className="group flex flex-col h-full border border-border hover:border-foreground transition-colors bg-muted hover:bg-foreground overflow-hidden">
      <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border group-hover:border-foreground">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
        />
        {/* Brutalist overlay */}
        <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
      </div>
      <div className="flex flex-col flex-1 p-5 lg:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-1.5 bg-destructive" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-background/60 transition-colors">
              {status}
            </span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground group-hover:text-destructive transition-colors" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground group-hover:text-background transition-colors leading-tight">
          {title}
        </h3>
        <p className="font-sans text-base-sm text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed flex-1">
          {summary}
        </p>
        <div className="mt-auto pt-4 border-t border-border group-hover:border-border transition-colors">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground group-hover:text-destructive transition-colors">
            Read more <ArrowRight className="size-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
