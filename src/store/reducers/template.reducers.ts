import { TemplateState } from "@/interfaces";

export const resetGetTemplateAnalyticsReducer = (state: TemplateState) => {
  state.fetchingTemplateAnalytics = false;
  state.templateAnalyticsFetched = false;
  state.fetchTemplateAnalyticsErrorMessage = "";
};

export const resetCreateTemplateReducer = (state: TemplateState) => {
  state.creatingTemplate = false;
  state.templateCreated = false;
  state.createTemplateErrors = {};
  state.createTemplateErrorMessage = "";
};

export const resetGetTemplatesReducer = (state: TemplateState) => {
  state.fetchingTemplates = false;
  state.templatesFetched = false;
  state.fetchTemplatesErrorMessage = "";
};
