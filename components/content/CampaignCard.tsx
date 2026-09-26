import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CampaignCardProps {
  title: string;
  summary: string;
  status: string;
  href: string;
  image?: string;
}

export function CampaignCard({ title, summary, status, href, image = "/new-illustrations/hero.webp" }: CampaignCardProps) {
  return (
    <Card className="group flex flex-col h-full border border-border-default hover:border-text-primary transition-colors bg-surface rounded-md overflow-hidden">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-caption tracking-widest uppercase text-ink-500 font-semibold">
            {status}
          </span>
          <ArrowRight className="h-4 w-4 text-ink-500 transition-transform group-hover:translate-x-2 group-hover:text-ink-900" />
        </div>
        <h3 className="font-sans text-heading-lg font-medium text-ink-900 leading-snug">{title}</h3>
        <p className="font-sans text-body-sm text-ink-500 flex-1 leading-loose font-light">
          {summary}
        </p>
        <div className="mt-auto pt-4">
          <Button variant="link" nativeButton={false} render={<Link href={href} />}>
            Read more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
