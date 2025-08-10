import { ReminderState } from "@/interfaces";
import { getReminderAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getReminderAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<ReminderState>
) => {
  builder.addCase(getReminderAnalytics.pending, (state) => {
    state.fetchingReminderAnalytics = true;
    state.fetchReminderAnalyticsErrorMessage = "";
  });

  builder.addCase(getReminderAnalytics.fulfilled, (state, action) => {
    state.fetchingReminderAnalytics = false;
    state.reminderAnalyticsFetched = true;
    // state.reminderAnalytics = action.payload;
    state.analyticsData = action.payload;
  });

  builder.addCase(getReminderAnalytics.rejected, (state, action) => {
    state.fetchingReminderAnalytics = false;
    state.reminderAnalyticsFetched = false;
    state.fetchReminderAnalyticsErrorMessage = action.payload as string;
  });
};
