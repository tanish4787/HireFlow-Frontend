import { create } from "zustand";
import { sendResumeToRecruiter, sendResumeInBatch } from "../api/send.api";

export const useSendStore = create((set) => ({
  sending: false,
  results: [],
  error: null,

  sendSingle: async ({ recruiterId, resumeId, templateId }) => {
    set({
      sending: true,
      results: [],
      error: null,
    });

    try {
      const data = await sendResumeToRecruiter({
        recruiterId,
        resumeId,
        templateId,
      });

      set({
        results: [data],
        sending: false,
      });
    } catch (err) {
      set({
        error: "Failed to send resume",
        sending: false,
      });
    }
  },

  sendBatch: async ({ recruiterIds, resumeId, templateId }) => {
    set({
      sending: true,
      results: [],
      error: null,
    });

    try {
      const data = await sendResumeInBatch({
        recruiterIds,
        resumeId,
        templateId,
      });

      set({
        results: data,
        sending: false,
      });
    } catch (err) {
      set({
        error: "Failed to send resumes in batch",
        sending: false,
      });
    }
  },

  clearResults: () => {
    set({
      results: [],
      error: null,
    });
  },
}));
