import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";

type GeneratePaymentPayload = {
  shipping_type: "standard" | "contraentrega";
  subtotal: number;
  iva: number;
  shipping: number;
  total: number;
  discount?: number;
  address_id?: string;
  guest?: boolean;
  guest_info?: { name: string; email: string; };
  address?: { state: string; city: string; address: string; };
  items: { id: string; quantity: number }[];
};

type GeneratePaymentResponse = {
  url?: string;
  payment_link_id?: string;
  expires_at?: string;
  order_id?: string;
};

export function useGeneratePaymentLink() {
  return useMutation<GeneratePaymentResponse, any, GeneratePaymentPayload>({
    mutationFn: async (payload) => {
      const res = await api.post("/generate-link", payload);
      return res.data;
    },
  });
}
