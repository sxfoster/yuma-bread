import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-card overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Artisan bread background"
          fill={true}
          style={{objectFit: 'cover'}}
          className="animate-pulse"
          data-ai-hint="rustic bread bakery"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-6 shadow-sm">
          Artisan Bread, Forged in Yuma&apos;s Heart
        </h2>
        <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-10">
          Experience the timeless tradition of handcrafted bread, baked fresh daily with locally-inspired flavors. Warm, crusty, and undeniably delicious.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="font-headline text-lg">
            <Link href="#flavors">Discover Our Breads</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-headline text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="#order">Order for Pickup</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
