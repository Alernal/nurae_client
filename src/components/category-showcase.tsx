import { Link } from "react-router-dom";

export function CategoryShowcase() {
  const categories = [
    {
      name: "Collares",
      href: "/collections?category=collares",
      image: "https://api.nurae.com.co/storage/products/x86HuAUIoC1l63c082c7hcBPURc1FLbyLQwJ53Nw.webp",
    },
    {
      name: "Aretes",
      href: "/collections?category=aretes",
      image:
        "https://api.nurae.com.co/storage/products/rYutQGDNO4ePYkP0zH97JkOOHdAoAt77bvlpDM4B.webp",
    },
    {
      name: "Denarios",
      href: "/collections?category=denarios",
      image: "https://api.nurae.com.co//storage/products/MHzchqMtPnqdh0p7yC5R2hF3GZ6aQ0I42zbT1tRk.webp",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black">
            Cuidamos cada detalle.
          </h2>
          <h3 className="font-subtitulo text-3xl italic text-[#d4af37] font-medium">
            Creamos con intención.
          </h3>
          <p className="font-parrafo text-base text-black">
            Creamos accesorios con atención obsesiva al detalle y propósito en cada diseño.<br />
            Elegancia accesible, pensada para realzar tu esencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
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
              <div className="absolute inset-0 bg-black/80 hover:bg-black/10 group-hover:bg-black/50 transition duration-300" />
              <div className="absolute bottom-5 left-5 text-white z-10">
                <h3 className="text-4xl font-semibold">{category.name}</h3>
                <p className="text-sm mt-1 opacity-90">Explorar colección &gt;</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
