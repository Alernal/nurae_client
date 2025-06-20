import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
const statusOptions = [
    { value: "pending", label: "Pendiente", description: "Orden recibida, esperando procesamiento" },
    { value: "processing", label: "Procesando", description: "Orden en proceso de preparación" },
    { value: "shipped", label: "Enviado", description: "Orden enviada al cliente" },
    { value: "completed", label: "Completado", description: "Orden entregada y finalizada" },
    { value: "cancelled", label: "Cancelado", description: "Orden cancelada" },
];
const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};
export function UpdateOrderStatus({ order, open, onOpenChange, onUpdateStatus }) {
    const [newStatus, setNewStatus] = useState(order.status);
    const [message, setMessage] = useState("");
    const [trackingUrl, setTrackingUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onUpdateStatus(order.id, newStatus, message.trim() || undefined, trackingUrl.trim() || undefined);
        setIsSubmitting(false);
        setMessage("");
        setTrackingUrl("");
    };
    const selectedStatusOption = statusOptions.find((option) => option.value === newStatus);
    const hasStatusChanged = newStatus !== order.status;
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Actualizar Estado de Orden" }), _jsxs(DialogDescription, { children: ["Cambia el estado de la orden #", order.id, " para ", order.user_name] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-sm font-medium", children: "Estado actual" }), _jsx("div", { className: "mt-2", children: _jsx(Badge, { className: `${statusColors[order.status]}`, children: statusOptions.find((s) => s.value === order.status)?.label }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "status", className: "text-sm font-medium", children: "Nuevo estado *" }), _jsxs(Select, { value: newStatus, onValueChange: (value) => setNewStatus(value), children: [_jsx(SelectTrigger, { className: "mt-2", children: _jsx(SelectValue, { placeholder: "Selecciona un estado" }) }), _jsx(SelectContent, { children: statusOptions.map((option) => (_jsx(SelectItem, { value: option.value, children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: option.label }), _jsx("div", { className: "text-sm text-gray-500", children: option.description })] }) }, option.value))) })] }), selectedStatusOption && _jsx("p", { className: "text-sm text-gray-600 mt-1", children: selectedStatusOption.description })] }), newStatus === "shipped" && (_jsxs("div", { children: [_jsx(Label, { htmlFor: "tracking", className: "text-sm font-medium", children: "URL de seguimiento" }), _jsx(Input, { id: "tracking", type: "url", placeholder: "https://tracking.example.com/ABC123", value: trackingUrl, onChange: (e) => setTrackingUrl(e.target.value), className: "mt-2" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Opcional: URL para que el cliente pueda rastrear su env\u00EDo" })] })), _jsxs("div", { children: [_jsx(Label, { htmlFor: "message", className: "text-sm font-medium", children: "Mensaje adicional" }), _jsx(Textarea, { id: "message", placeholder: "Escribe un mensaje opcional sobre este cambio de estado...", value: message, onChange: (e) => setMessage(e.target.value), className: "mt-2", rows: 3 }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Este mensaje se guardar\u00E1 en el historial de la orden" })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), disabled: isSubmitting, children: "Cancelar" }), _jsx(Button, { type: "submit", disabled: !hasStatusChanged || isSubmitting, children: isSubmitting ? "Actualizando..." : "Actualizar Estado" })] })] })] }) }));
}
