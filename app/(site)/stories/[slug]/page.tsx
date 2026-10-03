import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { stories } from "@/lib/data/stories";
import { QuietClose } from "@/components/composition/QuietClose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/layout/Shell";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Shield } from "lucide-react";
import { StoryTracker } from "@/components/content/StoryTracker";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  
  if (!story) return { title: "Not Found | One Vision" };

  return {
    title: `${story.title} | One Vision`,
    description: story.excerpt,
    alternates: {
      canonical: `/stories/${story.slug}`,
    },
    openGraph: {
      title: `${story.title} | One Vision`,
      description: story.excerpt,
      type: "article",
      publishedTime: story.date,
      authors: [story.author],
      images: [
        {
          url: story.image,
          alt: story.title,
        },
      ],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  
  if (!story) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <StoryTracker slug={story.slug} title={story.title} />

      <Container>
        <div className="border border-b-0 border-border bg-card px-6 py-4 md:px-8 md:py-4">
          <Breadcrumbs 
            items={[
              { label: "Stories", href: "/stories" },
              { label: story.title }
            ]} 
          />
        </div>
      </Container>
      
      {/* ── Document Shell Layout ── */}
      <section className="w-full">
        <Container>
          <div className="border border-border bg-card">
            
            {/* Cinematic Header (Clean Documentary Visual) */}
            <div className="relative h-64 sm:h-80 md:h-110 w-full border-b border-border group overflow-hidden bg-muted">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                priority
              />
              
              <div className="absolute bottom-0 left-0 flex items-center gap-2.5 bg-background/95 backdrop-blur-xs px-5 py-3 text-xs uppercase tracking-wider font-semibold font-sans text-foreground border-t border-r border-border">
                <span className="size-2 rounded-none bg-primary" />
                Field Note
              </div>
              
              <div className="absolute bottom-0 right-0 hidden sm:flex items-center gap-2 bg-background/95 backdrop-blur-xs px-5 py-3 text-xs font-mono text-muted-foreground border-t border-l border-border">
                <Calendar className="size-3.5 text-primary" />
                {new Date(story.date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>

            <div className="px-6 py-8 md:px-12 md:py-14 border-b border-border bg-background">
              {/* Header */}
              <header className="space-y-6 mb-10 border-b border-border pb-10">
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-muted-foreground font-medium">
                  <span className="text-foreground">By {story.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-primary" />
                    4 min read
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-primary">
                    <Shield className="size-3.5" />
                    Verified Consent
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight tracking-tight">
                  {story.title}
                </h1>
                <p className="font-sans text-lg max-w-3xl text-muted-foreground font-light leading-relaxed pt-2">
                  {story.excerpt}
                </p>
              </header>

              {/* Article Content */}
              <article className="max-w-3xl mx-auto space-y-8 text-foreground font-sans text-base sm:text-lg leading-relaxed font-light">
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Article",
                      headline: story.title,
                      description: story.excerpt,
                      image: story.image,
                      datePublished: story.date,
                      author: {
                        "@type": "Person",
                        name: story.author,
                      },
                      publisher: {
                        "@type": "Organization",
                        name: "One Vision",
                      },
                      mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `https://onevision.org/stories/${story.slug}`,
                      },
                    }),
                  }}
                />

                <p>
                  {story.content}
                </p>
                
                {/* Editorial Pullquote (Nordic Lagom) */}
                <blockquote className="border-l-2 border-primary bg-muted/40 p-6 sm:p-8 md:p-10 my-10 font-serif text-2xl sm:text-3xl text-foreground font-light leading-snug">
                  &ldquo;We didn&apos;t wait for external solutions to help our neighbors. We surveyed what was missing on the ground, pooled community skills, and started building.&rdquo;
                  <footer className="mt-4 font-sans text-xs uppercase tracking-wider text-primary font-semibold not-italic">
                    — {story.author}
                  </footer>
                </blockquote>
                
                <p>
                  Our role at One Vision is not to supplant organic neighborhood networks, but to reinforce them with reliable logistics, complete fiscal transparency, and verifiable technical infrastructure. By remaining accountable to the communities we serve, every initiative creates lasting, dignity-centered resilience.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing Action ── */}
      <QuietClose
        label="Community Support"
        heading="Support Grassroots Action Across Manipur"
        description="Every story of resilience is backed by community solidarity. Your contribution directly funds these local initiatives."
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium transition-colors rounded-none"
            >
              <span>Donate to Community Fund</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-background border border-border text-foreground hover:bg-muted font-sans text-xs font-medium transition-colors rounded-none"
            >
              <span>All Stories</span>
            </Link>
          </div>
        }
      />
    </div>
  );
}
