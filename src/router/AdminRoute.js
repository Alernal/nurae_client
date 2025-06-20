import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
export default function AdminRoute() {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated)
        return _jsx(Navigate, { to: "/login", replace: true });
    if (user?.role !== "admin")
        return _jsx(Navigate, { to: "/", replace: true });
    return _jsx(Outlet, {});
}
