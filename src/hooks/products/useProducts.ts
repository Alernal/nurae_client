import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

type Filters = {
  categories?: string[];
  materials?: string[];
  price_min?: number;
  price_max?: number;
  sort?: string;
  page?: number;
  search?: string;  // Nuevo campo de búsqueda
};

export function useProducts(filters: Filters = {}) {
  const hasFilters =
    filters.categories?.length ||
    filters.materials?.length ||
    filters.price_min !== undefined ||
    filters.price_max !== undefined ||
    filters.sort ||
    filters.page !== undefined ||
    filters.search !== undefined; // Se incluye el filtro de búsqueda

  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params: Record<string, any> = {};
      if (filters.categories) params.category = filters.categories;
      if (filters.materials) params.material = filters.materials;
      if (filters.price_min !== undefined) params.price_min = filters.price_min;
      if (filters.price_max !== undefined) params.price_max = filters.price_max;
      if (filters.sort) params.sort = filters.sort;
      if (filters.page !== undefined) params.page = filters.page;
      if (filters.search) params.search = filters.search;  // Se agrega el campo de búsqueda

      const res = await api.get("/products", { params });

      // ⬇️ Ajuste inteligente según el caso
      const raw = res.data?.data;
      return hasFilters ? raw : raw?.data || [];
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
