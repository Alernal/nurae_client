import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuMinus,
  LuPlus,
  LuTrash2,
  LuShoppingBag,
  LuArrowLeft,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/products/useProducts";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
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

  if (cartWithDetails.length === 0) {
    return (
      <div className="container px-4 py-16 md:px-6 md:py-24 text-center space-y-6">
        <LuShoppingBag className="h-16 w-16 mx-auto text-gray-400" />
        <h1 className="text-4xl font-bold">Tu carrito está vacío</h1>
        <p className="text-gray-600">
          Descubre nuestras colecciones y encuentra la pieza perfecta para ti.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/collections">
            <Button className="bg-black text-white hover:bg-gray-800">
              Explorar Colecciones
            </Button>
          </Link>
          <Link to="/bestsellers">
            <Button variant="outline">Ver Más Vendidos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/collections">
          <Button variant="ghost" size="icon">
            <LuArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Tu Carrito
          </h1>
          <p className="text-gray-600">
            {cartWithDetails.length} productos seleccionados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartWithDetails.map((item) => (
            <Card key={item.productId}>
              <CardContent className="p-6 flex gap-6">
                <div className="w-28 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={
                      item.images?.[0]?.url
                        ? `http://localhost:8000${item.images[0].url}`
                        : "/placeholder.svg"
                    }
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs uppercase text-gray-500">
                        {item.category}
                      </p>
                      <h3 className="font-serif font-bold text-xl">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-500">
                        <span>Color: {item.color}</span> ·{" "}
                        <span>Tamaño: {item.size}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.productId)}
                      className="hover:text-red-600"
                    >
                      <LuTrash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-serif font-bold text-gray-800">
                        {formatPrice(item.original_price || item.price)}
                      </p>
                      {item.original_price &&
                        item.original_price < item.price && (
                          <p className="text-sm text-green-600">
                            Ahorras{" "}
                            {formatPrice(
                              (item.price - item.original_price) * item.quantity
                            )}
                          </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <LuMinus className="h-4 w-4" />
                        </Button>
                        <div className="px-3">{item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock_count}
                        >
                          <LuPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">
              Resumen del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Envío</span>
              <span>{shipping === 0 ? "¡Gratis!" : formatPrice(shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-serif font-bold">
              <span>Total</span>
              <span className="text-gray-900">{formatPrice(total)}</span>
            </div>
            <Button
              className="w-full bg-gray-900 text-white hover:bg-gray-800 mt-4 h-12"
              onClick={() => (window.location.href = "/checkout")}
            >
              Ir al Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
