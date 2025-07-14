import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useProductSlug(slug?: string) {
    return useQuery({
        queryKey: ["product-slug", slug],
        queryFn: async () => {
            if (!slug) throw new Error("No product slug provided");
            const res = await api.get(`/products/slug/${slug}`);
            return res.data?.data;
        },
        enabled: !!slug,
        staleTime: 1000 * 60,
        keepPreviousData: true,
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Error al cargar el producto"
            );
        },
    });
}
