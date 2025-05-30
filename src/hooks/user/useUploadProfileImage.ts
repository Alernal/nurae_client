import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuthStore";

export function useUploadProfileImage() {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/user/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      const user = data?.data ?? data;
      updateUser(user);
      toast.success("Imagen de perfil actualizada correctamente.");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error al subir la imagen";
      toast.error(message);
    },
  });
}
