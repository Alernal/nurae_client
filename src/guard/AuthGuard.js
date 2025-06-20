import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { isTokenExpired } from "@/utils/jwt";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export function AuthGuard() {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token)
            return;
        if (isTokenExpired(token)) {
            logout();
            toast.warning("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
            navigate("/login");
        }
    }, [token, logout, navigate]);
    return null;
}
