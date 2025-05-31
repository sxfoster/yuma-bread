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
          {/* Instagram icon */}
          <a href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brick hover:text-ochre transition" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.75 2a5.75 5.75 0 00-5.75 5.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM2 7.75C2 5.731 3.731 4 5.75 4h8.5C16.269 4 18 5.731 18 7.75v8.5c0 2.019-1.731 3.75-3.75 3.75h-8.5A3.75 3.75 0 012 16.25v-8.5z"/>
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.25a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
            </svg>
          </a>
          {/* Facebook icon */}
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brick hover:text-ochre transition" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.985 9.985 0 007.5 9.132v-6.456H6.28v-2.676h3.22v-2.03c0-3.187 1.897-4.947 4.803-4.947 1.391 0 2.843.25 2.843.25v3.12h-1.6c-1.576 0-2.064.973-2.064 1.973v2.387h3.518l-.562 2.676h-2.956v6.456A9.985 9.985 0 0022 12z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
