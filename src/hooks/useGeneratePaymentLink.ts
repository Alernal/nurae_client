import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";

// useGeneratePaymentLink.ts — CHANGED TYPES
type GeneratePaymentPayload = {
  shipping_type: "standard" | "contraentrega";
  subtotal: number;
  iva: number;
  shipping: number;
  total: number;
  discount?: number;
  address_id?: string;
  guest?: boolean;

  // CHANGED: guest_info ampliado
  guest_info?: {
    name: string;           // nombre de referencia o nombre completo visible
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company?: string;
    document_type: "CC" | "NIT" | "RUC" | "RFC";
    document_number: string;
    fiscal_name?: string;
  };

  // CHANGED: address ampliada
  address?: {
    state: string;          // Departamento
    city: string;
    address: string; // antes "address"
    apartment?: string;
    postal_code?: string;
    country?: string;
    notes?: string;
  };

  items: { id: string | number; quantity: number }[];
};


export function useGeneratePaymentLink() {
  return useMutation<GeneratePaymentResponse, any, GeneratePaymentPayload>({
    mutationFn: async (payload) => {
      const res = await api.post("/generate-link", payload);
      return res.data;
    },
  });
}
