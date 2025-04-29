import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface ReminderAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalReminders: number;
    activeReminders: number;
    paymentReminders: number;
    appointmentReminders: number;
  };
}
