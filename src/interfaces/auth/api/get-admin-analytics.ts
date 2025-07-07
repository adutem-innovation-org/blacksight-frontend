import { ApiSuccessResponse } from "@/interfaces/api-response";

export interface AdminAnalyticsRes extends ApiSuccessResponse {
  data: AdminAuthAnalytics;
}

export type AdminAuthAnalytics = {
  totalAdmins: number;
  activeAdmins: number;
  suspendedAdmins: number;
};
