import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Appointment } from "../store";

export interface DeleteAppointmentRes extends ApiSuccessResponse {
  appointment: Appointment;
}
