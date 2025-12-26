import api from "./axios";

export const createTemplate = ({ role, subject, body }) => {
  return api.post("/templates", { role, subject, body });
};

export const getAllTemplates = () => {
  const res = api.get("/templates");
  return res.data;
};

export const deleteTemplate = (id) => {
  const res = api.delete(`/templates/${id}`);
  return res.data;
};
