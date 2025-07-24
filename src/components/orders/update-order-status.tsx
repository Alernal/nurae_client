import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Order, OrderStatus } from "@/views/admin/orders"

interface UpdateOrderStatusProps {
  order: Order
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateStatus: (
    orderId: number,
    newStatus: OrderStatus,
    message?: string,
    trackingUrl?: string
  ) => void
}

const statusOptions = [
  { value: "pending", label: "Pendiente", description: "Orden recibida, esperando procesamiento" },
  { value: "processing", label: "Procesando", description: "Orden en proceso de preparación" },
  { value: "shipped", label: "Enviado", description: "Orden enviada al cliente" },
  { value: "completed", label: "Completado", description: "Orden entregada y finalizada" },
  { value: "cancelled", label: "Cancelado", description: "Orden cancelada" },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function UpdateOrderStatus({
  order,
  open,
  onOpenChange,
  onUpdateStatus,
}: UpdateOrderStatusProps) {
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status)
  const [message, setMessage] = useState("")
  const [trackingUrl, setTrackingUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmOpen(true)
  }

  const selectedStatusOption = statusOptions.find((option) => option.value === newStatus)
  const hasStatusChanged = newStatus !== order.status

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Actualizar Estado de Orden</DialogTitle>
            <DialogDescription>
              Cambia el estado de la orden con id: {order.id} para {order.user.first_name} {order.user.last_name}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Estado Actual */}
            <div>
              <Label className="text-sm font-medium">Estado actual</Label>
              <div className="mt-2">
                <Badge className={`${statusColors[order.status]}`}>
                  {statusOptions.find((s) => s.value === order.status)?.label}
                </Badge>
              </div>
            </div>

            {/* Nuevo Estado */}
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Nuevo estado *
              </Label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as OrderStatus)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecciona un estado">
                    {selectedStatusOption && (
                      <div className="flex flex-col text-left">
                        <span className="font-medium">{selectedStatusOption.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStatusOption && (
                <p className="text-sm text-gray-600 mt-1">{selectedStatusOption.description}</p>
              )}
            </div>

            {/* URL de Seguimiento */}
            {newStatus === "shipped" && (
              <div>
                <Label htmlFor="tracking" className="text-sm font-medium">
                  URL de seguimiento
                </Label>
                <Input
                  id="tracking"
                  type="url"
                  placeholder="https://tracking.example.com/ABC123"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Opcional: URL para que el cliente pueda rastrear su envío</p>
              </div>
            )}

            {/* Mensaje */}
            <div>
              <Label htmlFor="message" className="text-sm font-medium">
                Mensaje adicional
              </Label>
              <Textarea
                id="message"
                placeholder="Escribe un mensaje opcional sobre este cambio de estado..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2"
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">Este mensaje se guardará en el historial de la orden</p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border hover:bg-gray-200"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!hasStatusChanged || isSubmitting}
                className="bg-black text-white hover:bg-black/70"
              >
                {isSubmitting ? "Actualizando..." : "Actualizar Estado"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>¿Confirmar cambio de estado?</DialogTitle>
            <DialogDescription>
              Vas a cambiar el estado de la orden <strong>#{order.id}</strong> a{" "}
              <span className="font-medium">{selectedStatusOption?.label}</span>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-black text-white hover:bg-black/70"
              onClick={async () => {
                setIsSubmitting(true)
                await new Promise((resolve) => setTimeout(resolve, 500))
                onUpdateStatus(
                  order.id,
                  newStatus,
                  message.trim() || undefined,
                  trackingUrl.trim() || undefined
                )
                setIsSubmitting(false)
                setMessage("")
                setTrackingUrl("")
                setConfirmOpen(false)
                onOpenChange(false)
              }}
            >
              Confirmar cambio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
