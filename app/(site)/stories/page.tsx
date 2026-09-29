import { Metadata } from"next";
import { StoryCard } from"@/components/content/StoryCard";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { QuietClose } from"@/components/composition/QuietClose";
import Link from"next/link";
import Image from"next/image";
import { ArrowRight } from"lucide-react";
import { stories } from"@/lib/data/stories";

export const metadata: Metadata = {
  title:"Stories | One Vision",
  description:"Long-form stories documenting community resilience, grassroots action, and the people driving change in Imphal and Manipur.",
};

export default function StoriesPage() {
  const [featured, ...rest] = stories;

  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero 
        badge="COMMUNITY VOICES · MANIPUR"
        heading={
          <>
            Grassroots<br />
            Stories.
          </>
        }
        description="Documenting community resilience, local leadership, and shared humanity across Manipur. Dignity, evidence, and long-term hope."
        image="/community-voices.jpg"
        imageAlt="Local community members sharing their stories in Manipur"
      />

      {/* Featured Story */}
      <Section tone="default" className="border-t border-border">
        <Container className="px-0 md:px-0">
          <Link href={`/stories/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 overflow-hidden border-x border-border bg-card hover:bg-muted/30 transition-colors duration-300">
            {/* Image (7 cols) */}
            <div className="relative h-64 md:h-96 lg:h-auto lg:col-span-7 w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-border bg-muted">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority
              />
            </div>
            
            {/* Content (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                <span>By {featured.author}</span>
                <span className="size-1 rounded-full bg-primary" />
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </time>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-[0.98] mb-4 sm:mb-6 font-light">
                {featured.title}
              </h2>
              <p className="font-sans text-lg text-muted-foreground font-light leading-relaxed mb-6 sm:mb-8">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-wider text-primary group-hover:translate-x-0.5 transition-all mt-auto">
                <span>Read full story</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      {/* Story Grid */}
      <Section tone="default" className="border-t border-border">
        <Container className="px-0 md:px-0">
          <div className="px-6 py-4 md:px-8 md:py-6 border-x border-border bg-muted">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">More Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border *:border-b *:border-r *:border-border">
            {rest.map((story) => (
              <StoryCard
                key={story.id}
                title={story.title}
                summary={story.excerpt}
                author={story.author}
                date={new Date(story.date).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" })}
                href={`/stories/${story.slug}`}
                image={story.image}
              />
            ))}
          </div>
        </Container>
      </Section>


      <QuietClose
        label="Share your story"
        heading="Have a story to tell?"
        description="We are always looking to amplify local voices and document community resilience. Reach out if you have a story that needs to be told."
        action={
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300">
            <span>Contact us</span>
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    </div>
  );
}
