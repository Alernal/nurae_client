import { useMutation } from "@tanstack/react-query"
import api from "@/api/client"
import { toast } from "sonner"
import type { RegisterFormValues } from "@/schemas/auth-schema"
import { useAuthStore } from "@/stores/useAuthStore"

export function useRegister() {
  const loginStore = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const res = await api.post("/register", data)
      return res.data
    },
    onSuccess: (data) => {
      loginStore(data.token)
      toast.success("Registro exitoso")
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al registrar usuario"
      toast.error(message)
    },
  })
}
