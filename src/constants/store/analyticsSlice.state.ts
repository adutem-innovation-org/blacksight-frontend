import { AnalyticsState } from "@/interfaces";

export const initialAnalyticsState: AnalyticsState = {
  fetchingAnalytics: false,
  analyticsFetched: false,
  fetchAnalyticsError: "",
  analytics: null,
};
