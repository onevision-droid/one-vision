"use client";

import { Section, Container } from "@/components/layout/Shell";
import React from "react";
import {
 Package,
 HeartHandshake,
 Tent,
 Shield,
 Users,
 ArrowRight,
 LineChart,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MissionNetwork() {
 return (
 <Section tone="default" className="relative overflow-hidden bg-paper border-b border-border-default py-16">
 <Container>
 <NetworkIllustration />

 <div className="mx-auto mt-24 max-w-2xl text-balance text-center relative z-10">
 <h2 className="font-sans text-display-sm font-extrabold uppercase tracking-tighter text-ink-900">
 Our Mission
 </h2>
 <p className="font-sans text-body-lg max-w-prose font-medium tracking-wide leading-relaxed text-ink-700 mt-6 mb-10">
 We measure our success not by claims, but by transparent, documented
 outcomes in the communities we serve. Everything connects back to
 impact.
 </p>
 <Button
 nativeButton={false}
 className="bg-safety-orange hover:bg-ink-900 text-paper font-sans font-bold tracking-widest uppercase h-12 px-8 border-2 border-transparent transition-colors"
 render={
 <Link href="/about" className="flex items-center gap-2">
 <span>Read our manifesto</span>
 <ArrowRight className="size-5" />
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
 <div className="bg-ink-900 absolute inset-0 my-auto h-0.5"></div>

 <div className="bg-paper border border-border-default relative flex h-16 w-16 items-center justify-center text-ink-900 hover:bg-safety-orange hover:text-paper transition-colors z-10 shadow-sm">
 <Package className="size-6" />
 </div>
 <div className="bg-paper border border-border-default relative flex h-16 w-16 items-center justify-center text-ink-900 hover:bg-safety-orange hover:text-paper transition-colors z-10 shadow-sm">
 <Tent className="size-6" />
 </div>
 </div>

 {/* Middle row (Main flow) */}
 <div className="relative flex h-20 items-center justify-between sm:px-8">
 <div className="bg-ink-900 absolute inset-0 my-auto h-1"></div>

 <div className="bg-paper border border-border-default relative flex h-16 w-16 items-center justify-center text-ink-900 hover:bg-safety-orange hover:text-paper transition-colors z-10 shadow-sm">
 <HeartHandshake className="size-6" />
 </div>

 {/* Center Node */}
 <div className="border-border-default border p-4 bg-surface z-10 relative shadow-sm">
 <div className="bg-paper border border-border-default relative flex h-16 px-8 items-center justify-center">
 <Logo className="h-6" />
 </div>
 </div>

 <div className="bg-paper border border-border-default relative flex h-16 w-16 items-center justify-center text-ink-900 hover:bg-safety-orange hover:text-paper transition-colors z-10 shadow-sm">
 <Shield className="size-6" />
 </div>
 </div>

 {/* Bottom row */}
 <div className="relative flex h-14 items-center justify-between px-12 sm:px-24">
 <div className="bg-ink-900 absolute inset-0 my-auto h-0.5"></div>

 <div className="bg-paper border border-border-default relative flex h-16 w-16 items-center justify-center text-ink-900 hover:bg-safety-orange hover:text-paper transition-colors z-10 shadow-sm">
 <Users className="size-6" />
 </div>
 <div className="bg-paper border border-border-default relative flex h-16 w-16 items-center justify-center text-ink-900 hover:bg-safety-orange hover:text-paper transition-colors z-10 shadow-sm">
 <LineChart className="size-6" />
 </div>
 </div>

 {/* Subtle Vertical connections */}
 <div className="absolute inset-0 mx-auto w-1 bg-ink-900 -z-10"></div>
 </div>
 );
};
