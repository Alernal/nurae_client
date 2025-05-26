import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { LuHeart, LuMinus, LuPlus, LuShoppingBag, LuStar, LuShare2, LuTruck, LuShield, LuRotateCcw } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useWishlist } from "@/providers/wishlist-provider"
import { useCart } from "@/providers/cart-provider"

const allProducts = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 1290,
    originalPrice: 1590,
    images: [
      "https://previews.123rf.com/images/ylivdesign/ylivdesign1707/ylivdesign170731190/82954948-collar-con-icono-de-colgantes-verdes-ilustraci%C3%B3n-de-dibujos-animados-de-collar-con-colgantes-verdes-.jpg",
      "https://previews.123rf.com/images/ylivdesign/ylivdesign1707/ylivdesign170731190/82954948-collar-con-icono-de-colgantes-verdes-ilustraci%C3%B3n-de-dibujos-animados-de-collar-con-colgantes-verdes-.jpg",
      "https://previews.123rf.com/images/ylivdesign/ylivdesign1707/ylivdesign170731190/82954948-collar-con-icono-de-colgantes-verdes-ilustraci%C3%B3n-de-dibujos-animados-de-collar-con-colgantes-verdes-.jpg",
      "https://previews.123rf.com/images/ylivdesign/ylivdesign1707/ylivdesign170731190/82954948-collar-con-icono-de-colgantes-verdes-ilustraci%C3%B3n-de-dibujos-animados-de-collar-con-colgantes-verdes-.jpg",
    ],
    category: "Collares",
    rating: 4.8,
    reviews: 156,
    description:
      "Nuestro Collar Cadena Rosa Dorada es una pieza atemporal que complementa cualquier atuendo. Diseñado con líneas minimalistas y elegantes, este collar es perfecto para el uso diario o para ocasiones especiales.",
    features: [
      "Material: Acero inoxidable con baño de oro rosa de 18k",
      "Hipoalergénico y resistente al agua",
      "Cierre de mosquetón seguro",
      "Acabado pulido de alto brillo",
      "Incluye caja de regalo LÚMINA",
    ],
    colors: [
      { name: "Rosa Dorado", value: "rose-gold", class: "bg-gradient-to-br from-pink-300 to-amber-300" },
      { name: "Dorado", value: "gold", class: "bg-gradient-to-br from-amber-300 to-yellow-400" },
      { name: "Plateado", value: "silver", class: "bg-gradient-to-br from-gray-300 to-gray-400" },
    ],
    sizes: [
      { name: "40cm", value: "40cm" },
      { name: "45cm", value: "45cm" },
      { name: "50cm", value: "50cm" },
    ],
    inStock: true,
    stockCount: 15,
  },
  // Puedes agregar más productos aquí...
]

const relatedProducts = [
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 890,
    image: "/placeholder.svg?height=300&width=300",
    category: "Aretes",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 990,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pulseras",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Anillo Ajustable Joya",
    price: 790,
    image: "/placeholder.svg?height=300&width=300",
    category: "Anillos",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Collar Perlas Modernas",
    price: 1450,
    image: "/placeholder.svg?height=300&width=300",
    category: "Collares",
    rating: 4.6,
  },
]

const reviews = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    date: "2025-01-15",
    comment:
      "¡Absolutamente hermoso! La calidad es excepcional y el color es exactamente como se ve en las fotos. Lo uso todos los días.",
    verified: true,
  },
  {
    id: 2,
    name: "Ana Martínez",
    rating: 5,
    date: "2025-01-10",
    comment:
      "Perfecto para cualquier ocasión. El material se siente premium y el empaque fue hermoso. Definitivamente compraré más piezas.",
    verified: true,
  },
  {
    id: 3,
    name: "Sofía Ruiz",
    rating: 4,
    date: "2025-01-08",
    comment:
      "Me encanta el diseño y la calidad. Solo le doy 4 estrellas porque me hubiera gustado que viniera en más longitudes.",
    verified: true,
  },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = allProducts.find(p => p.id === Number(id))

  if (!product) {
    return <div>Producto no encontrado</div>
  }

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("rose-gold")
  const [selectedSize, setSelectedSize] = useState("45cm")

  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { addItem: addToCart } = useCart()

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      })
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize
    })
  }

  return (
    <div>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-primary">Colecciones</Link>
          <span>/</span>
          <Link to={`/collections/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt="Imagen principal del producto"
                className="object-cover"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1.5 rounded-full font-medium">
                  ¡Oferta!
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg"
                onClick={toggleWishlist}
              >
                <LuHeart className={`h-6 w-6 ${isInWishlist(product.id) ? "fill-secondary text-secondary" : "text-gray-600"}`} />
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden rounded-lg ${selectedImage === index ? "ring-2 ring-primary" : "ring-1 ring-gray-200"
                    }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Vista ${index + 1} del producto`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <Link to={`/collections/${product.category.toLowerCase()}`} className="text-sm text-primary hover:text-secondary font-medium uppercase tracking-wide">
                {product.category}
              </Link>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reseñas)</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-3xl font-serif font-bold text-gray-800">MXN ${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">MXN ${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                      Ahorra MXN ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">Color: {product.colors.find(c => c.value === selectedColor)?.name}</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
                {product.colors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={color.value} id={color.value} className="peer sr-only" />
                    <Label
                      htmlFor={color.value}
                      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full ${color.class} ring-offset-background peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary shadow-lg hover:scale-110 transition-transform`}
                    >
                      <span className="sr-only">{color.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">Longitud: {selectedSize}</h3>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <div key={size.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={size.value} id={size.value} className="peer sr-only" />
                    <Label
                      htmlFor={size.value}
                      className="flex h-12 cursor-pointer items-center justify-center rounded-xl border-2 border-gray-200 px-4 py-2 text-sm ring-offset-background peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary hover:border-primary transition-colors"
                    >
                      {size.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">Cantidad</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <LuMinus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product.stockCount}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockCount, Number.parseInt(e.target.value) || 1)))}
                    className="h-12 w-16 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stockCount}
                  >
                    <LuPlus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stockCount > 10 ? "En stock" : `Solo ${product.stockCount} disponibles`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                className="h-14 bg-luxury-gradient hover:opacity-90 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <LuShoppingBag className="mr-2 h-6 w-6" />
                {product.inStock ? "Añadir al Carrito" : "Agotado"}
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12" onClick={toggleWishlist}>
                  <LuHeart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? "fill-secondary text-secondary" : ""}`} />
                  {isInWishlist(product.id) ? "En Favoritos" : "Añadir a Favoritos"}
                </Button>
                <Button variant="outline" className="h-12">
                  <LuShare2 className="mr-2 h-5 w-5" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <LuTruck className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">Envío gratis +$999</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <LuShield className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600">Compra segura</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <LuRotateCcw className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-xs text-gray-600">30 días devolución</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2">
              <TabsTrigger value="description" className="rounded-xl">Descripción</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-xl">Reseñas ({product.reviews})</TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-xl">Envío y Devoluciones</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="font-serif font-bold text-2xl text-gray-800 mb-4">Descripción del Producto</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                <h4 className="font-medium text-lg text-gray-800 mb-4">Características:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif font-bold text-2xl text-gray-800">Reseñas de Clientas</h3>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Escribir Reseña
                  </Button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-800">{review.name}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                Compra verificada
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <LuStar
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="text-gray-500 text-center py-8">Aún no hay reseñas para este producto.</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="font-serif font-bold text-2xl text-gray-800 mb-4">Envío y Devoluciones</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>🚚 <b>Envío gratis</b> en pedidos mayores a $999 MXN.</li>
                  <li>📦 Entrega estimada de 2-5 días hábiles en todo México.</li>
                  <li>🔄 <b>Devoluciones fáciles</b> hasta 30 días después de la compra.</li>
                  <li>💳 Pagos seguros con tarjeta, transferencia o efectivo.</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Te puede interesar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all p-4 flex flex-col items-center group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl mb-3 group-hover:scale-105 transition-transform"
                />
                <div className="text-center">
                  <span className="text-xs text-primary uppercase font-medium">{item.category}</span>
                  <h3 className="font-semibold text-gray-800 mt-1">{item.name}</h3>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <LuStar
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="block text-lg font-bold text-gray-800 mt-1">MXN ${item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}