export type AnalyticsState = {
  fetchingAnalytics: boolean;
  analyticsFetched: boolean;
  analytics: Record<string, number> | null;
  fetchAnalyticsError: string;
};
