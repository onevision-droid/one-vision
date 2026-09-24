import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileNavigation({ navLinks }: { navLinks: { href: string; label: string }[] }) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" className="px-2" aria-label="Open Menu" />}>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="right" className="pr-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col gap-6 p-6">
            <Link href="/" className="font-fraunces text-xl font-bold text-ink dark:text-paper">
              One Vision
            </Link>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button variant="default" className="mt-4 font-inter w-full">Support Us</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
