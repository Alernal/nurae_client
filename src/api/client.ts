import axios from "axios"
import { useAuthStore } from "@/stores/useAuthStore"

const api = axios.create({
  baseURL: 'https://api.nurae.com.co/api',
})

// Interceptor para agregar token automáticamente si existe
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
