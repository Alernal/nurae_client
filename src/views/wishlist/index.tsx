import { useState } from "react"
import {Link} from "react-router-dom"
import { LuHeart, LuShoppingBag, LuTrash2, LuStar, LuFilter, LuGrid2X2, LuList } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWishlist } from "@/providers/wishlist-provider"
import { useCart } from "@/providers/cart-provider"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Mock wishlist items for demonstration
const mockWishlistItems = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 195000,
    originalPrice: 240000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Collares",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 135000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Aretes",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 150000,
    originalPrice: 180000,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pulseras",
    rating: 4.7,
    inStock: false,
  },
]

export default function WishlistPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const { removeItem } = useWishlist()
  const { addItem: addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      color: "Default",
      size: "Default",
    })
  }

  const handleRemoveFromWishlist = (id: number) => {
    removeItem(id)
  }

  const filteredItems = mockWishlistItems.filter((item) => {
    if (filterBy === "all") return true
    if (filterBy === "inStock") return item.inStock
    if (filterBy === "sale") return item.originalPrice
    return item.category.toLowerCase() === filterBy
  })

  if (mockWishlistItems.length === 0) {
    return (
      <div>
        <div className="container px-4 py-16 md:px-6 md:py-24">
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              <LuHeart className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">Tu lista de deseos está vacía</h1>
            <p className="text-xl text-gray-600">
              Guarda tus productos favoritos aquí para encontrarlos fácilmente más tarde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collections">
                <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Explorar Colecciones
                </Button>
              </Link>
              <Link to="/bestsellers">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  Ver Más Vendidos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
            Mi Lista de Deseos
          </h1>
          <p className="text-xl text-gray-600">{filteredItems.length} productos guardados</p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <LuFilter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los productos</SelectItem>
                <SelectItem value="inStock">En stock</SelectItem>
                <SelectItem value="sale">En oferta</SelectItem>
                <SelectItem value="collares">Collares</SelectItem>
                <SelectItem value="aretes">Aretes</SelectItem>
                <SelectItem value="pulseras">Pulseras</SelectItem>
                <SelectItem value="anillos">Anillos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
                <SelectItem value="priceHigh">Precio: Mayor a menor</SelectItem>
                <SelectItem value="priceLow">Precio: Menor a mayor</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LuGrid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <LuList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  {item.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Agotado</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white shadow-lg"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <LuTrash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium uppercase">{item.category}</span>
                    <div className="flex items-center gap-1">
                      <LuStar className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-serif font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    <Button
                      className="w-full bg-luxury-gradient hover:opacity-90 text-white"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                    >
                      <LuShoppingBag className="mr-2 h-4 w-4" />
                      {item.inStock ? "Añadir al Carrito" : "Agotado"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">Agotado</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-Lustart justify-between">
                        <div>
                          <p className="text-xs text-primary font-medium uppercase tracking-wide">{item.category}</p>
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-serif font-bold text-xl text-gray-800 hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <LuStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(item.rating)
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({item.rating})</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <LuTrash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-2xl font-bold text-gray-800">
                              {formatPrice(item.price)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm text-green-600 font-medium">
                              Ahorras {formatPrice(item.originalPrice - item.price)}
                            </div>
                          )}
                        </div>
                        <Button
                          className="bg-luxury-gradient hover:opacity-90 text-white px-8"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                        >
                          <LuShoppingBag className="mr-2 h-4 w-4" />
                          {item.inStock ? "Añadir al Carrito" : "Agotado"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State for Filtered Results */}
        {filteredItems.length === 0 && mockWishlistItems.length > 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <LuFilter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">Intenta cambiar los filtros para ver más productos.</p>
            <Button onClick={() => setFilterBy("all")} className="bg-primary hover:bg-primary/90 text-white">
              Mostrar Todos los Productos
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
