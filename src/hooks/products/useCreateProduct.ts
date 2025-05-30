import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/api/client"
import { toast } from "sonner"
import type { CreateProductFormValues } from "@/schemas/products/createProductSchema"

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data, images }: { data: CreateProductFormValues; images: File[] }) => {
      // 1. Crear producto
      const productRes = await api.post("/products", {
        ...data,
        price: parseFloat(data.price),
        original_price: data.original_price ? parseFloat(data.original_price) : null,
        stock_count: parseInt(data.stock_count, 10),
      })

      const productId = productRes.data.data.product.id

      // 2. Si hay imágenes, subirlas
      if (images && images.length > 0) {
        const formData = new FormData()
        images.forEach((image) => {
          formData.append("images[]", image)
        })

        await api.post(`/products/${productId}/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      }

      return productRes.data
    },

    onSuccess: () => {
      toast.success("Producto creado correctamente")
      queryClient.invalidateQueries(["products"])
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al crear el producto"
      toast.error(message)
    },
  })
}
