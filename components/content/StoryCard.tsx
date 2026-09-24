import Link from "next/link";

interface StoryCardProps {
  title: string;
  summary: string;
  author: string;
  date: string;
  href: string;
}

export function StoryCard({ title, summary, author, date, href }: StoryCardProps) {
  return (
    <div className="flex flex-col relative group h-full">
      <div className="flex justify-between items-center mb-6 border-t border-ink/10 pt-6">
        <span className="font-inter text-[10px] text-ink/50 uppercase tracking-widest">{date}</span>
        <span className="font-inter text-[10px] text-ink/50 uppercase tracking-widest">{author}</span>
      </div>
      <h3 className="font-fraunces text-2xl md:text-3xl font-light mb-6 text-ink group-hover:text-ink/70 transition-colors leading-tight pr-8">
        <Link href={href} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {title}
        </Link>
      </h3>
      <p className="font-inter text-sm text-ink/60 leading-loose font-light max-w-md">
        {summary}
      </p>
    </div>
  );
}
