import Link from 'next/link';
import { Wheat, ShoppingCart } from 'lucide-react'; 
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  cartItemCount: number;
}

export function AppHeader({ cartItemCount }: AppHeaderProps) {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Wheat className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-headline font-bold text-primary">
            Yuma Hearth
          </h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#flavors" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Our Breads
          </Link>
          <Link href="#cart" className="relative flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <Badge variant="default" className="absolute -top-2 -right-3 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                {cartItemCount}
              </Badge>
            )}
            <span className="sr-only">View Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
