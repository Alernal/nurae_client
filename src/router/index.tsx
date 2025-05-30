import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/router/ProtectedRoute";
import GuestRoute from "@/router/GuestRoute";

{/* Auth */}
import LoginPage from "@/views/auth/login";
import RegisterPage from "@/views/auth/register";

{/* Publicas */}
import Home from "@/views/Home";
import AboutPage from "@/views/about";
import CartPage from "@/views/cart";

// Privadas
import WishlistPage from "@/views/wishlist";
import CheckoutPage from "@/views/checkout";

//ADMIN ROUTES
import AdminLayout from "@/layouts/AdminLayout";

// PROFILE
import ProfilePage from "@/views/admin/profile";

// PRODUCTS
import AdminProductPage from "@/views/admin/products";
import AdminProductCreate from "@/views/admin/products/create";
import AdminProductUpdate from "@/views/admin/products/update";
import ProductPage from "@/views/products";

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
        {/* Rutas publicas */}
        <Route index element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />

        {/* PRODUCTO */}
        <Route path="products/:id" element={<ProductPage />} />

        {/* Rutas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      {/* Rutas Administrativas */}
      <Route path="admin" element={<AdminLayout />}>
        <Route element={<ProtectedRoute />}>

          <Route path="profile" element={<ProfilePage />} />

          {/* Rutas de productos */}
          <Route path="products" element={<AdminProductPage />} />
          <Route path="products/create" element={<AdminProductCreate />} />
          <Route path="products/:id/edit" element={<AdminProductUpdate />} />
        </Route>
      </Route>
    </Routes>
  );
}
