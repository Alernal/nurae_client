import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useOrders() {
    return useQuery({
        queryKey: ["Orders"],
        queryFn: async () => {
            const res = await api.get("/orders");
            return res.data?.data ?? [];
        },
        staleTime: 1000 * 60, // 1 minuto
        keepPreviousData: true,
        onError: (error) => {
            const message = error?.response?.data?.message || "Error al cargar direcciones";
            toast.error(message);
        },
    });
}
