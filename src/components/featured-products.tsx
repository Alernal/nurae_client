import {Link} from "react-router-dom"
import { LuHeart, LuStar, LuSparkles, LuShoppingBag, LuEye } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/providers/wishlist-provider"

const products = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 1290,
    originalPrice: 1590,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    isNew: true,
    rating: 4.8,
    reviews: 24,
    colors: ["rose-gold", "gold", "silver"],
    badge: "Más Vendido",
  },
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 890,
    image: "/placeholder.svg?height=400&width=300",
    category: "Aretes",
    isNew: false,
    rating: 4.9,
    reviews: 18,
    colors: ["purple", "pink", "clear"],
    badge: "Favorito",
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 990,
    originalPrice: 1190,
    image: "/placeholder.svg?height=400&width=300",
    category: "Pulseras",
    isNew: true,
    rating: 4.7,
    reviews: 32,
    colors: ["gold", "rose-gold"],
    badge: "Oferta",
  },
  {
    id: 4,
    name: "Anillo Ajustable Joya",
    price: 790,
    image: "/placeholder.svg?height=400&width=300",
    category: "Anillos",
    isNew: false,
    rating: 4.9,
    reviews: 15,
    colors: ["emerald", "sapphire", "ruby"],
    badge: "Exclusivo",
  },
]

export function FeaturedProducts() {
  const { addItem, removeItem, isInWishlist } = useWishlist()

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-soft-gradient opacity-40"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuStar className="h-5 w-5 fill-current animate-pulse" />
              <span className="font-display">Productos Destacados</span>
              <LuStar className="h-5 w-5 fill-current animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Nuestros Favoritos
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
              Descubre las piezas más amadas por nuestra comunidad de mujeres empoderadas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover transition-transform group-hover:scale-110 duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.isNew && (
                    <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-lg">
                      <LuSparkles className="h-3 w-3" />
                      Nuevo
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="bg-accent text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                      ¡Oferta!
                    </div>
                  )}
                  <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                    {product.badge}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white shadow-lg rounded-full"
                    onClick={() => toggleWishlist(product)}
                  >
                    <LuHeart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isInWishlist(product.id) ? "fill-secondary text-secondary" : "text-gray-600",
                      )}
                    />
                    <span className="sr-only">Añadir a favoritos</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white shadow-lg rounded-full">
                    <LuEye className="h-5 w-5 text-gray-600" />
                    <span className="sr-only">Vista rápida</span>
                  </Button>
                </div>

                {/* Quick Add Button */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Button className="w-full bg-luxury-gradient hover:opacity-90 text-white rounded-full shadow-lg">
                    <LuShoppingBag className="mr-2 h-4 w-4" />
                    Agregar al Carrito
                  </Button>
                </div>
              </div>

              {/* Product Info */}
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

                {/* Color Options */}
                <div className="flex items-center gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-5 w-5 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform",
                        color === "rose-gold" && "bg-gradient-to-br from-pink-300 to-amber-300",
                        color === "gold" && "bg-gradient-to-br from-amber-300 to-yellow-400",
                        color === "silver" && "bg-gradient-to-br from-gray-300 to-gray-400",
                        color === "purple" && "bg-gradient-to-br from-purple-400 to-purple-600",
                        color === "pink" && "bg-gradient-to-br from-pink-400 to-pink-600",
                        color === "clear" && "bg-gradient-to-br from-gray-100 to-white border-gray-300",
                        color === "emerald" && "bg-gradient-to-br from-emerald-400 to-emerald-600",
                        color === "sapphire" && "bg-gradient-to-br from-blue-400 to-blue-600",
                        color === "ruby" && "bg-gradient-to-br from-red-400 to-red-600",
                      )}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">+{product.colors.length} colores</span>
                </div>

                {/* Price */}
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

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link to="/collections">
            <Button className="bg-luxury-gradient hover:opacity-90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group">
              Ver Toda la Colección
              <LuSparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
