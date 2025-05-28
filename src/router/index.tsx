import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/views/Home";
import Blog from "@/views/blog";
import About from "@/views/about";
import Contact from "@/views/contact";

import NewPage from "@/views/new";
import BestsellersPage from "@/views/bestsellers";
import CartPage from "@/views/cart";
import CheckoutPage from "@/views/checkout";
import WishlistPage from "@/views/wishlist";

import Collections from "@/views/collections";
import NecklacesPage from "@/views/collections/necklaces";
import EarringsPage from "@/views/collections/earrings";
import BraceletsPage from "@/views/collections/bracelets";
import RingsPage from "@/views/collections/rings";

import ProductPage from "@/views/products";
import LoginPage from "@/views/auth/login";
import RegisterPage from "@/views/auth/register";

export function Router() {
  return (
    <Routes>
      {/* LOGIN & REGISTER */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Layout con Header y Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="new" element={<NewPage />} />
        <Route path="bestsellers" element={<BestsellersPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="wishlist" element={<WishlistPage />} />

        <Route path="collections" element={<Collections />} />
        <Route path="collections/necklaces" element={<NecklacesPage />} />
        <Route path="collections/earrings" element={<EarringsPage />} />
        <Route path="collections/bracelets" element={<BraceletsPage />} />
        <Route path="collections/rings" element={<RingsPage />} />

        <Route path="/products/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}
