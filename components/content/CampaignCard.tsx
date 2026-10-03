import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export interface CampaignCardProps {
  title: string;
  summary: string;
  status?: string;
  href: string;
  image?: string;
  headingLevel?: "h2" | "h3";
}

export function CampaignCard({
  title,
  summary,
  status = "Programme",
  href,
  image = "/home-hero-2026.jpg",
  headingLevel = "h3",
}: CampaignCardProps) {
  const isUrgent = status.toLowerCase().includes("urgent");
  const badgeVariant = isUrgent ? "urgent" : "programme";
  const HeadingTag = headingLevel;

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
          <Badge variant={badgeVariant} className="rounded-none shadow-xs pointer-events-auto">
            {status}
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
        <HeadingTag className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {title}
        </HeadingTag>

        <p className="font-sans text-sm text-muted-foreground font-normal leading-relaxed flex-1 line-clamp-3">
          {summary}
        </p>

        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-primary group-hover:text-primary-hover transition-colors">
            <span>Learn More</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export { CampaignCard as ProgrammeCard };
