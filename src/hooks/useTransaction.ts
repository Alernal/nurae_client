import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useTransaction(transactionId?: string) {
  return useQuery({
    queryKey: ["transaction", transactionId],
    enabled: !!transactionId,
    queryFn: async () => {
      const res = await api.get(`/wompi/transaction/${transactionId}`);
      return res.data?.data; // 👈 Aquí va la corrección
    },
    staleTime: 1000 * 30,
    retry: false,
    onSuccess: (data) => {
      const status = data?.status;

      if (status === "APPROVED") {
        toast.success("✅ Pago aprobado. Orden creada con éxito.");
      } else if (["REJECTED", "DECLINED", "ERROR"].includes(status)) {
        toast.error("❌ Pago rechazado o fallido.");
      } else {
        toast.warning(`⚠️ Estado de transacción: ${status}`);
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al consultar la transacción.";
      toast.error(message);
    },
  });
}
