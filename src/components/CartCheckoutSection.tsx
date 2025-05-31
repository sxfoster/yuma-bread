import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartCheckoutProps {
  cart: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
}

export default function CartCheckoutSection({
  cart,
  updateQuantity,
  removeFromCart,
  totalPrice,
}: CartCheckoutProps) {
  // Form fields state
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const contactIsValid =
      /\S+@\S+\.\S+/.test(contact) || /^\+?\d{7,15}$/.test(contact);
    const nameIsValid = fullName.trim().length > 0;
    const cartNotEmpty = cart.some((ci) => ci.quantity > 0);
    setFormValid(nameIsValid && contactIsValid && cartNotEmpty);
  }, [fullName, contact, cart]);

  // Replace with your Formspree form endpoint
  const FORMSPREE_URL = "https://formspree.io/f/abcd1234";

  return (
    <section id="checkout" className="mt-16 mb-16">
      {/* Cart Summary */}
      <div className="bg-parchment-light rounded-lg shadow-md p-6">
        <h2 className="text-xl font-heading text-brick">Your Cart</h2>
        {cart.every((ci) => ci.quantity === 0) ? (
          <p className="mt-4 text-center text-charcoal">
            Your cart is empty. Add loaves from the flavors above.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {cart.map((ci) =>
              ci.quantity > 0 ? (
                <div
                  key={ci.id}
                  className="flex items-center justify-between bg-parchment rounded-md p-3"
                >
                  <div>
                    <p className="font-medium text-charcoal">{ci.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <label
                        htmlFor={`cart-qty-${ci.id}`}
                        className="sr-only"
                      >{`Quantity for ${ci.name}`}</label>
                      <select
                        id={`cart-qty-${ci.id}`}
                        value={ci.quantity}
                        onChange={(e) =>
                          updateQuantity(ci.id, Math.min(5, Number(e.target.value)))
                        }
                        className="rounded-md border border-ochre bg-parchment-light px-2 py-1 text-sm text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <span className="text-charcoal text-sm">
                        @ ${ci.price.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-heading text-charcoal">
                      ${(ci.price * ci.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(ci.id)}
                      className="text-ochre hover:text-brick"
                      aria-label={`Remove ${ci.name} from cart`}
                      type="button"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ) : null
            )}

            {/* Total */}
            <div className="mt-4 border-t border-ochre pt-4 flex justify-between items-center">
              <span className="font-heading text-lg text-charcoal">Total:</span>
              <span className="font-heading text-xl text-brick">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Form (posts to Formspree) */}
      <form
        action={FORMSPREE_URL}
        method="POST"
        className="mt-8 bg-parchment-light rounded-lg shadow-md p-6 space-y-4"
      >
        {/* Optional custom email subject */}
        <input
          type="hidden"
          name="_subject"
          value={`New Yuma Hearth Order from ${fullName || "[no name]"}`}
        />

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-charcoal font-medium">
            Full Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. jane@example.com or +15551234567"
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
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special requests or delivery considerations?"
            rows={4}
            className="mt-1 w-full rounded-md border border-ochre bg-parchment-light px-4 py-2 text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
          />
        </div>

        {/* Hidden fields for each cart item */}
        {cart
          .filter((ci) => ci.quantity > 0)
          .map((ci, idx) => (
            <div key={ci.id}>
              <input
                type="hidden"
                name={`items[${idx}][flavor]`}
                value={ci.name}
              />
              <input
                type="hidden"
                name={`items[${idx}][quantity]`}
                value={ci.quantity.toString()}
              />
              <input
                type="hidden"
                name={`items[${idx}][price]`}
                value={ci.price.toString()}
              />
            </div>
          ))}

        {/* Hidden total price field */}
        <input
          type="hidden"
          name="totalPrice"
          value={totalPrice.toFixed(2)}
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={!formValid}
          className={`w-full mt-4 rounded-md py-3 font-semibold transition ${
            formValid
              ? "bg-brick text-parchment hover:bg-brick/90"
              : "bg-brick/50 text-gray-200 cursor-not-allowed"
          }`}
        >
          Place Order
        </button>

        {/* Validation hint if cart is empty */}
        {cart.every((ci) => ci.quantity === 0) && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Please add items to your cart from the "Our Daily Bakes" section.
          </p>
        )}
      </form>
    </section>
  );
}
