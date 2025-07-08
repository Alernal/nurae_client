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

  const { clearCartCloud } = useCart(); // 👈 importa tu función para limpiar
  const { data, isLoading, isError } = useTransaction(
    typeof transactionId === "string" ? transactionId : undefined
  );

  useEffect(() => {
    if (
      data?.status === "APPROVED" &&
      data?.message === "Orden generada automáticamente tras aprobación del pago."
    ) {
      clearCartCloud();
    }
  }, [data, clearCartCloud]);


  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground">
        <LuRefreshCcw className="animate-spin w-8 h-8 mb-2" />
        <p>Verificando pago...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <LuX className="w-12 h-12 text-red-600" />
        <h2 className="text-xl font-semibold text-red-600">
          Ocurrió un error al verificar la transacción.
        </h2>
        <Button variant="outline" onClick={() => navigate("/checkout")}>
          Volver al Checkout
        </Button>
      </div>
    );
  }

  const { status, message, order } = data;
  const isApproved = status === "APPROVED";

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl text-center">
      {isApproved ? (
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
              No se pudo obtener información de la orden.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <LuX className="w-12 h-12 text-red-600 mx-auto" />
          <h1 className="text-2xl font-bold text-red-700">Pago no aprobado</h1>
          <p className="text-muted-foreground">{message}</p>
          <Button onClick={() => navigate("/checkout")}>Reintentar el Pago</Button>
        </div>
      )}
    </div>
  );
}
