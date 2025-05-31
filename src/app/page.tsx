'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { HeroSection } from '@/components/hero-section';
import { FlavorsSection } from '@/components/flavors-section';
import { PurchaseForm } from '@/components/purchase-form';
import { CartSection } from '@/components/cart-section'; // New import
import type { BreadFlavor, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';


export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (bread: BreadFlavor) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.bread.id === bread.id);
      if (existingItem) {
        if (existingItem.quantity < 5) {
          return prevItems.map(item =>
            item.bread.id === bread.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast({
            title: "Limit Reached",
            description: `You can only add up to 5 loaves of ${bread.name}.`,
            variant: "default",
            duration: 3000,
          });
          return prevItems;
        }
      }
      return [...prevItems, { bread, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (breadId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.bread.id === breadId
          ? { ...item, quantity: Math.max(1, Math.min(5, quantity)) } // Ensure quantity is between 1 and 5
          : item
      )
    );
  };

  const handleRemoveFromCart = (breadId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.bread.id !== breadId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.bread.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader cartItemCount={cartItemCount} />
      <main className="flex-grow">
        <HeroSection />
        <FlavorsSection onAddToCart={handleAddToCart} />
        {cartItems.length > 0 && (
          <CartSection
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            totalPrice={cartTotal}
          />
        )}
        <PurchaseForm cartItems={cartItems} onOrderSuccess={handleClearCart} totalPrice={cartTotal} />
      </main>
      <AppFooter />
    </div>
  );
}
