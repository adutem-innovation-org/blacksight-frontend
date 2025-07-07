import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface UserAnalyticsRes extends ApiSuccessResponse {
  data: AdminUserAnalytics;
}

export type AdminUserAnalytics = {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
};
