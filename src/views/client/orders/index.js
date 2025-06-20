import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { OrdersList } from "@/components/orders/orders-list";
import { OrderDetails } from "@/components/orders/order-details";
import { UpdateOrderStatus } from "@/components/orders/update-order-status";
import { OrderStatusHistory } from "@/components/orders/order-status-history";
import { useOrders } from "@/hooks/orders/useOrders";
import { useCreateOrderHistory } from "@/hooks/orders/useCreateOrderHistory";
import { useOrder } from "@/hooks/orders/useOrder";
export default function AdminOrdersPage() {
    const { data: orders = [], isLoading, isError } = useOrders();
    const createOrderHistory = useCreateOrderHistory();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showStatusUpdate, setShowStatusUpdate] = useState(false);
    const [showStatusHistory, setShowStatusHistory] = useState(false);
    const { data: selectedOrder, isLoading: isLoadingOrder, isError: isOrderError, } = useOrder(selectedOrderId);
    const handleOrderSelect = (order) => {
        setSelectedOrderId(order.id);
        setShowStatusUpdate(false);
        setShowStatusHistory(false);
    };
    const handleStatusUpdate = (orderId, newStatus, message, trackingUrl) => {
        createOrderHistory.mutate({
            order_id: orderId,
            status: newStatus,
            admin_message: message,
            tracking_url: trackingUrl,
        });
        setShowStatusUpdate(false);
    };
    const handleViewHistory = () => {
        setShowStatusHistory(true);
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex justify-center items-center", children: "Cargando \u00F3rdenes..." }));
    }
    if (isError) {
        return (_jsx("div", { className: "min-h-screen flex justify-center items-center text-red-600", children: "Error al cargar \u00F3rdenes." }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Gesti\u00F3n de \u00D3rdenes" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Administra y monitorea todas las \u00F3rdenes del sistema" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(OrdersList, { orders: orders, onOrderSelect: handleOrderSelect, selectedOrderId: selectedOrderId }) }), _jsxs("div", { className: "lg:col-span-2", children: [isLoadingOrder && (_jsx("div", { className: "bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500", children: "Cargando detalles de la orden..." })), isOrderError && (_jsx("div", { className: "bg-white rounded-lg shadow-sm border p-8 text-center text-red-500", children: "Error al cargar los detalles de la orden." })), selectedOrder && !isLoadingOrder && !isOrderError && (_jsx(OrderDetails, { order: selectedOrder, onUpdateStatus: () => setShowStatusUpdate(true), onViewHistory: handleViewHistory })), !selectedOrderId && !isLoadingOrder && !isOrderError && (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border p-8 text-center", children: [_jsx("div", { className: "text-gray-400 mb-4", children: _jsx("svg", { className: "mx-auto h-12 w-12", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Selecciona una orden" }), _jsx("p", { className: "text-gray-500", children: "Elige una orden de la lista para ver sus detalles" })] }))] })] }), selectedOrder && (_jsx(UpdateOrderStatus, { order: selectedOrder, open: showStatusUpdate, onOpenChange: setShowStatusUpdate, onUpdateStatus: handleStatusUpdate })), selectedOrder && (_jsx(OrderStatusHistory, { order: selectedOrder, open: showStatusHistory, onOpenChange: setShowStatusHistory }))] }) }));
}
