import { ApiSuccessResponse } from "@/interfaces/api-response";

type BookingStat = {
  day: string;
  bookings: number;
};
export interface GetBusinessAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalAppointments: number;
    totalReminders: number;
    totalBots: number;
    totalConversations: number;
    totalKnowledgeBase: number;
  };
  bookingAnalytics: Array<BookingStat> | null;
}

export interface GetAdminAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalUsers: number;
    totalAppointments: number;
    totalBots: number;
    totalAdmins: number;
  };
}
