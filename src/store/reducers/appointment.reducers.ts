import { AppointmentState } from "@/interfaces";

export const resetGetAppointmentAnalyticsReducer = (
  state: AppointmentState
) => {
  state.fetchingAppointmentAnalytics = false;
  state.appointmentAnalyticsFetched = false;
  state.fetchAppointmentAnalyticsError = "";
};

export const resetGetAllAppointmentsReducer = (state: AppointmentState) => {
  state.fetchingAllAppointments = false;
  state.allAppointmentsFetched = false;
  state.fetchAllAppointmentsError = "";
};
