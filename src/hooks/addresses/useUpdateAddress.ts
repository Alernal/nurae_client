import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import type { UpdateAddressFormValues } from "@/schemas/addresses/updateAddressSchema";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateAddressFormValues;
    }) => {
      const res = await api.patch(`/addresses/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Dirección actualizada correctamente");
      queryClient.invalidateQueries(["addresses"]);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al actualizar la dirección";
      toast.error(message);
    },
  });
}
