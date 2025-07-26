import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

export function useTransaction(transactionId?: string) {
  return useQuery({
    queryKey: ["transaction", transactionId],
    enabled: !!transactionId,
    queryFn: async () => {
      const res = await api.get(`/wompi/transaction/${transactionId}`);
      return res.data?.data;
    },
    staleTime: 1000 * 30,
    retry: false,
    refetchInterval: (data) =>
      data?.status === "APPROVED" && !data.order ? 5000 : false,
    onSuccess: (data) => {
      const status = data?.status;

      if (status === "APPROVED" && data?.order) {
        toast.success("✅ Pago aprobado. Orden creada con éxito.");
      } else if (["REJECTED", "DECLINED", "ERROR"].includes(status)) {
        toast.error("❌ Pago rechazado o fallido.");
      } else if (status === "APPROVED") {
        toast.info("✅ Pago aprobado. Esperando confirmación de la orden...");
      } else {
        toast.warning(`⚠️ Estado de transacción: ${status}`);
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Error al consultar la transacción.";
      toast.error(message);
    },
    select: (data) => {
      return {
        ...data,
        isPending:
          data.status === "APPROVED" && !data.order, // Aprobado pero orden aún no creada
      };
    },
  });
}
