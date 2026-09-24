import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WhatWeDo() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                    
                    {/* Image shifted to a side column and given a natural 4:3 aspect ratio to prevent harsh vertical crops */}
                    <div className="relative w-full aspect-4/3 bg-paper overflow-hidden shadow-sm order-last lg:order-first">
                        <Image
                            className="object-cover object-top"
                            src="/new-illustrations/community-support.webp"
                            alt="Community support programmes in Imphal"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="text-ink/60 uppercase tracking-widest text-xs font-medium mb-4">
                                What We Do
                            </div>
                            <h2 className="text-balance text-3xl md:text-5xl font-light font-fraunces text-ink leading-[1.1]">
                                Active programmes across Imphal and beyond.
                            </h2>
                        </div>
                        
                        <div className="space-y-6">
                            <p className="text-ink/70 text-balance text-lg font-light leading-relaxed">
                                Our current initiatives focus on immediate community needs, from healthcare access to youth education and disaster resilience. We bypass unnecessary red tape to deliver tangible outcomes.
                            </p>

                            <p className="text-ink/70 text-balance text-lg font-light leading-relaxed">
                                By coordinating directly with local leaders, volunteers, and partner NGOs, we ensure that every resource serves the community efficiently and transparently.
                            </p>
                            
                            <div className="pt-2">
                                <Button
                                    variant="secondary"
                                    className="gap-2"
                                    nativeButton={false}
                                    render={
                                        <Link href="/programmes">
                                            <span>Explore our programmes</span>
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    }
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
