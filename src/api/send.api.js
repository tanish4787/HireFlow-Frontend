import api from "./axios";

export const sendResumeToRecruiter = async ({ recruiterId, resumeId }) => {
  const res = await api.post("/emails/send", { recruiterId, resumeId });
  return res.data;
};

export const sendResumeInBatch = async ({ recruiterIds, resumeId }) => {
  const res = await api.post("/emails/send-batch", {
    recruiterIds,
    resumeId,
  });
  return res.data;
};
