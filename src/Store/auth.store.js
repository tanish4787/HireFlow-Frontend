import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("hireflow_token"),
  isAuthenticated: !!sessionStorage.getItem("hireflow_token"),

  login: (token) => {
    sessionStorage.setItem("hireflow_token", token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    sessionStorage.removeItem("hireflow_token");

    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
