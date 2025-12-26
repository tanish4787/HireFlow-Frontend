import { create } from "zustand";
import {
  getAllTemplates,
  createTemplate as createTemplateApi,
  deleteTemplate as deleteTemplateApi,
} from "../api/template.api";

export const useTemplateStore = create((set) => ({
  templates: [],
  loading: false,
  error: null,

  fetchTemplates: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getAllTemplates();
      set({ templates: data, loading: false });
    } catch (err) {
      set({
        error: "Error fetching templates",
        loading: false,
      });
    }
  },

  createTemplate: async (templateData) => {
    set({ loading: true, error: null });

    try {
      const newTemplate = await createTemplateApi(templateData);

      set((state) => ({
        templates: [...state.templates, newTemplate],
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Error creating template",
        loading: false,
      });
    }
  },

  deleteTemplate: async (templateId) => {
    set({ loading: true, error: null });

    try {
      await deleteTemplateApi(templateId);

      set((state) => ({
        templates: state.templates.filter(
          (template) => template._id !== templateId
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Error deleting template",
        loading: false,
      });
    }
  },
}));
