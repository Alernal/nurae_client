import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuClock, LuUser, LuMessageSquare, LuExternalLink, LuTruck, } from "react-icons/lu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};
const statusLabels = {
    pending: "Pendiente",
    processing: "Procesando",
    shipped: "Enviado",
    completed: "Completado",
    cancelled: "Cancelado",
};
export function OrderStatusHistory({ order, open, onOpenChange, }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    function getTimeAgoFromBogota(dateString) {
        const now = dayjs().tz("America/Bogota");
        const eventTime = dayjs.utc(dateString).tz("America/Bogota");
        const diffInMinutes = now.diff(eventTime, "minute");
        const diffInHours = now.diff(eventTime, "hour");
        const diffInDays = now.diff(eventTime, "day");
        if (diffInMinutes < 60) {
            return `hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? "s" : ""}`;
        }
        else if (diffInHours < 24) {
            return `hace ${diffInHours} hora${diffInHours !== 1 ? "s" : ""}`;
        }
        else {
            return `hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
        }
    }
    const sortedHistory = [...order.status_logs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[600px] max-h-[80vh]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Historial de Estados" }), _jsxs(DialogDescription, { children: ["Cambios registrados para la orden #", order.id] })] }), _jsx(ScrollArea, { className: "max-h-[400px] pr-4", children: _jsx("div", { className: "space-y-4", children: sortedHistory.map((entry, index) => (_jsxs("div", { className: "relative", children: [index < sortedHistory.length - 1 && (_jsx("div", { className: "absolute left-6 top-12 w-0.5 h-16 bg-gray-200" })), _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center", children: entry.status === "shipped" ? (_jsx(LuTruck, { className: "h-5 w-5 text-purple-500" })) : (_jsx(LuClock, { className: "h-5 w-5 text-gray-400" })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { className: `${statusColors[entry.status]}`, children: statusLabels[entry.status] }), _jsx("span", { className: "text-sm text-gray-500", children: getTimeAgoFromBogota(entry.created_at) })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-medium text-gray-900", children: formatDate(entry.created_at) }), entry.user?.first_name && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: [_jsx(LuUser, { className: "h-3 w-3" }), entry.user?.first_name] }))] }), entry.message && (_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(LuMessageSquare, { className: "h-4 w-4 text-gray-400 mt-0.5" }), _jsx("p", { className: "text-sm text-gray-700 whitespace-pre-line", children: entry.message })] })), entry.status === "shipped" && entry.tracking_url && (_jsx("div", { className: "pt-2", children: _jsxs(Button, { variant: "outline", size: "sm", className: "h-8 text-sm", onClick: () => window.open(entry.tracking_url, "_blank"), children: [_jsx(LuExternalLink, { className: "h-3 w-3 mr-1" }), "Ver informaci\u00F3n de env\u00EDo"] }) }))] })] })] }), index < sortedHistory.length - 1 && (_jsx(Separator, { className: "my-4" }))] }, entry.id))) }) })] }) }));
}
