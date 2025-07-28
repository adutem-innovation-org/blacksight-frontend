import { TemplateState } from "@/interfaces";

export const resetGetTemplateAnalyticsReducer = (state: TemplateState) => {
  state.fetchingTemplateAnalytics = false;
  state.templateAnalyticsFetched = false;
  state.fetchTemplateAnalyticsErrorMessage = "";
};
