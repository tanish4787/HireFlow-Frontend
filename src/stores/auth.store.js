import { create } from "zustand";

const TOKEN_KEY = "hireflow_token";

export const useAuthStore = create((set) => {
  const existing = sessionStorage.getItem(TOKEN_KEY);

  console.log("[AUTH STORE INIT]", existing);

  return {
    token: existing,
    isAuthenticated: !!existing,

    login: (token) => {
      console.log("[AUTH LOGIN CALLED]", token);
      sessionStorage.setItem(TOKEN_KEY, token);
      set({ token, isAuthenticated: true });
    },

    logout: () => {
      console.log("[AUTH LOGOUT]");
      sessionStorage.removeItem(TOKEN_KEY);
      set({ token: null, isAuthenticated: false });
    },
  };
});
