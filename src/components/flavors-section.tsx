
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadFlavor } from '@/types';
import { BREAD_FLAVORS } from '@/config/breads';
import { ShoppingCart } from 'lucide-react'; // Added for button icon

interface FlavorsSectionProps {
  onAddToCart: (bread: BreadFlavor) => void;
}

export function FlavorsSection({ onAddToCart }: FlavorsSectionProps) {
  return (
    <section id="flavors" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Our Daily Bakes
          </h2>
          <p className="mt-4 text-lg text-foreground max-w-xl mx-auto">
            Each loaf is a testament to our passion for baking, crafted with the finest ingredients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BREAD_FLAVORS.map((flavor) => (
            <Card key={flavor.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="p-0">
                <div className="aspect-[3/2] relative w-full">
                  <img
                    src={`https://via.placeholder.com/600x400.png?text=${encodeURIComponent(flavor.name)}`}
                    srcSet={`https://via.placeholder.com/300x200.png?text=${encodeURIComponent(flavor.name)} 300w, https://via.placeholder.com/600x400.png?text=${encodeURIComponent(flavor.name)} 600w, https://via.placeholder.com/1200x800.png?text=${encodeURIComponent(flavor.name)} 1200w`}
                    sizes="(max-width: 600px) 100vw, 600px"
                    loading="lazy"
                    alt={`${flavor.name} image`}
                    className="rounded-t-lg object-cover w-full h-full"
                    data-ai-hint={flavor.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <div className="mb-3">
                  <CardTitle className="font-headline text-2xl text-primary">{flavor.name}</CardTitle>
                </div>
                <CardDescription className="text-foreground text-base">
                  {flavor.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex flex-col items-stretch gap-4">
                <p className="text-2xl font-headline font-semibold text-primary text-center">
                  ${flavor.price.toFixed(2)}
                </p>
                <Button onClick={() => onAddToCart(flavor)} className="font-headline text-base w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
