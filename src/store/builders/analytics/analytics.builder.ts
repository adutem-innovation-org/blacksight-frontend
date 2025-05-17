import { AnalyticsState } from "@/interfaces";
import { getAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<AnalyticsState>
) => {
  builder.addCase(getAnalytics.pending, (state) => {
    state.fetchingAnalytics = true;
    state.fetchAnalyticsError = "";
  });

  builder.addCase(getAnalytics.fulfilled, (state, action) => {
    state.fetchingAnalytics = false;
    state.analyticsFetched = true;
    state.analytics = action.payload;
  });

  builder.addCase(getAnalytics.rejected, (state, action) => {
    state.fetchingAnalytics = false;
    state.fetchAnalyticsError = action.payload as string;
  });
};
