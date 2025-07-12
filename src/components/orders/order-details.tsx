import {
  LuPackage,
  LuUser,
  LuMapPin,
  LuCreditCard,
  LuTruck,
  LuClock,
  LuEye,
  LuPencil,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Order } from "@/views/admin/orders";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCreateOrderHistory } from "@/hooks/orders/useCreateOrderHistory";

interface OrderDetailsProps {
  order: Order;
  onUpdateStatus: () => void;
  onViewHistory: () => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentStatusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export function OrderDetails({
  order,
  onUpdateStatus,
  onViewHistory,
}: OrderDetailsProps) {
  const { role } = useAuthStore((state) => state.user);
  const createOrderHistory = useCreateOrderHistory();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <LuPackage className="h-5 w-5" />
                Orden #{order.id}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Creada el {formatDate(order.created_at)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onViewHistory}>
                <LuEye className="h-4 w-4 mr-2" />
                Historial
              </Button>
              {role === "admin" ? (
                <>
                  <Button size="sm" onClick={onUpdateStatus}>
                    <LuPencil className="h-4 w-4 mr-2" />
                    Actualizar Estado
                  </Button>
                </>
              ) : (
                <Dialog
                  open={openConfirmDialog}
                  onOpenChange={setOpenConfirmDialog}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" disabled={order.status !== "shipped"}>
                      Confirmar Pedido
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        ¿Confirmar recepción del pedido?
                      </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-600 mb-2">
                      Si tu pedido llegó correctamente, puedes dejar un mensaje
                      adicional. Este se guardará junto con la confirmación.
                    </p>

                    <Textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Tu mensaje (opcional)"
                    />

                    <DialogFooter>
                      <Button
                        onClick={() => {
                          createOrderHistory.mutate({
                            order_id: order.id,
                            status: "completed",
                            admin_message:
                              userMessage ||
                              "El usuario confirma que llegó su pedido.",
                            tracking_url: undefined,
                          });
                          setOpenConfirmDialog(false);
                          setUserMessage("");
                        }}
                      >
                        Confirmar recepción
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Badge className={`${statusColors[order.status]}`}>
              Estado: {order.status}
            </Badge>
            <Badge className={`${paymentStatusColors[order.payment_status]}`}>
              Pago: {order.payment_status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuUser className="h-5 w-5" />
              Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">
                {order.user?.first_name} {order.user?.last_name || ""}
              </p>
              <p className="text-sm text-gray-600">{order.user?.email}</p>
              <p className="text-sm text-gray-600">
                {order.user?.phone || "Sin teléfono"}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {order.user?.gender || "Sin género especificado"}
              </p>
            </div>

            {order.address && (
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <strong>Nombre:</strong> {order.address?.first_name}{" "}
                  {order.address?.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {order.address?.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {order.address?.phone}
                </p>
                <p>
                  <strong>Empresa:</strong> {order.address?.company || "N/A"}
                </p>
                <p>
                  <strong>Documento:</strong> {order.address?.document_type}{" "}
                  {order.address?.document_number}
                </p>
                <p>
                  <strong>Razón Fiscal:</strong> {order.address?.fiscal_name}
                </p>
                <p>
                  <strong>Dirección:</strong> {order.address?.street_address},{" "}
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country}
                </p>
                <p>
                  <strong>Código Postal:</strong> {order.address?.postal_code}
                </p>
                {order.address?.notes && (
                  <p>
                    <strong>Notas:</strong> {order.address.notes}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Información de Pago y Envío */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuCreditCard className="h-5 w-5" />
              Pago y Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Método de pago:</span>
              <span className="text-sm font-medium capitalize">
                {order.payment_method}
              </span>
            </div>

            {order.transaction_id && (
              <div className="flex justify-between">
                <span className="text-sm">ID Transacción:</span>
                <span className="text-sm font-mono">
                  {order.transaction_id}
                </span>
              </div>
            )}

            {order.shipping_method && (
              <div className="flex justify-between">
                <span className="text-sm">Método de envío:</span>
                <span className="text-sm font-medium capitalize">
                  {order.shipping_method}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <LuTruck className="h-4 w-4 text-gray-400" />
              <span>Costo de envío: {formatCurrency(order.shipping_cost)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productos */}
      <Card>
        <CardHeader>
          <CardTitle>Productos ({order.products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Precio Unit.</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.order_items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(product.price))}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(Number(product.total))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resumen de Costos */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Costos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío:</span>
              <span>{formatCurrency(order.shipping_cost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos:</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Última Actualización */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LuClock className="h-4 w-4" />
            <span>Última actualización: {formatDate(order.updated_at)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
