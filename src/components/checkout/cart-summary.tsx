import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LuShoppingCart, LuMinus, LuPlus, LuExternalLink } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";

interface CartItem {
  productId: number;
  name: string;
  size: string;
  material: string;
  quantity: number;
  price: number;
  image: string;
  stock_count: number;
  original_price?: number; // 👈 lo usas más abajo
}

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  iva: number;
  total: number;
  isLoading: boolean;
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
  isLoading,
}: CartSummaryProps) {
  const { updateQuantity, removeFromCart, clearCartCloud } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  // Helper para asegurar límites
  const clampQty = (qty: number, max: number) => {
    const m = Math.max(1, Number.isFinite(max) ? max : 1);
    return Math.min(Math.max(qty, 1), m);
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-black">
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
                className="bg-[#5E4536] hover:bg-[#5E4536]/80 text-white font-semibold"
              >
                Explorar productos
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const atMin = item.quantity <= 1;
                const atMax = item.quantity >= item.stock_count;

                return (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-3 p-3 border border-gray-200"
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
                        Talla: {item.size} | Material: {item.material}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                clampQty(item.quantity - 1, item.stock_count)
                              )
                            }
                            disabled={atMin}
                            title={atMin ? "Cantidad mínima: 1" : "Disminuir cantidad"}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                          >
                            <LuMinus className="w-3 h-3" />
                          </Button>

                          <span className="text-sm font-medium">{item.quantity}</span>

                          <Button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                clampQty(item.quantity + 1, item.stock_count)
                              )
                            }
                            disabled={atMax || item.stock_count <= 0}
                            title={
                              atMax
                                ? `Stock máximo: ${item.stock_count}`
                                : "Aumentar cantidad"
                            }
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
                            <span className="font-medium">
                              {formatPrice(item.original_price * item.quantity)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        )}
                      </div>

                      {/* Nota de stock */}
                      <div className="mt-1 text-[11px] text-gray-500">
                        Stock disponible: {item.stock_count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-regular">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Envío</span>
            <span className="font-regular">{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">IVA (19%)</span>
            <span className="font-regular">{formatPrice(iva)}</span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Descuento</span>
              <span className="font-regular text-green-600">
                -{formatPrice(appliedDiscount)}
              </span>
            </div>
          )}

        <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900">Total a Pagar</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Aceptación de términos y condiciones */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => onTermsAcceptedChange(checked as boolean)}
              className="border-gray-200 mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                Acepto los{" "}
                <a
                  href="https://wompi.com/assets/downloadble/reglamento-Usuarios-Colombia.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5E4536] underline font-bold inline-flex items-center"
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
              className="border-gray-200 mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor="dataProcessing"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                Autorizo el{" "}
                <a
                  href="https://api.nurae.com.co/storage/Politica-de-privacidad.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5E4536] underline font-bold inline-flex items-center"
                >
                  tratamiento de mis datos personales
                  <LuExternalLink className="w-3 h-3 ml-1" />
                </a>{" "}
                conforme a la Ley 1581 de 2012 *
              </Label>
            </div>
          </div>

          <div className="text-xs text-gray-600 bg-white">
            <p className="mb-2">
              <strong>Tratamiento de Datos Personales:</strong> Sus datos serán utilizados para:
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
          disabled={!termsAccepted || !dataProcessingAccepted || isLoading}
          className="w-full bg-black hover:opacity-90 rounded-none text-white font-medium py-3 px-2 text-lg"
        >
          {isLoading
            ? "Procesando..."
            : !termsAccepted || !dataProcessingAccepted
            ? "Debe aceptar los términos"
            : "Finalizar Compra"}
        </Button>

        {/* Información de seguridad */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 Pago 100% seguro y encriptado</p>
          <p>↩️ Devoluciones gratuitas hasta 30 días</p>
        </div>
      </CardContent>
    </Card>
  );
}
