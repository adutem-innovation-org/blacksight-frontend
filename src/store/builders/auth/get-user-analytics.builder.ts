import { AuthState } from "@/interfaces";
import { getAdminUserAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAdminUserAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder.addCase(getAdminUserAnalytics.pending, (state) => {
    state.fetchingUserAnalytics = true;
  });

  builder.addCase(getAdminUserAnalytics.fulfilled, (state, action) => {
    state.fetchingUserAnalytics = false;
    state.userAnalyticsFetched = true;
    state.userAnalytics = action.payload;
  });

  builder.addCase(getAdminUserAnalytics.rejected, (state, action) => {
    state.fetchingUserAnalytics = false;
    state.fetchUserAnalyticsErrorMessage =
      action.payload?.message ?? "Unable to fetch user analytics";
  });
};
