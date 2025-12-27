import { create } from "zustand";
import { sendResumeToRecruiter, sendResumeInBatch } from "../api/send.api";

export const useSendStore = create((set) => ({
  sending: false,
  results: [],
  error: null,
  status: null,

  sendSingle: async ({ recruiterId, resumeId, templateId }) => {
    set({
      sending: true,
      results: [],
      error: null,
      status: null,
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
        status: "Sent",
      });
    } catch (error) {
      if (error.response?.status === 409) {
        set({
          sending: false,
          status: "DUPLICATE",
          error: "Resume already sent to this recruiter",
        });

        return {
          ok: false,
          reason: "DUPLICATE",
        };
      }

      set({
        error: "Failed to send resume",
        sending: false,
        status: "Failed",
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
