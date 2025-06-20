import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            await api.delete(`/products/${id}`);
        },
        onSuccess: () => {
            toast.success("Producto eliminado correctamente");
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Error al eliminar el producto");
        },
    });
}
