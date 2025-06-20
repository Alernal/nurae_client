import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import CartPage from "@/views/cart";
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
import ClientOrders from "@/views/client/orders";
import AdminOrders from "@/views/admin/orders";
import AdminUsers from "@/views/admin/users";
import CheckoutResponsePage from "@/views/checkout/response";
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
export function Router() {
    return (_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(GuestRoute, {}), children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) })] }), _jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "blog", element: _jsx(BlogPage, {}) }), _jsx(Route, { path: "contact", element: _jsx(ContactPage, {}) }), _jsx(Route, { path: "new", element: _jsx(NewPage, {}) }), _jsx(Route, { path: "bestsellers", element: _jsx(BestsellersPage, {}) }), _jsx(Route, { path: "collections", element: _jsx(CollectionsPage, {}) }), _jsx(Route, { path: "products/:id", element: _jsx(ProductPage, {}) }), _jsx(Route, { path: "faq", element: _jsx(FAQPage, {}) }), _jsx(Route, { path: "shipping", element: _jsx(ShippingPage, {}) }), _jsx(Route, { path: "returns", element: _jsx(ReturnsPage, {}) }), _jsx(Route, { path: "care", element: _jsx(CarePage, {}) }), _jsx(Route, { path: "careers", element: _jsx(CareersPage, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "wishlist", element: _jsx(WishlistPage, {}) }), _jsx(Route, { path: "checkout", element: _jsx(CheckoutPage, {}) }), _jsx(Route, { path: "checkout/response", element: _jsx(CheckoutResponsePage, {}) })] })] }), _jsx(Route, { path: "client", element: _jsx(ClientRoute, {}), children: _jsxs(Route, { element: _jsx(ClientLayout, {}), children: [_jsx(Route, { path: "profile", element: _jsx(ClientProfilePage, {}) }), _jsx(Route, { path: "addresses", element: _jsx(ClientAddresses, {}) }), _jsx(Route, { path: "orders", element: _jsx(ClientOrders, {}) })] }) }), _jsx(Route, { path: "admin", element: _jsx(AdminLayout, {}), children: _jsxs(Route, { element: _jsx(AdminRoute, {}), children: [_jsx(Route, { path: "dashboard", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "products", element: _jsx(AdminProductPage, {}) }), _jsx(Route, { path: "products/create", element: _jsx(AdminProductCreate, {}) }), _jsx(Route, { path: "products/:id/edit", element: _jsx(AdminProductUpdate, {}) }), _jsx(Route, { path: "orders", element: _jsx(AdminOrders, {}) }), _jsx(Route, { path: "users", element: _jsx(AdminUsers, {}) })] }) })] }));
}
