import { Section, Container } from"@/components/layout/Shell";
import { Button } from"@/components/ui/button";
import Link from"next/link";
import { AlertCircle, ArrowLeft } from"lucide-react";

export default function NotFound() {
 return (
 <Section tone="alt" className="min-h-[80vh] flex items-center justify-center">
 <Container className="max-w-xl text-center flex flex-col items-center">
 <div className="size-10 bg-muted border border-border flex items-center justify-center mb-8">
 <AlertCircle className="size-8 text-muted-foreground" />
 </div>
 <h1 className="font-sans text-display-lg font-light text-foreground mb-4">
 Page Not Found
 </h1>
 <p className="font-sans text-body-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
 We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist anymore.
 </p>
 <Button
 variant="primary"
 size="lg"
 nativeButton={false}
 className="gap-2 px-6"
 render={<Link href="/" />}
 >
 <ArrowLeft className="size-4" />
 Return Home
 </Button>
 </Container>
 </Section>
 );
}
