import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const { data, isLoading, isError } = useTransaction(typeof transactionId === "string" ? transactionId : undefined);
    // Limpiar carrito si es una nueva orden
    useEffect(() => {
        if (data?.status === "APPROVED" &&
            data?.message === "Orden creada exitosamente.") {
            clearCartCloud();
        }
    }, [data, clearCartCloud]);
    if (isLoading) {
        return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(LuRefreshCcw, { className: "animate-spin w-8 h-8 mb-2" }), _jsx("p", { children: "Verificando pago..." })] }));
    }
    if (isError || !data) {
        return (_jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4", children: [_jsx(LuX, { className: "w-12 h-12 text-red-600" }), _jsx("h2", { className: "text-xl font-semibold text-red-600", children: "Ocurri\u00F3 un error al verificar la transacci\u00F3n." }), _jsx(Button, { variant: "outline", onClick: () => navigate("/checkout"), children: "Volver al Checkout" })] }));
    }
    const { status, message, order } = data;
    const isApproved = status === "APPROVED";
    return (_jsx("div", { className: "container mx-auto py-12 px-4 max-w-3xl text-center", children: isApproved ? (_jsxs("div", { className: "space-y-4", children: [_jsx(LuCheck, { className: "w-12 h-12 text-green-600 mx-auto" }), _jsx("h1", { className: "text-2xl font-bold text-green-700", children: "\u00A1Pago exitoso!" }), _jsx("p", { className: "text-muted-foreground", children: message }), order ? (_jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg mt-6 text-left p-6 shadow-sm", children: [_jsx("h2", { className: "text-xl font-semibold mb-4 text-green-800", children: "Resumen de la Orden" }), _jsxs("p", { children: [_jsx("strong", { children: "ID de Orden:" }), " ", order.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Estado:" }), " ", order.status] }), _jsxs("p", { children: [_jsx("strong", { children: "M\u00E9todo de Env\u00EDo:" }), " ", order.shipping_method || "No especificado"] }), _jsxs("p", { children: [_jsx("strong", { children: "Subtotal:" }), " $", parseFloat(order.subtotal).toLocaleString()] }), _jsxs("p", { children: [_jsx("strong", { children: "Impuestos:" }), " $", parseFloat(order.tax).toLocaleString()] }), _jsxs("p", { children: [_jsx("strong", { children: "Env\u00EDo:" }), " $", parseFloat(order.shipping_cost).toLocaleString()] }), _jsxs("p", { className: "mt-2 text-lg font-bold text-green-900", children: ["Total Pagado: $", parseFloat(order.total).toLocaleString()] }), order.products?.length > 0 && (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Productos:" }), _jsx("ul", { className: "list-disc pl-5 space-y-1", children: order.products.map((product) => (_jsxs("li", { children: [product.product_name, " \u00D7 ", product.pivot.quantity, " \u2014 $", parseFloat(product.pivot.total).toLocaleString()] }, product.id))) })] }))] })) : (_jsx("p", { className: "text-sm text-muted-foreground", children: "No se pudo obtener informaci\u00F3n de la orden." }))] })) : (_jsxs("div", { className: "space-y-4", children: [_jsx(LuX, { className: "w-12 h-12 text-red-600 mx-auto" }), _jsx("h1", { className: "text-2xl font-bold text-red-700", children: "Pago no aprobado" }), _jsx("p", { className: "text-muted-foreground", children: message }), _jsx(Button, { onClick: () => navigate("/checkout"), children: "Reintentar el Pago" })] })) }));
}
