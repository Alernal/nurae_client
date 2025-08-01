import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ClientLayout from "@/layouts/ClientLayout";

import ProtectedRoute from "@/router/ProtectedRoute";
import GuestRoute from "@/router/GuestRoute";
import AdminRoute from "@/router/AdminRoute";
import ClientRoute from "@/router/ClientRoute";

import LoginPage from "@/views/auth/login";
import RegisterPage from "@/views/auth/register";

import Home from "@/views/Home";
import AboutPage from "@/views/about";
import ProductPage from "@/views/products";
import CollectionsPage from "@/views/collections";

import WishlistPage from "@/views/wishlist";
import CheckoutPage from "@/views/checkout";

/* Admin */
import ProfilePage from "@/views/admin/profile";
import AdminProductPage from "@/views/admin/products";
import AdminProductCreate from "@/views/admin/products/create";
import AdminProductUpdate from "@/views/admin/products/update";

/* Client */
import ClientProfilePage from "@/views/client/profile";
import ClientAddresses from "@/views/client/address";
import ClientOrdersPage from "@/views/client/orders";

import AdminOrders from "@/views/admin/orders";
import AdminUsers from "@/views/admin/users";
import BlogPage from "@/views/blog";
import ContactPage from "@/views/contact";
import NewPage from "@/views/new";
import BestsellersPage from "@/views/bestsellers";
import FAQPage from "@/views/faq";
import ShippingPage from "@/views/shipping";
import ReturnsPage from "@/views/returns";
import CarePage from "@/views/care";
import CareersPage from "@/views/careers";
import AdminDashboard from "@/views/admin/dashboard";
import ClientDashboard from "@/views/client/dashboard";
import BlogPostPage from "@/views/blog/blog";
import ShowProduct from "@/views/admin/products/show";
import ShowUser from "@/views/admin/users/show";
import Terms from "@/views/terms";
import SupportPage from "@/views/support";

export function Router() {
  return (
    <Routes>
      {/* Rutas solo para NO autenticados */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Layout general con rutas públicas */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="new" element={<NewPage />} />
        <Route path="bestsellers" element={<BestsellersPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="returns" element={<ReturnsPage />} />
        <Route path="care" element={<CarePage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="terms" element={<Terms />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>
      </Route>

      {/* Rutas privadas para clientes */}
      <Route path="client" element={<ClientRoute />}>
        <Route element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="profile" element={<ClientProfilePage />} />
          <Route path="addresses" element={<ClientAddresses />} />
          <Route path="orders" element={<ClientOrdersPage />} />
        </Route>
      </Route>

      {/* Rutas privadas administrativas */}
      <Route path="admin" element={<AdminLayout />}>
        <Route element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users/:id" element={<ShowUser />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="products/create" element={<AdminProductCreate />} />
          <Route path="products/:id/edit" element={<AdminProductUpdate />} />
          <Route path="products/:id" element={<ShowProduct />} />

          <Route path="orders" element={<AdminOrders />} />

          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}
