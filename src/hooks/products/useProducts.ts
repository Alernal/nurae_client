import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data?.data ?? [];
    },
    staleTime: 1000 * 60,
    keepPreviousData: true,
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al cargar productos";
      toast.error(message);
    },
  });
}
