import { useState } from "react"
import {Link} from "react-router-dom"
import { LuMinus, LuPlus, LuTrash2, LuHeart, LuShoppingBag, LuArrowLeft, LuGift, LuPercent, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Mock cart items for demonstration
const mockCartItems = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 195000,
    originalPrice: 240000,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
    color: "Rosa Dorado",
    size: "45cm",
    category: "Collares",
    inStock: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 135000,
    quantity: 2,
    image: "/placeholder.svg?height=120&width=120",
    color: "Malva",
    size: "Único",
    category: "Aretes",
    inStock: true,
    stockCount: 8,
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 150000,
    originalPrice: 180000,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=120",
    color: "Dorado",
    size: "18cm",
    category: "Pulseras",
    inStock: true,
    stockCount: 12,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<any | null>(null)
  const [isGift, setIsGift] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    const validCodes = {
      lumina10: { discount: 0.1, name: "LUMINA10" },
      bienvenida: { discount: 0.15, name: "BIENVENIDA" },
      primera: { discount: 0.2, name: "PRIMERA" },
    }

    const code = promoCode.toLowerCase()
    if (validCodes[code]) {
      setAppliedPromo(validCodes[code])
      setPromoCode("")
    } else {
      alert("Código de descuento no válido")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const shipping = subtotal > 150000 ? 0 : 15000
  const giftWrap = isGift ? 8000 : 0
  const total = subtotal - promoDiscount + shipping + giftWrap

  const addToCart = (product: any) => {
    // Basic implementation: check if item exists, if so, increment quantity, otherwise add to cart
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <div className="container px-4 py-16 md:px-6 md:py-24">
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              <LuShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">Tu carrito está vacío</h1>
            <p className="text-xl text-gray-600">
              Descubre nuestras hermosas colecciones y encuentra las piezas perfectas para ti.
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-primary">Carrito de Compras</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/collections">
            <Button variant="ghost" size="icon" className="hover:bg-pink-50">
              <LuArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Tu Carrito
            </h1>
            <p className="text-gray-600 mt-2">{cartItems.length} productos seleccionados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <Card
                key={item.id}
                className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
                      {item.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Oferta
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs text-primary font-medium uppercase tracking-wide">{item.category}</p>
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-serif font-bold text-xl text-gray-800 hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>Color: {item.color}</span>
                            <span>•</span>
                            <span>Tamaño: {item.size}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <LuTrash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Price and Quantity */}
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
                              Ahorras {formatPrice((item.originalPrice - item.price) * item.quantity)}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-200 rounded-xl">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-r-none hover:bg-gray-50"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <LuMinus className="h-4 w-4" />
                            </Button>
                            <div className="w-16 text-center font-medium py-2">{item.quantity}</div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-l-none hover:bg-gray-50"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stockCount}
                            >
                              <LuPlus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button variant="ghost" size="icon" className="hover:bg-pink-50 hover:text-secondary">
                            <LuHeart className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Stock Info */}
                      <div className="text-sm text-gray-500">
                        {item.stockCount > 10 ? (
                          <span className="text-green-600">✓ En stock</span>
                        ) : (
                          <span className="text-orange-600">⚠ Solo {item.stockCount} disponibles</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Promo Code */}
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <LuPercent className="h-5 w-5 text-primary" />
                  Código de Descuento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <LuPercent className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Código {appliedPromo.name} aplicado</p>
                        <p className="text-sm text-green-600">10% de descuento</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAppliedPromo(null)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ingresa tu código"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} disabled={!promoCode}>
                      Aplicar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary Lines */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Ahorros por ofertas</span>
                      <span className="font-medium">-{formatPrice(savings)}</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento {appliedPromo.name}</span>
                      <span className="font-medium">-{formatPrice(promoDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                      {shipping === 0 ? "¡Gratis!" : formatPrice(shipping)}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                      Agrega {formatPrice(150000 - subtotal)} más para envío gratis
                    </div>
                  )}

                  {/* Gift Wrap Option */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <LuGift className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Envoltorio de regalo</p>
                        <p className="text-sm text-gray-600">Incluye caja especial y tarjeta</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatPrice(8000)}</span>
                      <input
                        type="checkbox"
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                        className="w-4 h-4 text-primary"
                      />
                    </div>
                  </div>

                  {giftWrap > 0 && (
                    <div className="flex justify-between">
                      <span>Envoltorio de regalo</span>
                      <span className="font-medium">{formatPrice(giftWrap)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-xl font-serif font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={() => (window.location.href = "/checkout")}
                  className="w-full bg-luxury-gradient hover:opacity-90 text-white h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LuShoppingBag className="mr-2 h-6 w-6" />
                  Checkout
                </Button>

                {/* Security Info */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Compra 100% segura
                  </div>
                  <p className="text-xs text-gray-500">Protegemos tus datos con encriptación SSL</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif text-xl">
                  <LuSparkles className="h-5 w-5 text-primary" />
                  Te Podría Interesar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: 4,
                    name: "Anillo Ajustable Joya",
                    price: 120000,
                    image: "/placeholder.svg?height=80&width=80",
                  },
                  {
                    id: 5,
                    name: "Collar Perlas Modernas",
                    price: 220000,
                    image: "/placeholder.svg?height=80&width=80",
                  },
                ].map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          image: product.image,
                          color: "Default",
                          size: "Default",
                        })
                      }
                    >
                      Agregar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
