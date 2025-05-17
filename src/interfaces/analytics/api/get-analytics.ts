import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface GetBusinessAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalAppointments: number;
    totalReminders: number;
    totalBots: number;
    totalConversations: number;
    totalKnowledgeBase: number;
  };
}

export interface GetAdminAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalUsers: number;
    totalAppointments: number;
    totalBots: number;
    totalAdmins: number;
  };
}
