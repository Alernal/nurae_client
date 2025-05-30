import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

interface ChangePasswordPayload {
  current: string;
  new: string;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordPayload) => {
      const res = await api.post("/user/change-password", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al cambiar la contraseña";
      toast.error(message);
    },
  });
}
