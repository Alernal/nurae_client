import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LuShoppingCart,
  LuMinus,
  LuPlus,
  LuExternalLink,
} from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";

interface CartItem {
  productId: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
  stock_count: number;
}

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  iva: number;
  total: number;
  discountCode: string;
  onDiscountCodeChange: (code: string) => void;
  appliedDiscount: number;
  onApplyDiscount: (discount: number) => void;
  onFinalizePurchase: () => void;
  termsAccepted: boolean;
  onTermsAcceptedChange: (accepted: boolean) => void;
  dataProcessingAccepted: boolean;
  onDataProcessingAcceptedChange: (accepted: boolean) => void;
}

export default function CartSummary({
  items,
  subtotal,
  shipping,
  iva,
  total,
  appliedDiscount,
  onFinalizePurchase,
  termsAccepted,
  onTermsAcceptedChange,
  dataProcessingAccepted,
  onDataProcessingAcceptedChange,
}: CartSummaryProps) {
  const { updateQuantity, removeFromCart, clearCartCloud } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="border-amber-200 shadow-lg sticky top-4">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <CardTitle className="flex items-center space-x-2 text-amber-900">
          <LuShoppingCart className="w-5 h-5" />
          <span>Resumen del Pedido</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Items del carrito */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Tu carrito está vacío.</p>
              <Button
                onClick={() => (window.location.href = "/collections")}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold"
              >
                Explorar productos
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      Talla: {item.size} | Color: {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                        >
                          <LuMinus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock_count}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                        >
                          <LuPlus className="w-3 h-3" />
                        </Button>
                      </div>
                      {item.original_price &&
                      item.original_price > 0 &&
                      item.original_price < item.price ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <span className="font-medium text-amber-700">
                            {formatPrice(item.original_price * item.quantity)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium text-amber-700">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Código de descuento
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <LuTag className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-700">
              Código de Descuento
            </span>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Ingrese su código"
              value={discountCode}
              onChange={(e) => onDiscountCodeChange(e.target.value)}
              className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
            <Button
              variant="outline"
              onClick={handleApplyDiscount}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Aplicar
            </Button>
          </div>
          {appliedDiscount > 0 && (
            <p className="text-sm text-green-600 font-medium">
              ¡Descuento aplicado! Ahorras {formatPrice(appliedDiscount)}
            </p>
          )}
        </div> */}

        {/* Resumen de precios */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Envío</span>
            <span className="font-medium">{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">IVA (19%)</span>
            <span className="font-medium">{formatPrice(iva)}</span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Descuento</span>
              <span className="font-medium text-green-600">
                -{formatPrice(appliedDiscount)}
              </span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900">Total a Pagar</span>
            <span className="text-amber-700">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Aceptación de términos y condiciones */}
        <div className="space-y-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) =>
                onTermsAcceptedChange(checked as boolean)
              }
              className="border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                Acepto los{" "}
                <a
                  href="/terminos-y-condiciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-800 underline font-medium inline-flex items-center"
                >
                  Términos y Condiciones
                  <LuExternalLink className="w-3 h-3 ml-1" />
                </a>{" "}
                de la tienda *
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="dataProcessing"
              checked={dataProcessingAccepted}
              onCheckedChange={(checked) =>
                onDataProcessingAcceptedChange(checked as boolean)
              }
              className="border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="dataProcessing"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                Autorizo el{" "}
                <a
                  href="/politica-de-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-800 underline font-medium inline-flex items-center"
                >
                  tratamiento de mis datos personales
                  <LuExternalLink className="w-3 h-3 ml-1" />
                </a>{" "}
                conforme a la Ley 1581 de 2012 *
              </Label>
            </div>
          </div>

          <div className="text-xs text-gray-600 bg-white p-3 rounded border border-amber-200">
            <p className="mb-2">
              <strong>Tratamiento de Datos Personales:</strong> Sus datos serán
              utilizados para:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Procesamiento y seguimiento de su pedido</li>
              <li>Comunicaciones relacionadas con su compra</li>
              <li>Mejora de nuestros servicios y experiencia de usuario</li>
              <li>Envío de ofertas y promociones (opcional)</li>
            </ul>
          </div>
        </div>

        {/* Botón de finalizar compra */}
        <Button
          onClick={onFinalizePurchase}
          disabled={!termsAccepted || !dataProcessingAccepted}
          className="w-full bg-amber-900 hover:bg-amber-800 text-white font-medium py-3 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor:
              termsAccepted && dataProcessingAccepted ? "#2f1d14" : "#9ca3af",
          }}
        >
          {!termsAccepted || !dataProcessingAccepted
            ? "Debe aceptar los términos para continuar"
            : "Finalizar Compra"}
        </Button>

        {/* Información de seguridad */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 Pago 100% seguro y encriptado</p>
          <p>📦 Envío gratis en compras superiores a $150.000</p>
          <p>↩️ Devoluciones gratuitas hasta 30 días</p>
        </div>
      </CardContent>
    </Card>
  );
}
