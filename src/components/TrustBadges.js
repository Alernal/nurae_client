import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuShield, LuTruck, LuCreditCard, LuHeartHandshake, LuAward, LuSparkles, } from "react-icons/lu";
export function TrustBadges() {
    const badges = [
        {
            icon: LuShield,
            title: "Compra Segura",
            description: "Pasarela de pago wompi",
        },
        {
            icon: LuTruck,
            title: "Envío Gratis",
            description: "En compras +$150.000",
        },
        {
            icon: LuCreditCard,
            title: "Hasta 4 Cuotas",
            description: "Sin intereses",
        },
        {
            icon: LuHeartHandshake,
            title: "Garantía",
            description: "30 días de devolución",
        },
        {
            icon: LuAward,
            title: "Calidad Premium",
            description: "Materiales certificados",
        },
        {
            icon: LuSparkles,
            title: "Diseño Único",
            description: "Exclusivo LÚMINA",
        },
    ];
    return (_jsx("section", { className: "w-full py-6 bg-white", children: _jsx("div", { className: "container px-4 md:px-6", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6", children: badges.map((badge, index) => {
                    const IconComponent = badge.icon;
                    return (_jsxs("div", { className: "flex flex-col items-center text-center space-y-3 p-4 rounded-xl hover:bg-[#fdf9f3] transition-all duration-300 group", children: [_jsx("div", { className: "p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300", children: _jsx(IconComponent, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-sm text-[#2C1810]", children: badge.title }), _jsx("p", { className: "text-xs text-gray-600 mt-1", children: badge.description })] })] }, index));
                }) }) }) }));
}
