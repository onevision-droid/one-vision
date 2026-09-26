import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { stories } from "@/lib/data/stories";
import { QuietClose } from "@/components/composition/QuietClose";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
      
      {/* ── Document Shell Layout ── */}
      <section className="w-full px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border-default bg-surface shadow-xl shadow-black/5">
          
          {/* Cinematic Header */}
          <div className="relative h-72 w-full md:h-112.5">
            <Image src={story.image} alt={story.title} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-t from-ink-900/60 via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-paper/90 px-4 py-2 text-sm font-medium text-ink-900 backdrop-blur-md border border-border-default shadow-sm">
              <span className="size-2 rounded-full bg-clay-500" />
              Field Note
            </div>
            
            <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-ink-900/40 px-4 py-2 text-xs font-medium text-paper backdrop-blur-md border border-white/10 shadow-sm">
              {new Date(story.date).toLocaleDateString("en-GB", { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="px-6 py-10 md:px-16 md:py-16">
            {/* Header */}
            <header className="space-y-6 mb-12 border-b border-border-default pb-10">
              <div className="mb-2">
                <Breadcrumbs 
                  items={[
                    { label: "Stories", href: "/stories" },
                    { label: story.title }
                  ]} 
                />
              </div>
              <h1 className="text-4xl font-serif text-ink-900 md:text-5xl lg:text-display-md font-light tracking-tight leading-[1.1]">
                {story.title}
              </h1>
              <p className="text-body-lg text-ink-500 font-light leading-relaxed">
                {story.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-caption tracking-widest uppercase text-ink-900 font-semibold pt-2">
                <span>By {story.author}</span>
              </div>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg prose-headings:font-serif prose-headings:font-light prose-p:text-ink-700 prose-p:font-light prose-p:leading-relaxed max-w-none">
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

              <p className="text-body-lg text-ink-900 font-serif leading-relaxed mb-8">
                {story.content}
              </p>
              
              <div className="space-y-4 rounded-2xl border-l-4 border-clay-500 bg-clay-500/5 p-8 my-10">
                <p className="font-serif text-heading-md font-light text-ink-900 m-0! leading-relaxed italic">
                  &quot;We didn&apos;t wait for permission to help our neighbors. We just looked at what was needed and started coordinating.&quot;
                </p>
                <p className="font-sans text-body-sm font-medium text-ink-500 tracking-widest uppercase mt-4!">
                  — {story.author}
                </p>
              </div>
              
              <p>
                Our role at One Vision is not to replace these organic community networks, but to support them with better logistics, funding transparency, and technical infrastructure. By remaining accountable to the communities we serve, every initiative creates lasting, dignity-centered impact.
              </p>
            </article>
          </div>
        </div>
      </section>

      <QuietClose
        label="Fund this work"
        heading="Support Community Action"
        description="Every story of resilience is backed by community support. Your contribution directly funds these local initiatives."
        action={
          <Button
            nativeButton={false}
            className="gap-2 px-6"
            render={
              <Link href="/donate" className="flex items-center">
                <span>Donate to our fund</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
