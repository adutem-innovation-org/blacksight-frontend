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
};
