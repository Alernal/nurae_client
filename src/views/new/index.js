import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/products/useProducts";
export default function NewPage() {
    const { data: products = [], isLoading, isError } = useProducts();
    const topRated = products
        .map((product) => {
        const reviews = product.reviews || [];
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        return { ...product, avgRating };
    })
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 4);
    return (_jsx("div", { className: "min-h-screen bg-[#FDF8F4]", children: _jsxs("main", { children: [_jsx("section", { className: "relative py-20 md:py-28 overflow-hidden", children: _jsx("div", { className: "container px-4 md:px-6 relative", children: _jsxs("div", { className: "text-center space-y-8", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]", children: [_jsx(LuSparkles, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Reci\u00E9n Llegadas" }), _jsx(LuSparkles, { className: "h-5 w-5" })] }), _jsx("h1", { className: "text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight", children: "Novedades" }), _jsx("p", { className: "text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed", children: "Descubre las \u00FAltimas creaciones de NURAE. Piezas \u00FAnicas que acaban de llegar para hacer brillar tu estilo." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Button, { className: "bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300", children: "Ver Toda la Colecci\u00F3n" }), _jsx(Button, { variant: "outline", className: "border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium", children: "Suscr\u00EDbete para Novedades" })] })] }) }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs("div", { className: "container px-4 md:px-6", children: [isLoading ? (_jsx("p", { className: "text-center py-16 text-muted-foreground", children: "Cargando productos..." })) : isError ? (_jsx("p", { className: "text-center py-16 text-red-500", children: "Error al cargar productos." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: topRated.slice(0, 8).map((product) => (_jsx(ProductCard, { product: product }, product.id))) })), _jsx("div", { className: "flex justify-center mt-16", children: _jsx(Link, { to: "/collections", children: _jsxs(Button, { className: "bg-[#D4AF37] hover:opacity-90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group", children: ["Ver Toda la Colecci\u00F3n", _jsx(LuSparkles, { className: "ml-3 h-6 w-6 group-hover:animate-spin" })] }) }) })] }) })] }) }));
}
