import { Link } from "react-router-dom";

export function CategoryShowcase() {
  const categories = [
    {
      name: "Collares",
      href: "/collections?category=collares",
      image: "https://nurae-api.alernal.com.co/storage/products/x86HuAUIoC1l63c082c7hcBPURc1FLbyLQwJ53Nw.png",
    },
    {
      name: "Aretes",
      href: "/collections?category=aretes",
      image:
        "https://nurae-api.alernal.com.co/storage/products/rYutQGDNO4ePYkP0zH97JkOOHdAoAt77bvlpDM4B.png",
    },
    {
      name: "Denarios",
      href: "/collections?category=denarios",
      image: "https://nurae-api.alernal.com.co/storage/products/Wv8m8WqFAHBe9dRwxwfhCbpYbR2Y2H3nn6sMvEfv.png",
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl font-normal text-[#5E4536]">
            Explora Nuestras{" "}
            <span className="text-[var(--color-amarillo)] font-handwritten font-thin">
              Colecciones.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="relative group overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 hover:bg-black/10 group-hover:bg-black/50 transition duration-300" />
              <div className="absolute bottom-5 left-5 text-white z-10">
                <h3 className="text-2xl font-semibold">{category.name}</h3>
                <p className="text-sm mt-1 opacity-90">Explorar colección &gt;</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
