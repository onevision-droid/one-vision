import { notFound } from"next/navigation";
import { Metadata } from"next";
import Image from"next/image";
import { campaigns } from"@/lib/data/campaigns";
import { Section, Container } from"@/components/layout/Shell";
import { Breadcrumbs } from"@/components/ui/Breadcrumbs";
import { Users, Calendar } from"lucide-react";
import { CampaignActionButton } from"@/components/content/CampaignActionButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const campaign = campaigns.find((c) => c.slug === slug);
  
  if (!campaign) return { title:"Not Found | One Vision" };

  return {
    title: `${campaign.title} | One Vision`,
    description: campaign.description,
    alternates: {
      canonical: `/campaigns/${campaign.slug}`,
    },
    openGraph: {
      title: `${campaign.title} | One Vision`,
      description: campaign.description,
      images: [
        {
          url: campaign.image,
          alt: campaign.title,
        },
      ],
    },
  };
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = campaigns.find((c) => c.slug === slug);
  
  if (!campaign) {
    return notFound();
  }


  const progress = Math.min(100, Math.round(((campaign.raised || 0) / (campaign.goal || 1)) * 100));

  return (
    <div className="flex flex-col w-full bg-background pt-20">
      
      {/* Campaign Header */}
      <Section tone="default" className="pb-12 pt-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="space-y-8">
              <div className="mb-6">
                <Breadcrumbs 
                  items={[
                    { label:"Campaigns", href:"/campaigns" },
                    { label: campaign.title }
                  ]} 
                />
              </div>
              
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-muted border border-border text-caption uppercase tracking-widest text-muted-foreground font-semibold">
                  {campaign.category}
                </span>
                <h1 className="font-sans text-display-md font-light tracking-tight text-foreground leading-[1.1]">
                  {campaign.title}
                </h1>
                <p className="text-body-lg max-w-prose  text-muted-foreground font-light leading-relaxed">
                  {campaign.description}
                </p>
              </div>
            </div>

            {/* Campaign Progress Card */}
            <div className="bg-muted p-8 border border-border space-y-8">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-heading-lg font-sans font-light text-foreground">
                    ₹{campaign.raised?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-body-sm max-w-prose text-muted-foreground">
                    of ₹{campaign.goal?.toLocaleString('en-IN')} goal
                  </p>
                </div>
                <div className="h-2 w-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" />
                    <span className="text-caption uppercase tracking-widest font-semibold">Donors</span>
                  </div>
                  <p className="text-heading-md font-sans">{campaign.donors}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" />
                    <span className="text-caption uppercase tracking-widest font-semibold">Ends</span>
                  </div>
                  <p className="text-heading-md font-sans">
                    {new Date(campaign.endDate).toLocaleDateString("en-GB", { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <CampaignActionButton
                campaignSlug={campaign.slug}
                campaignId={campaign.id}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      <Container className="px-0 md:px-8">
        <div className="relative w-full aspect-video md:aspect-21/9 bg-muted border-y md:border border-border overflow-hidden">
          <Image 
            src={campaign.image} 
            alt={campaign.title} 
            fill 
            className="object-cover"
            priority 
            loading="eager"
          />
        </div>
      </Container>

      {/* Campaign Details */}
      {campaign.sections && campaign.sections.length > 0 && (
        <Section tone="default" className="py-20 border-b border-border">
          <Container>
            <div className="max-w-2xl mx-auto prose prose-lg prose-headings:font-sans prose-headings:font-light prose-p:text-foreground prose-p:font-light prose-p:leading-relaxed">
              {campaign.sections.map((section) => (
                <div key={section.id}>
                  <h2>{section.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
