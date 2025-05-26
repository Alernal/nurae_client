import { LuTrophy, LuStar, LuHeart, LuShoppingBag, LuCrown, LuSparkles, LuTrendingUp } from "react-icons/lu"
import { Button } from "@/components/ui/button"

const bestsellerProducts = [
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 890,
    image: "/placeholder.svg?height=400&width=300",
    category: "Aretes",
    rating: 4.9,
    reviews: 156,
    salesCount: 1250,
    rank: 1,
    badge: "Más Vendido",
  },
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 1290,
    originalPrice: 1590,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    rating: 4.8,
    reviews: 134,
    salesCount: 980,
    rank: 2,
    badge: "Top Ventas",
  },
  {
    id: 4,
    name: "Anillo Ajustable Joya",
    price: 790,
    image: "/placeholder.svg?height=400&width=300",
    category: "Anillos",
    rating: 4.9,
    reviews: 98,
    salesCount: 850,
    rank: 3,
    badge: "Favorito",
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 990,
    originalPrice: 1190,
    image: "/placeholder.svg?height=400&width=300",
    category: "Pulseras",
    rating: 4.7,
    reviews: 87,
    salesCount: 720,
    rank: 4,
    badge: "Trending",
  },
  {
    id: 6,
    name: "Aretes Geométricos",
    price: 650,
    originalPrice: 850,
    image: "/placeholder.svg?height=400&width=300",
    category: "Aretes",
    rating: 4.8,
    reviews: 76,
    salesCount: 650,
    rank: 5,
    badge: "Hot",
  },
  {
    id: 5,
    name: "Collar Perlas Modernas",
    price: 1450,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    rating: 4.6,
    reviews: 65,
    salesCount: 580,
    rank: 6,
    badge: "Clásico",
  },
]

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "from-yellow-400 to-yellow-600"
    case 2:
      return "from-gray-300 to-gray-500"
    case 3:
      return "from-amber-600 to-amber-800"
    default:
      return "from-primary to-secondary"
  }
}

const getRankIcon = (rank: number) => {
  if (rank <= 3) return <LuCrown className="h-4 w-4" />
  return <LuTrophy className="h-4 w-4" />
}

export default function BestsellersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>
        <div className="absolute top-10 left-10 text-amber-300 animate-float">
          <LuTrophy className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-primary animate-float" style={{ animationDelay: "1s" }}>
          <LuCrown className="h-16 w-16" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-secondary animate-float" style={{ animationDelay: "2s" }}>
          <LuTrendingUp className="h-10 w-10" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuTrophy className="h-5 w-5 text-amber-500" />
              <span className="font-display">Los Más Vendidos</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              Bestsellers
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Descubre las piezas más amadas por nuestra comunidad. Estos son los accesorios que han conquistado el
              corazón de miles de mujeres.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
              <div className="text-center space-y-2">
                <div className="text-3xl font-serif font-bold text-primary">15K+</div>
                <div className="text-sm text-gray-600">Productos vendidos</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-serif font-bold text-secondary">4.8★</div>
                <div className="text-sm text-gray-600">Calificación promedio</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-serif font-bold text-accent">98%</div>
                <div className="text-sm text-gray-600">Satisfacción del cliente</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Products */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent mb-4">
              Top 3 Favoritos
            </h2>
            <p className="text-lg text-gray-600">Los productos más vendidos de todos los tiempos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {bestsellerProducts.slice(0, 3).map((product, index) => (
              <div
                key={product.id}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 ${
                  index === 0 ? "md:scale-110 md:z-10" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Rank Badge */}
                <div
                  className={`absolute top-4 left-4 bg-gradient-to-r ${getRankColor(product.rank)} text-white rounded-full p-3 shadow-lg z-10`}
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
                    className="object-cover transition-transform group-hover:scale-110 duration-700"
                  />

                  {/* Sales Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-full backdrop-blur-sm">
                    {product.salesCount}+ vendidos
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <LuHeart className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-2xl font-bold text-gray-800">MXN ${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">MXN ${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-xs text-green-600 font-medium">✓ {product.salesCount}+ mujeres lo aman</div>
                    </div>

                    <Button className="bg-luxury-gradient hover:opacity-90 text-white rounded-full px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                      <LuShoppingBag className="mr-2 h-4 w-4" />
                      Comprar
                    </Button>
                  </div>
                </div>

                {/* Glow Effect for #1 */}
                {index === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Bestsellers */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent mb-4">
              Todos los Bestsellers
            </h2>
            <p className="text-lg text-gray-600">Ranking completo de nuestros productos más vendidos</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellerProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-110 duration-700"
                  />

                  {/* Rank Badge */}
                  <div
                    className={`absolute top-4 left-4 bg-gradient-to-r ${getRankColor(product.rank)} text-white rounded-full px-3 py-2 shadow-lg`}
                  >
                    <div className="flex items-center gap-1">
                      {getRankIcon(product.rank)}
                      <span className="font-bold text-sm">#{product.rank}</span>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                    {product.badge}
                  </div>

                  {/* Quick Add */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button className="w-full bg-luxury-gradient hover:opacity-90 text-white rounded-full shadow-lg">
                      <LuShoppingBag className="mr-2 h-4 w-4" />
                      Agregar al Carrito
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <LuTrendingUp className="h-3 w-3" />
                    {product.salesCount}+ vendidos este mes
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl font-bold text-gray-800">MXN ${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">MXN ${product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="bg-luxury-gradient hover:opacity-90 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              ¿Por qué son tan populares?
            </h2>
            <p className="text-xl text-gray-600">
              Nuestros bestsellers combinan diseño excepcional, calidad premium y precios accesibles. Son las piezas que
              nuestras clientas eligen una y otra vez.
            </p>
            <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Ver Todas las Reseñas
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
