import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service | One Vision",
  description: "Terms and conditions for using the One Vision website and services.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      <Section tone="default" className="pt-16 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
            
            <div>
              <Badge className="mb-6">Legal</Badge>
              <h1 className="font-sans text-display-md font-light tracking-tight text-foreground leading-[1.1] mb-6">
                Terms of Service
              </h1>
              <p className="text-body-lg max-w-prose  text-muted-foreground font-light leading-relaxed">
                Last updated: October 2026
              </p>
            </div>
            
            <div className="prose prose-lg prose-headings:font-sans prose-headings:font-light prose-p:text-ink-700 prose-p:font-light prose-p:leading-relaxed">
              <p>
                By accessing or using the One Vision website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>

              <h2>1. Use of the Site</h2>
              <p>
                You may use our site for lawful purposes only. You agree not to use the site in any way that violates applicable local, national, or international laws or regulations.
              </p>

              <h2>2. Intellectual Property</h2>
              <p>
                The content on this website, including text, graphics, logos, and images, is the property of One Vision or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit permission.
              </p>

              <h2>3. Donations</h2>
              <p>
                All donations made through our website are voluntary and non-refundable, unless there is a proven error in the transaction. One Vision ensures that all funds are allocated according to our stated mission and financial transparency guidelines.
              </p>

              <h2>4. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these external sites.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                One Vision shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or services.
              </p>

              <h2>6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site constitutes acceptance of the revised terms.
              </p>
              
              <h2>7. Contact Information</h2>
              <p>
                For any questions regarding these Terms, please contact us at <a href="mailto:legal@onevision.org">legal@onevision.org</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
