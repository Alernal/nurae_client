import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useByIds(ids: number[]) {
  return useQuery({
    queryKey: ["products-by-ids", ids],
    queryFn: async () => {
      if (!ids.length) return [];

      const res = await api.get("/products/by-ids", {
        params: {
          ids,
        },
      });

      return res.data?.data || [];
    },
    enabled: ids.length > 0,
    staleTime: 1000 * 120, // 1 minuto
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error al cargar los productos del carrito"
      );
    },
  });
}
