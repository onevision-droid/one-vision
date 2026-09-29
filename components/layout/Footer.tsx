import Link from "next/link";
import { siteSettings } from "@/lib/data/site-settings";
import orgData from "@/content/org.json";
import { ShieldAlert, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-graphite text-snow pt-16 pb-8 md:pt-24 md:pb-12 border-t border-graphite mt-auto">
      <div className="mx-auto max-w-container px-6">
        
        {/* Top & Middle Tier: Brand & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          
          {/* Brand & OPSEC Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fjord">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-snow uppercase">
                {orgData.org.name}
              </h2>
            </Link>
            <p className="text-role-body text-snow/70 max-w-md mb-8">
              {orgData.org.mandate}
            </p>
            
            {/* Emergency Mode Indicator */}
            {siteSettings.emergencyMode && (
              <div className="mb-6 inline-flex items-start gap-3 p-4 border border-safety-orange/30 bg-safety-orange/5 text-safety-orange">
                <ShieldAlert className="size-5 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-semibold uppercase tracking-wider">Emergency Mode Active</span>
                  <span className="text-xs text-safety-orange/80">{siteSettings.emergencyMessage}</span>
                </div>
              </div>
            )}
            
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 mt-2 lg:mt-0">
            {/* Initiatives Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-snow">Initiatives</h3>
              <Link href="/programmes" className="text-role-body text-snow/70 hover:text-fjord transition-colors duration-200">Our Programmes</Link>
              <Link href="/stories" className="text-role-body text-snow/70 hover:text-fjord transition-colors duration-200">Field Reports</Link>
              <Link href="/open-ledger" className="text-role-body text-snow/70 hover:text-fjord transition-colors duration-200">Transparency</Link>
            </div>
            
            {/* Organization Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-snow">Organization</h3>
              <Link href="/about" className="text-role-body text-snow/70 hover:text-fjord transition-colors duration-200">About Us</Link>
              <Link href="/volunteer" className="text-role-body text-snow/70 hover:text-fjord transition-colors duration-200">Deploy Support</Link>
              <Link href="/about/governance" className="text-role-body text-snow/70 hover:text-fjord transition-colors duration-200">Governance</Link>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-snow">Contact Us</h3>

              <a href={`mailto:${siteSettings.contactEmail}`} className="inline-flex items-center gap-2 text-role-body text-snow/70 hover:text-fjord transition-colors duration-200 group mt-2">
                <Mail className="size-4 shrink-0 group-hover:text-fjord transition-colors" />
                <span>{siteSettings.contactEmail}</span>
              </a>
              
              <div className="inline-flex items-start gap-2 text-role-body text-snow/70 pt-2 border-t border-white/10 mt-2">
                <MapPin className="size-4 shrink-0 mt-1" />
                <span className="text-sm">{siteSettings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Legal & Registration */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-role-caption text-snow/50 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} {orgData.org.legal}.</p>
            <span className="hidden md:inline-block w-px h-3 bg-white/10"></span>
            <p>Reg No: {siteSettings.registrationNumber}</p>
          </div>
          
          <div className="flex items-center gap-6 text-role-caption">
            <Link href="/privacy" className="text-snow/50 hover:text-fjord transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="text-snow/50 hover:text-fjord transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
