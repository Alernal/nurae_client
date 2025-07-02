import { LuShoppingBag, LuPlus, LuMinus, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/products/useProducts";

export function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCartCloud,
  } = useCart();
  const { data: products = [] } = useProducts();

  const cartWithDetails = items
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return null;
      return {
        ...cartItem,
        ...product,
      };
    })
    .filter(Boolean);

  const subtotal = cartWithDetails.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (item.original_price && item.original_price > 0
          ? item.original_price
          : item.price),
    0
  );
  const shipping = subtotal >= 150000 ? 0 : 15000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-primary/10 hover:text-primary transition-all"
        >
          <LuShoppingBag className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
            {items.length}
          </span>
          <span className="sr-only">Carrito de compras</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-white flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl ">
            <LuShoppingBag className="h-6 w-6 text-primary" />
            Tu Carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-6 overflow-y-auto mt-4">
          {cartWithDetails.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 text-secondary-500">
              <LuShoppingBag className="h-14 w-14 text-secondary-300" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <Link to="/collections"
                className="bg-[#5E4536] p-2 rounded-xl text-white hover:bg-[#5E4536]/90"
                onClick={() => setIsOpen(false)}
              >
                Explorar productos
              </Link>
            </div>
          ) : (
            <>
              {cartWithDetails.map((item) => {
                const maxAvailable = item.stock_count ?? 1;
                const isMaxReached = item.quantity >= maxAvailable;

                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 bg-muted rounded-lg border border-gray-200"
                  >
                    <div className="w-20 h-20 bg-terra-warm/10 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item.images?.[0]?.url
                            ? `http://localhost:8000${item.images[0].url}`
                            : "/placeholder.svg"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-secondary-800">
                        {item.name}
                      </h4>
                      <div className="text-xs text-secondary-500">
                        <p>Material: {item.material}</p>
                        <p>Tamaño: {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <LuMinus className="w-4 h-4" />
                          </Button>
                          <div className="min-w-[60px] px-3 py-1.5 border border-gray-300 rounded-lg bg-gray-100 text-center text-sm font-medium text-gray-800 select-none">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            disabled={isMaxReached}
                          >
                            <LuPlus className="w-4 h-4" />
                          </Button>
                          <span className="text-xs text-gray-500 ml-2">
                             ({maxAvailable}) disp.
                          </span>
                        </div>
                        <div className="text-right space-y-0.5">
                          {item.original_price && item.original_price < item.price ? (
                            <>
                              <p className="text-sm text-gray-400 line-through">
                                {formatPrice(
                                  Number(item.price) * item.quantity
                                )}
                              </p>
                              <p className=" font-bold text-primary">
                                {formatPrice(
                                  Number(item.original_price) * item.quantity
                                )}
                              </p>
                            </>
                          ) : (
                            <p className=" font-bold text-primary">
                              {formatPrice(Number(item.price) * item.quantity)}
                            </p>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive/70 p-0"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {cartWithDetails.length > 0 && (
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between text-sm text-secondary-700">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-secondary-700">
              <span>Envío</span>
              <span
                className={shipping === 0 ? "text-green-600 font-medium" : ""}
              >
                {shipping === 0 ? "¡Gratis!" : formatPrice(shipping)}
              </span>
            </div>
            {subtotal < 150000 && (
              <p className="text-xs text-secondary-500">
                Agrega {formatPrice(150000 - subtotal)} más para envío gratis
              </p>
            )}
            <Separator />
            <div className="flex justify-between  text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>

            <div className="pt-2 flex flex-row gap-2">
              <Link to="/checkout" onClick={() => setIsOpen(false)} className="flex-1">
              <Button className="w-full border border-gray-400 bg-primary text-black hover:bg-gray-400/90 h-12 font-medium">
                Proceder al Checkout
              </Button>
              </Link>
              <Button
              variant="ghost"
              className="border border-red-500 text-red-500 hover:text-destructive/70 h-12 w-10"
              onClick={clearCartCloud}
              title="Vaciar carrito"
              >
              <LuTrash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
