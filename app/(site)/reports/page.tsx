import { Metadata } from "next";
import { PageHero } from "@/components/composition/PageHero";

import { QuietClose } from "@/components/composition/QuietClose";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { reports } from "@/lib/data/reports";
import { ReportDownloadButton } from "@/components/content/ReportDownloadButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
 title: "Reports & Impact | One Vision",
 description: "Transparency reports, impact metrics, and financial ledgers from One Vision.",
};

export default function ReportsPage() {
 return (
 <div className="flex flex-col w-full bg-background">
 <PageHero 
 badge="Transparency"
 heading={
 <>
 Evidence <br />
 over claims.
 </>
 }
 description="We believe in complete operational transparency. Here you can find our detailed impact reports, financial summaries, and ongoing ledgers."
 />

 {/* ── Document Shell Layout for Reports List ── */}
 <section className="w-full px-4 py-12 md:py-20 bg-background">
 <div className="mx-auto max-w-5xl overflow-hidden border border-border bg-muted shadow-xl shadow-black/5">
        <div className="bg-destructive/5 px-8 py-10 md:px-12 md:py-12 border-b border-border">
 <Breadcrumbs items={[{ label: "Reports", href: "/reports" }]} className="mb-4" />
 <h2 className="text-3xl md:text-4xl font-sans text-foreground mb-4 tracking-tight">
 Published Reports
 </h2>
 <p className="text-body-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
 Access our complete archive of organizational updates, financial breakdowns, and on-ground impact assessments.
 </p>
 </div>

 <div className="p-8 md:p-12 space-y-6 bg-muted">
 {reports.map((report) => (
 <div key={report.id} className="group flex flex-col md:flex-row gap-6 p-6 bg-muted border border-border hover:border-action-primary/30 transition-all hover:shadow-md hover:bg-section-alt">
 <div className="size-10 bg-background shadow-sm border border-border flex items-center justify-center shrink-0">
              <FileText className="size-5 text-foreground group-hover:text-destructive transition-colors" />
 </div>
 
 <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase text-destructive font-semibold">
 <span>{report.displayDate}</span>
 <span className="size-1 bg-ink-300" />
 <span>{report.type}</span>
 <span className="size-1 bg-ink-300" />
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
 <div className="bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 mt-auto border-t border-border">
 <div className="size-10 bg-background/10 flex items-center justify-center shrink-0 border border-paper/20">
 <TrendingUp className="size-8 text-background" />
 </div>
 <div>
 <h3 className="font-sans text-heading-md font-medium mb-3">Financial Transparency</h3>
 <p className="text-body-sm text-background/80 font-light leading-relaxed mb-6 max-w-xl">
 We maintain an open ledger of our fund allocations. Every rupee donated is accounted for and directed towards maximum community impact.
 </p>
 <Button variant="primary" className="bg-background text-foreground hover:bg-background/90 border border-transparent gap-2 px-6" nativeButton={false} render={<Link href="/open-ledger" />}>
 View Open Ledger <ArrowRight className="size-4" />
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
 className="gap-2 px-6"
 render={
 <Link href="/donate" className="flex items-center">
 <span>Make a donation</span>
 <ArrowRight className="size-4" />
 </Link>
 }
 />
 }
 />
 </div>
 );
}
