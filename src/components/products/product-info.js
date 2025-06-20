import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { LuStar } from "react-icons/lu";
export function ProductInfo({ product, reviews = [] }) {
    const discount = product.original_price &&
        product.original_price > 0 &&
        product.original_price < product.price
        ? Math.round(((product.price - product.original_price) / product.price) * 100)
        : 0;
    const reviewCount = reviews.length;
    const averageRating = reviewCount > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;
    const filledStars = Math.round(averageRating);
    const showDiscount = discount > 0;
    const finalPrice = showDiscount ? product.original_price : product.price;
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [product.category && (_jsx(Badge, { variant: "secondary", className: "text-xs font-medium", children: product.category.charAt(0).toUpperCase() + product.category.slice(1) })), product.material && (_jsx(Badge, { variant: "default", className: "bg-yellow-100 text-yellow-800 text-xs font-medium", children: product.material.charAt(0).toUpperCase() + product.material.slice(1) })), product.in_stock ? (_jsxs(Badge, { variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100", children: ["En Stock (", product.stock_count, " disponibles)"] })) : (_jsx(Badge, { variant: "destructive", children: "Agotado" }))] }), _jsx("h1", { className: "text-3xl lg:text-4xl font-bold text-gray-900 leading-tight", children: product.name }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center", children: [...Array(5)].map((_, i) => (_jsx(LuStar, { className: `w-5 h-5 ${i < filledStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}` }, i))) }), _jsxs("span", { className: "text-sm text-muted-foreground", children: ["(", averageRating.toFixed(1), ") \u2022 ", reviewCount, " rese\u00F1a", reviewCount !== 1 && "s"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-baseline gap-3", children: [_jsxs("span", { className: "text-4xl font-bold text-gray-900", children: ["$", finalPrice.toLocaleString("es-CO")] }), showDiscount && (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-xl text-muted-foreground line-through", children: ["$", product.price.toLocaleString("es-CO")] }), _jsxs(Badge, { variant: "destructive", className: "text-xs", children: ["-", discount, "% descuento"] })] }))] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Precio incluye IVA \u2022 Env\u00EDo gratuito en compras mayores a $150.000" })] }), product.description && (_jsx("div", { className: "prose prose-sm max-w-none", children: _jsx("p", { className: "text-gray-700 leading-relaxed line-clamp-4", style: {
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }, children: product.description }) }))] }));
}
