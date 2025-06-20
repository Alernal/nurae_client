import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LuShoppingBag, LuPlus, LuMinus, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/products/useProducts";
export function MiniCart() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, updateQuantity, removeFromCart, clearCartCloud, } = useCart();
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
    const formatPrice = (price) => new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(price);
    return (_jsxs(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "relative hover:bg-primary/10 hover:text-primary transition-all", children: [_jsx(LuShoppingBag, { className: "h-5 w-5" }), _jsx("span", { className: "absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold", children: items.length }), _jsx("span", { className: "sr-only", children: "Carrito de compras" })] }) }), _jsxs(SheetContent, { className: "w-full sm:max-w-lg bg-white flex flex-col", children: [_jsx(SheetHeader, { children: _jsxs(SheetTitle, { className: "flex items-center gap-2 text-xl font-serif", children: [_jsx(LuShoppingBag, { className: "h-6 w-6 text-primary" }), "Tu Carrito"] }) }), _jsx("div", { className: "flex-1 flex flex-col gap-6 overflow-y-auto mt-4", children: cartWithDetails.length === 0 ? (_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center space-y-4 text-secondary-500", children: [_jsx(LuShoppingBag, { className: "h-14 w-14 text-secondary-300" }), _jsx("p", { className: "text-lg font-medium", children: "Tu carrito est\u00E1 vac\u00EDo" }), _jsx(Button, { className: "bg-primary text-white hover:bg-primary/90", onClick: () => setIsOpen(false), children: "Explorar productos" })] })) : (_jsx(_Fragment, { children: cartWithDetails.map((item) => {
                                const maxAvailable = item.stock_count ?? 1;
                                const isMaxReached = item.quantity >= maxAvailable;
                                return (_jsxs("div", { className: "flex gap-4 p-4 bg-muted rounded-lg border", children: [_jsx("div", { className: "w-20 h-20 bg-terra-warm/10 rounded overflow-hidden flex-shrink-0", children: _jsx("img", { src: item.images?.[0]?.url
                                                    ? `http://localhost:8000${item.images[0].url}`
                                                    : "/placeholder.svg", alt: item.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1 space-y-1", children: [_jsx("h4", { className: "font-medium text-secondary-800", children: item.name }), _jsxs("div", { className: "text-xs text-secondary-500", children: [_jsxs("p", { children: ["Color: ", item.color] }), _jsxs("p", { children: ["Tama\u00F1o: ", item.size] })] }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", className: "h-7 w-7", onClick: () => updateQuantity(item.productId, item.quantity - 1), disabled: item.quantity <= 1, children: _jsx(LuMinus, { className: "w-4 h-4" }) }), _jsx("div", { className: "min-w-[60px] px-3 py-1.5 border border-gray-300 rounded-lg bg-gray-100 text-center text-sm font-medium text-gray-800 select-none", children: item.quantity }), _jsx(Button, { variant: "outline", size: "icon", className: "h-7 w-7", onClick: () => updateQuantity(item.productId, item.quantity + 1), disabled: isMaxReached, children: _jsx(LuPlus, { className: "w-4 h-4" }) }), _jsxs("span", { className: "text-xs text-gray-500 ml-2", children: ["(", maxAvailable, ") disp."] })] }), _jsxs("div", { className: "text-right space-y-0.5", children: [item.original_price && item.original_price < item.price ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-sm text-gray-400 line-through", children: formatPrice(Number(item.price) * item.quantity) }), _jsx("p", { className: "font-serif font-bold text-primary", children: formatPrice(Number(item.original_price) * item.quantity) })] })) : (_jsx("p", { className: "font-serif font-bold text-primary", children: formatPrice(Number(item.price) * item.quantity) })), _jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive hover:text-destructive/70 p-0", onClick: () => removeFromCart(item.productId), children: _jsx(LuTrash2, { className: "w-4 h-4" }) })] })] })] })] }, item.productId));
                            }) })) }), cartWithDetails.length > 0 && (_jsxs("div", { className: "border-t pt-4 mt-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm text-secondary-700", children: [_jsx("span", { children: "Subtotal" }), _jsx("span", { children: formatPrice(subtotal) })] }), _jsxs("div", { className: "flex justify-between text-sm text-secondary-700", children: [_jsx("span", { children: "Env\u00EDo" }), _jsx("span", { className: shipping === 0 ? "text-green-600 font-medium" : "", children: shipping === 0 ? "¡Gratis!" : formatPrice(shipping) })] }), subtotal < 150000 && (_jsxs("p", { className: "text-xs text-secondary-500", children: ["Agrega ", formatPrice(150000 - subtotal), " m\u00E1s para env\u00EDo gratis"] })), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between font-serif text-lg font-bold", children: [_jsx("span", { children: "Total" }), _jsx("span", { className: "text-primary", children: formatPrice(total) })] }), _jsxs("div", { className: "pt-2 flex flex-col gap-2", children: [_jsx(Link, { to: "/checkout", onClick: () => setIsOpen(false), children: _jsx(Button, { className: "w-full border border-gray-400 bg-primary text-black hover:bg-gray-400/90 h-12 text-lg font-medium", children: "Proceder al Checkout" }) }), _jsx(Link, { to: "/cart", onClick: () => setIsOpen(false), children: _jsx(Button, { variant: "outline", className: "w-full border-gray-400 hover:bg-gray-400/90", children: "Ver Carrito Completo" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-red-600 border hover:text-red-700 w-full", onClick: clearCartCloud, children: "Vaciar carrito" })] })] }))] })] }));
}
