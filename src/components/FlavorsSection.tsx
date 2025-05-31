'use client';

import { useState } from 'react';
import { Wheat, Flame } from 'lucide-react';

interface FlavorsSectionProps {
  addToCart: (item: { id: string; name: string; price: number }, quantity: number) => void;
}

export default function FlavorsSection({ addToCart }: FlavorsSectionProps) {
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

  const [quantities, setQuantities] = useState<Record<string, number>>({
    "traditional-sourdough": 1,
    "jalapeno-cheddar": 1,
    "honey-cinnamon-spice": 1,
  });

  return (
    <section id="flavors" className="mt-16">
      <h2 className="text-center font-heading text-3xl text-brick">Our Daily Bakes</h2>
      <p className="mt-2 text-center text-charcoal text-base max-w-xl mx-auto">
        Each loaf is a testament to our passion for baking, crafted with the finest ingredients.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((flavor) => (
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
                        [flavor.id]: Math.min(5, Number(e.target.value)),
                      }))
                    }
                    className="rounded-md border border-ochre bg-parchment-light px-2 py-1 text-sm text-charcoal focus:border-brick focus:ring focus:ring-brick/20"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() =>
                  addToCart(
                    { id: flavor.id, name: flavor.name, price: 10 },
                    quantities[flavor.id]
                  )
                }
                className="mt-4 w-full bg-brick text-parchment font-semibold rounded-md py-2 flex items-center justify-center hover:bg-brick/90 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m1.6-8L5 5m16 0v2m-5 9v2a1 1 0 001 1h3m-4-3h4m-6-5H9m0 0L7 5"
                  />
                </svg>
                Add {quantities[flavor.id]} to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
