import axios from "axios"
import { useAuthStore } from "@/stores/useAuthStore"

const api = axios.create({
  baseURL: 'https://nurae-api.alernal.com.co/api',
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
