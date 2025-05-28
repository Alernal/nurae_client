import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/router/ProtectedRoute";
import GuestRoute from "@/router/GuestRoute";

import LoginPage from "@/views/auth/login";
import RegisterPage from "@/views/auth/register";
import Home from "@/views/Home";
import WishlistPage from "@/views/wishlist";
import CheckoutPage from "@/views/checkout";
import CartPage from "@/views/cart";

//ADMIN
import AdminLayout from "@/layouts/AdminLayout";

// PRODUCTS
import AdminProductPage from "@/views/admin/products";
import AdminProductCreate from "@/views/admin/products/create";
import AboutPage from "@/views/about";

export function Router() {
  return (
    <Routes>
      {/* Rutas solo para NO autenticados */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Layout general */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />

        {/* Rutas solo para autenticados */}
        <Route element={<ProtectedRoute />}>
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="products" element={<AdminProductPage />} />
          <Route path="products/create" element={<AdminProductCreate />} />
        </Route>
      </Route>
    </Routes>
  );
}
