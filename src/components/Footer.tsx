import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-parchment-light border-t border-ochre py-8 mt-16">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-charcoal text-sm">Proudly baked in Yuma, AZ.</p>
        <p className="mt-2 text-gray-600 text-xs">
          Please notify us of any allergies—our loaves may contain gluten, dairy,
          or nuts.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          {/* Instagram & Facebook icons as shown in the code sample */}
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener"
          >
            <Instagram className="h-5 w-5 text-brick hover:text-ochre transition" />
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener"
          >
            <Facebook className="h-5 w-5 text-brick hover:text-ochre transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
