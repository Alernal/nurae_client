import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useCartStore = create()(persist((set, get) => ({
    items: [],
    hasHydrated: false,
    addToCart: (productId, quantity = 1) => {
        const items = get().items;
        const existing = items.find(item => item.productId === productId);
        if (existing) {
            set({
                items: items.map(item => item.productId === productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item),
            });
            return false;
        }
        else {
            set({ items: [...items, { productId, quantity }] });
            return true;
        }
    },
    removeFromCart: (productId) => {
        set({ items: get().items.filter(item => item.productId !== productId) });
    },
    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(productId);
            return;
        }
        set({
            items: get().items.map(item => item.productId === productId ? { ...item, quantity } : item),
        });
    },
    clearCart: () => {
        set({ items: [] });
    },
    setCart: (items) => {
        set({ items });
    },
    getQuantity: (productId) => {
        return get().items.find(item => item.productId === productId)?.quantity ?? 0;
    },
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
        if (state) {
            set({ hasHydrated: true });
        }
    },
}));
