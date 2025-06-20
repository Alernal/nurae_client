import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isTokenExpired } from "@/utils/jwt";
export const useAuthStore = create()(persist((set) => ({
    isAuthenticated: false,
    token: null,
    user: null,
    login: (token, user) => {
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
    logout: () => set(() => ({
        isAuthenticated: false,
        token: null,
        user: null,
    })),
    reset: () => set(() => ({
        isAuthenticated: false,
        token: null,
        user: null,
    })),
    updateUser: (user) => set(() => ({
        user,
    })),
}), {
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
}));
