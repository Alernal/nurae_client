import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuCrown, LuHeart, LuStar, LuGem, LuSparkles } from "react-icons/lu";
export function CategoryShowcase() {
    const categories = [
        {
            name: "Collares",
            description: "Elegancia que abraza tu cuello",
            href: "/collections?category=collares",
            icon: LuCrown,
            overlay: "bg-pink-600/30",
            statsColor: "text-pink-700",
            image: "https://entrelazos.co/cdn/shop/files/Set-de-3-Collares-Amour-Amour-Entrelazos-Accesorios-KFE241-0021-3.jpg?v=1713306080",
        },
        {
            name: "Aretes",
            description: "Detalles que enmarcan tu belleza",
            href: "/collections?category=aretes",
            icon: LuStar,
            overlay: "bg-purple-600/30",
            statsColor: "text-purple-700",
            image: "https://calzadocosmos.com/cdn/shop/files/Set-Aretes-AVM-Classic-Para-Mujer-AVEMARIA-71163_46e409e3-b968-419e-9730-90d97434f536.jpg?v=1747233678",
        },
        {
            name: "Pulseras",
            description: "Sofisticación en cada movimiento",
            href: "/collections?category=pulseras",
            icon: LuHeart,
            overlay: "bg-amber-600/30",
            statsColor: "text-amber-700",
            image: "https://dulceencanto.com/cdn/shop/files/P1317-dulce-encanto-accesorios-para-mujer-3.jpg?v=1724638724",
        },
        {
            name: "Anillos",
            description: "Pequeñas obras de arte",
            href: "/collections?category=anillos",
            icon: LuGem,
            overlay: "bg-teal-600/30",
            statsColor: "text-teal-700",
            image: "https://www.basicsbyluamarta.com/cdn/shop/files/AnilloRo_1000x.jpg?v=1686307304",
        },
    ];
    return (_jsx("section", { className: "w-full py-20 md:py-28 bg-[#F5EFE7]", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "text-center mb-16 space-y-6", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-yellow-100 px-6 py-2 text-sm font-medium text-yellow-800", children: [_jsx(LuSparkles, { className: "h-5 w-5" }), _jsx("span", { className: "tracking-wide", children: "Nuestras Categor\u00EDas" }), _jsx(LuSparkles, { className: "h-5 w-5" })] }), _jsx("h2", { className: "text-4xl md:text-6xl font-serif font-bold text-[#2C1810]", children: "Encuentra tu estilo" }), _jsx("p", { className: "text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed", children: "Cada pieza cuenta una historia. Cada categor\u00EDa resalta un aspecto \u00FAnico de tu estilo." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: categories.map((category, index) => {
                        const Icon = category.icon;
                        return (_jsx(Link, { to: category.href, className: "group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2", children: _jsx("div", { className: "p-6", children: _jsxs("div", { className: "relative aspect-[4/5] overflow-hidden rounded-2xl", children: [_jsx("img", { src: category.image, alt: category.name, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" }), _jsx("div", { className: `absolute inset-0 ${category.overlay} transition-opacity` }), _jsx("div", { className: "absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full", children: _jsx(Icon, { className: "h-7 w-7 text-white" }) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-5 text-white", children: _jsxs("div", { className: "space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300", children: [_jsx("h3", { className: "text-2xl font-serif font-bold", children: category.name }), _jsx("p", { className: "text-sm opacity-90", children: category.description }), _jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsx("span", { children: "Explorar colecci\u00F3n" }), _jsx("svg", { className: "h-4 w-4 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] })] }) })] }) }) }, category.name));
                    }) })] }) }));
}
