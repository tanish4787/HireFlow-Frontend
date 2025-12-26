import { create } from "zustand";
import {
  getAllResumes,
  uploadResume as uploadResumeApi,
  deleteResume as deleteResumeApi,
} from "../api/resume.api";

export const useResumeStore = create((set) => ({
  resumes: [],
  loading: false,
  error: null,

  fetchResumes: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getAllResumes();
      set({ resumes: data || [], loading: false });
    } catch (err) {
      set({
        error: "Error fetching resumes",
        loading: false,
      });
    }
  },

  uploadResume: async (file, label) => {
    set({ loading: true, error: null });

    try {
      const newResume = await uploadResumeApi(file, label);

      set((state) => ({
        resumes: [...state.resumes, newResume],
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Error uploading resume",
        loading: false,
      });
    }
  },

  deleteResume: async (resumeId) => {
    set({ loading: true, error: null });

    try {
      await deleteResumeApi(resumeId);

      set((state) => ({
        resumes: state.resumes.filter((resume) => resume._id !== resumeId),
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Error deleting resume",
        loading: false,
      });
    }
  },
}));
