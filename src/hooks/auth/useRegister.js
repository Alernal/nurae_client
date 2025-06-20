import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";
export function useRegister() {
    const loginStore = useAuthStore((state) => state.login);
    return useMutation({
        mutationFn: async (data) => {
            const res = await api.post("/register", data);
            return res.data;
        },
        onSuccess: (data) => {
            const { user, token } = data.data;
            loginStore(token, user);
            toast.success("Registro exitoso");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Error al registrar usuario";
            toast.error(message);
        },
    });
}
