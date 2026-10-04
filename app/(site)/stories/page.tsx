import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Shield } from "lucide-react";
import { stories } from "@/lib/data/stories";
import { StoryCard } from "@/components/content/StoryCard";

export const metadata: Metadata = {
  title: "Stories | One Vision",
  description:
    "Long-form stories documenting community resilience, grassroots action, and the people driving change in Imphal and Manipur.",
};

export default function StoriesPage() {
  const [featured, storyTwo, storyThree, ...archive] = stories;
  const secondaryStories = [storyTwo, storyThree].filter(Boolean);

  return (
    <div className="flex flex-col w-full bg-background">
      {/* ═══ Page Hero (Layout Locked) ═══ */}
      <PageHero
        badge="COMMUNITY VOICES · MANIPUR"
        heading={
          <>
            Grassroots<br />
            Stories.
          </>
        }
        description="Documenting community resilience, local leadership, and shared humanity across Manipur."
        image="/community-voices.jpg"
        imageAlt="Local community members sharing their stories in Manipur"
      />

      {/* ═══ 01 — Dominant Lead Story ═══ */}
      <Section tone="default" className="py-12 md:py-16 border-b border-border">
        <Container>
          <div className="mb-4">
            <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Featured Dispatch
            </span>
          </div>

          <Link
            href={`/stories/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 border border-border bg-card hover:bg-muted/20 transition-colors duration-300 overflow-hidden"
          >
            {/* Dominant Image (7 Columns) */}
            <div className="relative aspect-16/10 lg:aspect-auto lg:col-span-7 w-full overflow-hidden bg-muted min-h-72 sm:min-h-96 lg:min-h-120">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                priority
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-sans font-medium text-foreground border border-border">
                Field Report
              </div>
            </div>

            {/* Narrative Content (5 Columns) */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Calendar className="size-3 text-primary" />
                    {new Date(featured.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-muted-foreground" />
                    4 min read
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground font-light leading-tight mb-4 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                <span className="font-sans text-xs text-muted-foreground flex items-center gap-1.5">
                  <Shield className="size-3 text-primary" />
                  Verified Consent
                </span>
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                  <span>Read Full Story</span>
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      {/* ═══ 02 — Two Compact Supporting Stories ═══ */}
      {secondaryStories.length > 0 && (
        <Section tone="alt" className="py-12 md:py-16 border-b border-border">
          <Container>
            <div className="mb-8 pb-3 border-b border-border flex items-baseline justify-between">
              <h3 className="font-serif text-2xl font-light text-foreground">
                Community Dispatches
              </h3>
              <span className="font-sans text-xs text-muted-foreground">
                Recent field notes & outcomes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {secondaryStories.map((story) => (
                <StoryCard
                  key={story.id}
                  title={story.title}
                  summary={story.excerpt}
                  author={story.author}
                  date={new Date(story.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  href={`/stories/${story.slug}`}
                  image={story.image}
                  badge="Story"
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ═══ 03 — Vertical Chronological Archive List ═══ */}
      {archive.length > 0 && (
        <Section tone="default" className="py-12 md:py-16 border-b border-border">
          <Container>
            <div className="mb-6 pb-3 border-b border-border">
              <h3 className="font-serif text-2xl font-light text-foreground">
                Documentary Archive
              </h3>
            </div>

            <div className="flex flex-col divide-y divide-border border-y border-border">
              {archive.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hover:bg-muted/30 px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {new Date(story.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-light text-foreground group-hover:text-primary transition-colors mb-1">
                        {story.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-xl line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-primary shrink-0 self-end sm:self-auto group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ═══ 04 — Quiet Close ═══ */}
      <QuietClose
        label="Share your story"
        heading="Have a story to tell?"
        description="We are always looking to amplify local voices and document community resilience across Manipur. Reach out if you have a story that needs to be told."
        action={
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium transition-colors rounded-none"
          >
            <span>Contact Field Editors</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />
    </div>
  );
}
