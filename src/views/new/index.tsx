import { Link } from "react-router-dom";
import { LuSparkles, LuStar, LuHeart, LuShoppingBag } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const newProducts = [
  {
    id: 1,
    name: "Collar Celestial",
    price: 189000,
    originalPrice: 220000,
    image:
      "/placeholder.svg?height=400&width=300&query=elegant gold celestial necklace",
    category: "Collares",
    rating: 4.8,
    reviews: 24,
    releaseDate: "2025-01-15",
    isExclusive: true,
  },
  {
    id: 2,
    name: "Aretes Luna Creciente",
    price: 145000,
    image:
      "/placeholder.svg?height=400&width=300&query=crescent moon gold earrings",
    category: "Aretes",
    rating: 4.9,
    reviews: 18,
    releaseDate: "2025-01-10",
    isExclusive: false,
  },
  {
    id: 3,
    name: "Pulsera Infinito",
    price: 125000,
    originalPrice: 150000,
    image: "/placeholder.svg?height=400&width=300&query=infinity gold bracelet",
    category: "Pulseras",
    rating: 4.7,
    reviews: 31,
    releaseDate: "2025-01-08",
    isExclusive: true,
  },
  {
    id: 4,
    name: "Anillo Estrella Polar",
    price: 165000,
    image: "/placeholder.svg?height=400&width=300&query=polar star gold ring",
    category: "Anillos",
    rating: 4.8,
    reviews: 22,
    releaseDate: "2025-01-05",
    isExclusive: false,
  },
  {
    id: 5,
    name: "Collar Constelación",
    price: 210000,
    image:
      "/placeholder.svg?height=400&width=300&query=constellation gold necklace",
    category: "Collares",
    rating: 4.9,
    reviews: 15,
    releaseDate: "2025-01-03",
    isExclusive: true,
  },
  {
    id: 6,
    name: "Aretes Galaxia",
    price: 155000,
    image: "/placeholder.svg?height=400&width=300&query=galaxy gold earrings",
    category: "Aretes",
    rating: 4.8,
    reviews: 28,
    releaseDate: "2025-01-01",
    isExclusive: false,
  },
];

export default function NewPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
                <LuSparkles className="h-5 w-5" />
                <span className="font-medium">Recién Llegadas</span>
                <LuSparkles className="h-5 w-5" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">
                Novedades
              </h1>

              <p className="text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed">
                Descubre las últimas creaciones de NURAE. Piezas únicas que
                acaban de llegar para hacer brillar tu estilo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300">
                  Ver Toda la Colección
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  Suscríbete para Novedades
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className="bg-[#9A6D4E] text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-sm">
                        <LuSparkles className="h-3 w-3" />
                        Nuevo
                      </div>
                      {product.isExclusive && (
                        <div className="bg-[#C8A080] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                          Exclusivo
                        </div>
                      )}
                      {product.originalPrice && (
                        <div className="bg-[#E76F51] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                          Oferta
                        </div>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <LuHeart className="h-5 w-5 text-[#9A6D4E]" />
                    </Button>

                    {/* Quick Add */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button className="w-full bg-[#9A6D4E] hover:bg-[#7D5840] text-white rounded-full shadow-sm">
                        <LuShoppingBag className="mr-2 h-4 w-4" />
                        Agregar al Carrito
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/collections/${product.category.toLowerCase()}`}
                        className="text-xs text-[#9A6D4E] font-medium uppercase tracking-wide hover:text-[#7D5840] transition-colors"
                      >
                        {product.category}
                      </Link>
                      <div className="flex items-center gap-1">
                        <LuStar className="h-4 w-4 fill-[#E8B059] text-[#E8B059]" />
                        <span className="text-sm font-medium text-[#5E4536]">
                          {product.rating}
                        </span>
                        <span className="text-xs text-[#9A6D4E]">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <Link to={`/products/${product.id}`} className="block">
                      <h3 className="font-bold text-lg text-[#5E4536] group-hover:text-[#9A6D4E] transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="text-xs text-[#9A6D4E]">
                      Disponible desde:{" "}
                      {new Date(product.releaseDate).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-[#5E4536]">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-[#9A6D4E] line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-[#E76F51] font-medium">
                            Ahorra $
                            {(
                              product.originalPrice - product.price
                            ).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white rounded-full px-6 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        Comprar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-16">
              <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-12 py-4 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Ver Más Novedades
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24 bg-[#F5EEE8]">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
                No te pierdas nada
              </h2>
              <p className="text-xl text-[#9A6D4E]">
                Sé la primera en conocer nuestras nuevas colecciones y ofertas
                exclusivas
              </p>
              <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Suscríbete al Newsletter
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
