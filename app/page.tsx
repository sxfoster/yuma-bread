"use client"; 
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "../src/components/HeroSection";
import FlavorsSection from "../src/components/FlavorsSection";
import CartCheckoutSection from "../src/components/CartCheckoutSection";
import Footer from "../src/components/Footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => { /* … */ };
  const updateQuantity = (id: string, quantity: number) => { /* … */ };
  const removeFromCart = (id: string) => { /* … */ };
  const totalPrice = cart.reduce((sum, ci) => sum + ci.price * ci.quantity, 0);

  return (
    <div className="bg-parchment text-charcoal font-body min-h-screen">
      <Header cartCount={cart.reduce((sum, ci) => sum + ci.quantity, 0)} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FlavorsSection addToCart={addToCart} />
        <CartCheckoutSection
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
        />
      </main>
      <Footer />
    </div>
  );
}
