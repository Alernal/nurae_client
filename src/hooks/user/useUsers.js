import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await api.get("/users");
            return res.data?.data ?? [];
        },
        staleTime: 1000 * 60, // 1 minuto
        keepPreviousData: true,
        onError: (error) => {
            const message = error?.response?.data?.message || "Error al cargar los usuarios";
            toast.error(message);
        },
    });
}
