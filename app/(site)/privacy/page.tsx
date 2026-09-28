import { Metadata } from "next";
import { Section, Container } from "@/components/layout/Shell";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy | One Vision",
  description: "How we collect, use, and protect your data at One Vision.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col w-full bg-paper pt-20">
      <Section tone="default" className="pt-16 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
            
            <div>
              <Badge className="mb-6">Legal</Badge>
              <h1 className="font-sans text-display-md font-light tracking-tight text-ink-900 leading-[1.1] mb-6">
                Privacy Policy
              </h1>
              <p className="text-body-lg max-w-prose  text-ink-500 font-light leading-relaxed">
                Last updated: October 2026
              </p>
            </div>
            
            <div className="prose prose-lg prose-headings:font-sans prose-headings:font-light prose-p:text-ink-700 prose-p:font-light prose-p:leading-relaxed">
              <p>
                At One Vision, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>
                We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, place a donation, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.
              </p>
              <ul>
                <li><strong>Personal Data:</strong> Name, email address, mailing address, phone number.</li>
                <li><strong>Payment Data:</strong> Financial information is collected directly by our payment processor. We do not store full credit card numbers on our servers.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, collected through cookies and similar tracking technologies.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                One Vision uses the collected data for various purposes:
              </p>
              <ul>
                <li>To process donations and issue tax receipts.</li>
                <li>To send periodic emails, such as newsletters or updates on our campaigns.</li>
                <li>To respond to your inquiries and support requests.</li>
                <li>To improve our website and services.</li>
              </ul>

              <h2>3. Data Security</h2>
              <p>
                We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information.
              </p>

              <h2>4. Sharing Your Personal Information</h2>
              <p>
                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our trusted affiliates and advertisers.
              </p>

              <h2>5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <a href="mailto:privacy@onevision.org">privacy@onevision.org</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
