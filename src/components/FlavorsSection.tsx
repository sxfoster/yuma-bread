'use client';

import { useState, useEffect } from 'react';
// Icons are defined inline for each flavor

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
      id: "pure-hearth-loaf",
      name: "Pure Hearth Loaf",
      description:
        "A timeless artisan loaf featuring a crisp crust and tender, rustic interior.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ochre"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* wheat icon SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 16l7-7 7 7M5 8l7-7 7 7"
          />
        </svg>
      ),
    },
    {
      id: "parmesan-black-pepper-loaf",
      name: "Parmesan & Black Pepper Loaf",
      description:
        "A savory loaf studded with nutty Parmesan and freshly cracked black pepper.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ochre"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* cheese icon SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7l9-4 9 4v11H3V7z"
          />
        </svg>
      ),
    },
    {
      id: "garlic-herb-loaf",
      name: "Garlic & Herb Loaf",
      description: "A fragrant loaf infused with minced garlic and fresh herbs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ochre"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* herb icon SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a7 7 0 00-7 7v5h14V9a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "jalapeno-cheddar-loaf",
      name: "Jalapeño & Cheddar Loaf",
      description:
        "A bold loaf bursting with sharp cheddar cheese and chopped jalapeños.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ochre"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* chili pepper icon SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2c-1.657 0-3 1.343-3 3v2h6V5c0-1.657-1.343-3-3-3z"
          />
        </svg>
      ),
    },
    {
      id: "cinnamon-sugar-swirl-loaf",
      name: "Cinnamon-Sugar Swirl Loaf (Sweet)",
      description: "A delightfully sweet swirl loaf with cinnamon and sugar.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ochre"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* swirl icon SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m0 0l-6-6m6 6l6-6"
          />
        </svg>
      ),
    },
    {
      id: "honey-oats-loaf",
      name: "Honey & Oats Loaf",
      description:
        "A wholesome loaf enriched with Nikki’s Chickies honey and rolled oats.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-ochre"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* honey drop icon SVG path */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2c0 1.38-1.12 2.5-2.5 2.5S7 3.38 7 2c0-1.38 1.12-2.5 2.5-2.5S12 0.62 12 2z"
          />
        </svg>
      ),
    },
  ];

  const getExistingQty = (flavorId: string) => {
    const found = cart.find((ci) => ci.id === flavorId);
    return found ? found.quantity : 0;
  };
  // Maximum number of loaves a customer can purchase per flavor
  const maxPerFlavor = 3;

  const [quantities, setQuantities] = useState<Record<string, number>>({
    "pure-hearth-loaf": 1,
    "parmesan-black-pepper-loaf": 1,
    "garlic-herb-loaf": 1,
    "jalapeno-cheddar-loaf": 1,
    "cinnamon-sugar-swirl-loaf": 1,
    "honey-oats-loaf": 1,
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
                    {[...Array(maxPerFlavor)].map((_, i) => {
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
                    You’ve reached the 3-loaf limit for {flavor.name}.
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
