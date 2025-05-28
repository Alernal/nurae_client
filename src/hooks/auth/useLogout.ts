import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      await api.post("/logout");
    },
    onSuccess: () => {
      logout();
      toast.success("Sesión cerrada correctamente");
    },
    onError: () => {
      toast.error("No se pudo cerrar sesión correctamente");
      logout();
    },
  });
}
