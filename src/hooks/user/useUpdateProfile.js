import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";
export function useUpdateProfile() {
    const updateUser = useAuthStore((state) => state.updateUser);
    return useMutation({
        mutationFn: async (data) => {
            const res = await api.patch("/user", data);
            return res.data;
        },
        onSuccess: (data) => {
            updateUser(data.data);
            toast.success("Perfil actualizado correctamente");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Error al actualizar el perfil";
            toast.error(message);
        },
    });
}
