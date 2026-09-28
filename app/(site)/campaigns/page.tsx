import { Metadata } from "next";
import { CampaignCard } from "@/components/content/CampaignCard";
import { Section, Container } from "@/components/layout/Shell";
import { PageHero } from "@/components/composition/PageHero";
import { QuietClose } from "@/components/composition/QuietClose";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Active Campaigns | One Vision",
  description: "Urgent, short-term relief efforts and funding campaigns currently active in Manipur.",
};

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { campaigns } from "@/lib/data/campaigns";

export default function CampaignsPage() {
  return (
    <div className="flex flex-col w-full bg-paper">
      <PageHero 
        badge="Urgent Needs"
        heading={
          <>
            Active <br />
            Campaigns.
          </>
        }
        description="Our targeted campaigns address immediate, short-term crises requiring rapid funding, volunteer deployment, or supply gathering."
      />

      <Section tone="alt" className="py-16 border-b border-border-default">
        <Container>
          <div className="mb-10">
            <Breadcrumbs items={[{ label: "Campaigns", href: "/campaigns" }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {campaigns.map((c) => (
              <CampaignCard 
                key={c.id}
                title={c.title}
                summary={c.description}
                status={c.status || "active"}
                image={c.image}
                href={`/campaigns/${c.slug}`}
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
            className="gap-2 px-6"
            render={
              <Link href="/donate" className="flex items-center">
                <span>Donate now</span>
                <ArrowRight className="size-4" />
              </Link>
            }
          />
        }
      />
    </div>
  );
}
