import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export const useWishlistStore = create()(persist((set, get) => ({
    items: [],
    addToWishlist: (id) => {
        if (!get().items.includes(id)) {
            set({ items: [...get().items, id] });
        }
    },
    removeFromWishlist: (id) => {
        set({ items: get().items.filter((item) => item !== id) });
    },
    isInWishlist: (id) => {
        return get().items.includes(id);
    },
    setWishlist: (ids) => {
        set({ items: ids });
    },
    clearWishlist: () => {
        set({ items: [] });
    },
}), {
    name: "wishlist-storage",
    storage: createJSONStorage(() => localStorage),
}));
