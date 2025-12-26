import api from "./axios";

export const uploadResume = async (file, label) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("label", label);

  const res = await api.post("/resumes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getAllResumes = async () => {
  const res = await api.get("/resumes");
  return res.data;
};
export const deleteResume = async (resumeId) => {
  const res = await api.delete(`/resumes/${resumeId}`);
  return res.data;
};
