import { ApiSuccessResponse } from "../../api-response";

export interface ConversationAnalyticsRes extends ApiSuccessResponse {
  data: {
    totalConversations: number;
    totalConversationsWithAppointment: number;
  };
}
