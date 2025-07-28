import { TemplateState } from "@/interfaces";

export const initialTemplateState: TemplateState = {
  fetchingTemplateAnalytics: false,
  templateAnalyticsFetched: false,
  fetchTemplateAnalyticsErrorMessage: "",
  templateAnalytics: null,
};
