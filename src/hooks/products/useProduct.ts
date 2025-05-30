import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useProduct(id?: number) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            if (!id) throw new Error("No product ID provided");
            const res = await api.get(`/products/${id}`);
            return res.data?.data;
        },
        enabled: !!id,
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Error al cargar el producto"
            );
        },
    });
}
