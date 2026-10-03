import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Terms of Service | One Vision",
  description: "Terms and conditions for using the One Vision website and services.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Section tone="default" className="pt-12 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
            
            <div>
              <Badge className="mb-4">Legal</Badge>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight mb-4">
                Terms of Service
              </h1>
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Last updated: October 2026
              </p>
            </div>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:font-light prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed">
              <p>
                By accessing or using the One Vision website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">1. Use of the Site</h2>
              <p>
                You may use our site for lawful purposes only. You agree not to use the site in any way that violates applicable local, national, or international laws or regulations.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">2. Intellectual Property</h2>
              <p>
                The content on this website, including text, documentation, logos, and images, is the property of One Vision (Society for Health & Education Manipur) and is protected by applicable copyright laws.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">3. Donations & Allocations</h2>
              <p>
                All donations made through our website are voluntary. One Vision ensures that 100% of public donations are accounted for in our open ledger and allocated toward on-ground initiatives in Manipur. Official 80G tax receipts are issued digitally.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">4. Third-Party Links</h2>
              <p>
                Our website may contain links to partner websites or government portals. We are not responsible for the content or privacy practices of external sites.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">5. Limitation of Liability</h2>
              <p>
                One Vision shall not be liable for any direct, indirect, or consequential damages resulting from the use or inability to use our digital resources or emergency contact tools.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">6. Contact Information</h2>
              <p>
                For questions regarding these Terms, contact us at <a href={`mailto:${siteSettings.contactEmail}`} className="text-primary underline underline-offset-2 hover:text-primary-hover font-medium">{siteSettings.contactEmail}</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
