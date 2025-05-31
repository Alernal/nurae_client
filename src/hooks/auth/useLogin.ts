import { useMutation } from "@tanstack/react-query";
import api from "@/api/client";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import type { LoginFormValues } from "@/schemas/auth-schema";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

export function useLogin() {
  const loginStore = useAuthStore((state) => state.login);
  const { fetchWishlist } = useWishlist();
  const { syncLocalCartToBackendOnce } = useCart();

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await api.post("/login", data);
      return res.data;
    },
    onSuccess: async (data) => {
      const { token, user } = data.data;

      loginStore(token, user);

      toast.success("Inicio de sesión exitoso");

      try {
        await Promise.all([
          fetchWishlist(),
          syncLocalCartToBackendOnce(),
        ]);
      } catch (e) {
        console.error("❌ Error post-login:", e);
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Error inesperado al iniciar sesión";
      toast.error(message);
    },
  });
}
