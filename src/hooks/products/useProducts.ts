import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import stringify from "json-stable-stringify";

type Filters = {
  categories?: string[];
  materials?: string[];
  price_min?: number;
  price_max?: number;
  sort?: string;
  page?: number;
  search?: string;
  paginate?: boolean;
};

export function useProducts(filters: Filters = {}) {
  const hasFilters =
    !!filters.categories?.length ||
    !!filters.materials?.length ||
    filters.price_min !== undefined ||
    filters.price_max !== undefined ||
    !!filters.sort ||
    filters.page !== undefined ||
    !!filters.search ||
    filters.paginate !== undefined;

  // Query Key estable y serializada
  const queryKey = ["products", stringify(filters)];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params: Record<string, any> = {};

      if (filters.categories) params.category = filters.categories;
      if (filters.materials) params.material = filters.materials;
      if (filters.price_min !== undefined) params.price_min = filters.price_min;
      if (filters.price_max !== undefined) params.price_max = filters.price_max;
      if (filters.sort) params.sort = filters.sort;
      if (filters.page !== undefined) params.page = filters.page;
      if (filters.search) params.search = filters.search;
      if (filters.paginate !== undefined) params.paginate = filters.paginate;

      const res = await api.get("/products", { params });

      const raw = res.data?.data;

      return hasFilters ? raw : raw?.data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 60, // 1 hora
    keepPreviousData: true,
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al cargar productos";
      toast.error(message);
    },
  });
}
