import { AuthState } from "@/interfaces";
import { getAdminAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAdminAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(getAdminAnalytics.pending, (state) => {
    state.fetchingAdminAnalytics = true;
  });

  builder.addCase(getAdminAnalytics.fulfilled, (state, action) => {
    state.fetchingAdminAnalytics = false;
    state.adminAnalyticsFetched = true;
    state.adminAnalytics = action.payload;
  });

  builder.addCase(getAdminAnalytics.rejected, (state, action) => {
    state.fetchingAdminAnalytics = false;
    state.fetchAdminAnalyticsErrorMessage =
      action.payload?.message ?? "Unable to fetch admin analytics";
  });
};
