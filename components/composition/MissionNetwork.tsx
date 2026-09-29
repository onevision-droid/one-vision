"use client";

import { Section, Container } from"@/components/layout/Shell";
import React from"react";
import {
 Package,
 HeartHandshake,
 Tent,
 Shield,
 Users,
 ArrowRight,
 LineChart,
} from"lucide-react";
import { Logo } from"@/components/ui/Logo";
import { Button } from"@/components/ui/button";
import Link from"next/link";

export function MissionNetwork() {
 return (
 <Section tone="default" className="relative overflow-hidden bg-background border-b border-border py-16">
 <Container>
 <NetworkIllustration />

 <div className="mx-auto mt-24 max-w-2xl text-balance text-center relative z-10">
 <h2 className="font-sans text-display-sm font-extrabold uppercase tracking-tighter text-foreground">
 Our Mission
 </h2>
 <p className="font-sans text-body-lg max-w-prose font-medium tracking-wide leading-relaxed text-foreground mt-6 mb-10">
 We measure our success not by claims, but by transparent, documented
 outcomes in the communities we serve. Everything connects back to
 impact.
 </p>
 <Button
 nativeButton={false}
 className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs font-medium h-10 px-5 rounded-sm transition-colors"
 render={
 <Link href="/about" className="flex items-center gap-2">
 <span>Our Mission</span>
 <ArrowRight className="size-3.5" />
 </Link>
 }
 />
 </div>
 </Container>
 </Section>
 );
}

const NetworkIllustration = () => {
 return (
 <div className="mx-auto flex h-64 max-w-2xl flex-col justify-between relative z-0">
 {/* Top row */}
 <div className="relative flex h-14 items-center justify-between px-6 sm:px-12">
 <div className="bg-foreground absolute inset-0 my-auto h-0.5"></div>

 <div className="bg-background border border-border relative flex h-16 w-16 items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10 shadow-sm">
 <Package className="size-6" />
 </div>
 <div className="bg-background border border-border relative flex h-16 w-16 items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10 shadow-sm">
 <Tent className="size-6" />
 </div>
 </div>

 {/* Middle row (Main flow) */}
 <div className="relative flex h-20 items-center justify-between sm:px-8">
 <div className="bg-foreground absolute inset-0 my-auto h-1"></div>

 <div className="bg-background border border-border relative flex h-16 w-16 items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10 shadow-sm">
 <HeartHandshake className="size-6" />
 </div>

 {/* Center Node */}
 <div className="border-border border p-4 bg-muted z-10 relative shadow-sm">
 <div className="bg-background border border-border relative flex h-16 px-8 items-center justify-center">
 <Logo className="h-6" />
 </div>
 </div>

 <div className="bg-background border border-border relative flex h-16 w-16 items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10 shadow-sm">
 <Shield className="size-6" />
 </div>
 </div>

 {/* Bottom row */}
 <div className="relative flex h-14 items-center justify-between px-12 sm:px-24">
 <div className="bg-foreground absolute inset-0 my-auto h-0.5"></div>

 <div className="bg-background border border-border relative flex h-16 w-16 items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10 shadow-sm">
 <Users className="size-6" />
 </div>
 <div className="bg-background border border-border relative flex h-16 w-16 items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10 shadow-sm">
 <LineChart className="size-6" />
 </div>
 </div>

 {/* Subtle Vertical connections */}
 <div className="absolute inset-0 mx-auto w-1 bg-foreground -z-10"></div>
 </div>
 );
};
