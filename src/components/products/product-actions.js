import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuHeart, LuShoppingCart, LuMinus, LuPlus } from "react-icons/lu";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner"; // Asegúrate de importar esto si usas toast
import { useState } from "react";
export function ProductActions({ product, quantity, onQuantityChange, }) {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { items, addToCart, updateQuantity } = useCart();
    const { add, remove, isInWishlist } = useWishlist();
    const cartItem = items.find((item) => item.productId === product.id);
    const quantityInCart = cartItem?.quantity || 0;
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= product.stock_count) {
            onQuantityChange(newQuantity);
        }
    };
    const handleAddToCart = async () => {
        const totalAfterAdd = quantityInCart + quantity;
        if (totalAfterAdd > product.stock_count) {
            toast.error(`Solo hay ${product.stock_count} unidades disponibles`);
            return;
        }
        setIsAddingToCart(true);
        try {
            if (cartItem) {
                updateQuantity(product.id, totalAfterAdd);
            }
            else {
                addToCart(product.id, quantity);
            }
        }
        finally {
            setIsAddingToCart(false);
        }
    };
    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            remove(product.id);
        }
        else {
            add(product.id);
        }
    };
    return (_jsxs("div", { className: "space-y-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "text-sm font-medium text-gray-700", children: "Cantidad" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center border border-gray-300 rounded-lg", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10 rounded-r-none", onClick: () => handleQuantityChange(quantity - 1), disabled: quantity <= 1, children: _jsx(LuMinus, { className: "h-4 w-4" }) }), _jsx(Input, { type: "number", value: quantity, onChange: (e) => handleQuantityChange(Number.parseInt(e.target.value) || 1), className: "w-16 text-center border-0 border-l border-r border-gray-300 rounded-none focus-visible:ring-0", min: "1", max: product.stock_count }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10 rounded-l-none", onClick: () => handleQuantityChange(quantity + 1), disabled: quantity >= product.stock_count, children: _jsx(LuPlus, { className: "h-4 w-4" }) })] }), _jsxs("span", { className: "text-sm text-muted-foreground", children: [product.stock_count, " disponibles"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { size: "lg", className: "w-full h-12 text-base border font-semibold", onClick: handleAddToCart, disabled: !product.in_stock || isAddingToCart || !!cartItem, children: [_jsx(LuShoppingCart, { className: "w-5 h-5 mr-2" }), isAddingToCart
                                ? "Agregando..."
                                : cartItem
                                    ? "Ya está en el carrito"
                                    : "Agregar al Carrito"] }), _jsxs(Button, { variant: "outline", size: "lg", className: "w-full h-12 text-base font-semibold", onClick: toggleWishlist, children: [_jsx(LuHeart, { className: `w-5 h-5 mr-2 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}` }), isInWishlist(product.id) ? "En Favoritos" : "Agregar a Favoritos"] })] }), product.stock_count <= 3 && product.in_stock && (_jsx("div", { className: "p-3 bg-orange-50 border border-orange-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-orange-800 font-medium", children: ["\u00A1\u00DAltimas ", product.stock_count, " piezas disponibles!"] }) }))] }));
}
