import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CampaignCardProps {
  title: string;
  summary: string;
  status: string;
  href: string;
  image?: string;
}

export function CampaignCard({ title, summary, status, href, image = "/new-illustrations/hero.webp" }: CampaignCardProps) {
  return (
    <div className="flex flex-col h-full group cursor-pointer relative">
      <div className="relative aspect-4/5 w-full overflow-hidden mb-8 bg-stone-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 px-2">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-sans text-[10px] tracking-widest uppercase text-ink/50">
            {status}
          </span>
          <ArrowRight className="h-4 w-4 text-ink/40 transition-transform group-hover:translate-x-2 group-hover:text-ink" />
        </div>
        <h3 className="font-display text-2xl font-light mb-4 text-ink leading-snug">{title}</h3>
        <p className="font-sans text-sm text-ink/60 mb-6 flex-1 leading-loose font-light">
          {summary}
        </p>
        <Link href={href} className="absolute inset-0">
          <span className="sr-only">View {title}</span>
        </Link>
      </div>
    </div>
  );
}
