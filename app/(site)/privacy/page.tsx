import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy | One Vision",
  description: "How we collect, use, and protect your data at One Vision.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Section tone="default" className="pt-12 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
            
            <div>
              <Badge className="mb-4">Legal</Badge>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight mb-4">
                Privacy Policy
              </h1>
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Last updated: October 2026
              </p>
            </div>
            
            <div className="prose prose-lg prose-headings:font-serif prose-headings:font-light prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed">
              <p>
                At One Vision, we operate with a privacy-first mindset. This policy describes how we collect, use, and safeguard personal information across our website and community contact points.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">1. Information We Collect</h2>
              <p>
                We minimize data collection strictly to what is necessary for community service delivery and donor reporting:
              </p>
              <ul className="text-muted-foreground space-y-1">
                <li><strong>Contact Inquiries:</strong> Name, email address, and voluntary message text.</li>
                <li><strong>Donations:</strong> Name, email, and PAN number for statutory 80G tax receipting. Payment transactions are processed by RBI-licensed payment gateways — we never store credit card credentials.</li>
                <li><strong>Volunteer Applications:</strong> Professional background and areas of interest provided voluntarily.</li>
              </ul>

              <h2 className="text-foreground font-serif text-2xl font-light">2. How We Use Data</h2>
              <p>
                Information collected is used solely to coordinate healthcare assistance, deploy volunteer teams, issue tax exemption receipts, and improve site reliability. We do not sell or rent personal information to any third parties.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">3. Community Privacy & Safeguarding</h2>
              <p>
                Beneficiary stories and photography published on this website are shared with verified, informed community consent. Personal identifiers of vulnerable individuals in need of emergency relief are strictly protected.
              </p>

              <h2 className="text-foreground font-serif text-2xl font-light">4. Contact & Inquiries</h2>
              <p>
                To request data deletion or inquire about our privacy practices, contact our team at <a href={`mailto:${siteSettings.contactEmail}`} className="text-primary underline underline-offset-2 hover:text-primary-hover font-medium">{siteSettings.contactEmail}</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
