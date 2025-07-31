import { EditorMode } from "@/enums";
import { TemplateState } from "@/interfaces";

export const initialTemplateState: TemplateState = {
  fetchingTemplateAnalytics: false,
  templateAnalyticsFetched: false,
  fetchTemplateAnalyticsErrorMessage: "",
  templateAnalytics: null,

  // Create template
  creatingTemplate: false,
  templateCreated: false,
  createTemplateErrors: {},
  createTemplateErrorMessage: "",

  // Fetch templates
  fetchingTemplates: false,
  templatesFetched: false,
  fetchTemplatesErrorMessage: "",
  templates: null,
  meta: null,

  // Editor
  currentTemplate: null,
  editorMode: EditorMode.CREATE,

  // Update template
  updatingTemplate: false,
  templateUpdated: false,
  updateTemplateErrors: {},
  updateTemplateErrorMessage: "",

  // Delete template
  deletingTemplate: false,
  templateDeleted: false,
  deleteTemplateErrorMessage: "",
};
