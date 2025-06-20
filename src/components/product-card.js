import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { LuHeart, LuShoppingBag, LuStar } from "react-icons/lu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product, viewMode = "grid" }) {
    const navigate = useNavigate();
    const { add, remove, isInWishlist } = useWishlist();
    const { addToCart, getQuantity } = useCart();
    const quantityInCart = getQuantity(product.id);
    const reviews = product.reviews || [];
    const avgRating = reviews?.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0";
    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            remove(product.id);
        }
        else {
            add(product.id);
        }
    };
    const handleAddToCart = () => {
        if (!isMaxReached) {
            addToCart(product.id, 1);
        }
    };
    const handleBuyNow = () => {
        if (!isMaxReached && quantityInCart === 0) {
            addToCart(product.id, 1);
        }
        navigate("/checkout");
    };
    const regularPrice = Number(product.price);
    const offerPrice = Number(product.original_price);
    const isOnSale = offerPrice > 0 && offerPrice < regularPrice;
    const discountPercentage = isOnSale
        ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
        : 0;
    const imageUrl = product.images?.[0]?.url
        ? `http://localhost:8000${product.images[0].url}`
        : "https://via.placeholder.com/300x400.png?text=Sin+Imagen";
    const maxAvailable = product.stock_count ?? 1;
    const isMaxReached = quantityInCart >= maxAvailable;
    // 👇 LIST VIEW
    if (viewMode === "list") {
        return (_jsxs("div", { className: "flex flex-col sm:flex-row bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden transition-all", children: [_jsxs("div", { className: "w-full sm:w-48 h-64 sm:h-auto relative flex-shrink-0 bg-gray-100 overflow-hidden", children: [_jsx("img", { src: imageUrl, alt: product.name, className: "object-cover w-full h-full" }), isOnSale && (_jsxs("span", { className: "absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow", children: ["-", discountPercentage, "% OFF"] }))] }), _jsxs("div", { className: "flex flex-col justify-between p-4 flex-1 space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center text-xs text-muted-foreground font-medium mb-1", children: [_jsx(Link, { to: `/collections?category=${product.category?.slug ?? "general"}`, className: "uppercase tracking-wide hover:underline", children: product.category ?? "General" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuStar, { className: "h-4 w-4 fill-yellow-400 text-yellow-400" }), _jsx("span", { children: avgRating }), _jsxs("span", { className: "text-gray-400", children: ["(", reviews?.length, ")"] })] })] }), _jsx(Link, { to: `/products/${product.slug}`, children: _jsx("h3", { className: "text-lg font-serif font-bold text-[#2C1810] leading-snug hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1", children: product.name }) }), product.description && (_jsx("p", { className: "text-sm text-gray-600 font-light line-clamp-2", children: product.description }))] }), _jsxs("div", { className: "flex items-center justify-between gap-4 mt-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xl font-serif font-bold text-[#2C1810]", children: ["$", isOnSale
                                                    ? offerPrice.toLocaleString("es-CO")
                                                    : regularPrice.toLocaleString("es-CO"), " ", "COP"] }), isOnSale && (_jsxs("p", { className: "text-sm text-gray-400 line-through", children: ["$", regularPrice.toLocaleString("es-CO"), " COP"] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "bg-white/90 hover:bg-white shadow rounded-full", onClick: toggleWishlist, children: _jsx(LuHeart, { className: cn("h-5 w-5 transition-colors", isInWishlist(product.id)
                                                    ? "fill-[#D4AF37] text-[#D4AF37]"
                                                    : "text-gray-600") }) }), _jsxs(Button, { size: "sm", className: "bg-[#D4AF37] hover:opacity-90 text-white rounded-full text-sm font-medium shadow", onClick: handleAddToCart, disabled: isMaxReached, children: [_jsx(LuShoppingBag, { className: "mr-2 h-4 w-4" }), quantityInCart > 0 ? "Agregar otro" : "Añadir"] })] })] }), isMaxReached && (_jsx("p", { className: "text-xs text-red-500 mt-1", children: "No hay m\u00E1s unidades disponibles" }))] })] }));
    }
    // 👇 GRID VIEW
    return (_jsxs("div", { className: "group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col", children: [_jsxs("div", { className: "relative aspect-[3/4] overflow-hidden", children: [_jsx("img", { src: imageUrl, alt: product.name, className: "object-cover w-full h-full transition-transform group-hover:scale-110 duration-700" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsx("div", { className: "absolute top-4 left-4 space-y-2", children: isOnSale && (_jsxs("span", { className: "bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow", children: ["-", discountPercentage, "% OFF"] })) }), _jsx("div", { className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-x-2 group-hover:translate-x-0", children: _jsx(Button, { variant: "ghost", size: "icon", className: "bg-white/90 hover:bg-white shadow-md rounded-full", onClick: toggleWishlist, children: _jsx(LuHeart, { className: cn("h-5 w-5 transition-colors", isInWishlist(product.id)
                                    ? "fill-[#D4AF37] text-[#D4AF37]"
                                    : "text-gray-600") }) }) }), _jsxs("div", { className: "absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0", children: [_jsxs(Button, { className: "w-full bg-[#D4AF37] hover:opacity-90 text-white rounded-full shadow-lg text-sm font-semibold", onClick: handleAddToCart, disabled: isMaxReached, children: [_jsx(LuShoppingBag, { className: "mr-2 h-4 w-4" }), quantityInCart > 0 ? "Agregar otro" : "Añadir al carrito"] }), isMaxReached && (_jsx("p", { className: "text-xs text-red-500 mt-2 text-center", children: "No hay m\u00E1s unidades disponibles" }))] })] }), _jsxs("div", { className: "p-5 flex flex-col flex-grow", children: [_jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground font-medium mb-2", children: [_jsx(Link, { to: `/collections?category=${product.category ?? "general"}`, className: "uppercase tracking-wide hover:underline", children: product.category ?? "General" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuStar, { className: "h-4 w-4 fill-yellow-400 text-yellow-400" }), _jsx("span", { children: avgRating }), _jsxs("span", { className: "text-gray-400", children: ["(", reviews.length, ")"] })] })] }), _jsx(Link, { to: `/products/${product.slug}`, children: _jsx("h3", { className: "text-lg md:text-xl font-serif font-bold text-[#2C1810] leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1", children: product.name }) }), product.description && (_jsx("p", { className: "text-sm text-gray-600 font-light line-clamp-2 mb-3", children: product.description })), _jsx("div", { className: "flex-grow" }), _jsxs("div", { className: "flex items-center justify-between mt-auto pt-3 border-t border-gray-200", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xl font-serif font-bold text-[#2C1810] leading-none", children: ["$", isOnSale
                                                ? offerPrice.toLocaleString("es-CO")
                                                : regularPrice.toLocaleString("es-CO"), " ", "COP"] }), isOnSale && (_jsxs("p", { className: "text-sm text-gray-400 line-through", children: ["$", regularPrice.toLocaleString("es-CO"), " COP"] }))] }), _jsx(Button, { size: "sm", className: "bg-[#D4AF37] hover:opacity-90 text-white rounded-full text-sm font-medium shadow", onClick: handleBuyNow, children: "Comprar" })] })] })] }));
}
