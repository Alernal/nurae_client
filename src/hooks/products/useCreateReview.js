import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useCreateReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data) => {
            const res = await api.post("/reviews", data);
            return res.data?.data;
        },
        onSuccess: (_, variables) => {
            toast.success("¡Reseña enviada correctamente!");
            // Actualiza caché del producto para reflejar nuevas reviews
            queryClient.invalidateQueries(["product", variables.product_id]);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Error al enviar la reseña");
        },
    });
}
