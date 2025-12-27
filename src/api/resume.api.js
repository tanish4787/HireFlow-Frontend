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

  return res.data.data;
};

export const getAllResumes = async () => {
  const res = await api.get("/resumes");
  return res.data.data;
};

export const deleteResume = async (resumeId) => {
  await api.delete(`/resumes/${resumeId}`);
};
