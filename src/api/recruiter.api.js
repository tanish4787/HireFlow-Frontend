import api from "./axios";

export const addRecruiter = async ({ name, email, company, role }) => {
  const res = await api.post("/recruiters", {
    name,
    email,
    company,
    role,
  });
  return res.data.data;
};

export const getAllRecruiters = async () => {
  const res = await api.get("/recruiters");
  return res.data.data;
};
