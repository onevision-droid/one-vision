import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";

export function Footer() {
    return (
        <footer className="bg-background py-8 mt-auto border-t border-border-default">
            <div className="mx-auto max-w-container px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-role-caption">
                        &copy; {new Date().getFullYear()} One Vision (Reg No: {siteSettings.registrationNumber}). All rights reserved.
                    </p>
                    <nav className="flex flex-wrap justify-center items-center gap-6 text-role-label text-ink-900">
                        <Link href="/programmes" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">Programmes</Link>
                        <Link href="/about" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">About</Link>
                        <Link href="/stories" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">Field Reports</Link>
                        <Link href="/volunteer" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">Volunteer</Link>
                        <Link href="/open-ledger" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">Transparency</Link>
                        <Link href="/get-help" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">Contact</Link>
                        <Link href="/privacy" className="hover:text-accent-teal hover:-translate-y-px transition-all duration-300 inline-block">Privacy</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
