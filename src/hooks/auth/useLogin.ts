import { useMutation } from "@tanstack/react-query"
import api from "@/api/client"
import { useAuthStore } from "@/stores/useAuthStore"
import { toast } from "sonner"
import type { LoginFormValues } from "@/schemas/auth-schema"

export function useLogin() {
  const loginStore = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await api.post("/login", data)
      return res.data
    },
    onSuccess: (data) => {
      loginStore(data.data.token)
      toast.success("Inicio de sesión exitoso")
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error inesperado al iniciar sesión"
      toast.error(message)
    },
  })
}
