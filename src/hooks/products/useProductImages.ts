import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import { productImagesSchema } from "@/schemas/products/productImagesSchema";

export function useProductImages(productId: number) {
  const queryClient = useQueryClient();

  const upload = useMutation({
    mutationFn: async (files: File[]) => {
      const parsed = productImagesSchema.safeParse(files);
      if (!parsed.success) {
        throw new Error(parsed.error.errors[0].message);
      }

      const formData = new FormData();
      parsed.data.forEach((file) => formData.append("images[]", file));

      const res = await api.post(`/products/${productId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.data?.images ?? [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product", productId]);
      toast.success("Imágenes subidas correctamente");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error al subir imágenes");
    },
  });

  const remove = useMutation({
    mutationFn: async (imageId: number) => {
      await api.delete(`/products/${productId}/images/${imageId}`);
      return imageId;
    },
    onSuccess: (imageId) => {
      queryClient.invalidateQueries(["product", productId]);
      toast.success("Imagen eliminada correctamente");
    },
    onError: () => {
      toast.error("Error al eliminar la imagen");
    },
  });

  return {
    uploadImages: upload.mutate,
    deleteImage: remove.mutate,
    isUploading: upload.isLoading,
    isDeleting: remove.isLoading,
  };
}

