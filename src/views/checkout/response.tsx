import { useSearchParams, useNavigate } from "react-router-dom";
import { useTransaction } from "@/hooks/useTransaction";
import { Button } from "@/components/ui/button";
import { LuCheck, LuX, LuRefreshCcw } from "react-icons/lu";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";



export default function CheckoutResponsePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const transactionId = searchParams.get("id");

  const { clearCartCloud } = useCart();
  // const { data, isLoading, isError } = useTransaction(
  //   typeof transactionId === "string" ? transactionId : undefined
  // );

  // Simulación de respuesta exitosa
  const data = {
    status: "APPROVED",
    isPending: false,
    message: "Tu pago ha sido aprobado exitosamente.",
    order: {
      id: "ORD123456",
      status: "APPROVED",
      shipping_method: "Envío estándar",
      subtotal: "150.00",
      tax: "28.50",
      shipping_cost: "10.00",
      total: "188.50",
      products: [
        {
          id: 1,
          product_name: "Bolso Elegante",
          pivot: {
            quantity: 1,
            total: "100.00"
          }
        },
        {
          id: 2,
          product_name: "Accesorio Moderno",
          pivot: {
            quantity: 2,
            total: "50.00"
          }
        }
      ]
    }
  };

  const isLoading = false;
  const isError = false;
  const isApproved = data?.status === "APPROVED";
  const isDeclined = ["REJECTED", "DECLINED", "ERROR"].includes(data?.status);
  const isPending = data?.isPending;

  // const isApproved = data?.status === "APPROVED";
  // const isDeclined = ["REJECTED", "DECLINED", "ERROR"].includes(data?.status);
  // const isPending = data?.isPending;

  useEffect(() => {
    if (isApproved && data?.order) {
      clearCartCloud();
    }
  }, [data, clearCartCloud, isApproved]);

  if (isLoading || isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground">
        <LuRefreshCcw className="animate-spin w-8 h-8 mb-2" />
        <p>{isPending ? "Creando orden..." : "Verificando pago..."}</p>
      </div>
    );
  }

  if (isError || !data || isDeclined) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <LuX className="w-12 h-12 text-red-600" />
        <h2 className="text-xl font-semibold text-red-600">
          El pago fue rechazado o falló.
        </h2>
        <Button variant="outline" onClick={() => navigate("/checkout")}>
          Volver al Checkout
        </Button>
      </div>
    );
  }

  const { message, order } = data;

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl text-center">
      <div className="space-y-4">
        <LuCheck className="w-12 h-12 text-green-600 mx-auto" />
        <h1 className="text-2xl font-bold text-green-700">¡Pago exitoso!</h1>
        <p className="text-muted-foreground">{message}</p>

        {order ? (
          <div className="bg-green-50 border border-green-200 rounded-lg mt-6 text-left p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              Resumen de la Orden
            </h2>
            <p><strong>ID de Orden:</strong> {order.id}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Método de Envío:</strong> {order.shipping_method || "No especificado"}</p>
            <p><strong>Subtotal:</strong> ${parseFloat(order.subtotal).toLocaleString()}</p>
            <p><strong>Impuestos:</strong> ${parseFloat(order.tax).toLocaleString()}</p>
            <p><strong>Envío:</strong> ${parseFloat(order.shipping_cost).toLocaleString()}</p>
            <p className="mt-2 text-lg font-bold text-green-900">
              Total Pagado: ${parseFloat(order.total).toLocaleString()}
            </p>

            {order.products?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Productos:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.product_name} × {product.pivot.quantity} — $
                      {parseFloat(product.pivot.total).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aprobado. Esperando confirmación de la orden...
          </p>
        )}
      </div>
    </div>
  );
}
