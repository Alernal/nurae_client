import { createContext, useContext, useState, type ReactNode } from "react"

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  isInWishlist: (id: number) => boolean
  itemCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const addItem = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
