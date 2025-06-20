import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuTruck, LuShield, LuRotateCcw, LuAward } from "react-icons/lu";
export function ShippingInfo() {
    const benefits = [
        {
            icon: LuTruck,
            title: "Envío Gratuito",
            description: "En compras mayores a $1,500 MXN",
        },
        {
            icon: LuShield,
            title: "Garantía de por Vida",
            description: "Contra defectos de fabricación",
        },
        {
            icon: LuRotateCcw,
            title: "Devoluciones Fáciles",
            description: "30 días para cambios y devoluciones",
        },
        {
            icon: LuAward,
            title: "Certificado de Autenticidad",
            description: "Incluido con cada pieza",
        },
    ];
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Beneficios de Compra" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (_jsxs("div", { className: "flex items-start gap-2 p-2 bg-slate-50 rounded-lg", children: [_jsx("div", { className: "flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center", children: _jsx(Icon, { className: "w-3 h-3 text-primary" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-xs font-medium text-gray-900", children: benefit.title }), _jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: benefit.description })] })] }, index));
                }) }), _jsxs("div", { className: "p-3 bg-blue-50 border border-blue-200 rounded-lg", children: [_jsx("h4", { className: "text-xs font-medium text-blue-900 mb-1", children: "Informaci\u00F3n de Entrega" }), _jsxs("ul", { className: "text-xs text-blue-800 space-y-0.5", children: [_jsx("li", { children: "\u2022 Entrega en 3-5 d\u00EDas h\u00E1biles" }), _jsx("li", { children: "\u2022 Empaque discreto y seguro" }), _jsx("li", { children: "\u2022 Seguimiento en tiempo real" }), _jsx("li", { children: "\u2022 Firma requerida al recibir" })] })] })] }));
}
