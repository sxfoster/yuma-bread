export default function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-20 pb-16 text-center"
      style={{
        background:
          "url('https://via.placeholder.com/1200x600?text=Artisan+Bread+Background') no-repeat center center/cover",
      }}
    >
      <div className="bg-parchment-light bg-opacity-80 py-16 px-4 sm:px-6 lg:px-8 rounded-md inline-block">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brick leading-tight">
          Artisan Bread, Forged in Yuma’s Heart
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-charcoal text-base sm:text-lg">
          Experience the timeless tradition of handcrafted bread, baked fresh daily
          with locally-inspired flavors. Warm, crusty, and undeniably delicious.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#flavors"
            className="inline-block px-6 py-3 bg-brick text-parchment font-semibold rounded-md text-sm shadow hover:bg-brick/90 transition"
          >
            Discover Our Breads
          </a>
          <a
            href="#checkout"
            className="inline-block px-6 py-3 border-2 border-brick text-brick font-semibold rounded-md text-sm hover:bg-brick hover:text-parchment transition"
          >
            Order for Pickup
          </a>
        </div>
      </div>
    </section>
  );
}
