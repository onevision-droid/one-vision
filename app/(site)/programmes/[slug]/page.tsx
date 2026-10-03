import { notFound } from "next/navigation";
import { programmes } from "@/lib/data/programmes";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

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
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Container>
        <div className="border border-b-0 border-border bg-card px-6 py-4 md:px-8 md:py-4">
          <Breadcrumbs
            items={[
              { label: "Programmes", href: "/programmes" },
              { label: programme.title },
            ]}
          />
        </div>
      </Container>

      {/* ── Document Shell Layout ── */}
      <section className="w-full">
        <Container>
          <div className="border border-border bg-card">
            {/* Cinematic Header (Authentic Photographic Clarity) */}
            <div className="relative h-64 sm:h-80 md:h-96 w-full border-b border-border group overflow-hidden bg-muted">
              <Image
                src={programme.image}
                alt={programme.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                priority
              />
              <div className="absolute bottom-0 left-0 flex items-center gap-2.5 bg-background/95 backdrop-blur-xs px-5 py-3 text-xs uppercase tracking-wider font-semibold font-sans text-foreground border-t border-r border-border">
                <span className="size-2 rounded-none bg-primary" />
                {programme.category}
              </div>
            </div>

            <div className="px-6 py-8 md:px-12 md:py-14 border-b border-border bg-background">
              {/* Header */}
              <header className="space-y-6 pb-8 border-b border-border">
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <span className="size-1.5 rounded-none bg-emerald-500" />
                    <span>{programme.status} Initiative</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-primary" />
                    <span>{programme.location}</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground font-light tracking-tight leading-tight">
                  {programme.title}
                </h1>
                <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted-foreground font-light font-sans">
                  {programme.description}
                </p>
              </header>

              {/* Split Content */}
              <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border mt-8 md:mt-12">
                <article className="lg:col-span-8 p-0 md:pr-10 lg:pr-12 space-y-6 font-sans text-base leading-relaxed text-muted-foreground font-light bg-background">
                  <p>
                    This initiative is actively running across communities in <strong className="text-foreground font-medium">{programme.location}</strong>. 
                    Our focus remains on verified outcomes and direct community ownership, ensuring dignity and long-term ecological and social resilience.
                  </p>
                  <p>
                    We treat every programme as a direct civic partnership: identifying exact neighborhood needs, collecting local data, and deploying resources where they create lasting capacity. By keeping our processes transparent and community-led, we ensure that aid isn&apos;t just delivered, but transforms into self-sustaining local capability.
                  </p>
                  
                  {/* Embedded Callout Box: Quiet Lagom Styling */}
                  <div className="border-l-2 border-primary bg-muted/40 p-6 md:p-8 my-8 text-foreground">
                    <p className="font-sans text-base text-foreground font-light leading-relaxed">
                      We actively collaborate with local leaders, educators, and volunteers to expand this programme&apos;s reach across Manipur.
                    </p>
                  </div>

                  {programme.sections && programme.sections.length > 0 && (
                    <div className="mt-10 space-y-10">
                      {programme.sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                          <h2 className="text-2xl sm:text-3xl font-serif text-foreground font-light">{section.title}</h2>
                          <p className="font-sans text-base max-w-prose leading-relaxed text-muted-foreground font-light">
                            {section.content}
                          </p>
                        </section>
                      ))}
                    </div>
                  )}
                </article>

                <aside className="lg:col-span-4 bg-background pt-8 lg:pt-0 lg:pl-10">
                  {/* Sticky Metadata Card on Warm Paper Surface */}
                  <div className="flex flex-col h-full sticky top-24 border border-border bg-card">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                        Verified Impact
                      </h3>
                      <div className="space-y-6">
                        {programme.metrics?.map((metric, i) => (
                          <div key={i} className="flex flex-col gap-1 border-b border-border pb-4 last:border-0 last:pb-0">
                            <span className="font-serif text-3xl md:text-4xl font-light tracking-tight text-foreground">{metric.value}</span>
                            <span className="font-sans text-xs text-muted-foreground">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col divide-y divide-border">
                      <Link href="/volunteer" className="group flex items-center justify-between p-5 bg-card hover:bg-muted text-foreground transition-colors">
                        <span className="font-sans text-xs font-medium">Volunteer for this programme</span>
                        <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <Link href="/donate" className="group flex items-center justify-between p-5 bg-primary hover:bg-primary-hover text-primary-foreground transition-colors">
                        <span className="font-sans text-xs font-medium">Support this initiative</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Programmes Section (Editorial Numbered Rows) */}
      <Section tone="alt" className="py-12 md:py-16 border-t border-border">
        <Container>
          <div className="mb-6 pb-3 border-b border-border">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-foreground">Other Priorities</h2>
          </div>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {otherProgrammes.map((p) => (
              <Link
                key={p.id}
                href={`/programmes/${p.slug}`}
                className="group py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/40 px-3 -mx-3 transition-colors"
              >
                <div>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-xl font-light text-foreground group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs text-muted-foreground">{p.metrics[0].value} {p.metrics[0].label}</span>
                  <ArrowRight className="size-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
