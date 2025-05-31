'use client';

import { useState, useEffect } from 'react';
import { Wheat, Flame } from 'lucide-react';

interface FlavorsSectionProps {
  cart: { id: string; name: string; price: number; quantity: number }[];
  addToCart: (
    item: { id: string; name: string; price: number },
    quantity: number
  ) => void;
}

export default function FlavorsSection({ cart, addToCart }: FlavorsSectionProps) {
  const flavors = [
    {
      id: "traditional-sourdough",
      name: "Traditional Sourdough",
      description:
        "A classic, tangy loaf with a satisfyingly chewy crust and open crumb. Perfect for any occasion.",
      icon: <Wheat className="h-6 w-6 text-ochre" />,
    },
    {
      id: "jalapeno-cheddar",
      name: "Jalapeño Cheddar",
      description:
        "A fiery kick of jalapeños perfectly balanced with pockets of sharp, melted cheddar cheese.",
      icon: <Flame className="h-6 w-6 text-ochre" />,
    },
    {
      id: "honey-cinnamon-spice",
      name: "Honey Cinnamon Spice",
      description:
        "A sweet and warm loaf swirled with local honey and aromatic cinnamon—perfect for a cozy morning or afternoon treat.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-ochre"
        >
          <path d="M2 22 22 2" />
          <path d="M7 17h0" />
          <path d="M9 15h0" />
          <path d="M11 13h0" />
        </svg>
      ),
    },
  ];

  const getExistingQty = (flavorId: string) => {
    const found = cart.find((ci) => ci.id === flavorId);
    return found ? found.quantity : 0;
  };
  const maxPerFlavor = 5;

  const [quantities, setQuantities] = useState<Record<string, number>>({
    "traditional-sourdough": 1,
    "jalapeno-cheddar": 1,
    "honey-cinnamon-spice": 1,
  });

  useEffect(() => {
    const newQuantities: Record<string, number> = { ...quantities };
    flavors.forEach((flavor) => {
      const existing = getExistingQty(flavor.id);
      const available = maxPerFlavor - existing;
      if (newQuantities[flavor.id] > available) {
        newQuantities[flavor.id] = available > 0 ? available : 1;
      }
    });
    setQuantities(newQuantities);
  }, [cart]);

  return (
    <section id="flavors" className="mt-16">
      <h2 className="text-center font-heading text-3xl text-brick">Our Daily Bakes</h2>
      <p className="mt-2 text-center text-charcoal text-base max-w-xl mx-auto">
        Each loaf is a testament to our passion for baking, crafted with the finest ingredients.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((flavor) => {
          const existingQty = getExistingQty(flavor.id);
          const availableToAdd = maxPerFlavor - existingQty;
          return (
            <div
              key={flavor.id}
              className="bg-parchment-light rounded-lg shadow-md overflow-hidden flex flex-col"
            >
            <div className="h-48 w-full bg-gray-300">
              <img
                src={`https://via.placeholder.com/600x400.png?text=${encodeURIComponent(
                  flavor.name
                )}`}
                alt={`${flavor.name} image`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center space-x-2">
                {flavor.icon}
                <h3 className="font-heading text-xl text-brick">{flavor.name}</h3>
              </div>
              <p className="mt-2 text-charcoal text-sm flex-grow">{flavor.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-heading text-lg text-brick">$10.00</span>
                <div>
                  <label htmlFor={`qty-${flavor.id}`} className="sr-only">{`Quantity for ${flavor.name}`}</label>
                  <select
                    id={`qty-${flavor.id}`}
                    value={quantities[flavor.id]}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [flavor.id]: Math.min(
                          availableToAdd,
                          Number(e.target.value)
                        ),
                      }))
                    }
                    disabled={existingQty >= maxPerFlavor}
                    className={`rounded-md border border-ochre bg-parchment-light px-2 py-1 text-sm text-charcoal focus:border-brick focus:ring focus:ring-brick/20 ${
                      existingQty >= maxPerFlavor
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {[...Array(5)].map((_, i) => {
                      const n = i + 1;
                      return (
                        <option key={n} value={n} disabled={n > availableToAdd}>
                          {n}
                        </option>
                      );
                    })}
                  </select>
                  {availableToAdd > 0 && availableToAdd <= 2 && (
                    <p className="mt-1 text-yellow-600 text-xs">
                      Only {availableToAdd} more allowed.
                    </p>
                  )}
                </div>
              </div>
              {existingQty >= maxPerFlavor ? (
                <div className="mt-4">
                  <button
                    disabled
                    className="w-full bg-gray-400 text-gray-200 font-semibold rounded-md py-2 cursor-not-allowed"
                  >
                    Limit Reached
                  </button>
                  <p className="mt-2 text-center text-red-600 text-sm">
                    You’ve reached the 5-loaf limit for {flavor.name}.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() =>
                    addToCart(
                      { id: flavor.id, name: flavor.name, price: 10 },
                      Math.min(availableToAdd, quantities[flavor.id])
                    )
                  }
                  className="mt-4 w-full bg-brick text-parchment font-semibold rounded-md py-2 flex items-center justify-center hover:bg-brick/90 transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        );
        })}
      </div>
    </section>
  );
}
