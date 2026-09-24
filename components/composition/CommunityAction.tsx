import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUp, ChevronDown, FileText, HardDriveDownload, Package, Stethoscope, FileBarChart } from 'lucide-react'
import Image from 'next/image'

export function CommunityAction() {
    return (
        <section className="py-24 md:py-32 bg-paper border-t border-ink/10">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <h2 className="text-ink/60 max-w-4xl text-balance text-3xl md:text-5xl font-light font-fraunces tracking-tight">
                    <span className="text-ink">Community Support In Action.</span> <br /> Radical transparency, zero red tape.
                </h2>
                <div className="mt-12 grid gap-x-4 gap-y-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Card 1: Request Aid (Input) */}
                    <div className="row-span-2 grid grid-cols-1 gap-4">
                        <Card className="aspect-4/3 bg-white relative overflow-hidden flex flex-col justify-end p-0 border-ink/10 rounded-xl">
                            <RequestAidIllustration />
                            <Image
                                src="/new-illustrations/community-support.webp"
                                alt="abstract background"
                                width={670}
                                height={670}
                                className="absolute inset-0 size-full object-cover opacity-20 grayscale blend-luminosity"
                            />
                        </Card>

                        <p className="text-ink/60 text-balance font-light">
                            <span className="text-ink font-medium">Direct Aid Routing. </span> Real-time request logging connects needs directly to available volunteers.
                        </p>
                    </div>

                    {/* Card 2: Transparent Funds (Dynamic Island) */}
                    <div className="row-span-2 grid grid-cols-1 gap-4">
                        <Card className="aspect-4/3 bg-forest/5 relative overflow-hidden flex flex-col p-0 border-ink/10 rounded-xl">
                            <FundTrackerIllustration />
                        </Card>

                        <p className="text-ink/60 text-balance font-light">
                            <span className="text-ink font-medium">Verified Allocation. </span> Every resource and rupee is tracked and publicly visible on our ledger.
                        </p>
                    </div>

                    {/* Card 3: Open Reports (Download) */}
                    <div className="row-span-2 grid grid-cols-1 gap-4">
                        <Card className="aspect-4/3 bg-white relative overflow-hidden p-0 border-ink/10 rounded-xl flex items-center justify-center">
                            <DownloadIllustration />
                            <Image
                                src="/new-illustrations/youth-learning.webp"
                                alt="background"
                                width={670}
                                height={670}
                                className="absolute inset-0 size-full object-cover opacity-10 grayscale"
                            />
                        </Card>

                        <p className="text-ink/60 text-balance font-light">
                            <span className="text-ink font-medium">Public Accountability. </span> Download our monthly impact audits and detailed field reports instantly.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

function DownloadIllustration() {
    return (
        <div className="z-10 absolute inset-0 m-auto size-fit scale-95 md:scale-100">
            <Button
                variant="secondary"
                className="bg-white/80 border border-ink/10 backdrop-blur shadow-sm rounded-full"
                size="sm"
                nativeButton={false}
                render={
                    <div className="flex items-center gap-2 px-2 text-ink">
                        <HardDriveDownload className="size-4 opacity-75" />
                        <span className="border-r border-ink/20 pr-2 font-medium">Download Data</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </div>
                }
            />

            <div className="mt-3 min-w-56 rounded-2xl bg-white p-1.5 shadow-xl shadow-black/5 ring-1 ring-black/5 *:cursor-pointer border border-ink/10">
                <div className="peer flex gap-3 rounded-xl px-3 py-2 hover:bg-ink/5 transition-colors">
                    <FileText className="size-4 translate-y-0.5 text-forest" />
                    <div className="space-y-0.5">
                        <div className="text-xs font-medium text-ink">August Field Report</div>
                        <div className="text-xs text-ink/50">PDF • 2.4 MB</div>
                    </div>
                </div>

                <div className="not-peer-hover:bg-ink/5 flex gap-3 rounded-xl px-3 py-2 transition-colors">
                    <FileBarChart className="size-4 translate-y-0.5 text-sage" />
                    <div className="space-y-0.5">
                        <div className="text-xs font-medium text-ink">Q3 Financial Audit</div>
                        <div className="text-xs text-ink/50">CSV • 142 KB</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RequestAidIllustration() {
    return (
        <div
            aria-hidden="true"
            className="z-10 absolute inset-x-6 bottom-6 m-auto h-fit scale-95 md:scale-100"
        >
            <div className="bg-white/90 backdrop-blur-md border border-ink/10 h-fit rounded-2xl p-3 shadow-xl shadow-black/5">
                <div className="text-ink/50 p-2 pb-3 text-sm font-light">Describe the assistance needed...</div>
                <div className="flex justify-between gap-3 pt-2 border-t border-ink/5">
                    <div className="flex items-center gap-1">
                        <div className="hover:bg-ink/5 flex size-8 cursor-pointer items-center justify-center rounded-full text-ink/60 transition-colors">
                            <Package className="size-4" />
                        </div>
                        <div className="hover:bg-ink/5 flex size-8 cursor-pointer items-center justify-center rounded-full text-ink/60 transition-colors">
                            <Stethoscope className="size-4" />
                        </div>
                    </div>

                    <div className="bg-forest text-white flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-forest-light">
                        <ArrowUp className="size-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function FundTrackerIllustration() {
    return (
        <div
            aria-hidden="true"
            className="z-10 bg-white absolute inset-x-6 bottom-0 mx-auto mt-auto h-[65%] w-[85%] origin-bottom rounded-t-3xl border border-ink/10 shadow-lg px-4 pt-4"
        >
            <div className="relative h-full w-full">
                <div className="shadow-black/5 relative rounded-2xl bg-paper p-3 shadow-sm border border-ink/5">
                    <div className="flex gap-3">
                        <div className="size-14 shrink-0 relative overflow-hidden rounded-xl border border-ink/10 bg-white flex items-center justify-center">
                            <Image
                                src="/new-illustrations/health-access.webp"
                                alt="Relief Camp"
                                fill
                                sizes="(max-width: 768px) 100vw, 56px"
                                className="object-cover"
                            />
                        </div>
                        <div className="py-0.5 pr-2 w-full">
                            <div className="text-sm font-medium text-ink flex justify-between items-center w-full">
                                <span>Relief Camp Alpha</span>
                                <span className="size-2 rounded-full bg-forest animate-pulse"></span>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                                <div>
                                    <div className="text-[10px] uppercase tracking-wider text-ink/50 font-medium">Supplies</div>
                                    <div className="mt-0.5 text-sm font-medium text-ink">4,500 kg</div>
                                </div>
                                <div className="bg-ink/10 h-6 w-px" />
                                <div>
                                    <div className="text-[10px] uppercase tracking-wider text-ink/50 font-medium">Funds Used</div>
                                    <div className="mt-0.5 text-sm font-medium text-ink">₹82.5k</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
