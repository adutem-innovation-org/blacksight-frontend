import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface AppointmentAnalyticsRes extends ApiSuccessResponse {
  data: {
    pendingAppointments: number;
    scheduledAppointments: number;
    cancelledAppointments: number;
    completedAppointments: number;
  };
}
