import { create } from "zustand";
import { getAllRecruiters, addRecruiter } from "../api/recruiter.api";

export const useRecruiter = create((set) => ({
  recruiters: [],
  loading: false,
  error: null,

  fetchAllRecruiters: async () => {
    set({
      loading: true,
      error: null,
    });
    try {
      const data = getAllRecruiters();
      set({
        recruiters: data,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Failed to load Recruiters List.",
        loading: false,
      });
    }
  },

  addRecruiter: async (recruiterData) => {
    set({ loading: true, error: null });

    try {
      const newRecruiter = await addRecruiter(recruiterData);

      set((state) => ({
        recruiters: [...state.recruiters, newRecruiter],
        loading: false,
      }));
    } catch (error) {
      set({
        error: "Failed to add recruiter",
        loading: false,
      });
    }
  },
}));
