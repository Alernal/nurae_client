import { useState } from "react"
import { LuShoppingBag, LuPlus, LuMinus, LuTrash2 } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

const cartItems = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 195000,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    color: "Rosa Dorado",
    size: "45cm",
  },
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 135000,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    color: "Malva",
    size: "Único",
  },
]

export function MiniCart() {
  const [items, setItems] = useState(cartItems)
  const [isOpen, setIsOpen] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 150000 ? 0 : 15000
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-pink-50 hover:text-primary transition-all duration-300 relative group"
        >
          <LuShoppingBag className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
          <span className="sr-only">Carrito de compras</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-pink-50 to-purple-50">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl font-serif">
            <LuShoppingBag className="h-6 w-6 text-primary" />
            Tu Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <LuShoppingBag className="h-16 w-16 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500">Tu carrito está vacío</h3>
              <p className="text-gray-400">Agrega algunos productos para comenzar</p>
              <Button className="bg-luxury-gradient hover:opacity-90 text-white" onClick={() => setIsOpen(false)}>
                Explorar Productos
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-pink-100">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-gray-800 line-clamp-2">{item.name}</h4>
                        <div className="text-sm text-gray-500">
                          <p>Color: {item.color}</p>
                          <p>Tamaño: {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <LuMinus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <LuPlus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-serif font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 p-0 h-auto"
                              onClick={() => removeItem(item.id)}
                            >
                              <LuTrash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-pink-200 pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío:</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "¡Gratis!" : formatPrice(shipping)}
                    </span>
                  </div>
                  {subtotal < 150000 && (
                    <p className="text-xs text-gray-500">
                      Agrega {formatPrice(150000 - subtotal)} más para envío gratis
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between font-serif font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-luxury-gradient hover:opacity-90 text-white h-12 text-lg font-medium">
                    Proceder al Checkout
                  </Button>
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Ver Carrito Completo
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
