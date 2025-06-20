import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
export default function GuestRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? _jsx(Navigate, { to: "/", replace: true }) : _jsx(Outlet, {});
}
