import { PaginationMetaData } from "@/interfaces/pagination";
import { Appointment } from "./appointment";

export interface AppointmentState {
  fetchingAppointmentAnalytics: boolean;
  appointmentAnalyticsFetched: boolean;
  fetchAppointmentAnalyticsError: string;
  appointmentAnalytics: Record<string, number> | null;

  // Get all Appointments
  fetchingAllAppointments: boolean;
  allAppointmentsFetched: boolean;
  fetchAllAppointmentsError: string;
  appointments: Appointment[] | null;
  meta: PaginationMetaData | null;

  // Update status
  updatingAppointmentStatus: boolean;
  appointmentStatusUpdated: boolean;
  updateAppointmentStatusErrorMsg: string;
  updateAppointmentStatusErrors: Record<string, string>;

  // Delete
  deletingAppointment: boolean;
  appointmentDeleted: boolean;
  deleteAppointmentError: string;
}
