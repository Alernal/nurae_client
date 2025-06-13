import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: number) => {
      const res = await api.patch(`/addresses/${addressId}/default`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Dirección predeterminada actualizada.");
      queryClient.invalidateQueries(["addresses"]);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "No se pudo actualizar la dirección predeterminada.";
      toast.error(message);
    },
  });
}
