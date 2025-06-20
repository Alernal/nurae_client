import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/product-card";
import { LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function WishlistPage() {
    const { data: products = [], isLoading } = useProducts();
    const { items: wishlistIds, fetchWishlist } = useWishlist();
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        fetchWishlist().finally(() => setHasLoaded(true));
    }, []);
    const wishlistItems = useMemo(() => {
        return products.filter((product) => wishlistIds.includes(product.id));
    }, [products, wishlistIds]);
    if (isLoading || !hasLoaded) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "flex flex-col items-center gap-4 text-gray-600", children: [_jsx("div", { className: "w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-lg font-medium", children: "Cargando tus productos favoritos..." })] }) }));
    }
    if (wishlistItems.length === 0) {
        return (_jsxs("div", { className: "min-h-screen px-4 py-16 md:px-6 md:py-24 text-center space-y-8 max-w-2xl mx-auto flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-md", children: _jsx(LuHeart, { className: "h-16 w-16 text-gray-400" }) }), _jsx("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-gray-800", children: "Tu lista de deseos est\u00E1 vac\u00EDa" }), _jsx("p", { className: "text-lg text-gray-600 max-w-md mx-auto", children: "Guarda tus productos favoritos aqu\u00ED para encontrarlos f\u00E1cilmente m\u00E1s tarde." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/collections", children: _jsx(Button, { className: "bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300", children: "Explorar Colecciones" }) }), _jsx(Link, { to: "/bestsellers", children: _jsx(Button, { variant: "outline", className: "border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-colors", children: "Ver M\u00E1s Vendidos" }) })] })] }));
    }
    return (_jsxs("div", { className: "min-h-screen px-4 py-8 md:px-6 md:py-12", children: [_jsxs("div", { className: "text-center space-y-4 mb-12", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-[var(--color-marron)]", children: "Mi Lista de Deseos" }), _jsxs("p", { className: "text-xl text-gray-600", children: [wishlistItems.length, " producto(s) favorito(s)"] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: wishlistItems.map((product) => (_jsx(ProductCard, { product: product }, product.id))) })] }));
}
