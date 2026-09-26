import { Metadata } from "next";
import { StoryCard } from "@/components/content/StoryCard";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { stories } from "@/lib/data/stories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Stories | One Vision",
  description: "Long-form stories documenting community resilience, grassroots action, and the people driving change in Imphal and Manipur.",
};

export default function StoriesPage() {
  const [featured, ...rest] = stories;

  return (
    <div className="flex flex-col w-full bg-paper pt-20">
      <PageHero 
        badge="Community Voices"
        heading={
          <>
            Local <br />
            Stories.
          </>
        }
        description="Documenting the quiet resilience of our community through respectful, long-form storytelling. Dignity over spectacle."
        imageSrc="/new-illustrations/women-led.webp"
        imageAlt="Women community leaders"
      />

      {/* Featured Story */}
      <Section tone="default" className="py-24 border-b border-border-default">
        <Container className="pb-0">
          <Breadcrumbs items={[{ label: "Stories", href: "/stories" }]} />
        </Container>
        <Container>
          <p className="text-caption tracking-widest uppercase text-ink-500 font-semibold mb-10">Featured Story</p>
          <Link href={`/stories/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-4/3 w-full overflow-hidden border border-border-default rounded-md bg-surface-alt">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-caption tracking-widest uppercase text-ink-500 font-semibold mb-6">
                <span>By {featured.author}</span>
                <span className="size-1 rounded-full bg-ink-300" />
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </time>
              </div>
              <h2 className="font-serif text-display-md font-light tracking-tight text-ink-900 mb-6 group-hover:text-action-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-body-lg text-ink-500 font-light leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 text-caption tracking-widest uppercase font-semibold text-ink-900 group-hover:text-action-primary transition-colors">
                <span>Read full story</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </Container>
      </Section>

      {/* Story Grid */}
      <Section tone="alt" className="py-24">
        <Container>
          <h2 className="font-sans text-heading-xl font-medium tracking-tight text-ink-900 mb-16">More stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {rest.map((story) => (
              <StoryCard
                key={story.id}
                title={story.title}
                summary={story.excerpt}
                author={story.author}
                date={new Date(story.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
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
          <Button
            nativeButton={false}
            className="gap-2 px-6"
            render={
              <Link href="/contact" className="flex items-center">
                <span>Contact us</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
