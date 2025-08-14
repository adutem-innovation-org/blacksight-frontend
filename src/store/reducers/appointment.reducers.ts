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

export const resetUpdateAppointmentStatusReducer = (
  state: AppointmentState
) => {
  state.updatingAppointmentStatus = false;
  state.appointmentStatusUpdated = false;
  state.updateAppointmentStatusErrorMsg = "";
  state.updateAppointmentStatusErrors = {};
};

export const resetDeleteAppointmentReducer = (state: AppointmentState) => {
  state.deletingAppointment = false;
  state.appointmentDeleted = false;
  state.deleteAppointmentError = "";
};
