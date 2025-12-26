import api from "./axios";

export const sendResumeToRecruiter = ({ recruiterId, resumeId }) => {
  const res = api.post("/emails/send", { recruiterId, resumeId });
  return res.data;
};
export const sendResumeInBatch = ({ recruiterIds, resumeId }) => {
  const res = api.post("/emails/send-batch", { recruiterIds, resumeId });
  return res.data;
};
