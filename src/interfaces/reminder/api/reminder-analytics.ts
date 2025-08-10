import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface ReminderAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalReminders: number;
    activeReminders: number;
    paymentReminders: number;
    appointmentReminders: number;
  };
}

export interface NewReminderAnalyticsRes extends ApiSuccessResponse {
  data: {
    total: number;
    active: number;
    completed: number;
    failed: number;
    byType: {
      [key: string]: number;
      instant: number;
      scheduled: number;
      recurring: number;
      event_based: number;
      payment: number;
      appointment: number;
    };
    byChannel: {
      sms: number;
      email: number;
      both: number;
    };
    byStatus: {
      pending: number;
      sent: number;
      failed: number;
      cancelled: number;
      completed: number;
      null: number;
    };
    successRate: number;
    recentActivity: {
      sent: number;
      failed: number;
      period: string;
    };
  };
}
