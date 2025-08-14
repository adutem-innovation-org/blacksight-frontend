import { AppointmentStatus } from "@/enums";
import { ApiSuccessResponse } from "@/interfaces/api-response";
import { Appointment } from "../store";

export type UpdateAppointmentStatusBody = {
  status: AppointmentStatus;
  reason?: string;
};

export interface UpdateAppointmentStatusRes extends ApiSuccessResponse {
  appointment: Appointment;
}
