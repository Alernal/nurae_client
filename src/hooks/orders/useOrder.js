import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useOrder(id) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            if (!id)
                return null;
            const response = await api.get(`/orders/${id}`);
            return response.data?.data ?? null;
        },
        enabled: !!id, // solo ejecuta si hay ID
        staleTime: 1000 * 60, // 1 minuto
        onError: (error) => {
            const message = error?.response?.data?.message || "Error al cargar la orden";
            toast.error(message);
        },
    });
}
