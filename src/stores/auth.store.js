import { create } from "zustand";

const TOKEN_KEY = "hireflow_token";

export const useAuthStore = create((set) => {
  const existing = sessionStorage.getItem(TOKEN_KEY);

  "[AUTH STORE INIT]", existing;

  return {
    token: existing,
    isAuthenticated: !!existing,

    login: (token) => {
      "[AUTH LOGIN CALLED]", token;
      sessionStorage.setItem(TOKEN_KEY, token);
      set({ token, isAuthenticated: true });
    },

    logout: () => {
      ("[AUTH LOGOUT]");
      sessionStorage.removeItem(TOKEN_KEY);
      set({ token: null, isAuthenticated: false });
    },
  };
});
