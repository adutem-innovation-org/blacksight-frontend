import { AppointmentState } from "@/interfaces";

export const initialAppointmentState: AppointmentState = {
  fetchingAppointmentAnalytics: false,
  appointmentAnalyticsFetched: false,
  fetchAppointmentAnalyticsError: "",
  appointmentAnalytics: null,

  // Get all Appointments
  fetchingAllAppointments: false,
  allAppointmentsFetched: false,
  fetchAllAppointmentsError: "",
  appointments: null,
  meta: null,
};
