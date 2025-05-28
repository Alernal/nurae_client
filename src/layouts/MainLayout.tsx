import { Outlet, useLocation } from 'react-router-dom'
import { WishlistProvider } from "@/providers/wishlist-provider"
import { CartProvider } from '@/providers/cart-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useEffect } from "react"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [pathname])

  return null
}

export default function MainLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}
