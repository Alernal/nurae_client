import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useCreateOrderHistory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ order_id, ...data }) => {
            const res = await api.post(`/orders/${order_id}/status`, data);
            return res.data;
        },
        onSuccess: (_, variables) => {
            toast.success("Estado actualizado correctamente.");
            queryClient.invalidateQueries(["order", String(variables.order_id)]);
        },
        onError: (error) => {
            const message = error?.response?.data?.message ||
                "Error al actualizar el estado de la orden";
            toast.error(message);
        },
    });
}
