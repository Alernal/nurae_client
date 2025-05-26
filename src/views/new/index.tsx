import {Link} from "react-router-dom"
import { LuSparkles, LuStar, LuHeart, LuShoppingBag, LuCrown } from "react-icons/lu"
import { Button } from "@/components/ui/button"

const newProducts = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 1290,
    originalPrice: 1590,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    rating: 4.8,
    reviews: 24,
    releaseDate: "2025-01-15",
    isExclusive: true,
  },
  {
    id: 5,
    name: "Collar Perlas Modernas",
    price: 1450,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    rating: 4.6,
    reviews: 28,
    releaseDate: "2025-01-10",
    isExclusive: false,
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 990,
    originalPrice: 1190,
    image: "/placeholder.svg?height=400&width=300",
    category: "Pulseras",
    rating: 4.7,
    reviews: 32,
    releaseDate: "2025-01-08",
    isExclusive: true,
  },
  {
    id: 7,
    name: "Aretes Colgantes Cristal",
    price: 750,
    image: "/placeholder.svg?height=400&width=300",
    category: "Aretes",
    rating: 4.9,
    reviews: 15,
    releaseDate: "2025-01-05",
    isExclusive: false,
  },
  {
    id: 8,
    name: "Anillo Ajustable Mariposa",
    price: 650,
    image: "/placeholder.svg?height=400&width=300",
    category: "Anillos",
    rating: 4.8,
    reviews: 19,
    releaseDate: "2025-01-03",
    isExclusive: true,
  },
  {
    id: 9,
    name: "Collar Choker Minimalista",
    price: 890,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    rating: 4.7,
    reviews: 22,
    releaseDate: "2025-01-01",
    isExclusive: false,
  },
]

export default function NewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>
        <div className="absolute top-10 left-10 text-pink-300 animate-float">
          <LuSparkles className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
          <LuCrown className="h-16 w-16" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuSparkles className="h-5 w-5 animate-pulse" />
              <span className="font-display">Recién Llegadas</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              Novedades
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Descubre las últimas creaciones de LÚMINA. Piezas únicas que acaban de llegar para hacer brillar tu
              estilo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Ver Toda la Colección
              </Button>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
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
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-110 duration-700"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-lg">
                      <LuSparkles className="h-3 w-3" />
                      Nuevo
                    </div>
                    {product.isExclusive && (
                      <div className="bg-accent text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                        Exclusivo
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                        Oferta
                      </div>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <LuHeart className="h-5 w-5 text-gray-600" />
                  </Button>

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
                    <Link
                      to={`/collections/${product.category.toLowerCase()}`}
                      className="text-xs text-primary font-medium uppercase tracking-wide hover:text-secondary transition-colors"
                    >
                      {product.category}
                    </Link>
                    <div className="flex items-center gap-1">
                      <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>

                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="font-serif font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="text-xs text-gray-500">
                    Disponible desde:{" "}
                    {new Date(product.releaseDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl font-bold text-gray-800">MXN ${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">MXN ${product.originalPrice}</span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-accent font-medium">
                          Ahorra MXN ${product.originalPrice - product.price}
                        </div>
                      )}
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

          {/* Load More */}
          <div className="flex justify-center mt-16">
            <Button className="bg-luxury-gradient hover:opacity-90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300">
              Ver Más Novedades
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              No te pierdas nada
            </h2>
            <p className="text-xl text-gray-600">
              Sé la primera en conocer nuestras nuevas colecciones y ofertas exclusivas
            </p>
            <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Suscríbete al Newsletter
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
