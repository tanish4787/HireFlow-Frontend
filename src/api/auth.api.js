import api from "./axios";

export const requestMagicLink = (email) => {
  return api.post("/auth/login", { email });
};

export const verifyMagicLink = async (token) => {
  const res = await api.get(`/auth/verify?token=${token}`);
  return res.data;
};
