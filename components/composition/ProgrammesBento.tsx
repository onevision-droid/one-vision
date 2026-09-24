import React from 'react'
import { ArrowLeftRight, Bell, LineChart, Users } from 'lucide-react'
import Image from 'next/image'

export function ProgrammesBento() {
    return (
        <section className="py-24 bg-paper/30">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <h2 className="text-ink/60 max-w-3xl text-balance text-3xl font-light tracking-tight lg:text-5xl font-display leading-[1.1]">
                    <span className="text-ink">Community support, organized.</span> <br /> One platform for Imphal.
                </h2>
                
                <div className="mt-12 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
                    {/* Card 1 */}
                    <div className="bg-white border border-ink/10 p-8 flex flex-col">
                        <p className="text-ink/60 max-w-xs text-lg font-light">
                            <span className="text-ink font-medium">Resource mapping, clarified.</span> Know exactly where supplies are needed and who is delivering them.
                        </p>

                        <div className="mt-8 flex-1 flex items-center justify-center relative">
                            <div className="relative w-full aspect-square mask-[linear-gradient(to_bottom,white_80%,transparent)]">
                                <Image 
                                    src="/new-illustrations/volunteer-scene.webp" 
                                    alt="Resource mapping and coordination" 
                                    fill 
                                    className="object-cover object-top" 
                                    sizes="(max-width: 768px) 100vw, 33vw" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="bg-white border border-ink/10 flex flex-col overflow-hidden">
                        <div className="p-8">
                            <p className="text-ink/60 max-w-xs text-lg font-light">
                                <span className="text-ink font-medium">Help without friction.</span> Request assistance or volunteer your skills without bureaucracy.
                            </p>
                        </div>

                        <div className="relative mt-8 h-72 mask-[linear-gradient(to_right,white_70%,transparent)]">
                            <Image 
                                src="/new-illustrations/help-desk.webp" 
                                alt="Help and assistance desk" 
                                fill 
                                className="object-cover object-left" 
                                sizes="(max-width: 768px) 100vw, 33vw" 
                            />
                        </div>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="bg-white border border-ink/10 p-8 flex flex-col">
                        <p className="text-ink/60 max-w-xs text-lg font-light">
                            <span className="text-ink font-medium">Organisations aligned.</span> NGOs and local groups share one timeline per crisis response.
                        </p>

                        <div className="mt-8 relative h-64 mask-[linear-gradient(to_bottom,white_70%,transparent)]">
                            <Image 
                                src="/new-illustrations/women-led.webp" 
                                alt="Organisations aligned and women-led initiatives" 
                                fill 
                                className="object-cover object-top" 
                                sizes="(max-width: 768px) 100vw, 33vw" 
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 md:gap-y-10 lg:mt-24 lg:grid-cols-4">
                    <p className="text-ink/60 text-balance text-sm lg:text-base border-t border-ink/20 pt-6">
                        <span className="text-ink font-medium block mb-2">
                            <ArrowLeftRight className="inline size-4 -translate-y-0.5 mr-1" /> Resource Routing
                        </span>
                        Assign incoming supplies to camps automatically.
                    </p>

                    <p className="text-ink/60 text-balance text-sm lg:text-base border-t border-ink/20 pt-6">
                        <span className="text-ink font-medium block mb-2">
                            <Bell className="inline size-4 -translate-y-0.5 mr-1" /> Urgent Alerts
                        </span>
                        Real-time notifications for immediate blood or supply shortages.
                    </p>

                    <p className="text-ink/60 text-balance text-sm lg:text-base border-t border-ink/20 pt-6">
                        <span className="text-ink font-medium block mb-2">
                            <Users className="inline size-4 -translate-y-0.5 mr-1" /> Volunteer Network
                        </span>
                        Match specific skills with immediate community needs.
                    </p>

                    <p className="text-ink/60 text-balance text-sm lg:text-base border-t border-ink/20 pt-6">
                        <span className="text-ink font-medium block mb-2">
                            <LineChart className="inline size-4 -translate-y-0.5 mr-1" /> Transparent Impact
                        </span>
                        See exactly where funds go with public ledgers.
                    </p>
                </div>
            </div>
        </section>
    )
}
