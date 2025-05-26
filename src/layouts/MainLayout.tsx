import { Outlet } from 'react-router-dom'
import { WishlistProvider } from "@/providers/wishlist-provider"
import { CartProvider } from '@/providers/cart-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function MainLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
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
