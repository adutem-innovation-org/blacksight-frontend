import { AppointmentState } from "@/interfaces";
import { getAppointmentAnalytics } from "@/store/thunks";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const getAppointmentAnalyticsBuilder = (
  builder: ActionReducerMapBuilder<AppointmentState>
) => {
  builder.addCase(getAppointmentAnalytics.pending, (state) => {
    state.fetchingAppointmentAnalytics = true;
    state.fetchAppointmentAnalyticsError = "";
  });

  builder.addCase(getAppointmentAnalytics.fulfilled, (state, action) => {
    state.fetchingAppointmentAnalytics = false;
    state.appointmentAnalyticsFetched = true;
    state.appointmentAnalytics = action.payload;
  });

  builder.addCase(getAppointmentAnalytics.rejected, (state, action) => {
    state.fetchingAppointmentAnalytics = false;
    state.appointmentAnalyticsFetched = false;
    state.fetchAppointmentAnalyticsError = action.payload as string;
  });
};
