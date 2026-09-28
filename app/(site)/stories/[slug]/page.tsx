import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { stories } from "@/lib/data/stories";
import { QuietClose } from "@/components/composition/QuietClose";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/layout/Shell";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <div className="flex flex-col w-full bg-paper pt-20">
      <StoryTracker slug={story.slug} title={story.title} />

      <Container className="px-0 md:px-0">
        <div className="border-b lg:border-x border-border-default bg-surface px-6 py-4 md:px-8 md:py-4">
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
        <Container className="px-0 md:px-0">
          <div className="border-x border-border-default bg-surface">
            
            {/* Cinematic Header */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full border-b border-border-default group overflow-hidden">
              <Image src={story.image} alt={story.title} fill sizes="100vw" className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" priority />
              <div className="absolute inset-0 bg-ink-900/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              
              <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-ink-900 px-6 py-4 text-[11px] uppercase tracking-widest font-bold font-mono text-paper border-t border-r border-ink-900">
                <span className="size-2 bg-safety-orange animate-pulse" />
                Field Note
              </div>
              
              <div className="absolute bottom-0 right-0 flex items-center gap-2 bg-paper px-6 py-4 text-[11px] uppercase tracking-widest font-bold font-mono text-ink-900 border-t border-l border-border-default">
                {new Date(story.date).toLocaleDateString("en-GB", { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div className="px-6 py-8 md:px-12 md:py-14 border-b border-border-default bg-paper">
              {/* Header */}
              <header className="space-y-6 mb-10 border-b border-border-default pb-10">
                <div className="flex items-center gap-4 font-mono text-[11px] font-bold uppercase tracking-widest text-ink-500">
                  <span className="size-1 bg-safety-orange" />
                  <span>By {story.author}</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ink-900 leading-none tracking-tight">
                  {story.title}
                </h1>
                <p className="font-sans text-role-body-lg max-w-3xl text-ink-500 font-light leading-relaxed pt-4">
                  {story.excerpt}
                </p>
              </header>

              {/* Article Content */}
              <article className="max-w-4xl mx-auto space-y-8">
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Article",
                      "headline": story.title,
                      "description": story.excerpt,
                      "image": story.image,
                      "datePublished": story.date,
                      "author": {
                        "@type": "Person",
                        "name": story.author,
                      },
                      "publisher": {
                        "@type": "Organization",
                        "name": "One Vision",
                      },
                      "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://onevision.org/stories/${story.slug}`,
                      },
                    }),
                  }}
                />

                <p className="font-sans text-role-body-lg text-ink-900 leading-relaxed font-light">
                  {story.content}
                </p>
                
                <div className="border-l-4 border-safety-orange bg-ink-900 p-8 md:p-12 my-16">
                  <p className="font-serif text-3xl md:text-4xl font-light text-paper leading-tight mb-8">
                    &quot;We didn&apos;t wait for permission to help our neighbors. We just looked at what was needed and started coordinating.&quot;
                  </p>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-safety-orange">
                    — {story.author}
                  </p>
                </div>
                
                <p className="font-sans text-role-body-lg text-ink-900 leading-relaxed font-light">
                  Our role at One Vision is not to replace these organic community networks, but to support them with better logistics, funding transparency, and technical infrastructure. By remaining accountable to the communities we serve, every initiative creates lasting, dignity-centered impact.
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <QuietClose
        label="Fund this work"
        heading="Support Community Action"
        description="Every story of resilience is backed by community support. Your contribution directly funds these local initiatives."
        action={
          <Link href="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-paper text-ink-900 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 hover:bg-safety-orange">
            <span>Donate to our fund</span>
            <ArrowRight className="size-4" />
          </Link>
        }
      />
    </div>
  );
}
