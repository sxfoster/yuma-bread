import { Facebook, Instagram, Youtube } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Yuma Hearth. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Baked with love in Yuma, Arizona.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a
            href="https://instagram.com/yumahearth"
            aria-label="Instagram"
            target="_blank"
            rel="noopener"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/yumahearth"
            aria-label="Facebook"
            target="_blank"
            rel="noopener"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com/yumahearth"
            aria-label="YouTube"
            target="_blank"
            rel="noopener"
          >
            <Youtube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
