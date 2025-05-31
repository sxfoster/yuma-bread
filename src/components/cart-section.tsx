'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { CartItem } from '@/types';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CartSectionProps {
  cartItems: CartItem[];
  onUpdateQuantity: (breadId: string, quantity: number) => void;
  onRemoveItem: (breadId: string) => void;
  totalPrice: number;
}

export function CartSection({ cartItems, onUpdateQuantity, onRemoveItem, totalPrice }: CartSectionProps) {
  const handleQuantityChange = (breadId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= 5) {
      onUpdateQuantity(breadId, newQuantity);
    }
  };

  const handleInputChange = (breadId: string, value: string) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 5) {
      onUpdateQuantity(breadId, newQuantity);
    } else if (value === "") {
      // Allow clearing input, could default to 1 or handle as needed
      onUpdateQuantity(breadId, 1); // Or some other logic for empty input
    }
  };


  if (cartItems.length === 0) {
    return null; // Don't render section if cart is empty
  }

  return (
    <section id="cart" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center">
            <ShoppingCart className="mr-3 h-10 w-10" /> Your Cart
          </h2>
        </div>
        
        <Card className="max-w-3xl mx-auto shadow-xl bg-background p-6 sm:p-8 rounded-lg">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-headline text-primary">Review Your Items</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {cartItems.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty. Add some bread to get started!</p>
            ) : (
              <>
                <ScrollArea className="h-[300px] pr-4 mb-6">
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.bread.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card/50">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                           <Image src={item.bread.imageSrc} alt={item.bread.name} fill style={{objectFit: 'cover'}} data-ai-hint={item.bread.imageHint} />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-headline text-lg text-primary">{item.bread.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.bread.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.bread.id, item.quantity, -1)} disabled={item.quantity <= 1}>
                            <MinusCircle className="h-5 w-5" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={item.quantity.toString()}
                            onChange={(e) => handleInputChange(item.bread.id, e.target.value)}
                            onBlur={(e) => { // Ensure quantity is valid on blur
                                const val = parseInt(e.target.value, 10);
                                if (isNaN(val) || val < 1) onUpdateQuantity(item.bread.id, 1);
                                else if (val > 5) onUpdateQuantity(item.bread.id, 5);
                            }}
                            className="w-16 h-10 text-center text-base"
                          />
                          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.bread.id, item.quantity, 1)} disabled={item.quantity >= 5}>
                            <PlusCircle className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="text-lg font-semibold text-primary w-20 text-right">
                          ${(item.bread.price * item.quantity).toFixed(2)}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.bread.id)} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-2xl font-headline font-bold text-primary">
                      Grand Total:
                    </p>
                    <p className="text-3xl font-headline font-bold text-primary">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <Button asChild size="lg" className="w-full font-headline text-xl h-14">
                    <Link href="#order">
                      Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
