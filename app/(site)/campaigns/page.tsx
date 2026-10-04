import { Metadata } from"next";
import { CampaignCard } from"@/components/content/CampaignCard";
import { Section, Container } from"@/components/layout/Shell";
import { PageHero } from"@/components/composition/PageHero";
import { QuietClose } from"@/components/composition/QuietClose";
import { Button } from"@/components/ui/button";
import Link from"next/link";
import { ArrowRight } from"lucide-react";

export const metadata: Metadata = {
  title:"Active Campaigns | One Vision",
  description:"Urgent, short-term relief efforts and funding campaigns currently active in Manipur.",
};

import { Breadcrumbs } from"@/components/ui/Breadcrumbs";
import { campaigns } from"@/lib/data/campaigns";

export default function CampaignsPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero 
        badge="Urgent Needs"
        heading={
          <>
            Active <br />
            Campaigns.
          </>
        }
        description="Targeted interventions addressing immediate crisis relief, health supplies, and community recovery across Manipur."
        image="/campaigns-hero.jpg"
        imageAlt="Manipuri volunteers distributing rice and medical supplies outside a village community hall"
      />

      <Section tone="alt">
        <Container>
          <div className="mb-10">
            <Breadcrumbs items={[{ label:"Campaigns", href:"/campaigns" }]} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {campaigns.map((c) => (
              <CampaignCard 
                key={c.id}
                title={c.title}
                summary={c.description}
                status={c.status ||"active"}
                image={c.image}
                href={`/campaigns/${c.slug}`}
                headingLevel="h2"
              />
            ))}
          </div>
        </Container>
      </Section>
      
      <QuietClose
        label="Support a Campaign"
        heading="Fund immediate action"
        description="Campaigns require urgent financial support to succeed. 100% of your donation to a specific campaign goes directly to that initiative."
        action={
          <Button
            nativeButton={false}
            className="gap-2"
            render={
              <Link href="/donate" className="flex items-center">
                <span>Donate</span>
                <ArrowRight className="size-3.5" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
