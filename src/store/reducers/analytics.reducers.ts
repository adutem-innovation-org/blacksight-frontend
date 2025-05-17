import { AnalyticsState } from "@/interfaces";

export const resetGetAnalyticsBuilder = (state: AnalyticsState) => {
  state.fetchingAnalytics = false;
  state.analyticsFetched = false;
  state.fetchAnalyticsError = "";
};
