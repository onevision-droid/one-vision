import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="relative flex flex-col group h-full border-t border-border-default hover:border-text-primary rounded-none shadow-none bg-transparent">
      {image && (
        <div className="relative w-full aspect-video overflow-hidden bg-surface-alt rounded-md mb-2">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="flex flex-col pt-6 px-0 pb-0 gap-6">
        <div className="flex justify-between items-center text-caption uppercase tracking-widest font-semibold text-ink-500">
          <time>{date}</time>
          <span>{author}</span>
        </div>
        <h3 className="font-serif text-heading-xl font-light text-ink-900 group-hover:text-ink-500 transition-colors leading-tight pr-8">
          <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 rounded-sm">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>
        <p className="font-sans text-body-sm text-ink-500 leading-loose font-light max-w-md">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}

