import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useResendVerification() {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await api.post("/email/resend", { email });
      return res.data;
    },
    onSuccess: (data) => {
      const message = data?.message || "Correo de verificación reenviado.";
      toast.success(message);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "No se pudo reenviar el correo de verificación.";
      toast.error(message);
    },
  });
}
