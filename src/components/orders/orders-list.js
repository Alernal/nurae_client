import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LuSearch, LuPackage } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
export function OrdersList({ orders, onOrderSelect, selectedOrderId }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.id.toString().includes(searchTerm) ||
            order.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user_email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        const matchesPayment = paymentFilter === "all" || order.payment_status === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
    });
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
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (_jsxs(Card, { className: "h-fit", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(LuPackage, { className: "h-5 w-5" }), "\u00D3rdenes (", filteredOrders.length, ")"] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx(LuSearch, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { placeholder: "Buscar por ID, nombre o email...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Select, { value: statusFilter, onValueChange: (value) => setStatusFilter(value), children: [_jsx(SelectTrigger, { className: "flex-1", children: _jsx(SelectValue, { placeholder: "Estado" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos los estados" }), _jsx(SelectItem, { value: "pending", children: "Pendiente" }), _jsx(SelectItem, { value: "processing", children: "Procesando" }), _jsx(SelectItem, { value: "shipped", children: "Enviado" }), _jsx(SelectItem, { value: "completed", children: "Completado" }), _jsx(SelectItem, { value: "cancelled", children: "Cancelado" })] })] }), _jsxs(Select, { value: paymentFilter, onValueChange: (value) => setPaymentFilter(value), children: [_jsx(SelectTrigger, { className: "flex-1", children: _jsx(SelectValue, { placeholder: "Pago" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "Todos los pagos" }), _jsx(SelectItem, { value: "pending", children: "Pendiente" }), _jsx(SelectItem, { value: "paid", children: "Pagado" }), _jsx(SelectItem, { value: "failed", children: "Fallido" }), _jsx(SelectItem, { value: "refunded", children: "Reembolsado" })] })] })] })] })] }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "max-h-[600px] overflow-y-auto", children: filteredOrders.length === 0 ? (_jsxs("div", { className: "p-6 text-center text-gray-500", children: [_jsx(LuPackage, { className: "mx-auto h-8 w-8 mb-2 opacity-50" }), _jsx("p", { children: "No se encontraron \u00F3rdenes" })] })) : (_jsx("div", { className: "space-y-1", children: filteredOrders.map((order) => (_jsxs("div", { className: `p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedOrderId === order.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}`, onClick: () => onOrderSelect(order), children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-semibold text-sm", children: ["#", order.transaction_id] }), _jsx("p", { className: "text-sm text-gray-600", children: order.user.first_name })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-semibold text-sm", children: formatCurrency(order.total) }), _jsx("p", { className: "text-xs text-gray-500", children: formatDate(order.created_at) })] })] }), _jsxs("div", { className: "flex gap-2 flex-wrap", children: [_jsx(Badge, { className: `text-xs ${statusColors[order.status]}`, children: order.status }), _jsx(Badge, { className: `text-xs ${paymentStatusColors[order.payment_status]}`, children: order.payment_status })] })] }, order.id))) })) }) })] }));
}
