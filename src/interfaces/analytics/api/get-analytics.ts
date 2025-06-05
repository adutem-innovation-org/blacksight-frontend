import { ApiSuccessResponse } from "@/interfaces/api-response";
import { ResponseTimeType, TokenUsage } from "../store";

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
  bookingStat: Array<BookingStat> | null;
  responseTime: ResponseTimeType;
  tokenUsage: TokenUsage[];
}

export interface GetAdminAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalUsers: number;
    totalAppointments: number;
    totalBots: number;
    totalAdmins: number;
  };
  bookingStat: Array<BookingStat> | null;
  responseTime: ResponseTimeType;
  tokenUsage: TokenUsage[];
}
