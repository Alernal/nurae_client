import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isTokenExpired } from "@/utils/jwt";
import { queryClient } from "@/main";

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  gender?: string;
  role: string;
  is_verified: boolean;
  profile_image_url?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  reset: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      login: (token: string, user: User) => {
        if (isTokenExpired(token)) {
          console.warn("Token expirado, no se almacenará.");
          return;
        }

        set(() => ({
          isAuthenticated: true,
          token,
          user,
        }));
      },

      logout: () => {
        queryClient.removeQueries(["addresses"]);
        set(() => ({
          isAuthenticated: false,
          token: null,
          user: null,
        }));
      },

      reset: () =>
        set(() => ({
          isAuthenticated: false,
          token: null,
          user: null,
        })),

      updateUser: (user) =>
        set(() => ({
          user,
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
            user: null,
          };
        }

        return {
          isAuthenticated: state.isAuthenticated,
          token: state.token,
          user: state.user,
        };
      },
    }
  )
);
