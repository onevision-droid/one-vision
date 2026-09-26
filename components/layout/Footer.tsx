import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteSettings } from "@/lib/data/site-settings";
import orgData from "@/content/org.json";

const navHrefMap: Record<string, string> = {
  "Health Equity": "/programmes/health-equity",
  "Energy Sovereignty": "/programmes/energy-sovereignty",
  "Ecological Restoration": "/programmes/ecological-restoration",
  "Economic Dignity": "/programmes/economic-dignity",
  "Field Reports": "/stories",
  "Secure Contact": "/get-help",
  "Deploy Support": "/donate",
  "About": "/about",
  "Governance": "/about/governance",
  "Transparency": "/open-ledger",
};

const mainLinks = orgData.footerNav.map((label) => ({
  label,
  href: navHrefMap[label] || `/${label.toLowerCase().replace(/\s+/g, "-")}`,
}));

export function Footer() {
    return (
        <footer className="bg-surface @container py-12 mt-auto">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <div className="border-y border-border-default py-8">
                    <div className="@xl:flex-row @xl:items-center flex flex-col gap-6">
                        <Link
                            href="/"
                            aria-label="One Vision Home"
                            className="inline-block"
                        >
                            <Logo />
                        </Link>
                        <nav className="@xl:ml-auto flex flex-wrap gap-x-6 gap-y-2">
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-ink-500 hover:text-ink-900 text-body-sm transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="@xl:flex-row @xl:justify-between flex flex-col-reverse gap-4 pt-8">
                    <div className="space-y-1">
                        <p className="text-ink-300 text-body-sm">
                            One Vision is a registered NGO in Manipur (Reg No: {siteSettings.registrationNumber}).
                        </p>
                        <p className="text-ink-300 text-body-sm">
                            &copy; {new Date().getFullYear()} One Vision. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <Link
                            href="/privacy"
                            className="text-ink-300 hover:text-ink-900 text-body-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-ink-300 hover:text-ink-900 text-body-sm transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/accessibility"
                            className="text-ink-300 hover:text-ink-900 text-body-sm transition-colors"
                        >
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
