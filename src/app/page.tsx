"use client";  // Ensure React hooks work
import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FlavorsSection from "../components/FlavorsSection";
import CartCheckoutSection from "../components/CartCheckoutSection";
import Footer from "../components/Footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function HomePage() {
  // 1. Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // 2. Handler: add/update item
  const addToCart = (item: Omit<CartItem, "quantity">, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id
            ? { ...ci, quantity: Math.min(5, ci.quantity + quantity) }
            : ci
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };

  // 3. Handler: update quantity in cart
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, quantity } : ci))
    );
  };

  // 4. Handler: remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  // 5. Compute total price
  const totalPrice = cart.reduce(
    (sum, ci) => sum + ci.price * ci.quantity,
    0
  );

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
