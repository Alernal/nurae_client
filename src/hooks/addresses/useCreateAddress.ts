import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import type { AddressFormValues } from "@/schemas/addresses/createAddressSchema";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddressFormValues) => {
      const res = await api.post("/addresses", data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Dirección creada correctamente");
      queryClient.invalidateQueries(["addresses"]);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al crear la dirección";
      toast.error(message);
    },
  });
}
