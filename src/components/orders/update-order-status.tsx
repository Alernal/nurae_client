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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Order, OrderStatus } from "@/views/admin/orders"

interface UpdateOrderStatusProps {
  order: Order
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateStatus: (orderId: number, newStatus: OrderStatus, message?: string, trackingUrl?: string) => void
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

export function UpdateOrderStatus({ order, open, onOpenChange, onUpdateStatus }: UpdateOrderStatusProps) {
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status)
  const [message, setMessage] = useState("")
  const [trackingUrl, setTrackingUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onUpdateStatus(order.id, newStatus, message.trim() || undefined, trackingUrl.trim() || undefined)

    setIsSubmitting(false)
    setMessage("")
    setTrackingUrl("")
  }

  const selectedStatusOption = statusOptions.find((option) => option.value === newStatus)
  const hasStatusChanged = newStatus !== order.status

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Actualizar Estado de Orden</DialogTitle>
          <DialogDescription>
            Cambia el estado de la orden #{order.id} para {order.user_name}
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
                <SelectValue placeholder="Selecciona un estado" />
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
            {selectedStatusOption && <p className="text-sm text-gray-600 mt-1">{selectedStatusOption.description}</p>}
          </div>

          {/* URL de Seguimiento (solo para estado "shipped") */}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!hasStatusChanged || isSubmitting}>
              {isSubmitting ? "Actualizando..." : "Actualizar Estado"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
