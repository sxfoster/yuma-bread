'use client';

import { useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartCheckoutSectionProps {
  cart: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
}

export default function CartCheckoutSection({ cart, updateQuantity, removeFromCart, totalPrice }: CartCheckoutSectionProps) {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\+?\d{7,15}$/;
    setFormValid(
      fullName.trim().length > 0 &&
        (emailRegex.test(contact) || phoneRegex.test(contact)) &&
        cart.length > 0
    );
  }, [fullName, contact, cart]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Order placed!\nName: ${fullName}\nContact: ${contact}\nNotes: ${notes}\nItems: ${cart.length}\nTotal: $${totalPrice.toFixed(2)}`
    );
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Cart Summary */}
        <div className="bg-parchment-light rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading text-brick">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="mt-4 text-center text-charcoal">Your cart is empty. Add loaves from the flavors above.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {cart.map(ci => (
                <div key={ci.id} className="flex items-center justify-between bg-parchment rounded-md p-3">
                  <div>
                    <p className="font-medium text-charcoal">{ci.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <label htmlFor={`cart-qty-${ci.id}`} className="sr-only">Quantity for {ci.name}</label>
                      <select
                        id={`cart-qty-${ci.id}`}
                        value={ci.quantity}
                        onChange={e => updateQuantity(ci.id, Math.min(5, Number(e.target.value)))}
                        className="rounded-md border border-ochre bg-parchment-light px-2 py-1 text-sm text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
                      >
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <span className="text-charcoal text-sm">@ ${ci.price.toFixed(2)} each</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-heading text-charcoal">${(ci.price * ci.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(ci.id)} className="text-ochre hover:text-brick" aria-label={`Remove ${ci.name} from cart`}>
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 border-t border-ochre pt-4 flex justify-between items-center">
                <span className="font-heading text-lg text-charcoal">Total:</span>
                <span className="font-heading text-xl text-brick">${ totalPrice.toFixed(2) }</span>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="mt-8 bg-parchment-light rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading text-brick">Complete Your Order</h2>
          <p className="mt-2 text-charcoal">Enter your details below to finalize your pickup order.</p>
          <form onSubmit={handlePlaceOrder} className="mt-4 space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-charcoal font-medium">
                Full Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="mt-1 w-full rounded-md border border-ochre bg-parchment-light px-4 py-2 text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
                required
              />
            </div>

            {/* Email or Phone */}
            <div>
              <label htmlFor="contact" className="block text-charcoal font-medium">
                Email or Phone Number<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="e.g. email@example.com or +15551234567"
                className="mt-1 w-full rounded-md border border-ochre bg-parchment-light px-4 py-2 text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
                required
              />
            </div>

            {/* Optional Notes */}
            <div>
              <label htmlFor="notes" className="block text-charcoal font-medium">
                Optional Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any special requests or delivery considerations?"
                rows={4}
                className="mt-1 w-full rounded-md border border-ochre bg-parchment-light px-4 py-2 text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
              />
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={!formValid}
              className={`mt-4 w-full rounded-md py-3 font-semibold transition ${
                formValid
                  ? 'bg-brick text-parchment hover:bg-brick/90'
                  : 'bg-brick/50 text-gray-200 cursor-not-allowed'
              }`}
            >
              Place Order
            </button>

            {cart.length === 0 && (
              <p className="mt-2 text-center text-sm text-gray-600">
                Please add items to your cart from the “Our Daily Bakes” section.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
