import { notFound } from"next/navigation";
import { programmes } from"@/lib/data/programmes";
import { Section, Container } from"@/components/layout/Shell";
import { Breadcrumbs } from"@/components/ui/Breadcrumbs";
import { CampaignCard } from"@/components/content/CampaignCard";
import { ArrowRight } from"lucide-react";
import Image from"next/image";
import Link from"next/link";
import { Metadata } from"next";
import { cn } from"@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return programmes.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  if (!programme) return {};
  
  return {
    title: `${programme.title} | Programmes | One Vision`,
    description: programme.description,
    alternates: {
      canonical: `/programmes/${programme.slug}`,
    },
    openGraph: {
      title: `${programme.title} | Programmes | One Vision`,
      description: programme.description,
      images: [
        {
          url: programme.image,
          alt: programme.title,
        },
      ],
    },
  };
}

export default async function ProgrammeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const programme = programmes.find((p) => p.slug === slug);
  
  if (!programme) {
    return notFound();
  }

  const otherProgrammes = programmes
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Container className="px-0 md:px-0">
        <div className="border-b lg:border-x border-border bg-muted px-6 py-4 md:px-8 md:py-4">
          <Breadcrumbs
            items={[
              { label:"Programmes", href:"/programmes" },
              { label: programme.title },
            ]}
          />
        </div>
      </Container>

      {/* ── Document Shell Layout ── */}
      <section className="w-full">
        <Container className="px-0 md:px-0">
          <div className="border-x border-border bg-muted">
            
            {/* Cinematic Header */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full border-b border-border group overflow-hidden">
              <Image src={programme.image} alt={programme.title} fill sizes="100vw" className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
              <div className="absolute inset-0 bg-foreground/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              
              <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-foreground px-6 py-4 text-[11px] uppercase tracking-widest font-bold font-mono text-background border-t border-r border-foreground">
                <span className="size-2 bg-destructive animate-pulse" />
                {programme.category}
              </div>
            </div>

            <div className="px-6 py-8 md:px-12 md:py-14 border-b border-border bg-background">
              {/* Header */}
              <header className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2", programme.status ==="Active" ?"bg-destructive" :"bg-ink-300")} />
                    <span className="text-foreground">{programme.status}</span>
                  </div>
                  <span className="text-border-default">•</span>
                  <div className="flex items-center gap-1.5">
                    {programme.location}
                  </div>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-foreground font-light tracking-tight leading-none">
                  {programme.title}
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground font-sans mt-4 sm:mt-6">
                  {programme.description}
                </p>
              </header>

              {/* Split Content */}
              <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-default mt-8 md:mt-12">
                <article className="lg:col-span-8 p-0 md:pr-10 lg:pr-12 space-y-6 font-sans text-base leading-relaxed text-muted-foreground bg-background">
                  <p>
                    This initiative is actively running in <strong className="text-foreground">{programme.location}</strong>. 
                    Our focus remains on measurable outcomes and direct community support, ensuring dignity and long-term resilience.
                  </p>
                  <p>
                    We treat every programme as a direct intervention: identifying exact community needs and deploying resources where they create the most impact. By keeping our processes transparent and community-led, we ensure that aid isn&apos;t just delivered, but effectively utilized to build capacity.
                  </p>
                  
                  {/* Embedded Callout Box */}
                  <div className="border-l-4 border-safety-orange bg-foreground p-6 my-8">
                    <p className="font-sans text-base font-bold text-background max-w-prose">
                      We are currently looking for partners and volunteers to help expand this programme&apos;s reach.
                    </p>
                  </div>

                  {programme.sections && programme.sections.length > 0 && (
                    <div className="mt-10 space-y-10">
                      {programme.sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-6">
                          <h2 className="text-3xl font-serif text-foreground font-light">{section.title}</h2>
                          <p className="font-sans text-base max-w-prose leading-relaxed text-muted-foreground">
                            {section.content}
                          </p>
                        </section>
                      ))}
                    </div>
                  )}
                </article>

                <aside className="lg:col-span-4 bg-background pt-8 lg:pt-0 lg:pl-10">
                  {/* Sticky Metadata Card */}
                  <div className="flex flex-col h-full sticky top-24 border border-border bg-muted">
                    <div className="p-6 border-b border-border bg-background">
                      <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-destructive mb-6">
                        Programme Impact
                      </h3>
                      <div className="space-y-6">
                        {programme.metrics?.map((metric, i) => (
                          <div key={i} className="flex flex-col gap-2 border-b border-border pb-4 last:border-0 last:pb-0">
                            <span className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-foreground">{metric.value}</span>
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col divide-y divide-border-default">
                      <Link href="/volunteer" className="group flex items-center justify-between p-6 bg-foreground hover:bg-destructive text-background transition-colors duration-300">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Volunteer here</span>
                        <ArrowRight className="size-4" />
                      </Link>
                      <Link href="/donate" className="group flex items-center justify-between p-6 bg-muted hover:bg-foreground hover:text-background transition-colors duration-300">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground group-hover:text-background">Support this programme</span>
                        <ArrowRight className="size-4 text-foreground group-hover:text-background" />
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Programmes Section */}
      <Section tone="default" className="border-t border-border">
        <Container className="px-0 md:px-0">
          <div className="flex flex-col">
            <div className="px-6 py-4 md:px-8 md:py-6 border-x border-border bg-muted">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">Other Programmes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-border *:border-b *:border-r *:border-border">
              {otherProgrammes.map((p) => (
                <CampaignCard
                  key={p.id}
                  title={p.title}
                  summary={p.description}
                  status={p.status}
                  image={p.image}
                  href={`/programmes/${p.slug}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
