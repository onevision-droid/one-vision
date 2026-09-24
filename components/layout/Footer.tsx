import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const mainLinks = [
    { label: 'Programmes', href: '/programmes' },
    { label: 'Stories', href: '/stories' },
    { label: 'Get Help', href: '/get-help' },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Donate', href: '/donate' },
    { label: 'Contact', href: '/contact' },
]

export function Footer() {
    return (
        <footer className="bg-white @container py-16 mt-auto">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="border-y border-ink/10 py-12">
                    <div className="flex flex-col @3xl:flex-row @3xl:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <Link
                                href="/"
                                aria-label="One Vision Home"
                                className="inline-block"
                            >
                                <Logo />
                            </Link>
                            <p className="text-ink/60 font-light max-w-xs">
                                Building resilience and delivering direct support across Imphal and Manipur.
                            </p>
                        </div>
                        
                        <nav className="flex flex-wrap gap-x-8 gap-y-4">
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-ink/70 hover:text-ink text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
                
                <div className="pt-8">
                    <div className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:justify-between gap-6">
                        <div className="space-y-1">
                            <p className="text-ink/50 text-xs font-light">
                                One Vision is a registered non-profit organization in Manipur.
                            </p>
                            <p className="text-ink/50 text-xs font-light">
                                &copy; {new Date().getFullYear()} One Vision NGO. All rights reserved.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <Link
                                href="/privacy"
                                className="text-ink/50 hover:text-ink text-xs transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-ink/50 hover:text-ink text-xs transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/accessibility"
                                className="text-ink/50 hover:text-ink text-xs transition-colors"
                            >
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
