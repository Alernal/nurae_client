import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

type GeneratePaymentPayload = {
  subtotal: number;
  iva: number;
  shipping: number;
  total: number;
};

type GeneratePaymentResponse = {
  url: string;
  payment_link_id: string;
  expires_at: string;
};

export function useGeneratePaymentLink() {
  return useMutation<GeneratePaymentResponse, any, GeneratePaymentPayload>({
    mutationFn: async (payload) => {
      const res = await api.post("/generate-link", payload);
      return res.data;
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message || "Error al generar el enlace de pago";
      toast.error(message);
    },
  });
}
