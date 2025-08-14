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

  // Update appointment status
  updatingAppointmentStatus: false,
  appointmentStatusUpdated: false,
  updateAppointmentStatusErrorMsg: "",
  updateAppointmentStatusErrors: {},

  // Delete appointment
  deletingAppointment: false,
  appointmentDeleted: false,
  deleteAppointmentError: "",
};
