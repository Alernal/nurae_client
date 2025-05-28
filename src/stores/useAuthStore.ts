import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,

      login: (token: string) =>
        set(() => ({
          isAuthenticated: true,
          token,
        })),

      logout: () =>
        set(() => ({
          isAuthenticated: false,
          token: null,
        })),

      reset: () =>
        set(() => ({
          isAuthenticated: false,
          token: null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
)
