import { Metadata } from"next";
import { PageHero } from"@/components/composition/PageHero";

import { QuietClose } from"@/components/composition/QuietClose";
import { Button } from"@/components/ui/button";
import { FileText, ArrowRight, TrendingUp } from"lucide-react";
import Link from"next/link";
import { reports } from"@/lib/data/reports";
import { ReportDownloadButton } from "@/components/content/ReportDownloadButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MetricCard } from "@/components/content/MetricCard";
import { Users, Building2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Reports & Impact | One Vision",
  description: "Transparency reports, impact metrics, and financial ledgers from One Vision.",
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col w-full bg-background">
      <PageHero 
        badge="EVIDENCE & ACCOUNTABILITY"
        heading={
          <>
            Evidence <br />
            over claims.
          </>
        }
        description="Verified impact reports, audited financial statements, and an open ledger for every rupee."
      />

      {/* ── Key Verified Indicators (Section 08 Metric Cards) ── */}
      <section className="w-full px-4 py-8 md:py-12 bg-background border-b border-border">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              value="2,500+"
              label="People Reached in Manipur"
              icon={Users}
              bars={[25, 40, 55, 70, 85, 100, 60]}
            />
            <MetricCard
              value="18+"
              label="Community Care & Health Centers"
              icon={Building2}
              bars={[40, 50, 65, 80, 70, 90, 85]}
            />
            <MetricCard
              value="100%"
              label="Public Ledger Verifiable Allocation"
              icon={ShieldCheck}
              bars={[60, 75, 85, 90, 95, 100, 100]}
            />
          </div>
        </div>
      </section>

      {/* ── Document Shell Layout for Reports List ── */}
      <section className="w-full px-4 py-12 md:py-20 bg-background">
        <div className="mx-auto max-w-5xl overflow-hidden border border-border bg-card shadow-xs rounded-none">
          <div className="bg-muted/40 px-8 py-10 md:px-12 md:py-12 border-b border-border">
            <Breadcrumbs items={[{ label: "Reports", href: "/reports" }]} className="mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4 tracking-tight font-light">
              Published Reports
            </h2>
            <p className="text-body-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
              Access our complete archive of organizational updates, financial breakdowns, and on-ground community impact assessments.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-6 bg-card">
            {reports.map((report) => (
              <div key={report.id} className="group flex flex-col md:flex-row gap-6 p-6 bg-muted/30 border border-border hover:border-primary/40 transition-all hover:shadow-xs hover:bg-muted/60 rounded-none">
                <div className="size-10 bg-background shadow-2xs border border-border flex items-center justify-center shrink-0 rounded-none">
                  <FileText className="size-5 text-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase text-primary font-mono font-medium">
                    <span>{report.displayDate}</span>
                    <span className="size-1 bg-border rounded-none" />
                    <span>{report.type}</span>
                    <span className="size-1 bg-border rounded-none" />
                    <span>{report.size}</span>
                  </div>
                  <h3 className="font-sans text-heading-lg font-light text-foreground">{report.title}</h3>
                  <p className="text-body-sm text-muted-foreground max-w-2xl font-light leading-relaxed">
                    {report.description}
                  </p>
                </div>

                <div className="pt-2 md:pt-0 shrink-0">
                  <ReportDownloadButton
                    id={report.id}
                    title={report.title}
                    downloadUrl={report.downloadUrl}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Financial Overview Callout */}
          <div className="bg-muted/40 text-foreground p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 mt-auto border-t border-border">
            <div className="size-12 bg-primary/10 rounded-none flex items-center justify-center shrink-0 border border-primary/20 text-primary">
              <TrendingUp className="size-6 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-light text-foreground mb-3">Financial Transparency</h3>
              <p className="text-body-sm text-muted-foreground font-light leading-relaxed mb-6 max-w-xl">
                We maintain an open public ledger of all fund allocations. Every rupee donated is audited, verified, and directed towards maximum community impact in Manipur.
              </p>
              <Button variant="secondary" className="gap-2" nativeButton={false} render={<Link href="/open-ledger" />}>
                Open Ledger <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

 <QuietClose
 label="Fund our work"
 heading="Support our mission"
 description="Your contributions allow us to continue this work. We ensure every donation is deployed efficiently."
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
