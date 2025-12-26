import api from "./axios";

export const requestMagicLink = (email) => {
  return api.post("/auth/login", { email });
};

export const verifyMagicLink = (token) => {
  return api.post("/auth/verify", { token });
};
