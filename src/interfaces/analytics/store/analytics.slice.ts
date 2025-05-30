export type AnalyticsState = {
  fetchingAnalytics: boolean;
  analyticsFetched: boolean;
  analytics: {
    data: Record<string, number>;
    bookingStat: Record<string, string | number>[] | null;
  } | null;
  fetchAnalyticsError: string;
};
