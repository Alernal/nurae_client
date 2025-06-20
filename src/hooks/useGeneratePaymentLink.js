import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useGeneratePaymentLink() {
    return useMutation({
        mutationFn: async (payload) => {
            const res = await api.post("/generate-link", payload);
            return res.data;
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "Error al generar el enlace de pago";
            toast.error(message);
        },
    });
}
