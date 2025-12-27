import api from "./axios";

export const createTemplate = async ({ role, subject, body }) => {
  const res = await api.post("/templates", { role, subject, body });
  return res.data.data;
};

export const getAllTemplates = async () => {
  const res = await api.get("/templates");
  return res.data.data;
};

export const deleteTemplate = async (id) => {
  await api.delete(`/templates/${id}`);
};
