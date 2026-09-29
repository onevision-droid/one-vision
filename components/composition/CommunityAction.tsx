"use client";

import { Section, Container } from "@/components/layout/Shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
 ArrowUp,
 ChevronDown,
 FileText,
 HardDriveDownload,
 Package,
 Stethoscope,
 FileBarChart,
} from "lucide-react";
import Link from "next/link";

export function CommunityAction() {
 return (
 <Section tone="default" className="border-t border-border overflow-hidden bg-muted py-20">
 <Container>
 <div>
 <h2 className="text-ink-700 max-w-4xl text-balance text-heading-xl md:text-display-md font-extrabold font-sans tracking-tighter uppercase">
 <span className="text-foreground">Community Support In Action.</span> <br />{" "}
 Radical transparency, zero red tape.
 </h2>
 </div>
 
 <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
 <div className="row-span-2 grid grid-cols-1 gap-6 group">
 <Link href="/get-help" className="w-full text-left outline-none block">
 <Card className="aspect-4/3 bg-muted relative overflow-hidden flex flex-col justify-end p-0 border border-border shadow-sm hover:translate-y-1 hover:shadow-sm transition-all cursor-pointer">
 <RequestAidIllustration />
 <div className="absolute inset-0 bg-foreground opacity-10 group-hover:opacity-0 transition-opacity"></div>
 </Card>
 </Link>

 <p className="text-ink-700 text-balance font-sans text-body-sm max-w-prose font-medium tracking-wide">
 <span className="text-foreground font-bold uppercase">Get Help. </span>{" "}
 Reach out via email, our frontline office phone, or submit an enquiry for general support and partnerships. Please do not submit medical or critical field data through the form.
 </p>
 </div>

 {/* Card 2: Transparent Funds */}
 <div className="row-span-2 grid grid-cols-1 gap-6 group">
 <Card className="aspect-4/3 bg-muted-alt relative overflow-hidden flex flex-col p-0 border border-border shadow-sm hover:translate-y-1 hover:shadow-sm transition-all">
 <FundTrackerIllustration />
 </Card>

 <p className="text-ink-700 text-balance font-sans text-body-sm max-w-prose font-medium tracking-wide">
 <span className="text-foreground font-bold uppercase">
 Verified Allocation.{" "}
 </span>{" "}
 Every resource and rupee is tracked and publicly visible on our
 ledger.
 </p>
 </div>

 {/* Card 3: Open Reports (Download) */}
 <div className="row-span-2 grid grid-cols-1 gap-6 group">
 <Card className="aspect-4/3 bg-muted relative overflow-hidden p-0 border border-border shadow-sm hover:translate-y-1 hover:shadow-sm transition-all flex items-center justify-center">
 <DownloadIllustration />
 <div className="absolute inset-0 bg-foreground opacity-5 group-hover:opacity-0 transition-opacity"></div>
 </Card>

 <p className="text-ink-700 text-balance font-sans text-body-sm max-w-prose font-medium tracking-wide">
 <span className="text-foreground font-bold uppercase">
 Public Accountability.{" "}
 </span>{" "}
 Download our monthly impact audits and detailed field reports
 instantly.
 </p>
 </div>
 </div>
 </Container>
 </Section>
 );
}

function DownloadIllustration() {
 return (
 <div className="z-10 absolute inset-0 m-auto size-fit flex flex-col items-center justify-center">
 <Button
 variant="secondary"
 className="bg-background border border-border z-20 relative hover:bg-destructive hover:text-background transition-colors font-sans font-bold tracking-widest uppercase h-12 px-6"
 size="sm"
 nativeButton={false}
 render={
 <div className="flex items-center gap-3 text-current">
 <HardDriveDownload className="size-5" />
 <span className="border-r-2 border-current pr-3 font-bold text-sm">
 Download Data
 </span>
 <ChevronDown className="size-5" />
 </div>
 }
 />

 <div className="mt-0 min-w-64 bg-background p-2 border border-border origin-top relative z-10 hidden group-hover:block translate-y-2">
 <div className="peer flex gap-4 px-4 py-3 hover:bg-destructive hover:text-background transition-colors cursor-pointer text-foreground">
 <FileText className="size-5 translate-y-0.5" />
 <div className="space-y-1">
 <div className="text-sm font-sans font-bold uppercase tracking-wider">
 August Field Report
 </div>
 <div className="text-xs font-sans font-medium opacity-80">PDF • 2.4 MB</div>
 </div>
 </div>

 <div className="flex gap-4 px-4 py-3 hover:bg-destructive hover:text-background transition-colors cursor-pointer text-foreground border-t-2 border-border">
 <FileBarChart className="size-5 translate-y-0.5" />
 <div className="space-y-1">
 <div className="text-sm font-sans font-bold uppercase tracking-wider">
 Q3 Financial Audit
 </div>
 <div className="text-xs font-sans font-medium opacity-80">CSV • 142 KB</div>
 </div>
 </div>
 </div>
 </div>
 );
}

function RequestAidIllustration() {
 return (
 <div className="z-10 absolute inset-x-6 bottom-6 m-auto h-fit scale-95 md:scale-100">
 <div className="bg-background border border-border h-fit p-4 shadow-sm">
 <div className="text-foreground p-2 pb-4 text-sm font-sans font-bold uppercase tracking-widest flex items-center">
 Describe assistance
 <span className="ml-2 w-2 h-5 bg-destructive inline-block animate-pulse" />
 </div>
 <div className="flex justify-between gap-4 pt-4 border-t border-border">
 <div className="flex items-center gap-2">
 <div className="hover:bg-foreground hover:text-background flex size-10 cursor-pointer items-center justify-center text-foreground border-2 border-transparent hover:border-border transition-colors">
 <Package className="size-5" />
 </div>
 <div className="hover:bg-foreground hover:text-background flex size-10 cursor-pointer items-center justify-center text-foreground border-2 border-transparent hover:border-border transition-colors">
 <Stethoscope className="size-5" />
 </div>
 </div>

 <div className="bg-destructive text-background flex size-10 cursor-pointer items-center justify-center transition-colors hover:bg-foreground border-2 border-transparent">
 <ArrowUp className="size-5" />
 </div>
 </div>
 </div>
 </div>
 );
}

function FundTrackerIllustration() {
 return (
 <div className="z-10 bg-muted absolute inset-x-6 bottom-0 mx-auto mt-auto h-[70%] w-[90%] origin-bottom border-t border-l border-r border-border p-6 shadow-[0px_-4px_0px_0px_rgba(23,23,23,0.1)]">
 <div className="relative h-full w-full">
 <div className=" bg-background p-4 border border-border shadow-sm">
 <div className="flex gap-4 flex-col sm:flex-row">
 <div className="w-full sm:w-1/3 aspect-square shrink-0 relative overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
 <span className="font-sans font-bold text-muted-foreground uppercase tracking-widest text-xs">NO IMAGE</span>
 </div>
 <div className="py-1 flex-1">
 <div className="text-sm font-sans font-bold uppercase tracking-widest text-foreground flex justify-between items-start w-full border-b-2 border-border pb-2">
 <span>Relief Camp Alpha</span>
 <span className="size-3 bg-destructive animate-pulse mt-1"></span>
 </div>
 <div className="mt-4 flex flex-col gap-4">
 <div className="flex justify-between items-end">
 <div className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
 Supplies
 </div>
 <div className="text-sm font-sans font-extrabold text-foreground tabular-nums">
 3,200 kg
 </div>
 </div>
 <div className="flex justify-between items-end">
 <div className="text-xs font-sans font-bold uppercase tracking-widest text-muted-foreground">
 Funds Used
 </div>
 <div className="text-sm font-sans font-extrabold text-foreground tabular-nums">
 ₹82.5k
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
