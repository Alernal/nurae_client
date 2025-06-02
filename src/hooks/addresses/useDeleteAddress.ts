import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/addresses/${id}`);
    },
    onSuccess: () => {
      toast.success("Dirección eliminada correctamente");
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error al eliminar la dirección");
    },
  });
}
