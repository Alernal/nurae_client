import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await api.get(`/user/${id}`);
      return res.data?.data;
    },
    enabled: !!id, // solo consulta si hay id válido
    staleTime: 1000 * 60, // 1 minuto
    keepPreviousData: true,
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al cargar la información del usuario";
      toast.error(message);
    },
  });
}
