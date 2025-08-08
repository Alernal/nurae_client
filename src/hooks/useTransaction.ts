import { useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";

type Kind = "tx" | "order";

type TransactionAPIResponse = {
  status: string;
  order?: any;
  transaction?: any; // null cuando kind === "order"
};

export function useTransaction(id?: string, kind: Kind = "tx") {
  return useQuery({
    queryKey: ["transaction", id, kind],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/wompi/transaction/${id}`, {
        params: { kind }, // 👈 importante
      });
      // backend responde { data: { status, order, transaction } }
      return res.data?.data as TransactionAPIResponse;
    },
    staleTime: 30_000,
    retry: false,
    // Solo hacemos polling cuando es transacción real (Wompi),
    // está APPROVED pero aún no hay order asociada.
    refetchInterval: (data) =>
      kind === "tx" && data?.status === "APPROVED" && !data.order ? 5000 : false,
    onSuccess: (data) => {
      const status = data?.status;

      if (kind === "order") {
        // Contraentrega (sin transacción)
        // status sintético: p.ej. "PENDING_VALIDATION"
        if (status) {
          toast.info("🕒 Pedido contraentrega en validación.");
        }
        return;
      }

      // Flujo Wompi (kind === "tx")
      if (status === "APPROVED" && data?.order) {
        toast.success("✅ Pago aprobado. Orden creada con éxito.");
      } else if (["REJECTED", "DECLINED", "ERROR"].includes(status)) {
        toast.error("❌ Pago rechazado o fallido.");
      } else if (status === "APPROVED") {
        toast.info("✅ Pago aprobado. Esperando confirmación de la orden...");
      } else if (status) {
        toast.warning(`⚠️ Estado de transacción: ${status}`);
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Error al consultar.";
      toast.error(message);
    },
    select: (data) => ({
      ...data,
      isPending: kind === "tx" && data?.status === "APPROVED" && !data?.order,
    }),
  });
}
