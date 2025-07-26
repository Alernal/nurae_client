import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import { isCartBlocked } from "@/lib/cartLock";

type CartItem = {
  productId: number;
  quantity: number;
};

export function useCart() {
  const {
    items,
    hasHydrated,
    addToCart: addLocal,
    removeFromCart: removeLocal,
    updateQuantity: updateLocal,
    clearCart,
    setCart,
    getQuantity,
  } = useCartStore();

  const { isAuthenticated } = useAuthStore();

  // ➕ Sincronizar nuevo item con backend
  const syncItem = useMutation({
    mutationFn: async (item: { productId: number; quantity: number }) => {
      return api.post(`/cart/${item.productId}`, {
        quantity: item.quantity,
      });
    },
    onSuccess: refetchCartFromCloud,
    onError: (error: any) => {
      const message = error?.response?.data?.message;

      if (
        error?.response?.status === 403 &&
        message?.includes("carrito está bloqueado")
      ) {
        toast.warning(message);
      } else {
        toast.error("Error al sincronizar el carrito");
      }
    },
  });

  // ❌ Eliminar item del backend
  const removeItemCloud = useMutation({
    mutationFn: async (productId: number) => {
      return api.delete(`/cart/${productId}`);
    },
    onSuccess: refetchCartFromCloud,
    onError: (error: any) => {
      const message = error?.response?.data?.message;

      if (
        error?.response?.status === 403 &&
        message?.includes("carrito está bloqueado")
      ) {
        toast.warning(message);
      } else {
        toast.error("Error al sincronizar el carrito");
      }
    },
  });

  // 🔽 Disminuir cantidad en el backend
  const decrementCloud = useMutation({
    mutationFn: async (productId: number) => {
      return api.patch(`/cart/${productId}/decrement`);
    },
    onSuccess: refetchCartFromCloud,
    onError: (error: any) => {
      const message = error?.response?.data?.message;

      if (
        error?.response?.status === 403 &&
        message?.includes("carrito está bloqueado")
      ) {
        toast.warning(message);
      } else {
        toast.error("Error al sincronizar el carrito");
      }
    },
  });

  // 🧹 Limpiar todo el carrito del backend
  const clearCloud = useMutation({
    mutationFn: async () => {
      return api.delete("/cart/clear");
    },
    onSuccess: refetchCartFromCloud,
    onError: (error: any) => {
      const message = error?.response?.data?.message;

      if (
        error?.response?.status === 403 &&
        message?.includes("carrito está bloqueado")
      ) {
        toast.warning(message);
      } else {
        toast.error("Error al sincronizar el carrito");
      }
    },
  });

  function addToCart(productId: number, quantity = 1) {
    if (isCartBlocked()) {
      toast.warning("El carrito está bloqueado por un pago pendiente.");
      return;
    }
    addLocal(productId, quantity);
    if (isAuthenticated) {
      syncItem.mutate({ productId, quantity }); // ✅ solo la diferencia real
    }
  }

  function removeFromCart(productId: number) {
    if (isCartBlocked()) {
      toast.warning("El carrito está bloqueado por un pago pendiente.");
      return;
    }
    removeLocal(productId);
    if (isAuthenticated) {
      removeItemCloud.mutate(productId);
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    if (isCartBlocked()) {
      toast.warning("El carrito está bloqueado por un pago pendiente.");
      return;
    }
    const currentQty = getQuantity(productId);
    updateLocal(productId, quantity);

    if (!isAuthenticated) return;

    if (quantity < currentQty) {
      // Se bajó cantidad → llamar decrement API
      decrementCloud.mutate(productId);
    } else if (quantity > currentQty) {
      const diff = quantity - currentQty;
      syncItem.mutate({ productId, quantity: diff });
    }
  }

  async function clearCartCloud() {
    if (isCartBlocked()) {
      toast.warning("El carrito está bloqueado por un pago pendiente.");
      return;
    }
    clearCart(); // local
    if (isAuthenticated) {
      await clearCloud.mutateAsync(); // backend
    }
  }

  async function syncLocalCartToBackendOnce() {
    try {
      const res = await api.get("/cart");

      const cloudCart: CartItem[] =
        res.data?.data?.map((item: any) => ({
          productId: item.product_id,
          quantity: item.quantity,
        })) ?? [];

      const cloudMap = new Map<number, number>();
      cloudCart.forEach((item) => {
        cloudMap.set(item.productId, item.quantity);
      });

      const toSync: CartItem[] = items.filter((localItem) => {
        const cloudQty = cloudMap.get(localItem.productId) ?? 0;
        return localItem.quantity > cloudQty;
      });

      await Promise.all(
        toSync.map((item) =>
          api.post(`/cart/${item.productId}`, { quantity: item.quantity })
        )
      );

      const mergedMap: Record<number, number> = {};

      [...cloudCart, ...items].forEach(({ productId, quantity }) => {
        mergedMap[productId] = Math.max(mergedMap[productId] || 0, quantity);
      });

      const mergedCart = Object.entries(mergedMap).map(([id, qty]) => ({
        productId: Number(id),
        quantity: qty,
      }));

      setCart(mergedCart);
    } catch (e) {
      console.error("❌ Error sincronizando carrito:", e);
    }
  }

  async function refetchCartFromCloud() {
    try {
      const res = await api.get("/cart");

      const cart: CartItem[] = res.data?.data?.map((item: any) => ({
        productId: item.product_id,
        quantity: item.quantity,
      })) ?? [];

      setCart(cart);
    } catch (e) {
      console.error("Error obteniendo carrito actualizado:", e);
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
    refetchCartFromCloud
  };
}
