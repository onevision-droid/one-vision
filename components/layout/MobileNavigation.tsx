import { Sheet, SheetContent, SheetTrigger, SheetTitle } from"@/components/ui/sheet";
import { useState } from"react";
import { SearchDialog } from"@/components/ui/SearchDialog";
import { Button } from"@/components/ui/button";
import { Menu } from"lucide-react";
import Link from"next/link";

export function MobileNavigation({ navLinks }: { navLinks: { href: string; label: string }[] }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" className="px-2" aria-label="Open Menu" />}>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="right" className="pr-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col gap-6 p-6">
            <Link href="/" className="font-sans text-heading-md font-bold text-foreground">
              One Vision
            </Link>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-body-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setSearchOpen(true)}
                className="font-sans text-body-lg font-medium text-primary text-left cursor-pointer"
              >
                Search
              </button>
            </nav>
            <Button variant="primary" className="mt-4 w-full">Donate</Button>
          </div>
        </SheetContent>
      </Sheet>
      <SearchDialog isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
