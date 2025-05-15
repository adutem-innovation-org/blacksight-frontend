import { ApiSuccessResponse } from "../../api-response";

export interface BotAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalBots: number;
    activeBots: number;
  };
}
