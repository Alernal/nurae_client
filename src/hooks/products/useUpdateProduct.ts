import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/api/client"
import { toast } from "sonner"
import type { CreateProductFormValues } from "@/schemas/products/createProductSchema"

export function useUpdateProduct(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateProductFormValues) => {
      const res = await api.patch(`/products/${id}`, {
        ...data,
        price: parseFloat(data.price),
        original_price: data.original_price ? parseFloat(data.original_price) : null,
        stock_count: parseInt(data.stock_count, 10),
      })
      return res.data
    },

    onSuccess: () => {
      toast.success("Producto actualizado correctamente")
      queryClient.invalidateQueries(["products"])
      queryClient.invalidateQueries(["product", id])
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error al actualizar el producto")
    },
  })
}
