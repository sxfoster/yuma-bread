"use client"; 
import { useState } from "react";
import Header from "../src/components/Header";
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
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (item: Omit<CartItem, "quantity">, qty: number) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id
            ? { ...ci, quantity: Math.min(5, ci.quantity + qty) }
            : ci
        );
      } else {
        return [...prev, { ...item, quantity: qty }];
      }
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, quantity: qty } : ci))
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  return (
    <div className="bg-parchment text-charcoal font-body min-h-screen">
      <Header cartCount={cartCount} totalPrice={totalPrice} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FlavorsSection cart={cart} addToCart={addToCart} />
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
