import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useCart() {
    const { items, hasHydrated, addToCart: addLocal, removeFromCart: removeLocal, updateQuantity: updateLocal, clearCart, setCart, getQuantity, } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    // ➕ Sincronizar nuevo item con backend
    const syncItem = useMutation({
        mutationFn: async (item) => {
            return api.post(`/cart/${item.productId}`, {
                quantity: item.quantity,
            });
        },
        onError: () => toast.error("Error al sincronizar el carrito"),
    });
    // ❌ Eliminar item del backend
    const removeItemCloud = useMutation({
        mutationFn: async (productId) => {
            return api.delete(`/cart/${productId}`);
        },
        onError: () => toast.error("Error al eliminar del carrito"),
    });
    // 🔽 Disminuir cantidad en el backend
    const decrementCloud = useMutation({
        mutationFn: async (productId) => {
            return api.patch(`/cart/${productId}/decrement`);
        },
        onError: () => toast.error("Error al disminuir cantidad"),
    });
    // 🧹 Limpiar todo el carrito del backend
    const clearCloud = useMutation({
        mutationFn: async () => {
            return api.delete("/cart/clear");
        },
        onError: () => toast.error("Error al vaciar el carrito"),
    });
    function addToCart(productId, quantity = 1) {
        addLocal(productId, quantity);
        if (isAuthenticated) {
            syncItem.mutate({ productId, quantity }); // ✅ solo la diferencia real
        }
    }
    function removeFromCart(productId) {
        removeLocal(productId);
        if (isAuthenticated) {
            removeItemCloud.mutate(productId);
        }
    }
    function updateQuantity(productId, quantity) {
        const currentQty = getQuantity(productId);
        updateLocal(productId, quantity);
        if (!isAuthenticated)
            return;
        if (quantity < currentQty) {
            // Se bajó cantidad → llamar decrement API
            decrementCloud.mutate(productId);
        }
        else if (quantity > currentQty) {
            const diff = quantity - currentQty;
            syncItem.mutate({ productId, quantity: diff });
        }
    }
    async function clearCartCloud() {
        clearCart(); // local
        if (isAuthenticated) {
            await clearCloud.mutateAsync(); // backend
        }
    }
    async function syncLocalCartToBackendOnce() {
        try {
            const res = await api.get("/cart");
            const cloudCart = res.data?.data?.map((item) => ({
                productId: item.product_id,
                quantity: item.quantity,
            })) ?? [];
            const cloudMap = new Map();
            cloudCart.forEach((item) => {
                cloudMap.set(item.productId, item.quantity);
            });
            const toSync = items.filter((localItem) => {
                const cloudQty = cloudMap.get(localItem.productId) ?? 0;
                return localItem.quantity > cloudQty;
            });
            await Promise.all(toSync.map((item) => api.post(`/cart/${item.productId}`, { quantity: item.quantity })));
            const mergedMap = {};
            [...cloudCart, ...items].forEach(({ productId, quantity }) => {
                mergedMap[productId] = Math.max(mergedMap[productId] || 0, quantity);
            });
            const mergedCart = Object.entries(mergedMap).map(([id, qty]) => ({
                productId: Number(id),
                quantity: qty,
            }));
            setCart(mergedCart);
        }
        catch (e) {
            console.error("❌ Error sincronizando carrito:", e);
        }
    }
    return {
        items,
        hasHydrated,
        addToCart,
        removeFromCart,
        updateQuantity,
        getQuantity,
        clearCart,
        clearCartCloud,
        setCart,
        syncLocalCartToBackendOnce,
    };
}
