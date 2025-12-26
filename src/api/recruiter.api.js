import api from "./axios";

export const addRecruiter = ({ name, email, company, role }) => {
  return api.post("/recruiters", {
    name,
    email,
    company,
    role,
  });
};

export const getAllRecruiters = () => {
  const res = api.get("/recruiters");

  return res.data;
};
