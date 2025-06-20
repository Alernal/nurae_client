import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LuMinus, LuPlus, LuTrash2, LuShoppingBag, LuArrowLeft, } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/products/useProducts";
const formatPrice = (price) => new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
}).format(price);
export default function CartPage() {
    const { items, updateQuantity, removeFromCart } = useCart();
    const { data: products = [] } = useProducts();
    const cartWithDetails = items
        .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        if (!product)
            return null;
        return {
            ...cartItem,
            ...product,
        };
    })
        .filter(Boolean);
    const subtotal = cartWithDetails.reduce((sum, item) => sum +
        item.quantity *
            (item.original_price && item.original_price > 0
                ? item.original_price
                : item.price), 0);
    const shipping = subtotal >= 150000 ? 0 : 15000;
    const total = subtotal + shipping;
    if (cartWithDetails.length === 0) {
        return (_jsxs("div", { className: "container px-4 py-16 md:px-6 md:py-24 text-center space-y-6", children: [_jsx(LuShoppingBag, { className: "h-16 w-16 mx-auto text-gray-400" }), _jsx("h1", { className: "text-4xl font-bold", children: "Tu carrito est\u00E1 vac\u00EDo" }), _jsx("p", { className: "text-gray-600", children: "Descubre nuestras colecciones y encuentra la pieza perfecta para ti." }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Link, { to: "/collections", children: _jsx(Button, { className: "bg-black text-white hover:bg-gray-800", children: "Explorar Colecciones" }) }), _jsx(Link, { to: "/bestsellers", children: _jsx(Button, { variant: "outline", children: "Ver M\u00E1s Vendidos" }) })] })] }));
    }
    return (_jsxs("div", { className: "container px-4 py-12 md:px-6 md:py-16", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx(Link, { to: "/collections", children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(LuArrowLeft, { className: "h-5 w-5" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-4xl md:text-5xl font-serif font-bold", children: "Tu Carrito" }), _jsxs("p", { className: "text-gray-600", children: [cartWithDetails.length, " productos seleccionados"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2 space-y-6", children: cartWithDetails.map((item) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-6 flex gap-6", children: [_jsx("div", { className: "w-28 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0", children: _jsx("img", { src: item.images?.[0]?.url
                                                ? `http://localhost:8000${item.images[0].url}`
                                                : "/placeholder.svg", alt: item.name, className: "object-cover w-full h-full" }) }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase text-gray-500", children: item.category }), _jsx("h3", { className: "font-serif font-bold text-xl", children: item.name }), _jsxs("div", { className: "text-sm text-gray-500", children: [_jsxs("span", { children: ["Color: ", item.color] }), " \u00B7", " ", _jsxs("span", { children: ["Tama\u00F1o: ", item.size] })] })] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeFromCart(item.productId), className: "hover:text-red-600", children: _jsx(LuTrash2, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xl font-serif font-bold text-gray-800", children: formatPrice(item.original_price || item.price) }), item.original_price &&
                                                                item.original_price < item.price && (_jsxs("p", { className: "text-sm text-green-600", children: ["Ahorras", " ", formatPrice((item.price - item.original_price) * item.quantity)] }))] }), _jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "flex items-center border rounded-lg", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => updateQuantity(item.productId, item.quantity - 1), disabled: item.quantity <= 1, children: _jsx(LuMinus, { className: "h-4 w-4" }) }), _jsx("div", { className: "px-3", children: item.quantity }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => updateQuantity(item.productId, item.quantity + 1), disabled: item.quantity >= item.stock_count, children: _jsx(LuPlus, { className: "h-4 w-4" }) })] }) })] })] })] }) }, item.productId))) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "font-serif text-2xl", children: "Resumen del Pedido" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between text-sm text-gray-700", children: [_jsx("span", { children: "Subtotal" }), _jsx("span", { children: formatPrice(subtotal) })] }), _jsxs("div", { className: "flex justify-between text-sm text-gray-700", children: [_jsx("span", { children: "Env\u00EDo" }), _jsx("span", { children: shipping === 0 ? "¡Gratis!" : formatPrice(shipping) })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between text-lg font-serif font-bold", children: [_jsx("span", { children: "Total" }), _jsx("span", { className: "text-gray-900", children: formatPrice(total) })] }), _jsx(Button, { className: "w-full bg-gray-900 text-white hover:bg-gray-800 mt-4 h-12", onClick: () => (window.location.href = "/checkout"), children: "Ir al Checkout" })] })] })] })] }));
}
