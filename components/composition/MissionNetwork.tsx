import React from 'react'
import { Package, HeartHandshake, Tent, Shield, Users, ArrowRight, LineChart } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function MissionNetwork() {
    return (
        <section className="bg-paper py-24 sm:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-3xl px-6">
                <NetworkIllustration />
                
                <div className="mx-auto mt-16 max-w-xl text-balance text-center relative z-10">
                    <h2 className="font-fraunces text-3xl sm:text-4xl font-light text-ink tracking-tight">
                        Our Mission
                    </h2>
                    <p className="text-ink/60 mb-8 mt-4 text-lg font-light leading-relaxed">
                        We measure our success not by claims, but by transparent, documented outcomes in the communities we serve. Everything connects back to impact.
                    </p>
                    <Button
                        nativeButton={false}
                        variant="secondary"
                        render={
                            <Link href="/about" className="flex items-center gap-2">
                                <span>Read our manifesto</span>
                                <ArrowRight className="size-4" />
                            </Link>
                        }
                    />
                </div>
            </div>
        </section>
    )
}

const NetworkIllustration = () => {
    return (
        <div
            aria-hidden="true"
            className="mx-auto flex h-56 max-w-xl flex-col justify-between relative z-0"
        >
            {/* Top row */}
            <div className="relative flex h-12 items-center justify-between px-6 sm:px-12">
                <div className="bg-ink/10 absolute inset-0 my-auto h-px"></div>

                <div className="bg-white border border-ink/10 relative flex h-12 w-12 items-center justify-center shadow-sm">
                    <Package className="size-5 text-ink/40" />
                </div>
                <div className="bg-white border border-ink/10 relative flex h-12 w-12 items-center justify-center shadow-sm">
                    <Tent className="size-5 text-ink/40" />
                </div>
            </div>
            
            {/* Middle row (Main flow) */}
            <div className="relative flex h-16 items-center justify-between sm:px-8">
                <div className="bg-ink/10 absolute inset-0 my-auto h-px"></div>
                
                {/* Active connection glowing lines */}
                <div className="bg-linear-to-r mask-[linear-gradient(to_right,transparent,white_30%,white_70%,transparent)] from-forest/0 via-forest to-forest/0 absolute inset-0 my-auto h-0.5 w-full opacity-20"></div>

                <div className="bg-white border border-ink/10 relative flex h-12 w-12 items-center justify-center shadow-sm">
                    <HeartHandshake className="size-5 text-ink/40" />
                </div>
                
                {/* Center Node */}
                <div className="border-ink/20 border border-dashed p-3 bg-paper z-10 relative">
                    <div className="bg-white border border-ink/20 relative flex h-14 px-6 items-center justify-center shadow-sm">
                        <Logo className="h-5" />
                    </div>
                </div>
                
                <div className="bg-white border border-ink/10 relative flex h-12 w-12 items-center justify-center shadow-sm">
                    <Shield className="size-5 text-ink/40" />
                </div>
            </div>
            
            {/* Bottom row */}
            <div className="relative flex h-12 items-center justify-between px-12 sm:px-24">
                <div className="bg-ink/10 absolute inset-0 my-auto h-px"></div>

                <div className="bg-white border border-ink/10 relative flex h-12 w-12 items-center justify-center shadow-sm">
                    <Users className="size-5 text-ink/40" />
                </div>
                <div className="bg-white border border-ink/10 relative flex h-12 w-12 items-center justify-center shadow-sm">
                    <LineChart className="size-5 text-ink/40" />
                </div>
            </div>
            
            {/* Subtle Vertical connections to unify the grid visually */}
            <div className="absolute inset-0 mx-auto w-px bg-ink/10 -z-10 mask-[linear-gradient(to_bottom,transparent_10%,white_40%,white_60%,transparent_90%)]"></div>
        </div>
    )
}
