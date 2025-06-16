import { Link } from "react-router-dom";
import {
  LuTrophy,
  LuStar,
  LuHeart,
  LuShoppingBag,
  LuCrown,
  LuTrendingUp,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";

const bestsellerProducts = [
  {
    id: 1,
    name: "Collar Eterno",
    price: 175000,
    image:
      "/placeholder.svg?height=400&width=300&query=eternal gold necklace bestseller",
    category: "Collares",
    rating: 4.9,
    reviews: 156,
    salesCount: 250,
    rank: 1,
    badge: "Más Vendido",
  },
  {
    id: 2,
    name: "Aretes Diamante",
    price: 195000,
    image:
      "/placeholder.svg?height=400&width=300&query=diamond gold earrings bestseller",
    category: "Aretes",
    rating: 4.8,
    reviews: 142,
    salesCount: 198,
    rank: 2,
    badge: "Top Ventas",
  },
  {
    id: 3,
    name: "Anillo Solitario",
    price: 220000,
    image:
      "/placeholder.svg?height=400&width=300&query=solitaire gold ring bestseller",
    category: "Anillos",
    rating: 4.9,
    reviews: 189,
    salesCount: 175,
    rank: 3,
    badge: "Favorito",
  },
  {
    id: 4,
    name: "Pulsera Elegancia",
    price: 135000,
    image:
      "/placeholder.svg?height=400&width=300&query=elegant gold bracelet bestseller",
    category: "Pulseras",
    rating: 4.7,
    reviews: 98,
    salesCount: 165,
    rank: 4,
    badge: "Trending",
  },
  {
    id: 5,
    name: "Collar Perlas",
    price: 185000,
    image:
      "/placeholder.svg?height=400&width=300&query=pearl gold necklace bestseller",
    category: "Collares",
    rating: 4.8,
    reviews: 124,
    salesCount: 145,
    rank: 5,
    badge: "Hot",
  },
  {
    id: 6,
    name: "Aretes Clásicos",
    price: 125000,
    image:
      "/placeholder.svg?height=400&width=300&query=classic gold earrings bestseller",
    category: "Aretes",
    rating: 4.9,
    reviews: 167,
    salesCount: 220,
    rank: 6,
    badge: "Clásico",
  },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "from-[#E8B059] to-[#C8A080]";
    case 2:
      return "from-[#C0C0C0] to-[#A0A0A0]";
    case 3:
      return "from-[#CD7F32] to-[#A05A2C]";
    default:
      return "from-[#9A6D4E] to-[#7D5840]";
  }
};

const getRankIcon = (rank: number) => {
  if (rank <= 3) return <LuCrown className="h-4 w-4" />;
  return <LuTrophy className="h-4 w-4" />;
};

export default function BestsellersPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
                <LuTrophy className="h-5 w-5 text-[#E8B059]" />
                <span className="font-medium">Los Más Vendidos</span>
                <LuTrophy className="h-5 w-5 text-[#E8B059]" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">
                Bestsellers
              </h1>

              <p className="text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed">
                Descubre las piezas más amadas por nuestra comunidad. Estos son
                los accesorios que han conquistado el corazón de miles de
                mujeres.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#9A6D4E]">15K+</div>
                  <div className="text-sm text-[#9A6D4E]">
                    Productos vendidos
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#9A6D4E]">4.8★</div>
                  <div className="text-sm text-[#9A6D4E]">
                    Calificación promedio
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#9A6D4E]">98%</div>
                  <div className="text-sm text-[#9A6D4E]">
                    Satisfacción del cliente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top 3 Products */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536] mb-4">
                Top 3 Favoritos
              </h2>
              <p className="text-lg text-[#9A6D4E]">
                Los productos más vendidos de todos los tiempos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {bestsellerProducts.slice(0, 3).map((product, index) => (
                <div
                  key={product.id}
                  className={`group relative bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                    index === 0 ? "md:scale-105 md:z-10" : ""
                  }`}
                >
                  {/* Rank Badge */}
                  <div
                    className={`absolute top-4 left-4 bg-gradient-to-r ${getRankColor(
                      product.rank
                    )} text-white rounded-full p-3 shadow-sm z-10`}
                  >
                    <div className="flex items-center gap-1">
                      {getRankIcon(product.rank)}
                      <span className="font-bold text-sm">#{product.rank}</span>
                    </div>
                  </div>

                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    />

                    {/* Sales Badge */}
                    <div className="absolute top-4 right-4 bg-white/80 text-[#5E4536] text-xs px-3 py-2 rounded-full">
                      {product.salesCount}+ vendidos
                    </div>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <LuHeart className="h-5 w-5 text-[#9A6D4E]" />
                    </Button>
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

                    <h3 className="font-bold text-xl text-[#5E4536] group-hover:text-[#9A6D4E] transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-2xl text-[#5E4536]">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-[#9A6D4E] font-medium">
                          ✓ {product.salesCount}+ mujeres lo aman
                        </div>
                      </div>

                      <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white rounded-full px-6 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300">
                        <LuShoppingBag className="mr-2 h-4 w-4" />
                        Comprar
                      </Button>
                    </div>
                  </div>

                  {/* Glow Effect for #1 */}
                  {index === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E8B059]/10 to-[#C8A080]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Bestsellers */}
        <section className="py-16 md:py-24 bg-[#F5EEE8]">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536] mb-4">
                Todos los Bestsellers
              </h2>
              <p className="text-lg text-[#9A6D4E]">
                Ranking completo de nuestros productos más vendidos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestsellerProducts.map((product, index) => (
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

                    {/* Rank Badge */}
                    <div
                      className={`absolute top-4 left-4 bg-gradient-to-r ${getRankColor(
                        product.rank
                      )} text-white rounded-full px-3 py-2 shadow-sm`}
                    >
                      <div className="flex items-center gap-1">
                        {getRankIcon(product.rank)}
                        <span className="font-bold text-sm">
                          #{product.rank}
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-[#9A6D4E] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                      {product.badge}
                    </div>

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

                    <h3 className="font-bold text-lg text-[#5E4536] group-hover:text-[#9A6D4E] transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="text-xs text-[#9A6D4E] flex items-center gap-2">
                      <LuTrendingUp className="h-3 w-3" />
                      {product.salesCount}+ vendidos este mes
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xl text-[#5E4536]">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
                ¿Por qué son tan populares?
              </h2>
              <p className="text-xl text-[#9A6D4E]">
                Nuestros bestsellers combinan diseño excepcional, calidad
                premium y precios accesibles. Son las piezas que nuestras
                clientas eligen una y otra vez.
              </p>
              <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Ver Todas las Reseñas
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
