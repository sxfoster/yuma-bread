'use client';

import Link from 'next/link';
import { ShoppingCartIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
}

export default function Header({ cartCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 bg-parchment shadow-sm z-50">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#hero" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-brick"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 16l7-7 7 7M5 8l7-7 7 7"
            />
          </svg>
          <span className="text-xl font-heading text-brick">Yuma Hearth</span>
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          <a href="#flavors" className="font-medium text-charcoal hover:text-brick">Our Breads</a>
          <a href="#checkout" className="font-medium text-charcoal hover:text-brick">Order Now</a>
          <Link href="#checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-charcoal hover:text-brick" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brick text-white text-xs font-bold px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-charcoal hover:text-brick focus:outline-none">
            {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-ochre bg-parchment-light py-2">
          <ul className="flex flex-col space-y-2 px-4">
            <li><a href="#flavors" onClick={closeMenu} className="block py-2 font-medium text-charcoal hover:text-brick">Our Breads</a></li>
            <li><a href="#checkout" onClick={closeMenu} className="block py-2 font-medium text-charcoal hover:text-brick">Order Now</a></li>
            <li>
              <Link
                href="#checkout"
                onClick={closeMenu}
                className="flex items-center py-2 font-medium text-charcoal hover:text-brick"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Cart ({cartCount})
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
