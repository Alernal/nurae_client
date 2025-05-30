import { useWishlistStore } from "@/stores/useWistlistStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api/client";
import { toast } from "sonner";
import { useEffect } from "react";

export function useWishlist() {
  const {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setWishlist,
    clearWishlist,
  } = useWishlistStore();
  const { isAuthenticated, user } = useAuthStore();

  // 1. Cargar wishlist desde la nube cuando el usuario inicia sesión
  const { refetch: fetchWishlist } = useQuery({
    queryKey: ["wishlist", user?.id],
    enabled: false,
    queryFn: async () => {
      const res = await api.get("/wishlist");
      const ids = (res.data?.data ?? [])
        .map((item: any) => item.product_id)
        .filter((id: any) => typeof id === "number"); // ✅ solo IDs válidos

      setWishlist(ids);
      return ids;
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error al cargar la lista de deseos"
      );
    },
  });

  // 2. Guardar producto en wishlist en la nube
  const saveToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      await api.post(`/wishlist/${productId}`, {});
    },
    onError: (_err, productId) => {
      // 🔄 rollback local
      removeFromWishlist(productId);
      // No mostrar toast si no se quiere notificar visualmente
    },
  });

  // 3. Eliminar producto de wishlist en la nube
  const removeFromWishlistCloud = useMutation({
    mutationFn: async (productId: string) => {
      await api.delete(`/wishlist/${productId}`);
    },
    onError: (_err, productId) => {
      // 🔄 rollback local
      addToWishlist(productId);
      // No mostrar toast si no se quiere notificar visualmente
    },
  });

  // 4. Funciones públicas con chequeo de login
  function add(productId: string) {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar favoritos");
      return;
    }
    addToWishlist(productId);
    saveToWishlist.mutate(productId);
  }

  function remove(productId: string) {
    if (!isAuthenticated) return;
    removeFromWishlist(productId);
    removeFromWishlistCloud.mutate(productId);
  }

  // Limpieza al cerrar sesión
  useEffect(() => {
    if (!isAuthenticated) {
      clearWishlist();
    }
  }, [isAuthenticated]);

  return {
    items,
    add,
    remove,
    isInWishlist,
    fetchWishlist,
  };
}
