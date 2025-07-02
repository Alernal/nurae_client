import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

type OrderFilters = {
  search?: string;
};

export function useOrders(filters: OrderFilters = {}) {
  const hasFilters = filters.search !== undefined;

  return useQuery({
    queryKey: ["Orders", filters],
    queryFn: async () => {
      const params: Record<string, any> = {};
      if (filters.search) params.search = filters.search;

      const res = await api.get("/orders", { params });

      const raw = res.data?.data;
      return hasFilters ? raw : raw || [];
    },
    staleTime: 1000 * 60, // 1 minuto
    keepPreviousData: true,
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al cargar órdenes";
      toast.error(message);
    },
  });
}
