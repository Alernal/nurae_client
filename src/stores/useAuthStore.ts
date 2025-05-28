import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isTokenExpired } from "@/utils/jwt";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,

      login: (token: string) => {
        if (isTokenExpired(token)) {
          console.warn("Token expirado, no se almacenará.");
          return;
        }

        set(() => ({
          isAuthenticated: true,
          token,
        }));
      },

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
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        if (state.token && isTokenExpired(state.token)) {
          return {
            isAuthenticated: false,
            token: null,
          };
        }

        return {
          isAuthenticated: state.isAuthenticated,
          token: state.token,
        };
      },
    }
  )
);
