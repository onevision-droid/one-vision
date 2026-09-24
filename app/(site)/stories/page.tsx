import { StoryCard } from "@/components/content/StoryCard";
import Image from "next/image";
import { SectionBadge } from "@/components/composition/SectionBadge";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";

export default function StoriesPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <section className="relative overflow-hidden py-24 md:py-32 border-b border-border bg-foreground text-background">
        <HalftoneBackground opacity={10} />
        <div className="container mx-auto px-4 md:px-12 max-w-6xl text-center relative z-10">
          <SectionBadge className="border-background/20 bg-background/10">
            Community Voices
          </SectionBadge>
          <h1 className="text-balance font-fraunces text-5xl md:text-7xl font-light tracking-tight mb-8">
            Local Stories.
          </h1>
          <p className="text-balance font-inter text-xl text-background/80 leading-relaxed font-light max-w-2xl mx-auto">
            Documenting the quiet resilience of our community through respectful, long-form storytelling. Dignity over spectacle.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl ring-1 ring-border">
              <Image src="/new-illustrations/imphal-streetscape.webp" alt="Story Feature" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 motion-safe:hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center text-sm font-medium text-primary mb-4">Featured Story</div>
              <h2 className="text-4xl md:text-5xl font-fraunces font-light mb-6 tracking-tight">A teacher finds a new classroom</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                After her school was repurposed, Leima gathered students in a community hall to ensure education didn&apos;t stop. A look at grassroots educational continuity.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span>By T. Singh</span>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>October 12, 2024</span>
              </div>
              <a href="/stories/teacher" className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90 w-fit">
                Read full story
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
             <StoryCard 
                title="Mobilizing medical supplies"
                summary="How local pharmacists pooled resources to ensure chronic patients didn't miss their medication during times of supply chain disruption."
                author="A. Sharma"
                date="September 28, 2024"
                href="/stories/medical"
              />
              <StoryCard 
                title="Rebuilding the community center"
                summary="Volunteers from three neighborhoods joined hands to repair the central community hall before the monsoon season arrived."
                author="M. Devi"
                date="August 15, 2024"
                href="/stories/rebuild"
              />
          </div>
        </div>
      </section>
    </div>
  );
}
