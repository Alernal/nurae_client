import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LuPackage, LuUser, LuMapPin, LuCreditCard, LuTruck, LuClock, LuEye, LuPencil, } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCreateOrderHistory } from "@/hooks/orders/useCreateOrderHistory";
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
export function OrderDetails({ order, onUpdateStatus, onViewHistory, }) {
    const { role } = useAuthStore((state) => state.user);
    const createOrderHistory = useCreateOrderHistory();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsxs(CardHeader, { children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(LuPackage, { className: "h-5 w-5" }), "Orden #", order.id] }), _jsxs("p", { className: "text-sm text-gray-600 mt-1", children: ["Creada el ", formatDate(order.created_at)] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: onViewHistory, children: [_jsx(LuEye, { className: "h-4 w-4 mr-2" }), "Historial"] }), role === "admin" ? (_jsx(_Fragment, { children: _jsxs(Button, { size: "sm", onClick: onUpdateStatus, children: [_jsx(LuPencil, { className: "h-4 w-4 mr-2" }), "Actualizar Estado"] }) })) : (_jsxs(Dialog, { open: openConfirmDialog, onOpenChange: setOpenConfirmDialog, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { size: "sm", disabled: order.status !== "shipped", children: "Confirmar Pedido" }) }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "\u00BFConfirmar recepci\u00F3n del pedido?" }) }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Si tu pedido lleg\u00F3 correctamente, puedes dejar un mensaje adicional. Este se guardar\u00E1 junto con la confirmaci\u00F3n." }), _jsx(Textarea, { value: userMessage, onChange: (e) => setUserMessage(e.target.value), placeholder: "Tu mensaje (opcional)" }), _jsx(DialogFooter, { children: _jsx(Button, { onClick: () => {
                                                                    createOrderHistory.mutate({
                                                                        order_id: order.id,
                                                                        status: "completed",
                                                                        admin_message: userMessage ||
                                                                            "El usuario confirma que llegó su pedido.",
                                                                        tracking_url: undefined,
                                                                    });
                                                                    setOpenConfirmDialog(false);
                                                                    setUserMessage("");
                                                                }, children: "Confirmar recepci\u00F3n" }) })] })] }))] })] }), _jsxs("div", { className: "flex gap-2 mt-4", children: [_jsxs(Badge, { className: `${statusColors[order.status]}`, children: ["Estado: ", order.status] }), _jsxs(Badge, { className: `${paymentStatusColors[order.payment_status]}`, children: ["Pago: ", order.payment_status] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(LuUser, { className: "h-5 w-5" }), "Cliente"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: order.user.first_name }), _jsx("p", { className: "text-sm text-gray-600", children: order.user.email })] }), order.address && (_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(LuMapPin, { className: "h-4 w-4 mt-1 text-gray-400" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Direcci\u00F3n de env\u00EDo" }), _jsxs("p", { className: "text-sm text-gray-600", children: [order.address.street_address, ", ", order.address.city, ",", " ", order.address.country] })] })] }))] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(LuCreditCard, { className: "h-5 w-5" }), "Pago y Env\u00EDo"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "M\u00E9todo de pago:" }), _jsx("span", { className: "text-sm font-medium capitalize", children: order.payment_method })] }), order.transaction_id && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "ID Transacci\u00F3n:" }), _jsx("span", { className: "text-sm font-mono", children: order.transaction_id })] })), order.shipping_method && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "M\u00E9todo de env\u00EDo:" }), _jsx("span", { className: "text-sm font-medium capitalize", children: order.shipping_method })] })), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(LuTruck, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: ["Costo de env\u00EDo: ", formatCurrency(order.shipping_cost)] })] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Productos (", order.products.length, ")"] }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Producto" }), _jsx(TableHead, { className: "text-center", children: "Cantidad" }), _jsx(TableHead, { className: "text-right", children: "Precio Unit." }), _jsx(TableHead, { className: "text-right", children: "Total" })] }) }), _jsx(TableBody, { children: order.products.map((product) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: product.name }), _jsxs("p", { className: "text-sm text-gray-500", children: ["ID: ", product.id] })] }) }), _jsx(TableCell, { className: "text-center", children: product.pivot.quantity }), _jsx(TableCell, { className: "text-right", children: formatCurrency(product.pivot.price) }), _jsx(TableCell, { className: "text-right font-medium", children: formatCurrency(product.pivot.total) })] }, product.id))) })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Resumen de Costos" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Subtotal:" }), _jsx("span", { children: formatCurrency(order.subtotal) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Env\u00EDo:" }), _jsx("span", { children: formatCurrency(order.shipping_cost) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Impuestos:" }), _jsx("span", { children: formatCurrency(order.tax) })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between font-semibold text-lg", children: [_jsx("span", { children: "Total:" }), _jsx("span", { children: formatCurrency(order.total) })] })] }) })] }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(LuClock, { className: "h-4 w-4" }), _jsxs("span", { children: ["\u00DAltima actualizaci\u00F3n: ", formatDate(order.updated_at)] })] }) }) })] }));
}
