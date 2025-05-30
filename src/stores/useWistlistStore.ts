import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type WishlistStore = {
    items: number[]
    addToWishlist: (id: string) => void
    removeFromWishlist: (id: string) => void
    isInWishlist: (id: string) => boolean
    setWishlist: (ids: string[]) => void
    clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToWishlist: (id: string) => {
                if (!get().items.includes(id)) {
                    set({ items: [...get().items, id] })
                }
            },
            removeFromWishlist: (id: string) => {
                set({ items: get().items.filter((item) => item !== id) })
            },
            isInWishlist: (id: string) => {
                return get().items.includes(id)
            },
            setWishlist: (ids: string[]) => {
                set({ items: ids })
            },
            clearWishlist: () => {
                set({ items: [] })
            },
        }),
        {
            name: "wishlist-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
