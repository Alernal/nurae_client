import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ data, images, }) => {
            const formData = new FormData();
            // Campos que requieren conversión manual
            formData.append("in_stock", data.in_stock ? "1" : "0");
            formData.append("price", parseFloat(data.price).toString());
            formData.append("original_price", data.original_price ? parseFloat(data.original_price).toString() : "");
            formData.append("stock_count", parseInt(data.stock_count, 10).toString());
            // Otros campos
            formData.append("slug", data.slug);
            formData.append("name", data.name);
            formData.append("size", data.size || "");
            formData.append("material", data.material || "");
            formData.append("category", data.category || "");
            formData.append("description", data.description || "");
            // Imágenes
            images.forEach((image) => {
                formData.append("images[]", image);
            });
            const res = await api.post("/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Producto creado correctamente");
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Error al crear el producto";
            toast.error(message);
        },
    });
}
