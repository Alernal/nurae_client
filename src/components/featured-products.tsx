import { Link } from "react-router-dom"
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
    image: "https://down-co.img.susercontent.com/file/sg-11134201-7qvf3-lhcaepbu01vk46",
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
    image: "https://s.alicdn.com/@sc04/kf/Hada4e37ecac24122afa8baa94e57abc9n.jpg_720x720q50.jpg",
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
    image: "https://www.joyeriamuinos.com/12527-medium_default/pulsera-uno-de-50-elabones-dorada-pul2468.jpg",
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
    image: "https://http2.mlstatic.com/D_NQ_NP_609073-MCO70698215216_072023-O.webp",
    category: "Anillos",
    isNew: false,
    rating: 4.9,
    reviews: 15,
    colors: ["emerald", "sapphire", "ruby"],
    badge: "Exclusivo",
  },
]

export function FeaturedProducts() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#F5EFE7] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/10 px-6 py-2 text-sm font-medium text-[#2C1810]">
            <LuSparkles className="h-5 w-5" />
            <span className="tracking-wide">Productos Destacados</span>
            <LuSparkles className="h-5 w-5" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2C1810]">Nuestros Favoritos</h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            Descubre las piezas más amadas por nuestra comunidad de mujeres empoderadas
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link to="/collections">
            <Button className="bg-[#D4AF37] hover:opacity-90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group">
              Ver Toda la Colección
              <LuSparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ProductCard component
function ProductCard({ product }: { product: typeof products[0] }) {
  const { addItem, removeItem, isInWishlist } = useWishlist()

  const toggleWishlist = () => {
    isInWishlist(product.id)
      ? removeItem(product.id)
      : addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        })
  }

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.isNew && (
            <span className="bg-[#2C1810] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1">
              <LuSparkles className="h-3 w-3" />
              Nuevo
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#D4AF37] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">Oferta</span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-[#2C1810] text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
            {product.badge}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition duration-300 translate-x-2 group-hover:translate-x-0">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white shadow-md rounded-full"
            onClick={toggleWishlist}
          >
            <LuHeart
              className={cn(
                "h-5 w-5 transition-colors",
                isInWishlist(product.id) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-600"
              )}
            />
          </Button>
          <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white shadow-md rounded-full">
            <LuEye className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Quick Add */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
          <Button className="w-full bg-[#D4AF37] hover:opacity-90 text-white rounded-full shadow-lg">
            <LuShoppingBag className="mr-2 h-4 w-4" />
            Agregar al carrito
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Link
            to={`/collections/${product.category.toLowerCase()}`}
            className="text-xs text-[#2C1810] font-medium uppercase tracking-wide hover:underline"
          >
            {product.category}
          </Link>
          <div className="flex items-center gap-1">
            <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-serif font-bold text-lg text-[#2C1810] group-hover:text-[#D4AF37] transition-colors leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Colors */}
        <div className="flex items-center gap-2">
          {product.colors.map((color, idx) => (
            <div
              key={idx}
              className={cn(
                "h-5 w-5 rounded-full border-2 border-white shadow-sm",
                color === "rose-gold" && "bg-gradient-to-br from-pink-300 to-amber-300",
                color === "gold" && "bg-gradient-to-br from-yellow-300 to-yellow-500",
                color === "silver" && "bg-gradient-to-br from-gray-300 to-gray-400",
                color === "purple" && "bg-gradient-to-br from-purple-400 to-purple-600",
                color === "pink" && "bg-gradient-to-br from-pink-400 to-pink-600",
                color === "clear" && "bg-gradient-to-br from-gray-100 to-white border-gray-300",
                color === "emerald" && "bg-gradient-to-br from-emerald-400 to-emerald-600",
                color === "sapphire" && "bg-gradient-to-br from-blue-400 to-blue-600",
                color === "ruby" && "bg-gradient-to-br from-red-400 to-red-600"
              )}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">+{product.colors.length} colores</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl font-bold text-[#2C1810]">${product.price} MXN</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice} MXN</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-[#D4AF37] font-medium">
                Ahorra ${product.originalPrice - product.price} MXN
              </div>
            )}
          </div>

          <Button
            size="sm"
            className="bg-[#D4AF37] hover:opacity-90 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md"
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  )
}
