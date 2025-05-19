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
}
