export type TemplateState = {
  fetchingTemplateAnalytics: boolean;
  templateAnalyticsFetched: boolean;
  fetchTemplateAnalyticsErrorMessage: string;
  templateAnalytics: Record<string, number> | null;
};
